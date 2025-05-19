import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 
import NumberBox from './Numberbox';
import Liters from './liters';
import CustomButton from './CustomButton';
import Meals from './meals';
import { useStep } from './StepContext';

const FoodandDietS = () => {
    const navigation = useNavigation<AuthNavigationProp>();  

    // State to track selected values
    const [mealsPerDay, setMealsPerDay] = useState(0);
    const [litersPerDay, setLitersPerDay] = useState(0);
    const { setStepValue, setStepNb, stepNb } = useStep(); 

    const isButtonDisabled = mealsPerDay === 0 || litersPerDay === 0;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
                        <Image source={require("./Loginpics/vector.png")} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={styles.purpleText}>Food and Diet</Text>
                </View>

                {/* Meal Frequency Section */}
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 30, marginTop: 30,marginBottom:30, }}>
                    <Text style={styles.blackText}>Meal Frequency</Text>
                    <View style={styles.boxContainer}>
                        <NumberBox 
                            option="Meals" 
                            initialValue={mealsPerDay} 
                            onSave={(quantity) => setMealsPerDay(quantity)} 
                        />
                        <Meals />
                    </View>
                </View>

                {/* Water Intake Section */}
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 30, marginTop: 30 }}>
                    <Text style={styles.blackText}>Water Intake</Text>
                    <View style={styles.boxContainer}>
                        <NumberBox 
                            option="Liters" 
                            initialValue={litersPerDay} 
                            onSave={(quantity) => setLitersPerDay(quantity)} 
                        />
                        <Liters />
                    </View>
                </View>

                {/* Submit Button */}
                <View style={{ width: "70%", justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                    <CustomButton 
                        text="Submit" 
                        onPress={() => {
                            setStepValue('foodDiet', true);
                            setStepNb(stepNb + 1);
                            navigation.navigate('Step7');
                            console.log(`Meals: ${mealsPerDay}, Water: ${litersPerDay}`);
                        }} 
                        disabled={isButtonDisabled}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        gap:20,
        justifyContent:'center',
        flexDirection:'column',
    },
    topBar: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        marginBottom:'30%',
    },
    purpleText: {
        fontSize: 30,
        color: '#6B2A88',
        fontWeight: '600',
    },
    image: {
        position: 'relative',
        right: 45,
    },
    blackText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 25,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#EABAFF',
        borderRadius: 20,
        padding: 30,
        width: '65%',
    },
});

export default FoodandDietS;
