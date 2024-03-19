const getMsgURL = process.env.EXPO_PUBLIC_API_URL + "/messaging/retrieve";
const sendMsgURL = process.env.EXPO_PUBLIC_API_URL + "/messaging/send";


const _getMessages = (tripID) => {
    return fetch(getMsgURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trip_id": tripID,
        })
    })
    .then(response => {
        return {response: response.json(), status: response.status};
    })
    .then((response) => {
        return response.response;
    })
    .then((response) => {
        return response.body;
    })
    .catch((error) => {
        console.log(error);
        return 400;
    })
}

const _sendMessage = (tripID, userEmail, msg) => {
    console.log(tripID + userEmail + msg);

    return fetch(sendMsgURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trip_id": tripID,
            "user_email": userEmail,
            "message": msg,
        })
    })
    .then(response => {
        return {response: response.text(), status: response.status};
    })
    .then((response) => {
        return response.status;
    })
    .catch((error) => {
        console.log(error);
        return 400;
    })
}


export default MessageService = {
    getMessages: _getMessages,
    sendMessage: _sendMessage,
};