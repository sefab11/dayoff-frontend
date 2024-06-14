import { Platform } from 'react-native';
import { NotificationList } from './NotificationList';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      // console.log(`Current token is ${token}`);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    // For development
    // alert('Must use physical device for Push Notifications');
  }

  return token;
}

export async function schedulePushNotification(state) {
  let messageObject;

  switch (state) {
    case "MAIL":
      messageObject = NotificationList[0]
    break;
    case "JOINED_TRIP":
      messageObject = NotificationList[1]
    break;
    case "MATCHING_TRIP":
      messageObject = NotificationList[2]
    break;
  }
    
  await Notifications.scheduleNotificationAsync(messageObject);
}

export async function storeToken() {
  global.expoPushToken = await Notifications.getExpoPushTokenAsync();
  const ENDPOINT = process.env.EXPO_PUBLIC_API_URL + '/store-current-token'
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ expoPushToken })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json(); 
    console.log('Token stored')
  } catch (error) {
    console.error(`Error storing the token`)
  }
  
}

export async function getRecipientToken(){
  const ENDPOINT = process.env.EXPO_PUBLIC_API_URL + '/get-user-token'
  try {
    const response = await fetch(ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Assuming the token is in the 'expoPushToken' field
    const userToken = data.expoPushToken;
    return userToken;
  } catch (error) {
    console.error('Error fetching user token:', error);
  }
}
