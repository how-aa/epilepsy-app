import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import MyCalendar from './MyCalendar';
import Bottombar from './Bottombar';

const { width } = Dimensions.get('window');

const LogYourDay = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [selectedDate, setSelectedDate] = useState<string>(''); // default empty

  return (
    <SafeAreaView style={styles.container}>
      <MyCalendar onDateSelect={(date) => {
        console.log("📆 LogYourDay selectedDate:", date);
        setSelectedDate(date);
      }} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Seizure', { selectedDate })}
        style={[styles.button, !selectedDate && styles.disabled]}
        disabled={!selectedDate}
      >
        <Text style={styles.buttonText}>Log your day</Text>
      </TouchableOpacity>

      <View style={{ marginHorizontal: 20 }}>
        <Bottombar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6B2A88',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  disabled: {
    backgroundColor: '#B0A0C3',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
    gap: 20,
  },
});

export default LogYourDay;
