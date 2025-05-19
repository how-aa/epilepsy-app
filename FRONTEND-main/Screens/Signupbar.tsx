import React from 'react';
import { StyleSheet,View,Image } from 'react-native';


const Signupbar =()=>{
    return(
        <View style={Styles.bar}>
            <Image source={require('./Signuppics/one.png')}/>
            <Image source={require('./Signuppics/line.png')}/>
            <Image source={require('./Signuppics/two.png')}/>
            <Image source={require('./Signuppics/line.png')}/>
            <Image source={require('./Signuppics/three.png')}/>
        </View>
    );
};

const Styles=StyleSheet.create({
    bar:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:10,
    },
});

export default Signupbar;
