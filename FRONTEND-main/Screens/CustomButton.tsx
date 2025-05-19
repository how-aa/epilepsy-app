import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
    text: string;
    onPress: () => void;
    disabled?: boolean;  // Add optional disabled prop
}

const CustomButton: React.FC<ButtonProps> = ({ text, onPress, disabled = false }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, disabled && styles.disabled]} disabled={disabled}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6B2A88',  // Background color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25, // Round edges
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',  // You can adjust width as needed
        marginVertical: 10, // Spacing between buttons
    },
    buttonText: {
        color: 'white',  // Text color
        fontSize: 24,
        fontWeight: '500',
    },
    disabled: {
        backgroundColor: '#B0A0C3',  // Lighter background for disabled state
    },
});

export default CustomButton;
