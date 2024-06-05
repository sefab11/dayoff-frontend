// const getMsgURL = process.env.EXPO_PUBLIC_API_URL + "/messaging/retrieve";
// const getMsgURL = "http://127.0.0.1:8000" + "/messaging/retrieve";
// // const sendMsgURL = process.env.EXPO_PUBLIC_API_URL + "/messaging/send";
// const sendMsgURL = "http://127.0.0.1:8000" + "/messaging/send";

const API_URL = "http://0.0.0.0:8000";
// const API_URL = "http://127.0.0.1:8000";
// const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://0.0.0.0:8000";
// const API_URL =
//   process.env.EXPO_PUBLIC_API_URL ||
//   "https://6218-143-58-193-134.ngrok-free.app";

const getMsgURL = `${API_URL}/messaging/retrieve`;
const sendMsgURL = `${API_URL}/messaging/send`;

const _getMessages = (tripID) => {
  return fetch(getMsgURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trip_id: tripID,
    }),
  })
    .then((response) => {
      return { response: response.json(), status: response.status };
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
    });
};

const _sendMessage = (tripID, userEmail, msg) => {
  console.log(tripID + userEmail + msg);

  return fetch(sendMsgURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trip_id: tripID,
      user_email: userEmail,
      message: msg,
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

export default MessageService = {
  getMessages: _getMessages,
  sendMessage: _sendMessage,
};
