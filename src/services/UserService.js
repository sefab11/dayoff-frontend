const registerURL = process.env.EXPO_PUBLIC_API_URL + "/putUserData";

export const _loginUser = (email, password) => {
    
}

export const _logoutUser = () => {
    
}

export const _registerUser = (name, email, password) => {
    console.log(registerURL);
    return fetch(`${registerURL}?name=${name}&email=${email}&password=${password}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
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