import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import MyCalendar from './MyCalendar';
import Seizure from './Seziure';
import Bottombar from './Bottombar';

const Login1 = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <MyCalendar onDateSelect={(date) => console.log('Selected date:', date)} />

        <View style={styles.seizureContainer}>
          <Seizure />
        </View>
      </ScrollView>

      <View style={styles.bottomBarWrapper}>
        <Bottombar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 5,
    paddingBottom: 100, // Give enough bottom padding so content won't be hidden under bottom bar
    alignItems: 'center',
  },
  seizureContainer: {
    width: '100%',
    alignItems: 'center',
  },
  bottomBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 15 : 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
});

export default Login1;
