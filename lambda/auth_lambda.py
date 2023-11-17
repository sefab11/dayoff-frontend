import base64
import json
import os
import uuid
from passlib.hash import pbkdf2_sha256
from cassandra.cluster import Cluster
import boto3
from botocore.exceptions import ClientError


def get_secret():
    secret_name = "mobile_app_cassandra_user"  # Replace with your secret name
    region_name = "eu-west-2"  # Replace with your AWS region

    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager', region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceNotFoundException':
            print("The requested secret was not found")
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            print("The request was invalid due to:", e)
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            print("The request had invalid params:", e)
        else:
            print("Error:", e)

    else:
        # Depending on whether the secret is a string or binary, one of these fields will be populated.
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
            return json.loads(secret)
        else:
            decoded_binary_secret = base64.b64decode(get_secret_value_response['SecretBinary'])
            return json.loads(decoded_binary_secret)


def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        username = body['username']
        password = body['password']

        # Fetch credentials from AWS Secrets Manager
        secrets = get_secret()
        cassandra_username = secrets['cassandra_username']
        cassandra_password = secrets['cassandra_password']

        cluster = Cluster([os.environ['CASSANDRA_HOST']],
                          auth_provider={'username': cassandra_username, 'password': cassandra_password})
        session = cluster.connect(os.environ['CASSANDRA_KEYSPACE'])

        # Check if the user exists
        user_query = session.prepare('SELECT * FROM users.account WHERE username = ?')
        user_result = session.execute(user_query, [username])

        if not user_result:
            return {
                'statusCode': 401,
                'body': json.dumps({'message': 'Invalid credentials'}),
            }

        user = user_result[0]
        hashed_password = user['password']

        if not pbkdf2_sha256.verify(password, hashed_password):
            return {
                'statusCode': 401,
                'body': json.dumps({'message': 'Invalid credentials'}),
            }

        # Generate and store a session token
        session_token = str(uuid.uuid4())
        session_token_query = session.prepare('UPDATE users SET session_token = ? WHERE username = ?')
        session.execute(session_token_query, [session_token, username])

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Login successful', 'session_token': session_token}),
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal Server Error'}),
        }
