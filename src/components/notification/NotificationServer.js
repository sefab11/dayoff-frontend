import * as BackgroundFetch from 'expo-background-fetch'; 
import * as TaskManager from 'expo-task-manager'
import { schedulePushNotification } from './PushNotifications';

// TASKS
const BACKGROUND_FETCH_TASK = 'background-fetch';
const CHECK_UPDATES = 'check-for-updates';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async ({data, error}) => {
  if (error) {
    console.log(`The err: ${error.message}`);
    return TaskManager.TaskManager.TaskFailed;
  }

  let result;

  if (cancelled) {
    // Trigger notification backend to other users
    let notificationObject = {
      sound: 'default', 
      title: 'Uh oh!', 
      body: 'Someone in your trip has cancelled'
    }
    
    result = await sendNotificationRequest(token, notificationObject);
  }

  return result ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
});

TaskManager.defineTask(CHECK_UPDATES, async ({data, error}) => {
  if (error) {
    console.log(`The err: ${error.message}`);
    return TaskManager.TaskManager.TaskFailed;
  }

  if (global.currentTrip) {
   // Trigger local notification
   await schedulePushNotification("MATCHING_TRIP")
  }
});

export async function registerBackgroundFetchAsync() {
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, 
    startOnBoot: true, 
  });

  await BackgroundFetch.registerTaskAsync(CHECK_UPDATES, {
    minimumInterval: (60 * 60) * 15, // 15 hours
    stopOnTerminate: false,
    startOnBoot: true, 
  });
}

// Used to send notifications to other users
export async function sendNotificationRequest(
  expoToken, 
  requestBody={sound: 'default', title:"You haven't been in for a while!"}
) {
  const EXPO_ENDPOINT = 'https://exp.host/--/api/v2/push/send';
  
  requestBody.to = expoToken;

  // Request Body format
  //     to: expoToken, 
  //     sound: 'default', 
  //     title: 'title', 
  //     body: 'body of the text',
  //     data: { someData: 'goes here' },

  // Call the FastAPI endpoint
  try {
    const response = await fetch(EXPO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();
    return result.detail === 'Notification sent successfully';
  } catch (error) {
    console.error(error);
    return false;
  }
}