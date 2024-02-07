const loginURL = process.env.EXPO_PUBLIC_API_URL + "/login";
const registerURL = process.env.EXPO_PUBLIC_API_URL + "/putUserData";


export const _loginUser = (username, password) => {
    return fetch(loginURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
        })
    })
    .then((response) => response.json())
    .then((data) => {
        try {
            let token = JSON.parse(data.body).session_token;
            return {statusCode: data.statusCode, sessionToken: token};
        }
        catch {}
        return {statusCode: data.statusCode};
    })
    .catch((error) => {
        return {statusCode: 400};
    })
}

export const _logoutUser = () => {
    
}

export const _registerUser = (username, email, password) => {
    return fetch(registerURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        })
    })
    .then(response => {
        return {response: response.text(), status: response.status}
    })
    .then((response) => {
        return response.status;
    })
    .catch((error) => {
        console.log(error)
        return 400;
    })
}

const UserService = {
    loginUser: _loginUser,
    logoutUser: _logoutUser,
    registerUser: _registerUser
}

export default UserService;