// import { Storage } from "aws-amplify";

const loginURL = process.env.EXPO_PUBLIC_API_URL + "/login";
//const loginURL = "http://127.0.0.1:8000" + "/login";
const logoutURL = process.env.EXPO_PUBLIC_API_URL + "/logout";
//const logoutURL = "http://127.0.0.1:8000" + "/logout";
const forgetpasswordURL = "http://127.0.0.1:8000" + "/forgot-password";
//const forgotPasswordURL = process.env.EXPO_PUBLIC_API_URL + "/forgot-password";
const resetpasswordURL = "http://127.0.0.1:8000" + "/reset-password";
//const resetPasswordURL = process.env.EXPO_PUBLIC_API_URL + "/reset-password";

const registerURL = process.env.EXPO_PUBLIC_API_URL + "/putUserData";
//const registerURL = "http://127.0.0.1:8000" + "/putUserData";
const extraDataURL = process.env.EXPO_PUBLIC_API_URL + "/user/putExtra";
// const extraDataURL = "http://127.0.0.1:8000" + "/user/putExtra";

const getUserDataURL = process.env.EXPO_PUBLIC_API_URL + "/getUserData";
//const getUserDataURL = "http://127.0.0.1:8000" + "/getUserData";
const putPreferencesURL = process.env.EXPO_PUBLIC_API_URL + "/user/putPref";
//const putPreferencesURL = "http://127.0.0.1:8000" + "/user/putPref";
const getPreferencesURL = process.env.EXPO_PUBLIC_API_URL + "/user/getPref";
//const getPreferencesURL = "http://127.0.0.1:8000" + "/user/getPref";

const sendOtpURL = process.env.EXPO_PUBLIC_API_URL + "/send-otp";
//const sendOtpURL = "http://127.0.0.1:8000" + "/send-otp";
const verifyOtpURL = process.env.EXPO_PUBLIC_API_URL + "/validate-otp";
//const verifyOtpURL = "http://127.0.0.1:8000" + "/validate-otp";

// Add this function to handle uploading photo to S3
const uploadPhotoToS3 = async (photoData) => {
  try {
    const result = await Storage.put("profilePhoto.jpg", photoData, {
      level: "public",
    });
    return result.key; // Return the S3 key for the uploaded photo
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
};

const _loginUser = (email, password) => {
  return fetch(loginURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      try {
        let token = JSON.parse(data.body).session_token;
        if (token) {
          return { statusCode: data.statusCode, sessionToken: token };
        }
        // return { statusCode: data.statusCode, sessionToken: token };
      } catch {}
      return { statusCode: data.statusCode };
    })
    .catch((error) => {
      return { statusCode: 400 };
    });
};

const _logoutUser = (email) => {
  //TODO: get token from db based on email
  const token = "xxx";

  return fetch(logoutURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      token: token,
    }),
  })
    .then((response) => {
      return { response: response.text(), status: response.status };
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.log(error);
      return 400;
    });
};
const _forgotPassword = (email) => {
  return fetch(forgetpasswordURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((response) => {
      return { response: response.text(), status: response.status };
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.log(error);
      return 400;
    });
};

const _resetPassword = (email, otp, newPassword) => {
  return fetch(resetpasswordURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      otp: otp,
      new_password: newPassword,
    }),
  })
    .then((response) => {
      return { response: response.text(), status: response.status };
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.log(error);
      return 400;
    });
};

const _registerUser = (username, email, password) => {
  return fetch(registerURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  })
    .then((response) => {
      return { response: response.text(), status: response.status };
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.log(error);
      return 400;
    });
};
// const _putAdditionalUserData = async (
//   email,
//   photo,
//   countryOfResidence,
//   jobTitle
// ) => {
//   try {
//     let photoUrl = null;
//     if (photo) {
//       // Upload photo to S3 if available
//       photoUrl = await uploadPhotoToS3(photo);
//     }

//     // Send request to store user data in the database
//     const response = await fetch(extraDataURL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         photo_url: photoUrl,
//         country: countryOfResidence,
//         job: jobTitle,
//       }),
//     });
//     return response.status; // Return the status code
//   } catch (error) {
//     console.log(error);
//     return 400;
//   }
// };

// const _putAdditionalUserData = (email, photo, countryOfResidence, jobTitle) => {
//   return fetch(extraDataURL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       photo_data: photo ? photo : null,
//       country: countryOfResidence ? countryOfResidence : null,
//       job: jobTitle ? jobTitle : null,
//     }),
//   })
//     .then((response) => {
//       return { response: response.text(), status: response.status };
//     })
//     .then((response) => {
//       return response.status;
//     })
//     .catch((error) => {
//       console.log(error);
//       return 400;
//     });
// };

// const _putAdditionalUserData = async (
//   email,
//   photoData,
//   countryOfResidence,
//   jobTitle,

// ) => {
//   const extraDataURL = `http://127.0.0.1:8000/user/putExtra?email=${encodeURIComponent(
//     email
//   )}&country=${encodeURIComponent(countryOfResidence)}&job=${encodeURIComponent(
//     jobTitle
//   )}`;

//   // Create a new File object with the photo data
//   const photoFile = new File([photoData], "photo.png", { type: "image/png" });

//   const formData = new FormData();
//   formData.append("photo", photoFile);

//   try {
//     const response = await fetch(extraDataURL, {
//       method: "POST",
//       body: formData,
//     });

//     return {
//       response: await response.text(),
//       status: response.status,
//     };
//   } catch (error) {
//     console.error(error);
//     return 400;
//   }
// };

const _putAdditionalUserData = (
  email = null,
  photoData = null,
  countryOfResidence = null,
  jobTitle = null,
  linkedin = null
) => {

  // Create a new File object with the photo data
//  const photoFile = new File([photoData], "photo", { type: "image/*" });
//
//  const formData = new FormData();
//  formData.append("email", email);
//  formData.append("country", countryOfResidence);
//  formData.append("job", jobTitle);
//  formData.append("linkedin", linkedin);
//  formData.append("photo", photoFile);

  return fetch(extraDataURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "country": countryOfResidence,
      "job": jobTitle,
      "photo": photoData,
      "linkedin": linkedin
    })
  })
    .then((response) => {
      return { response: response.text(), status: response.status };
    })
    .catch((error) => {
      console.log(error);
      return 400;
    });

//  try {
//    const response = await fetch(extraDataURL, {
//      method: "POST",
//      body: formData,
//    });
//
//    return {
//      response: await response.text(),
//      status: response.status,
//    };
//  } catch (error) {
//    console.error("error occurred");
//    return 400;
//  }
};

const _getUserData = (email) => {
  return fetch(getUserDataURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((response) => {
      return { response: response.json(), status: response.status };
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
    });
};

const _putUserPreferences = (email, dates, countries) => {
  console.log(putPreferencesURL);
  return fetch(putPreferencesURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      dates: dates,
      countries: countries,
    }),
  })
    .then((response) => {
      return { response: response.text(), status: response.status };
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.log(error);
      return 400;
    });
};

const _getUserPreferences = (email) => {
  return fetch(getPreferencesURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((response) => {
      return { response: response.json(), status: response.status };
    })
    .then((response) => {
      return response.response;
    })
    .catch((error) => {
      console.log(error);
      return 400;
    });
};

const _sendOtpMessage = (email, username) => {
  return fetch(sendOtpURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
    }),
  })
    .then((response) => {
      return { response: response.json(), status: response.status };
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.log(error);
      return 400;
    });
};

const _verifyOtpMessage = (email, otp) => {
  return fetch(verifyOtpURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      otp: otp,
    }),
  })
    .then((response) => {
      return { response: response.json(), status: response.status };
    })
    .then((response) => {
      return response.status;
    })
    .catch((error) => {
      console.log(error);
      return 400;
    });
};

const fetchMembers = async () => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/fetch_group_members?trip_id=${trip.trip_id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data = await response.json();
    setMembers(data.group_members);
  } catch (error) {
    console.error("Error fetching group members:", error);
  }
};

export default UserService = {
  loginUser: _loginUser,
  logoutUser: _logoutUser,
  forgotpassword: _forgotPassword,
  resetpassword: _resetPassword,

  registerUser: _registerUser,
  putExtraData: _putAdditionalUserData,
  getUserData: _getUserData,
  putUserPref: _putUserPreferences,
  getUserPref: _getUserPreferences,

  sendOtp: _sendOtpMessage,
  verifyOtp: _verifyOtpMessage,
  fetchMembers: fetchMembers,
};
