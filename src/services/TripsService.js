const createTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/create";
const filterTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/filter";
const joinTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/join";
const leaveTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/leave";
const inviteTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/invite";
const deleteTripURl = process.env.EXPO_PUBLIC_API_URL + "/trips/delete";
const updateTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/update";
const getTripInfoURL = process.env.EXPO_PUBLIC_API_URL + "/trips/details";


//TRIP HANDLING

const _createNewTrip = (creatorEmail, date, country, numPeople, desc) => {
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

const _getFilteredTrips = (creatorEmail, userEmail, startDate, endDate, country) => {
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

const _joinTrip = (tripID, userEmail) => {
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

const _leaveTrip = (tripID, userEmail) => {
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

const _updateTrip = (tripID, numPeople, desc) => {
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

const _deleteTrip = (tripID, numUsers) => {
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

const _inviteTrip = (tripID, invitedUserEmail) => {
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

const _getTripInfo = (tripID, userEmail) => {
    return fetch(getTripInfoURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "trip_id": tripID,
            "user_email": userEmail,
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



export default TripsService = {
    createNewTrip: _createNewTrip,
    filterTrips: _getFilteredTrips,
    joinTrip: _joinTrip,
    leaveTrip: _leaveTrip,
    inviteTrip: _inviteTrip,
    updateTrip: _updateTrip,
    deleteTrip: _deleteTrip,
    getTripInfo: _getTripInfo,
};