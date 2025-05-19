import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import Bottombar from './Bottombar';
import Dropdownlong from './Dropdownlong';
import SearchComponent from './SearchComponent';
import Get_Started from './Get_started';
 
type Signup3RouteProp = RouteProp<{ Signup3: { gender?: string; [key: string]: any } }, 'Signup3'>;
 
type MedicationEntry = {
  medication: string;
  frequency: string;
  dose: string;
};
 
const Signup3 = () => {
  const route = useRoute<Signup3RouteProp>();
  const navigation = useNavigation<AuthNavigationProp>();
 
  const gender = route?.params?.gender ?? '1';
 
  const [period, setPeriod] = useState('');
  // Changed to array of MedicationEntry objects
  const [selectedOptions, setSelectedOptions] = useState<MedicationEntry[]>([]);
  // Controlled inputs for frequency and dose when adding a medication
  const [inputFrequency, setInputFrequency] = useState('');
  const [inputDose, setInputDose] = useState('');
  const [currentMedication, setCurrentMedication] = useState('');
  const [isMedicationSelected, setIsMedicationSelected] = useState(false);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    console.log('Live state:', {
      gender,
      selectedOptions,
      period: gender !== 'Male' ? period : null,
      previousParams: route.params,
    });
  }, [gender, selectedOptions, period, route.params]);
 
  // Accepts a single medication string from SearchComponent selection
  const handleMedicationSelection = (newMedications: string[]) => {
    // For simplicity, handle only the first selected medication if multiple sent
    const med = newMedications[0];
    setCurrentMedication(med);
    // Reset inputs for frequency and dose when selecting a new medication
    setInputFrequency('');
    setInputDose('');
  };
 
  // Called when user confirms adding medication with freq & dose
  const addMedication = () => {
    if (!currentMedication) return;
    if (!inputFrequency.trim()) return alert('Please enter frequency');
    if (!inputDose.trim()) return alert('Please enter dose');
 
    setSelectedOptions((prev) => {
      // Remove old entry with the same medication if exists
      const filtered = prev.filter((m) => m.medication !== currentMedication);
      return [
        ...filtered,
        {
          medication: currentMedication,
          frequency: inputFrequency.trim(),
          dose: inputDose.trim(),
        },
      ];
    });
 
    setCurrentMedication('');
    setInputFrequency('');
    setInputDose('');
    setIsMedicationSelected(true);
  };
 
  const removeMedication = (medToRemove: string) => {
    setSelectedOptions((prev) => {
      const filtered = prev.filter((med) => med.medication !== medToRemove);
      if (filtered.length === 0) setIsMedicationSelected(false);
      return filtered;
    });
  };
 
const handleGetStarted = async () => {
  alert('Get Started pressed');
 
  if (selectedOptions.length === 0) {
    alert('Please add at least one medication');
    return;
  }
 
  if (gender !== 'Male' && !period) {
    alert('Please select menstrual cycle status');
    return;
  }
 
  // Flatten all params from previous screens
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    date_of_birth,
    gender: genderFromParams,
    seizureTypes,
  } = route.params;

  // Map medications as before
  const medicationEnum = [
    "Acetazolamide 250 mg",
    "Alprazolam 2 mg",
    "Amantadine 100 mg",
    "Amitriptyline 25 mg",
    "Aripiprazole 10 mg",
    "Asenapine 10 mg",
    "Atomoxetine 10 mg",
    "Baclofen 10 mg",
    "Benztropine 1 mg",
    "Bupropion 100 mg",
    "Buspirone 10 mg",
    "Carbamazepine 200 mg",
    "Clonazepam 0.5 mg",
    "Clonidine 0.1 mg",
    "Desvenlafaxine 50 mg",
    "Dextroamphetamine 5 mg",
    "Diazepam 5 mg",
    "Divalproex Sodium 250 mg",
    "Doxepin 10 mg",
    "Escitalopram 10 mg",
    "Eszopiclone 3 mg",
    "Gabapentin 100 mg",
    "Haloperidol 5 mg",
    "Hydroxyzine 25 mg",
    "Lacosamide 100 mg",
    "Lamotrigine 100 mg",
    "Levetiracetam 500 mg",
    "Lithium Carbonate 300 mg",
    "Lurasidone 40 mg",
    "Memantine 10 mg",
    "Methocarbamol 500 mg",
    "Mirtazapine 15 mg",
    "Modafinil 100 mg",
    "Nortriptyline 10 mg",
    "Olanzapine 10 mg",
    "Paroxetine 20 mg",
    "Pregabalin 75 mg",
    "Quetiapine 100 mg",
    "Risperidone 2 mg",
    "Sertraline 50 mg",
    "Topiramate 50 mg",
    "Tramadol 50 mg",
    "Venlafaxine 75 mg",
    "Zonisamide 100 mg",
    "Other"
  ];
  const mappedMedications = selectedOptions.map(opt => {
    if (medicationEnum.includes(opt.medication)) {
      return {
        medication: opt.medication,
        dose: opt.dose,
        frequency: opt.frequency
      };
    } else {
      return {
        medication: "Other",
        other_medication_name: opt.medication,
        dose: opt.dose,
        frequency: opt.frequency
      };
    }
  });

  const dataToSend = {
    first_name,
    last_name,
    email,
    password,
    phone,
    gender: gender || genderFromParams,
    date_of_birth,
    seizureTypes: Array.isArray(seizureTypes) ? seizureTypes[0] : seizureTypes,
    medication: mappedMedications,
    menstrualCycleStatus: gender !== 'Male' ? period : undefined,
  };
 
  alert('Sending data: ' + JSON.stringify(dataToSend, null, 2));
 
  try {
    setLoading(true);
    const response = await fetch('http://192.168.1.119:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
 
    const rawText = await response.text();
    alert(`Raw response: ${rawText}`);
 
    let responseData;
    try {
      responseData = JSON.parse(rawText);
    } catch (error: unknown) {
  console.error('Error submitting data:', error);
 
  let message = 'Something went wrong';
 
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    message = (error as any).message;
  }
 
  alert(`Error: ${message}`);
}
 
 
    if (!response.ok) {
      const errorMessage = responseData.message || `Server responded with ${response.status}`;
      alert(`Error: ${errorMessage}`);
      throw new Error(errorMessage);
    }
 
    alert(responseData.message || 'Registration successful!');
    navigation.navigate('Login1');
  } catch (error: any) {
    console.error('Error submitting data:', error);
    alert(`Error caught: ${error.message}`);
  } finally {
    setLoading(false);
  }
};
 
  const isFormValid = () => {
  if (selectedOptions.length === 0) return false;
  if (gender !== 'Male' && !period) return false;
  return true;
};
 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.topView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('./Signuppics/vector.png')}
                style={{ position: 'relative', right: 80 }}
              />
            </TouchableOpacity>
            <Text style={styles.text}>New Account</Text>
          </View>
 
          <View style={styles.bar}>
            <Image source={require('./Signuppics/two.png')} />
            <Image source={require('./Signuppics/linef.png')} />
            <Image source={require('./Signup2pics/two.png')} />
            <Image source={require('./Signuppics/linef.png')} />
            <Image source={require('./Signup3pics/three.png')} />
          </View>
 
          <View style={styles.middlecontainer}>
            <Text style={styles.blacktext}>Name of Medication</Text>
            <View style={styles.dropdownRow}>
              <SearchComponent
                setSelectedOptions={handleMedicationSelection}
                setSelectedDataOutside={(data) => {
  setSelectedOptions(data); // 👈 update state with full list
}}
 
              />
            </View>
 
            {gender !== 'Male' && (
              <View style={styles.dropdownSection}>
                <Text style={styles.blacktext}>Menstrual Cycle Status</Text>
                <Dropdownlong
                  placeholder="Choose Type"
                  options={[
                    { key: 'Regular', value: 'Regular' },
                    { key: 'Irregular', value: 'Irregular' },
                    { key: 'Menopause', value: 'Menopause' },
                  ]}
                  setSelected={setPeriod}
                />
              </View>
            )}
 
            {/* Show selected medications with frequency and dose */}
            {isMedicationSelected && selectedOptions.length > 0 && (
              <View style={styles.selectedInfoContainer}>
                <Text style={styles.selectedText}>Selected Medications:</Text>
                {selectedOptions.map(({ medication, frequency, dose }, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
                  >
                    <Text style={styles.medicationText}>
                      {medication} - {dose} - {frequency}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeMedication(medication)}
                      style={{ marginLeft: 10 }}
                    >
                      <Text style={{ color: 'red' }}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
 
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleGetStarted}
                style={{ width: '100%', alignItems: 'center' }}
                disabled={loading}
              >
           
              </TouchableOpacity>
 
             
            </View>
            <View style={styles.buttonContainer}>
  <TouchableOpacity
    onPress={handleGetStarted}
    disabled={!isFormValid() || loading}
    style={[
      styles.purpleButton,
      {
        backgroundColor: isFormValid() && !loading ? '#6B2A88' : '#ccc',
      },
    ]}
  >
    {loading ? (
      <ActivityIndicator color="white" />
    ) : (
      <Text style={styles.buttonText}>Get Started</Text>
    )}
  </TouchableOpacity>
</View>
 
          </View>
        </ScrollView>
 
        <View style={styles.bottomBarContainer}>
          <Bottombar />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
 
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
    alignItems: 'center',
  },
  blacktext: {
    fontSize: 27,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
  },
  middlecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    gap: 10,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    color: '#6B2A88',
    fontWeight: '600',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    marginBottom: 0,
  },
  dropdownRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  dropdownSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },
  selectedInfoContainer: {
    marginTop: 30,
    width: '90%',
    backgroundColor: '#EABAFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B2A88',
  },
  medicationText: {
    fontSize: 18,
    color: '#6B2A88',
  },
  buttonContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#6B2A88',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#6B2A88',
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  purpleButton: {
  width: '90%',
  paddingVertical: 15,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
},
buttonText: {
  color: 'white',
  fontSize: 18,
  fontWeight: '600',
},
 
});
 
export default Signup3;