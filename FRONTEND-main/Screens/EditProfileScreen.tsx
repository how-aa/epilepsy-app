// /screens/EditProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialUserData = {
  fullName: 'John Doe',
  email: 'johndoe@example.com',
  mobileNumber: '70123456',
  countryCode: '+961',
  birthDate: '01/01/2000',
  gender: 'Female',
  seizureType: 'Generalized',
  menstrualStatus: 'Regular',
  medicationList: '',
};

const EditProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = Dimensions.get('window');

  const [fullName, setFullName] = useState(initialUserData.fullName);
  const [email, setEmail] = useState(initialUserData.email);
  const [mobileNumber, setMobileNumber] = useState(initialUserData.mobileNumber);
  const [countryCode, setCountryCode] = useState(initialUserData.countryCode);
  const [birthDate, setBirthDate] = useState(initialUserData.birthDate);
  const [gender, setGender] = useState(initialUserData.gender);
  const [seizureType, setSeizureType] = useState(initialUserData.seizureType);
  const [menstrualStatus, setMenstrualStatus] = useState(initialUserData.menstrualStatus);
  const [medicationList, setMedicationList] = useState(initialUserData.medicationList);

  const [flagDropdownVisible, setFlagDropdownVisible] = useState(false);
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [seizureDropdownVisible, setSeizureDropdownVisible] = useState(false);
  const [menstrualDropdownVisible, setMenstrualDropdownVisible] = useState(false);

  const countryFlags = [
    { code: '+961', name: 'Lebanon', image: require('./ProfileScreenpics/lebanon-flag.png') },
    { code: '+1', name: 'USA', image: require('./ProfileScreenpics/usa-flag.png') },
    { code: '+44', name: 'UK', image: require('./ProfileScreenpics/uk-flag.png') },
  ];
  const genders = ['Female', 'Male', 'Other', 'Prefer not to say'];
  const seizureTypes = [
    'Focal with loss of awareness',
    'Focal without loss of awareness',
    'Generalized',
    'Non-epileptic',
  ];
  const menstrualStatuses = ['Regular', 'Irregular', 'Menopause'];

  const handleSaveChanges = () => {
    navigation.navigate('MyProfileScreen' as never);
  };

  const renderDropdown = (
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    options: string[],
    onSelect: (item: string) => void
  ) => (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setVisible(false)}
        activeOpacity={1}
      >
        <View style={styles.dropdownContainer}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  setVisible(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderFlagDropdown = () => (
    <Modal visible={flagDropdownVisible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setFlagDropdownVisible(false)}
        activeOpacity={1}
      >
        <View style={styles.dropdownContainer}>
          {countryFlags.map((item) => (
            <TouchableOpacity
              key={item.code}
              onPress={() => {
                setCountryCode(item.code);
                setFlagDropdownVisible(false);
              }}
              style={styles.flagItem}
            >
              <Image source={item.image} style={styles.flagImage} />
              <Text style={styles.dropdownText}>{item.name} ({item.code})</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('MyProfileScreen' as never)}>
            <Image source={require('./ProfileScreenpics/back-arrow.png')} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Edit Profile</Text>
        </View>

        {/* Full Name */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.inputText} value={fullName} onChangeText={setFullName} />
        </View>

        {/* Email */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Mobile + Flag */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.rowInput}>
            <TouchableOpacity onPress={() => setFlagDropdownVisible(true)}>
              <Image source={require('./ProfileScreenpics/lebanon-flag.png')} style={styles.flagImage} />
            </TouchableOpacity>
            <Text style={styles.countryCode}>{countryCode}</Text>
            <TextInput
              style={[styles.inputText, { flex: 1 }]}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Date of Birth & Gender */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.smallInputBox}
            onPress={() => { }}
          >
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.inputText}>{birthDate}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallInputBox}
            onPress={() => setGenderDropdownVisible(true)}
          >
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.inputText}>{gender}</Text>
          </TouchableOpacity>
        </View>

        {/* Seizure Type & Menstrual Status */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.smallInputBox}
            onPress={() => setSeizureDropdownVisible(true)}
          >
            <Text style={styles.label}>Type of Seizure</Text>
            <Text style={styles.inputText}>{seizureType}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallInputBox}
            onPress={() => setMenstrualDropdownVisible(true)}
          >
            <Text style={styles.label}>Menstrual Status</Text>
            <Text style={styles.inputText}>{menstrualStatus}</Text>
          </TouchableOpacity>
        </View>

        {/* Medication List */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Medication List</Text>
          <TextInput
            style={[styles.inputText, { minHeight: 60 }]}
            value={medicationList}
            onChangeText={setMedicationList}
            multiline
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        {/* Dropdown Modals */}
        {renderFlagDropdown()}
        {renderDropdown(genderDropdownVisible, setGenderDropdownVisible, genders, setGender)}
        {renderDropdown(seizureDropdownVisible, setSeizureDropdownVisible, seizureTypes, setSeizureType)}
        {renderDropdown(menstrualDropdownVisible, setMenstrualDropdownVisible, menstrualStatuses, setMenstrualStatus)}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  screenTitle: {
    fontSize: 20,
    color: '#6B298A',
    fontWeight: 'bold',
  },
  inputBox: {
    backgroundColor: '#F4DBFF',
    borderColor: '#6B2A88',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  label: {
    color: '#B766DA',
    fontSize: 12,
    marginBottom: 4,
  },
  inputText: {
    color: '#4B5563',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 15,
  },
  smallInputBox: {
    flex: 1,
    backgroundColor: '#F4DBFF',
    borderColor: '#6B2A88',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  rowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#6B2A88',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F4DBFF',
  },
  countryCode: {
    marginHorizontal: 8,
    color: '#4B5563',
    fontSize: 16,
  },
  flagImage: {
    width: 32,
    height: 20,
    resizeMode: 'contain',
  },
  saveButton: {
    backgroundColor: '#692985',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    maxHeight: '60%',
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  flagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
