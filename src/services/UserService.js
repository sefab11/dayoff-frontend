const loginURL = process.env.EXPO_PUBLIC_API_URL + "/login";
const logoutURL = process.env.EXPO_PUBLIC_API_URL + "/logout";

const registerURL = process.env.EXPO_PUBLIC_API_URL + "/putUserData";
const extraDataURL = process.env.EXPO_PUBLIC_API_URL + "/user/putExtra";

const getUserDataURL = process.env.EXPO_PUBLIC_API_URL + "/getUserData";
const putPreferencesURL = process.env.EXPO_PUBLIC_API_URL + "/user/putPref";
const getPreferencesURL = process.env.EXPO_PUBLIC_API_URL + "/user/getPref";

//LOGGING IN / REGISTERING

const _loginUser = (email, password) => {
    return fetch(loginURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'email': email,
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

const _logoutUser = (email) => {
    //TODO: get token from db based on email
    const token = "xxx";

    return fetch(logoutURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "token": token,
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

const _registerUser = (username, email, password) => {
    return fetch(registerURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
            "email": email,
        })
    })
    .then(response => {
        return {response: response.text(), status: response.status};
    })
    .then((response) => {
        return response.status;
    })
    .catch((error) => {
        console.log(error)
        return 400;
    })
}

const _putAdditionalUserData = (email, photo, countryOfResidence, jobTitle) => {
    return fetch(extraDataURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "photo_data": photo ? photo : null,
            "country": countryOfResidence ? countryOfResidence : null,
            "job": jobTitle ? jobTitle : null,
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

const _getUserData = (email) => {
    return fetch(getUserDataURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
        })
    })
    .then(response => {
        return {response: response.json(), status: response.status};
    })
    .then((response) => {
        return response.response;
    })
    .then((response) => {
        return response.user_data;
    })
    .catch((error) => {
        console.log(error);
        return 400;
    })
}

const _putUserPreferences = (email, dates, countries) => {
    console.log(putPreferencesURL);
    return fetch(putPreferencesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'email': email,
            'dates': dates,
            'countries': countries,
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

const _getUserPreferences = (email) => {
    return fetch(getPreferencesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'email': email,
        })
    })
    .then(response => {
        return {response: response.json(), status: response.status};
    })
    .then((response) => {
        return response.response;
    })
    .catch((error) => {
        console.log(error);
        return 400;
    })
}


export default UserService = {
    loginUser: _loginUser,
    logoutUser: _logoutUser,

    registerUser: _registerUser,
    putExtraData: _putAdditionalUserData,
    getUserData: _getUserData,
    putUserPref: _putUserPreferences,
    getUserPref: _getUserPreferences,
};