import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Shots = () => {
  return (
    <View>
      <LinearGradient
        colors={['#573565', '#B766DA']} 
        start={{ x: -0.05, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.gradientBox}
      >
        <Text style={styles.text}>Shots</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientBox: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Shots;
