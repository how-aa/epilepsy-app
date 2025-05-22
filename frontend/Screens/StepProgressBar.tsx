import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface StepProgressBarProps {
  completedSteps: number;
  totalSteps: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ completedSteps, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index < completedSteps);

  return (
    <View style={styles.container}>

      <View style={styles.bar}>
        {steps.map((filled, idx) => (
          <Icon
            key={idx}
            name={filled ? 'ellipse' : 'ellipse-outline'}
            size={24}
            color={filled ? '#6B2A88' : '#ccc'}
            style={styles.icon}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B2A88',
    marginBottom: 8,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  icon: {
    marginHorizontal: 4,
  },
});

export default StepProgressBar;
