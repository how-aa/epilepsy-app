import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  Signuptwo: {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phone: string;
  };
  Signup3: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    phone: string;
    date_of_birth: string;
    gender: string;
    seizureTypes: string[];
  };
  Step7: undefined;
  YesSeizure: undefined;
  MenstrualCycleS: undefined;
  Login1: undefined;
  Seizure: { selectedDate: string };
  SeizureTrackingS: { selectedDate: string };
  NoSeizure: undefined;
  SettingsScreen: undefined;
  EditProfileScreen: undefined;
  MyProfileScreen: undefined;
};

// Navigation prop for useNavigation
export type AuthNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Route props for useRoute (optional helper types)
export type SeizureRouteProp = RouteProp<RootStackParamList, 'Seizure'>;
export type SeizureTrackingSRouteProp = RouteProp<RootStackParamList, 'SeizureTrackingS'>;
