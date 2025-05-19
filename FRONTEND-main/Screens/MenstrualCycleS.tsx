import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import RoundRadioButtons from './RoundRadioButtons';
import CustomButton from './CustomButton';
import MyCalendar from './MyCalendar';
import { useStep } from './StepContext';


const MenstrualCycleS = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [period, setPeriod] = useState('');
  const [pregnancy, setPregnancy] = useState('');
  const [startDate, setStartDate] = useState<string>('');

  // Handle date change from MyCalendar
  const handleDateChange = (date: string) => {
    console.log("Selected Start Date: ", date); // Here, date is a string in the format 'YYYY-MM-DD'
    setStartDate(date);
  };

  // Check if the submit button should be disabled
  const isSubmitDisabled = !(period && 
    ((period === 'Yes' && startDate) || (period === 'No' && pregnancy))
  );

  const { setStepValue, stepNb, setStepNb } = useStep();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
            <Image source={require("./Loginpics/vector.png")} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.purpleText}>Menstrual Cycle</Text>
        </View>

        {/* Period Selection */}
        <View style={styles.section}>
          <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <Text style={styles.blackText}>Are you on your</Text>
            <Text style={styles.blackText}>period?</Text>
          </View>
          <RoundRadioButtons
            options={['Yes', 'No']}
            selectedOption={period}
            onSelect={(option) => setPeriod(option)}
          />
        </View>

        {/* Conditionally render calendar if period is "Yes" */}
        {period === 'Yes' && (
          <View style={styles.section}>
            <Text style={styles.blackText}>Enter Start Date</Text>
            <View style={styles.calendarContainer}>
              <MyCalendar onDateSelect={handleDateChange} />
            </View>
          </View>
        )}

        {/* Conditionally render pregnancy question if period is "No" */}
        {period === 'No' && (
          <View style={styles.section}>
            <Text style={styles.blackText}>Are you pregnant?</Text>
            <RoundRadioButtons
              options={['Yes', 'No']}
              selectedOption={pregnancy}
              onSelect={(option) => setPregnancy(option)}
            />
          </View>
        )}

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <CustomButton 
            text="Submit" 
           onPress={() => {
              setStepValue('menstrualCycle', true);  // <-- set context here
              navigation.navigate('Step7');
              setStepNb(stepNb + 1);  // Increment stepNb here
            }}
            disabled={isSubmitDisabled} // Disable the button based on the conditions
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  purpleText: {
    fontSize: 30,
    color: '#6B2A88',
    fontWeight: '600',
  },
  image: {
    position: 'absolute',
    right: 40,
  },
  blackText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 25,
    textAlign: 'center',
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 40,
    marginTop: 40,
  },
  calendarContainer: {
    height: 420,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '70%',
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default MenstrualCycleS;
