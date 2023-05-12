import {Image, StyleSheet, View, Text, Alert} from 'react-native';
import React,{useEffect} from 'react';

export default function Splash({navigation}) {

  useEffect(()=>{
    const hour = new Date().getHours();
    // if(hour > 8 && hour < 18){
    //   setTimeout(()=>{
    //     navigation.navigate('sourceDestination')
    //   },2000)
    // }
    // else{
    //   Alert.alert("Sorry, Service is available only from 8:00am to 6:00pm.");
    // }

    setTimeout(()=>{
      navigation.navigate('sourceDestination')
    },2000)
    
  },[])
  
  return (
    <View style={styles.centeredView}>
      <Image source={require('../img/logo.png')} style={styles.logoStyling} />
      <Text style={styles.txtStyling}>METRO ISLAMABAD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cornflowerblue',
  },
  logoStyling: {
    width: 140,
    height: 140,
    borderRadius: 70,
    resizeMode: 'contain',
  },
  txtStyling: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 10,
  },
});
