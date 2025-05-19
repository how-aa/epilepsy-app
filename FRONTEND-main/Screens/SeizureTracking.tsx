import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthNavigationProp } from '../types';
import Dropdownlong from './Dropdownlong';
import Minutes from './minutes';
import RoundRadioButtons from './RoundRadioButtons';
import CheckboxWithLabel from './CheckboxWithLabel';
import CustomButton from './CustomButton';
import Hour from './hour';
import { useStep } from './StepContext';

const SeizureTrackingS = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { selectedDate } = useStep();
  console.log("📤 SeizureTrackingS using global selectedDate:", selectedDate);

  const [SeizureType, setSeizureType] = useState('');
  const [selected, setSelected] = useState('');
  const [fatigueChecked, setFatigueChecked] = useState(false);
  const [headacheChecked, setHeadacheChecked] = useState(false);
  const [confusionChecked, setConfusionChecked] = useState(false);
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(0);

  const otherInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (otherChecked && otherInputRef.current) {
      otherInputRef.current.focus();
    }
  }, [otherChecked]);

  const isFormValid =
    SeizureType !== '' &&
    selected !== '' &&
    (!otherChecked || (otherChecked && otherText.trim() !== ''));

  const submitSeizureLog = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in again.');
        return;
      }

      const payload = {
        seizure_day: selectedDate,
        seizure_type: SeizureType,
        seizure_duration: durationHours * 60 + durationMinutes,
        aura_symptoms: selected === 'Yes',
        postical_symptoms: [
          ...(fatigueChecked ? [{ name_symp: 'Fatigue' }] : []),
          ...(confusionChecked ? [{ name_symp: 'Confusion' }] : []),
          ...(headacheChecked ? [{ name_symp: 'Headache' }] : []),
          ...(otherChecked ? [{ name_symp: 'Other', other_symptoms: otherText }] : []),
        ],
      };

      console.log('📤 Submitting payload:', payload);

      const response = await fetch('http://192.168.1.119:5000/api/seizures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to log seizure');
      }

      const data = await response.json();
      console.log('✅ Seizure logged successfully:', data);
      navigation.navigate('YesSeizure');
    } catch (error) {
      console.error('❌ Error submitting seizure:', error);
      Alert.alert('Error', 'Failed to save seizure log.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
              <Image source={require('./Loginpics/vector.png')} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.purpleText}>Seizure Tracking</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Text style={styles.blackText}>Seizure Type</Text>
            <Dropdownlong
              placeholder="Select Type"
              options={[
                { key: 'Focal', value: 'Focal' },
                { key: 'Generalized Tonic Clonic', value: 'Generalized Tonic Clonic' },
                { key: 'Absence', value: 'Absence' },
                { key: 'Myoclonic', value: 'Myoclonic' },
                { key: 'Non-Epileptic', value: 'Non-Epileptic' },
              ]}
              setSelected={setSeizureType}
            />
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Text style={styles.blackText}>Seizure Duration</Text>
            <View style={styles.boxContainer}>
 
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 30 }}>
            <Text style={styles.blackText}>Aura Symptoms</Text>
            <RoundRadioButtons
              options={['Yes', 'No']}
              selectedOption={selected}
              onSelect={setSelected}
            />
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <Text style={styles.blackText}>Postical Symptoms</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
              <CheckboxWithLabel label="Fatigue" checked={fatigueChecked} onToggle={() => setFatigueChecked(!fatigueChecked)} />
              <CheckboxWithLabel label="Headache" checked={headacheChecked} onToggle={() => setHeadacheChecked(!headacheChecked)} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
              <CheckboxWithLabel label="Confusion" checked={confusionChecked} onToggle={() => setConfusionChecked(!confusionChecked)} />
              <CheckboxWithLabel label="Other" checked={otherChecked} onToggle={() => setOtherChecked(!otherChecked)} />
            </View>
            {otherChecked && (
              <TextInput
                ref={otherInputRef}
                style={{
                  borderWidth: 1,
                  borderColor: '#B766DA',
                  padding: 15,
                  borderRadius: 8,
                  width: '90%',
                  fontSize: 16,
                  backgroundColor: '#EABAFF',
                  color: 'white',
                }}
                placeholder="Enter..."
                placeholderTextColor="white"
                value={otherText}
                onChangeText={setOtherText}
              />
            )}
          </View>
        </View>

        <View style={{ width: '70%', justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
          <CustomButton text="Log Seizure" onPress={submitSeizureLog} disabled={!isFormValid} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 50,
  },
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
  },
  purpleText: {
    fontSize: 30,
    color: '#6B2A88',
    fontWeight: '600',
  },
  image: {
    position: 'relative',
    right: 45,
  },
  blackText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 25,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EABAFF',
    borderRadius: 20,
    padding: 15,
    width: '85%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
});

export default SeizureTrackingS;
