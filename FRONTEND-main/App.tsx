import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
enableScreens();

// 👉 Import the StepProvider
import { StepProvider } from './Screens/StepContext';

// Import screens
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import Step7 from './Screens/Step7';
import Signup3 from './Screens/Signup3';
import Login1 from './Screens/Login1';
import MedicationAdherenceS from './Screens/MedicationAdherenceS';
import MenstrualCycleS from './Screens/MenstrualCycleS';
import PhysicalActivityS from './Screens/PhysicalActivityS';
import FoodandDietS from './Screens/FoodandDietS';
import AlcoholAndSubstance from './Screens/AlcoholAndSubstance';
import SeizureTrackingS from './Screens/SeizureTracking';
import MentalHealth from './Screens/MentalHealth';
import Seizure from './Screens/Seziure';
import YesSeizure from './Screens/YesSeizure';
import Signuptwo from './Screens/Signuptwo';
import EditProfileScreen from './Screens/EditProfileScreen';
import MyProfileScreen from './Screens/MyProfileScreen';
import SettingsScreen from './Screens/SettingsScreen';
import ProfileScreen from './Screens/ProfileScreen';
const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  useEffect(() => {
      const setupNotification = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission not granted for notifications');
          return;
        }
  
  
        await Notifications.cancelAllScheduledNotificationsAsync();
  
        const now = new Date();
        const targetTime = new Date();
        targetTime.setHours(20, 0, 0, 0); 
  
        if (now >= targetTime) {
          targetTime.setDate(targetTime.getDate() + 1);
        }
  
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '⏰ Daily Reminder',
            body: 'Stay consistent. Tap to check in for today.',
          },
          trigger: targetTime as unknown as Notifications.NotificationTriggerInput,      
        });
  
  
      };
  
      setupNotification();
    }, []);
  
  return (
    <SafeAreaProvider>
      <StepProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />

                                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />


                        <Stack.Screen name="Login1" component={Login1} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="AlcoholAndSubstance" component={AlcoholAndSubstance} />
            <Stack.Screen name="Step7" component={Step7} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="FoodandDietS" component={FoodandDietS} />
            <Stack.Screen name="Signup3" component={Signup3} />
            <Stack.Screen name="Signuptwo" component={Signuptwo} />
            <Stack.Screen name="MenstrualCycleS" component={MenstrualCycleS} />
            <Stack.Screen name="YesSeizure" component={YesSeizure} />
            <Stack.Screen name="PhysicalActivityS" component={PhysicalActivityS} />
            <Stack.Screen name="MedicationAdherenceS" component={MedicationAdherenceS} />
            <Stack.Screen name="MentalHealth" component={MentalHealth} />
            <Stack.Screen name="Seizure" component={Seizure} />
            <Stack.Screen name="SeizureTrackingS" component={SeizureTrackingS} />
          </Stack.Navigator>
        </NavigationContainer>
      </StepProvider>
    </SafeAreaProvider>
  );
}

