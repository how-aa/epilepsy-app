import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type NumberBoxProps = {
  option: string;
  onSave: (quantity: number, option: string) => void;
  initialValue?: number; // Optional prop
};

const NumberBox: React.FC<NumberBoxProps> = ({ option, onSave, initialValue }) => {
  const [value, setValue] = useState(initialValue ?? 0); // fallback to 0

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const increment = () => {
    const newVal = value + 1;
    setValue(newVal);
    onSave(newVal, option);
  };

  const decrement = () => {
    if (value > 0) {
      const newVal = value - 1;
      setValue(newVal);
      onSave(newVal, option);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.numberBox}>
          <Text style={styles.number}>{value}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={increment} style={styles.button}>
            <Image source={require('./uparrow.png')} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={decrement} style={styles.button}>
            <Image source={require('./downarrow.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
  },
  box: {
    backgroundColor: '#EABAFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  numberBox: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderColor: '#B766DA',
    backgroundColor: '#F2D6FF',
    marginRight: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B766DA',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 5,
  },
});

export default NumberBox;
