import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';
import Bottombar from './Bottombar';
import { useStep } from './StepContext';

const { width, height } = Dimensions.get('window');

const stepData = [
  { image: require('./Stepspics/Step0.png'), text: 'Daily Health Tracker' },
  { image: require('./Stepspics/Step1.png'), text: 'Daily Health Tracker' },
  { image: require('./Stepspics/Step2.png'), text: 'Daily Health Tracker' },
  { image: require('./Stepspics/Step3.png'), text: 'Daily Health Tracker' },
  { image: require('./Stepspics/Step4.png'), text: 'Daily Health Tracker' },
  { image: require('./Stepspics/Step5.png'), text: 'Daily Health Tracker' },
  { image: require('./Stepspics/Step6.png'), text: 'Daily Health Tracker' },
  { image: require('./Stepspics/Step7.png'), text: 'Daily Health Tracker' },
];

const Step7 = () => {
  const navigation = useNavigation();
  const {
    sleepFatigue,
    medicationAdherence,
    mentalHealth,
    alcoholSubstanceUse,
    physicalActivity,
    foodDiet,
    menstrualCycle,
    stepNb,
  } = useStep();

  // fallback if stepNb is out of range
 const maxIndex = stepData.length - 1; // 7
const currentStep = stepData[maxIndex - stepNb] || stepData[0];



  // count completed logs dynamically
  const completedCount = [
    sleepFatigue,
    medicationAdherence,
    mentalHealth,
    alcoholSubstanceUse,
    physicalActivity,
    foodDiet,
    menstrualCycle,
  ].filter(Boolean).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.logText}>
            You’ve completed <Text style={styles.completedText}>{completedCount}/7</Text> logs today
          </Text>
          <Image source={currentStep.image} style={styles.stepImage} />
          <Text style={styles.title}>{currentStep.text}</Text>
        </View>

        {/* Your Icons grid remains the same */}

        <View style={styles.row}>
          <Icons
            text1="Sleep"
            text2="and Fatigue"
            imageSource={require('./Iconpics/bed.png')}
            destination="MentalHealth"
            filled={sleepFatigue}
          />
          <Icons
            text1="Medication"
            text2="Adherence"
            imageSource={require('./Iconpics/medication.png')}
            destination="MedicationAdherenceS"
            filled={medicationAdherence}
          />
        </View>

        <View style={styles.row}>
          <Icons
            text1="Mental"
            text2="Health"
            imageSource={require('./Iconpics/smily.png')}
            destination="MentalHealth"
            filled={mentalHealth}
          />
          <Icons
            text1="Alcohol &"
            text2="Substance Use"
            imageSource={require('./Iconpics/alcohol.png')}
            destination="AlcoholAndSubstance"
            filled={alcoholSubstanceUse}
          />
        </View>

        <View style={styles.row}>
          <Icons
            text1="Physical"
            text2="Activity"
            imageSource={require('./Iconpics/sport.png')}
            destination="PhysicalActivityS"
            filled={physicalActivity}
          />
          <Icons
            text1="Food"
            text2="and Diet"
            imageSource={require('./Iconpics/food.png')}
            destination="FoodandDietS"
            filled={foodDiet}
          />
        </View>

        <View style={[styles.row, { flexWrap: 'wrap' }]}>
          <Icons
            text1="Menstrual"
            text2="Cycle"
            imageSource={require('./Iconpics/pregnancy.png')}
            destination="MenstrualCycleS"
            filled={menstrualCycle}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <Bottombar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    gap: height * 0.02,
    paddingBottom: height * 0.05,
    backgroundColor: 'white',
  },
  logText: {
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    fontSize: width * 0.05,
  },
  completedText: {
    color: '#6B2A88',
  },
  stepImage: {
    width: width * 0.7,
    height: height * 0.05,
    marginBottom: height * 0.02,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: '600',
    color: '#6B2A88',
    fontSize: width * 0.06,
    marginTop: height * 0.02,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  bottomSpacing: {
    height: height * 0.1,
  },
});

export default Step7;
