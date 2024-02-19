const loginURL = process.env.EXPO_PUBLIC_API_URL + "/login";
const registerURL = process.env.EXPO_PUBLIC_API_URL + "/putUserData";
const createTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/create";
const filterTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/filter";


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

export const _getFilteredTrips = (dates, country) => {
    return fetch(filterTripURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "location": country,
            "date": dates,
        }),
    })
    .then(response => {
        return {response: response.text(), status: response.status, trips: response.trips};
    })
    .then((response) => {
        return response.trips;
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

    createNewTrip: _createNewTrip,
    filterTrips: _getFilteredTrips,
}

export default UserService;