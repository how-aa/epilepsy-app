import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NumberBox from './Numberbox';
import Qttyday from './qttyday';

type Props = {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSelect: (selection: [number, number]) => void;  // returns [type, quantity]
};

const NicotineModal = ({ visible, title, onClose, onSelect }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState(1); // Default nicotine type (e.g., 1 = cigarette)

  const handleConfirm = () => {
    if (quantity > 0) {
      onSelect([type, quantity]); // Return both type and quantity as a tuple
    }
    setQuantity(0);
    onClose();
  };

  const handleSaveQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          {/* Nicotine type selector buttons */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, type === 1 && styles.typeButtonSelected]}
              onPress={() => setType(1)}
            >
              <Text style={type === 1 ? styles.typeTextSelected : styles.typeText}>Cigarette</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeButton, type === 2 && styles.typeButtonSelected]}
              onPress={() => setType(2)}
            >
              <Text style={type === 2 ? styles.typeTextSelected : styles.typeText}>Vape</Text>
            </TouchableOpacity>

            {/* Add more types as needed */}
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <NumberBox option="" onSave={handleSaveQuantity} />
            <Qttyday />
          </View>

          <TouchableOpacity onPress={handleConfirm} style={styles.closeButton}>
            <Image source={require('./CheckIcon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#6B2A888C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    gap: 20,
    backgroundColor: '#F2D6FF',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#B766DA',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#D9B7E6',
  },
  typeButtonSelected: {
    backgroundColor: '#6B2A88',
  },
  typeText: {
    color: '#6B2A88',
    fontWeight: '600',
  },
  typeTextSelected: {
    color: '#F2D6FF',
    fontWeight: '700',
  },
  closeButton: {
    backgroundColor: '#6B2A88',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default NicotineModal;
