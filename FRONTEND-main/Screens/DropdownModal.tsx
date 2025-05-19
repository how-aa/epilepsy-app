// /components/DropdownModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';

interface DropdownModalProps {
  options: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
}

const DropdownModal = ({ options, onSelect, onClose }: DropdownModalProps) => {
  const { width } = useWindowDimensions();

  // Adjust font size and padding dynamically
  const fontSize = width > 400 ? 18 : 14;
  const paddingVertical = width > 400 ? 12 : 8;

  return (
    <Modal transparent={true} animationType="slide" visible={true}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { width: '80%' }]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, { paddingVertical }]}
              onPress={() => onSelect(option)}
            >
              <Text style={[styles.optionText, { fontSize }]}>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.closeButton, { paddingVertical }]} onPress={onClose}>
            <Text style={[styles.closeButtonText, { fontSize }]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    // width set dynamically in component
  },
  option: {
    // paddingVertical set dynamically in component
  },
  optionText: {
    // fontSize set dynamically in component
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    // paddingVertical set dynamically in component
  },
  closeButtonText: {
    color: 'white',
    // fontSize set dynamically in component
  },
});

export default DropdownModal;