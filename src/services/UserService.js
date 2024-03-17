const loginURL = process.env.EXPO_PUBLIC_API_URL + "/login";
const logoutURL = process.env.EXPO_PUBLIC_API_URL + "/logout";

const registerURL = process.env.EXPO_PUBLIC_API_URL + "/putUserData";
const extraDataURL = process.env.EXPO_PUBLIC_API_URL + "/user/putExtra";

const getUserDataURL = process.env.EXPO_PUBLIC_API_URL + "/getUserData";
const putPreferencesURL = process.env.EXPO_PUBLIC_API_URL + "/user/putPref";
const getPreferencesURL = process.env.EXPO_PUBLIC_API_URL + "/user/getPref";

const createTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/create";
const filterTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/filter";
const joinTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/join";
const leaveTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/leave";
const inviteTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/invite";
const deleteTripURl = process.env.EXPO_PUBLIC_API_URL + "/trips/delete";
const updateTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/update";

const getMsgURL = process.env.EXPO_PUBLIC_API_URL + "/messaging/retrieve";
const sendMsgURL = process.env.EXPO_PUBLIC_API_URL + "/messaging/send";

//LOGGING IN / REGISTERING

export const _loginUser = (email, password) => {
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

export const _logoutUser = (email) => {
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

export const _registerUser = (username, email, password) => {
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

export const _putAdditionalUserData = (email, photo, countryOfResidence, jobTitle) => {
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

export const _getUserData = (email) => {
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
        return {response: response.text(), status: response.status, data: response.user_data};
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
        return 400;
    })
}

export const _putUserPreferences = (email, dates, countries) => {
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

export const _getUserPreferences = (email) => {
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

//TRIP HANDLING

export const _createNewTrip = (creatorEmail, date, country, numPeople, desc) => {
    const startDate = String(date[0]);
    const endDate = String(date[1]);

    return fetch(createTripURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "creator_email": creatorEmail,
            "start_date": startDate,
            "end_date": endDate,
            "location": country,
            "participants": numPeople,
            "description": desc,
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

export const _getFilteredTrips = (creatorEmail, userEmail, startDate, endDate, country) => {
    return fetch(filterTripURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "creator_email": creatorEmail,
            "user_email": userEmail,
            "location": country,
            "start_date": startDate,
            "end_date": endDate,
        }),
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

export const _joinTrip = (tripID, userEmail) => {
    return fetch(joinTripURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trip_id": tripID,
            "email": userEmail,
        }),
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

export const _leaveTrip = (tripID, userEmail) => {
    return fetch(leaveTripURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trip_id": tripID,
            "email": userEmail,
        }),
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

export const _updateTrip = (tripID, numPeople, desc) => {
    return fetch(updateTripURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trip_id": tripID,
            "num_people": numPeople,
            "description": desc,
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

export const _deleteTrip = (tripID, numUsers) => {
    return fetch(deleteTripURl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trip_id": tripID,
            "num_people": numUsers,
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

export const _inviteTrip = (tripID, invitedUserEmail) => {
    return fetch(inviteTripURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "invited_user_email": invitedUserEmail,
            "trip_id": tripID,
        }),
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

export const _getMessages = (tripID) => {
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

export const _sendMessage = (tripID, userEmail, msg) => {
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

const UserService = {
    loginUser: _loginUser,
    logoutUser: _logoutUser,

    registerUser: _registerUser,
    putExtraData: _putAdditionalUserData,
    getUserData: _getUserData,
    putUserPref: _putUserPreferences,
    getUserPref: _getUserPreferences,

    createNewTrip: _createNewTrip,
    filterTrips: _getFilteredTrips,
    joinTrip: _joinTrip,
    leaveTrip: _leaveTrip,
    inviteTrip: _inviteTrip,
    updateTrip: _updateTrip,
    deleteTrip: _deleteTrip,

    getMessages: _getMessages,
    sendMessage: _sendMessage,
}

export default UserService;