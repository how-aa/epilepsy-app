import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; // Adjust path if needed

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { width } = useWindowDimensions();

  const userData = {
    fullName: 'John Doe',
    username: '@johndoe',
    email: 'johndoe@example.com',
    mobile: '+1234567890',
    dob: '01/01/1990',
    gender: 'Male',
    seizureType: 'Generalized',
    medicationList: '---',
    menstrualStatus: 'Pregnant',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>My Profile</Text>
          <View style={styles.arrowSpacer} />
        </View>

        {/* Profile Info Row */}
        <View style={styles.profileRow}>
          <Image
            source={require('./ProfileScreenpics/profile-placeholder.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View style={styles.nameSection}>
            <Text style={styles.fullName}>{userData.fullName}</Text>
            <Text style={styles.username}>{userData.username}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditProfileScreen' as never)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Thick Separator */}
        <View style={styles.separator} />

        {/* Info Fields */}
        <FieldRow label="Name" value={userData.fullName} />
        <ThinSeparator />
        <FieldRow label="Email" value={userData.email} />
        <ThinSeparator />
        <FieldRow label="Mobile Number" value={userData.mobile} />
        <ThinSeparator />
        <FieldRow label="Date of Birth" value={userData.dob} />
        <ThinSeparator />
        <FieldRow label="Gender" value={userData.gender} />
        <ThinSeparator />
        <FieldRow label="Type of Seizure" value={userData.seizureType} />
        <ThinSeparator />
        <FieldRow label="Medication List" value={userData.medicationList} />
        <ThinSeparator />
        <FieldRow label="Menstrual Status" value={userData.menstrualStatus} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable Field Row
const FieldRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.fieldRow}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldValue} numberOfLines={1} ellipsizeMode="tail">
      {value}
    </Text>
  </View>
);

// Thin separator
const ThinSeparator = () => <View style={styles.thinSeparator} />;

export default MyProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  backArrow: {
    fontSize: 28,
    color: '#6B2A88',
    fontWeight: 'bold',
  },
  pageTitle: {
    fontSize: 22,
    color: '#6B298A',
    fontWeight: 'bold',
  },
  arrowSpacer: {
    width: 28, // Matches size of back arrow for balance
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  nameSection: {
    flex: 1,
    marginLeft: 12,
  },
  fullName: {
    fontSize: 18,
    color: '#35014B',
    fontWeight: 'bold',
    flexShrink: 1,
  },
  username: {
    fontSize: 14,
    color: '#CA7FEB',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#692985',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  separator: {
    height: 2,
    backgroundColor: '#DEA6F7',
    marginVertical: 12,
  },
  thinSeparator: {
    height: 1,
    backgroundColor: '#DEA6F7',
    opacity: 0.3,
    marginVertical: 6,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  fieldLabel: {
    color: '#6B298A',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  fieldValue: {
    color: '#4B5563',
    fontSize: 15,
    flex: 1,
    textAlign: 'right',
  },
});