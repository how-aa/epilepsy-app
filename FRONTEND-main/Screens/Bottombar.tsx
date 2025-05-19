import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import { StyleSheet, Image, TouchableOpacity, View, Platform } from 'react-native';

const Bottombar = () => {
    const navigation = useNavigation<AuthNavigationProp>();  

    return (
        <View style={styles.bar}>
            <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
                <Image source={require('./Bottombarpics/Home.png')} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login1')}>
                <Image source={require('./Bottombarpics/Calendar.png')} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen' as never)}>
                <Image source={require('./Bottombarpics/Contact.png')} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 30,  // Increase the size of the icons to make them more prominent
        width: 30,
    },
    bar: {
        backgroundColor: '#6B2A88',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 30,  // Increase the radius to make it more rounded
        paddingHorizontal: 25,  // More padding to make the bar larger
        paddingVertical: 15,    // More padding for a larger bar
        width: '90%',  // Adjust width to make the bar a little smaller than the full screen
        position: 'absolute',
        bottom: 30,  // Ensure the bar is above the very bottom of the screen
        left: '5%',  // Center the bar horizontally
        right: '5%',
        ...Platform.select({
            ios: {
                paddingBottom: 15, // Extra padding for iOS
            },
            android: {
                paddingBottom: 10, // Adjust padding for Android if needed
            },
        }),
    },
});

export default Bottombar;
