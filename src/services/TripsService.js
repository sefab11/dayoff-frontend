//const createTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/create";
const createTripURL = "http://127.0.0.1:8000" + "/trips/create";
//const filterTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/filter";
const filterTripURL = "http://127.0.0.1:8000" + "/trips/filter";
//const joinTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/join";
const joinTripURL = "http://127.0.0.1:8000" + "/trips/join";
//const leaveTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/leave";
const leaveTripURL = "http://127.0.0.1:8000" + "/trips/leave";
//const inviteTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/invite";
const inviteTripURL = "http://127.0.0.1:8000" + "/trips/invite";
//const deleteTripURl = process.env.EXPO_PUBLIC_API_URL + "/trips/delete";
const deleteTripURl = "http://127.0.0.1:8000" + "/trips/delete";
//const updateTripURL = process.env.EXPO_PUBLIC_API_URL + "/trips/update";
const updateTripURL = "http://127.0.0.1:8000" + "/trips/update";
//const getTripInfoURL = process.env.EXPO_PUBLIC_API_URL + "/trips/details";
const getTripInfoURL = "http://127.0.0.1:8000" + "/trips/details";
import UserService from "./UserService";
const { loginUser } = UserService;

//TRIP HANDLING

// const _createNewTrip = async (
//   creatorEmail,
//   date,
//   country,
//   numPeople,
//   desc,
//   authToken
// ) => {
//   const startDate = String(date[0]);
//   const endDate = String(date[1]);

//   try {
//     const response = await fetch(createTripURL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: authToken,
//       },
//       body: JSON.stringify({
//         creator_email: creatorEmail,
//         start_date: startDate,
//         end_date: endDate,
//         location: country,
//         participants: numPeople,
//         description: desc,
//       }),
//     });
//     const response_1 = { response: response.text(), status: response.status };
//     return response_1.status;
//   } catch (error) {
//     console.log(error);
//     return 400;
//   }
// };
const _createNewTrip = async (
  creatorEmail,
  date,
  country,
  desc,
  participants,
  authToken
) => {
  const startDate = String(date[0]);
  const endDate = String(date[1]);

  try {
    // Calculate max_people including creator
    const maxPeople = participants.length + 1;

    const response = await fetch(createTripURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        creator_email: creatorEmail,
        start_date: startDate,
        end_date: endDate,
        location: country,
        participants: participants, // Needs to be an array of participant emails
        description: desc,
        max_people: maxPeople, // Include max_people
      }),
    });
    return response; // Return the entire response object
  } catch (error) {
    console.error(error);
    return 400; // Return null in case of error
  }
};

//     const response_1 = { response: response.text(), status: response.status };
//     return response_1.status;
//   } catch (error) {
//     console.log(error);
//     return 400;
//   }
// };

const _getFilteredTrips = async (creatorEmail, userEmail, dates, countries) => {
  try {
    const response = await fetch(filterTripURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creator_email: creatorEmail,
        user_email: userEmail,
        locations: countries,
        dates: dates,
      }),
    });
    //     const response_1 = { response: response.json(), status: response.status };
    //     const response_2 = await response_1.response;
    //     return response_2.body;
    //   } catch (error) {
    //     console.log(error);
    //     return 400;
    //   }
    // };
    if (!response.ok) {
      // If response status is not OK, throw an error
      throw new Error(`Failed to fetch filtered trips (${response.status})`);
    }

    // Parse JSON response
    const responseData = await response.json();
    // console.log("Response data:", responseData);

    // Check if the response contains an error message
    if (responseData && responseData.error) {
      throw new Error(responseData.error);
    }

    return responseData.body;
  } catch (error) {
    // Log and return the error
    console.error("Error fetching filtered trips:", error);
    return null; // or throw the error if necessary
  }
};

const _joinTrip = async (tripID, userEmail) => {
  try {
    const response = await fetch(joinTripURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: tripID,
        email: userEmail,
      }),
    });
    const response_1 = { response: response.text(), status: response.status };
    return response_1.status;
  } catch (error) {
    console.log(error);
    return 400;
  }
};

const _leaveTrip = async (tripID, userEmail) => {
  try {
    const response = await fetch(leaveTripURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: tripID,
        email: userEmail,
      }),
    });
    const response_1 = { response: response.text(), status: response.status };
    return response_1.status;
  } catch (error) {
    console.log(error);
    return 400;
  }
};

const _updateTrip = async (tripID, numPeople, desc, participants) => {
  try {
    const response = await fetch(updateTripURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: tripID,
        num_people: numPeople,
        description: desc,
        participants: participants,
      }),
    });
    const response_1 = { response: response.text(), status: response.status };
    return response_1.status;
  } catch (error) {
    console.log(error);
    return 400;
  }
};

const _deleteTrip = async (tripID, numUsers) => {
  try {
    const response = await fetch(deleteTripURl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: tripID,
        num_people: numUsers,
      }),
    });
    const response_1 = { response: response.text(), status: response.status };
    return response_1.status;
  } catch (error) {
    console.log(error);
    return 400;
  }
};

const _inviteTrip = async (tripID, invitedUserEmail, authToken) => {
  // try {
  //   const email = global.currentUser.email_id;
  //   const password = global.currentUser.password;
  //   // Retrieve the authToken from the login process
  //   // const { sessionToken } = await loginUser(email, password);
  //   const loginResponse = await loginUser(email, password);
  //   console.log("Login Response:", loginResponse);

  //   // Check if the sessionToken exists
  //   if (!loginResponse.sessionToken) {
  //     console.error("Session token not found.");
  //     return 400;
  //   }

  const requestBody = {
    invited_user_emails: Array.isArray(invitedUserEmail)
      ? invitedUserEmail
      : [invitedUserEmail],
    trip_id: tripID,
  };

  console.log("Request Body:", JSON.stringify(requestBody));

  const response = await fetch(inviteTripURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: loginResponse.sessionToken, // Use the sessionToken as Authorization header
    },
    body: JSON.stringify(requestBody),
  });

  // console.log("Auth:", loginResponse.sessionToken);

  const response_1 = { response: response.text(), status: response.status };
  return response_1.status;
  // } catch (error) {
  //   console.log(error);
  //   return 400;
  // }
};

const _getTripInfo = async (tripID, userEmail) => {
  try {
    const response = await fetch(getTripInfoURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip_id: tripID,
        user_email: userEmail,
      }),
    });
    const response_1 = { response: response.json(), status: response.status };
    const response_2 = await response_1.response;
    return response_2.participants;
  } catch (error) {
    console.log(error);
    return 400;
  }
};

// const getUserPref = async (email) => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/user/getPref", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         accept: "application/json",
//       },
//       body: JSON.stringify({ email: email }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching user preferences:", error);
//     throw error;
//   }
// };

export default TripsService = {
  createNewTrip: _createNewTrip,
  filterTrips: _getFilteredTrips,
  joinTrip: _joinTrip,
  leaveTrip: _leaveTrip,
  inviteTrip: _inviteTrip,
  updateTrip: _updateTrip,
  deleteTrip: _deleteTrip,
  getTripInfo: _getTripInfo,
  // getUserPref: getUserPref,
};
