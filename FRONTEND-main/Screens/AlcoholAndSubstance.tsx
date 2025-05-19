import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import CustomButton from './CustomButton';
import RoundRadioButtons from './RoundRadioButtons';
import PlusIcon from './PlusIcon';
import AlcoholModal from './AlcoholModal';
import NarguilehModal from './NarguilehModal';
import SubstanceModal from './SubstanceModal';
import { useStep } from './StepContext';

type SubstanceEntry = {
  substance: string;
  quantity: number;
  drinkType: string; // For alcohol, this will be the unit ("glass" or "shot")
};

const AlcoholAndSubstance = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  const [alcohol, setAlcohol] = useState('');
  const [smoking, setSmoking] = useState('');
  const [narguileh, setNarguileh] = useState('');
  const [caffeine, setCaffeine] = useState('');
  const [energyDrinks, setEnergyDrinks] = useState('');
  const [recreationalDrugs, setRecreationalDrugs] = useState('');
  const { setStepValue, setStepNb, stepNb } = useStep(); 

  const [alcoholDetails, setAlcoholDetails] = useState<string[]>([]);
  const [smokingDetails, setSmokingDetails] = useState<string[]>([]);
  const [narguilehDetails, setNarguilehDetails] = useState<string[]>([]);
  const [caffeineDetails, setCaffeineDetails] = useState<string[]>([]);
  const [energyDrinksDetails, setEnergyDrinksDetails] = useState<string[]>([]);
  const [recreationalDrugsDetails, setRecreationalDrugsDetails] = useState<string[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalTitle2, setModalTitle2] = useState('');
  const [modalType, setModalType] = useState('');
  const [modalOptions, setModalOptions] = useState<{ key: string; value: string }[]>([]);

  const alcoholOptions = ['Wine', 'Beer', 'Vodka', 'Whiskey', 'Arak'];
  const nicotineOptions = ['Cigarettes', 'Vape', 'Nicotine Pouches'];
  const caffeineOptions = ['Espresso', 'Americano', 'Latte', 'Turkish Coffee'];
  const energyDrinkOptions = ['Red Bull', 'Monster', 'Other'];
  const narguilehOptions = ['Grape Mint', 'Double Apple', 'Watermelon', 'Other'];
  const recreationalDrugOptions = ['Cannabis', 'MDMA', 'LSD', 'Cocaine', 'Other'];
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    switch (modalType) {
      case 'Alcohol':
        setAlcoholDetails(prev => prev.filter((_, i) => i !== index));
        break;
      case 'Smoking':
        setSmokingDetails(prev => prev.filter((_, i) => i !== index));
        break;
      case 'Narguileh':
        setNarguilehDetails(prev => prev.filter((_, i) => i !== index));
        break;
      case 'Caffeine':
        setCaffeineDetails(prev => prev.filter((_, i) => i !== index));
        break;
      case 'Energy Drinks':
        setEnergyDrinksDetails(prev => prev.filter((_, i) => i !== index));
        break;
      case 'Recreational Drugs':
        setRecreationalDrugsDetails(prev => prev.filter((_, i) => i !== index));
        break;
      default:
        return;
    }
    setEditIndex(null);
    setModalTitle('Add New Substance');
    setModalTitle2('Enter Quantity');
    setIsModalVisible(true);
  };

  const openModal = (title: string, title2: string, type: string, options: string[]) => {
    setModalTitle(title);
    setModalTitle2(title2);
    setModalType(type);
    setModalOptions(options.map(option => ({ key: option, value: option })));
    setIsModalVisible(true);
  };

  const handleModalSelection = (selectedOption: SubstanceEntry) => {
    if (selectedOption.substance && selectedOption.quantity > 0 && selectedOption.drinkType) {
      const formatted = `${selectedOption.substance} | ${selectedOption.quantity} ${selectedOption.drinkType}`;
      switch (modalType) {
        case 'Alcohol':
          setAlcoholDetails(prev => [...prev, formatted]);
          break;
        case 'Smoking':
          setSmokingDetails(prev => [...prev, formatted]);
          break;
        case 'Narguileh':
          setNarguilehDetails(prev => [...prev, formatted]);
          break;
        case 'Caffeine':
          setCaffeineDetails(prev => [...prev, formatted]);
          break;
        case 'Energy Drinks':
          setEnergyDrinksDetails(prev => [...prev, formatted]);
          break;
        case 'Recreational Drugs':
          setRecreationalDrugsDetails(prev => [...prev, formatted]);
          break;
      }
    }
    setIsModalVisible(false);
  };

  const isButtonEnabled = () => {
    return (
      alcohol !== '' &&
      smoking !== '' &&
      narguileh !== '' &&
      caffeine !== '' &&
      energyDrinks !== '' &&
      recreationalDrugs !== ''
    );
  };

  // --- SUBMIT FUNCTION ---
  const submitAlcoholAndSubstanceUse = async () => {
    // Replace with your actual JWT token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjY1MzRhNzJkMmNhZjkwYzk1MmM3YSIsImlhdCI6MTc0NzQzNzE4MSwiZXhwIjoxNzQ3NDQwNzgxfQ.T37bbs_meMr_7L6GPR2yynKgcABzD77VtHnRuIUJiDg";

    // Parse alcohol details to match backend schema: { alcoholType, quantity, unit }
    const parseAlcoholDetails = (details: string[]) =>
      details.map((entry) => {
        // Example entry: "Vodka | 2 glass"
        const [type, rest] = entry.split('|').map(s => s.trim());
        const [quantityStr, unit] = rest ? rest.split(' ') : [null, null];
        return {
          alcoholType: type,
          quantity: Number(quantityStr),
          unit: unit, // "glass" or "shot"
        };
      });

    // You can keep your existing parsing for other substances
    const parseDetails = (details: string[], typeKey: string) =>
      details.map((entry) => {
        const [type, rest] = entry.split('|').map(s => s.trim());
        const [quantityStr, drinkType] = rest ? rest.split(' ') : [null, null];
        return {
          [`${typeKey}Type`]: type,
          quantity: Number(quantityStr),
          ...(drinkType ? { drinkType } : {}),
        };
      });

    const payload = {
      log_date: new Date(),
      alcohol: parseAlcoholDetails(alcoholDetails),
      smoking: parseDetails(smokingDetails, "smoking"),
      narguileh: narguilehDetails.length > 0
        ? { quantity: Number(narguilehDetails[0].split('|')[1]?.trim().split(' ')[0]) }
        : undefined,
      Caffeine: {
        CaffeineType: caffeineDetails.map((entry) => {
          const [type, rest] = entry.split('|').map(s => s.trim());
          const [quantityStr] = rest ? rest.split(' ') : [null];
          return {
            type,
            quantity: Number(quantityStr),
          };
        }),
      },
      energy_drinks: energyDrinksDetails.length > 0
        ? { quantity: Number(energyDrinksDetails[0].split('|')[1]?.trim().split(' ')[0]) }
        : undefined,
      recreational_drug_use: recreationalDrugsDetails.map((entry) => {
        const [type, rest] = entry.split('|').map(s => s.trim());
        const [quantityStr] = rest ? rest.split(' ') : [null];
        return {
          type,
          quantity: Number(quantityStr),
        };
      }),
    };

    try {
      const response = await fetch("http://192.168.1.119:5000/api/alcohol-substance-use", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Alcohol and substance use log submitted!");
        setStepValue('alcoholSubstanceUse', true);
        setStepNb(stepNb + 1);
        navigation.navigate('Step7');
      } else {
        alert(data.error || "Failed to log alcohol and substance use");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  const renderSubstanceSection = (
    label: string,
    stateValue: string,
    setStateValue: React.Dispatch<React.SetStateAction<string>>,
    details: string[],
    setDetails: React.Dispatch<React.SetStateAction<string[]>>,
    modalTypeKey: string,
    options: string[]
  ) => (
    <View style={styles.sectionWrapper}>
      <Text style={styles.blackText}>{label}</Text>
      <RoundRadioButtons
        options={['Yes', 'No']}
        selectedOption={stateValue}
        onSelect={(value) => {
          setStateValue(value);
          if (value === 'No') {
            setDetails([]);
          }
        }}
      />
      <PlusIcon
        onPress={() => {
          if (modalTypeKey === 'Recreational Drugs') {
            setModalType('Recreational Drugs');
            setModalTitle('Substance Type');
            setModalTitle2('Enter Substance Details');
            setModalOptions(recreationalDrugOptions.map(option => ({ key: option, value: option })));
            setIsModalVisible(true);
          } else if (modalTypeKey === 'Narguileh') {
            setModalType('Narguileh');
            setModalTitle('Quantity');
            setModalTitle2('Enter Quantity');
            setModalOptions(narguilehOptions.map(option => ({ key: option, value: option })));
            setIsModalVisible(true);
          } else {
            openModal('Type', 'Quantity', modalTypeKey, options);
          }
        }}
        disabled={stateValue !== 'Yes'}
      />

      {details.length > 0 && (
        <View style={styles.entryList}>
          {details.map((entry, index) => (
            <View key={index} style={styles.entryContainer}>
              <Text style={styles.entryText}>{entry}</Text>
              <View style={styles.entryActions}>
                <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDetails(prev => prev.filter((_, i) => i !== index))}>
                  <Text style={styles.deleteText}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
            <Image source={require('./Loginpics/vector.png')} style={styles.image} />
          </TouchableOpacity>
          <View>
            <Text style={styles.purpleText}>Alcohol</Text>
            <Text style={styles.purpleText}>& Substance use</Text>
          </View>
        </View>

        <View style={styles.columnWrapper}>
          {renderSubstanceSection('Alcohol', alcohol, setAlcohol, alcoholDetails, setAlcoholDetails, 'Alcohol', alcoholOptions)}
          {renderSubstanceSection('Smoking or Nicotine Use', smoking, setSmoking, smokingDetails, setSmokingDetails, 'Smoking', nicotineOptions)}
          {renderSubstanceSection('Narguileh', narguileh, setNarguileh, narguilehDetails, setNarguilehDetails, 'Narguileh', narguilehOptions)}
          {renderSubstanceSection('Caffeine', caffeine, setCaffeine, caffeineDetails, setCaffeineDetails, 'Caffeine', caffeineOptions)}
          {renderSubstanceSection('Energy Drinks', energyDrinks, setEnergyDrinks, energyDrinksDetails, setEnergyDrinksDetails, 'Energy Drinks', energyDrinkOptions)}
          {renderSubstanceSection('Recreational Substance Use', recreationalDrugs, setRecreationalDrugs, recreationalDrugsDetails, setRecreationalDrugsDetails, 'Recreational Drugs', recreationalDrugOptions)}
        </View>

        <View style={styles.submitWrapper}>
          <CustomButton
            text="Submit"
            onPress={submitAlcoholAndSubstanceUse}
            disabled={!isButtonEnabled()}
          />
        </View>
      </ScrollView>

      {/* Shared AlcoholModal (used for multiple types) */}
      <AlcoholModal
        visible={
          isModalVisible &&
          modalType !== 'Narguileh' &&
          modalType !== 'Recreational Drugs'
        }
        title={modalTitle}
        title2={modalTitle2}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleModalSelection}
        options={modalOptions}
        placeholder="Select type"
        showType={true}
      />

      {/* Narguileh Modal */}
      <NarguilehModal
        visible={isModalVisible && modalType === 'Narguileh'}
        title={modalTitle}
        title2={modalTitle2}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleModalSelection}
        showType={false}
      />

      {/* Recreational Drugs Modal */}
      <SubstanceModal
        visible={isModalVisible && modalType === 'Recreational Drugs'}
        title={modalTitle}
        title2={modalTitle2}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleModalSelection}
        placeholder="Enter substance"
        showType={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 20, backgroundColor:'white',},
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    marginBottom: 70,
    backgroundColor:'white',
  },
  purpleText: {
    fontSize: 30,
    color: '#6B2A88',
    fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    position: 'relative',
    right: 45,
  },
  blackText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 10,
  },
  sectionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  columnWrapper: {
    flexDirection: 'column',
    gap: 50,
  },
  submitWrapper: {
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  entryList: {
    width: '100%',
    gap: 10,
    marginTop: 15,
  },
  entryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2D6FF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  entryText: {
    color: '#6B2A88',
    fontWeight: '500',
  },
  entryActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#B766DA',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#B766DA',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default AlcoholAndSubstance;