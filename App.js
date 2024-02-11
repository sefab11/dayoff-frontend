import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FinishProfile, RegisterScreen, WelcomeScreen, VerificationScreen , GetMatchedScreen, HomeScreen, CreateTripScreen, MyProfileScreen, TripsScreen, MyCreatedTripsScreen, EditTripScreen, VerifyEmailScreen, GroupInfoScreen} from './src/screens';
import { useFonts } from 'expo-font';
import ChatScreen from './src/screens/ChatScreen';
import { SessionContextProvider } from './src/contexts/SessionContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  //for disabling the warning signs that show up, so that the user doesn't see warnings
  //LogBox.ignoreAllLogs();

  return (
    <SessionContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="FinishProfile" component={FinishProfile}/>
          <Stack.Screen name="GetMatched" component={GetMatchedScreen}/>
          <Stack.Screen name="MyProfile" component={MyProfileScreen}/>
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
          <Stack.Screen name="Trips" component={TripsScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
          <Stack.Screen name="MyCreatedTrips" component={MyCreatedTripsScreen} />
          <Stack.Screen name="EditTrip" component={EditTripScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
