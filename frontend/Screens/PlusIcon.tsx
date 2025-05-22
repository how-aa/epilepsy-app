import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = {
  onPress: () => void;
  disabled: boolean;  // Add the disabled prop to handle the disabled state
};

const PlusIcon = ({ onPress, disabled }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.icon, disabled && styles.disabled]}  // Apply the disabled style conditionally
      disabled={disabled}  // Disable the TouchableOpacity when the disabled prop is true
    >
            <Icon
        name="add-circle-outline"
        size={50}
        color={disabled ? '#CA7FEB80' : '#CA7FEB'} // light purple when disabled
      />
    </TouchableOpacity>

    

    
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 10,
  },
  disabled: {
    opacity: 0.5,  // Reduce opacity when disabled to visually show it's inactive
  },
});

export default PlusIcon;
