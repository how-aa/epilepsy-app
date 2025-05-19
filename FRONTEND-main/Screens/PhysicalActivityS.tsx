// filepath: [PhysicalActivityS.tsx](http://_vscodecontentref_/1)
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import RoundRadioButtons from './RoundRadioButtons';
import PlusIcon from './PlusIcon';
import CustomButton from './CustomButton';
import PhysicalModal from './PhysicalModal';
import { useStep } from './StepContext'; // Adjust the path if needed

const PhysicalActivityS = () => {
    const navigation = useNavigation<AuthNavigationProp>();
    const [exercise, setExercise] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [workouts, setWorkouts] = useState<{ type: string; duration: string; intensity?: string }[]>([]);

    // Function to open the modal
    const openModal = () => setIsModalVisible(true);

    // Function to close the modal
    const closeModal = () => setIsModalVisible(false);

    const { setStepNb, stepNb, setStepValue } = useStep();


    // Check if the button should be disabled
    const isButtonDisabled = exercise === '';

    // Log workouts whenever the list changes
    useEffect(() => {
        console.log('Workouts List:', workouts);
    }, [workouts]);

    // Function to submit physical activity to backend
    const submitPhysicalActivity = async () => {
        // Replace with your actual JWT token for testing
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjY1MzRhNzJkMmNhZjkwYzk1MmM3YSIsImlhdCI6MTc0NzQxNDY3MCwiZXhwIjoxNzQ3NDE4MjcwfQ.ozPxTjUa6xiwysc8zrmAUB59cyyKFCUrN5wf1J-lsW0";

        // Prepare the data to match your backend schema
        const payload = {
            log_date: new Date(),
            exercise: workouts.map(w => ({
                exercisetype: w.type,
                intensity: w.intensity || "Moderate",
                duration: Number(w.duration),
            })),
        };

        try {
            const response = await fetch("http://192.168.1.119:5000/api/physical-activity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", "Physical activity logged!");
                setWorkouts([]); // Clear workouts after successful submission
                setExercise('');
                setStepValue('physicalActivity', true);
setStepNb(stepNb + 1);

            } else {
                Alert.alert("Error", data.error || "Failed to log activity");
            }
        } catch (err) {
            Alert.alert("Network Error", "Could not connect to the server.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
                        <Image source={require("./Loginpics/vector.png")} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={styles.purpleText}>Physical Activity</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 100, marginTop: 30 }}>
                    <View style={{ flexDirection: "column", gap: 30, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.blackText}>Did You Exercise Today?</Text>
                        <RoundRadioButtons
                            options={['Yes', 'No']}
                            selectedOption={exercise}
                            onSelect={(option) => setExercise(option)}
                        />
                    </View>

                    {/* Conditionally render the plus icon when "Yes" is selected */}
                    {exercise === 'Yes' && (
                        <View style={styles.plusIconContainer}>
                            <Text style={styles.purpleText2}>Add Workout(s)</Text>
                            <PlusIcon
                                onPress={openModal}
                                disabled={false}
                            />
                        </View>
                    )}

                    {/* Display selected workouts */}
                    {workouts.length > 0 && (
                        <View style={styles.workoutsContainer}>
                            <Text style={styles.purpleText2}>Selected Workouts</Text>
                            {workouts.map((workout, index) => (
                                <View key={index} style={styles.workoutItem}>
                                    <Text style={styles.workoutText}>
                                        {`${workout.type} | ${workout.duration} min${workout.intensity ? ` | ${workout.intensity}` : ''}`}
                                    </Text>
                                    <TouchableOpacity onPress={() => {
                                        setWorkouts(workouts.filter((_, i) => i !== index));
                                    }}>
                                        <Text style={styles.deleteText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Use the PhysicalModal component here */}
            <PhysicalModal
                visible={isModalVisible}
                onClose={closeModal}
                onSelect={(entry: any) => {
                    // Accepts { name/type/value, duration, intensity }
                    const formattedEntry = {
                        type: entry.type || entry.value || entry.name || '',
                        duration: entry.duration || '',
                        intensity: entry.intensity || entry.emotionalEvent || '',
                    };
                    setWorkouts((prev) => [...prev, formattedEntry]);
                    closeModal();
                }}
                title="Type of Exercise"
                title2="Duration"
                options={[
                    { key: 'walking', value: 'Walking' },
                    { key: 'running', value: 'Running' },
                    { key: 'swimming', value: 'Swimming' },
                    { key: 'cycling', value: 'Cycling' },
                    { key: 'yoga', value: 'Yoga' },
                ]}
                placeholder="Select Exercise Type"
            />

            <View style={{ width: "70%", justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                <CustomButton
                    text="Submit"
                    onPress={submitPhysicalActivity}
                    disabled={isButtonDisabled || (exercise === 'Yes' && workouts.length === 0)}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        backgroundColor: 'white',
    },
    topBar: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        marginBottom: 30,
    },
    purpleText: {
        fontSize: 30,
        color: '#6B2A88',
        fontWeight: '600',
    },
    purpleText2: {
        fontSize: 20,
        color: '#B766DA',
        fontWeight: '500',
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
    plusIconContainer: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    workoutsContainer: {
        marginTop: 20,
        alignItems: 'center',
        gap: 15,
    },
    workoutItem: {
        backgroundColor: '#D1C4E9',
        padding: 10,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    workoutText: {
        color: '#6B2A88',
        fontWeight: '500',
    },
    deleteText: {
        color: '#FF6347',
        fontWeight: '600',
    },
});

export default PhysicalActivityS;