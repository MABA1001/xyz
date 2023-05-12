import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import SelectPicker from '../components/selectPicker';
import Btn from '../components/button';
import Loader from '../components/loader';

export default function SourceDestination({navigation}) {
    let [pickupLocation,setPickupLocation] = useState('');
    let [destinationLocation,setDestinationLocation] = useState('');
    let [disableBtn,setDisableBtn] = useState(true);
    let [isLoading,setIsLoading] = useState(false);
    let [options,setOptions] = useState([
      {label:'Katchery', value:"1"},
      {label:'Ibne Sina', value:"2"},
      {label:'Chaman', value:"3"},
      {label:'Peshawar Morh', value:"4"},
      {label:'Faiz Ahmed faiz', value:"5"},
      {label:'Khayaban e Johar', value:"6"},
      {label:'Potohar', value:"7"},
      {label:'IJP road', value:"8"},
      {label:'Faizabad metro', value:"9"},
      {label:'Shamsabad', value:"10"},
      {label:'6th road', value:"11"},
      {label:'Rehamanabad', value:"12"}
  ])
   const selectPickupLocation = (value) => {
    setPickupLocation(value);
  }



  const selectDestinationLocation = (value) => {
    setDestinationLocation(value);
  }

  const moveNext = () => {
    setIsLoading(true);
    navigation.navigate('map', 
      {pickup: pickupLocation, 
        destination: destinationLocation
      }
     );
     setIsLoading(false);
  }

  useEffect(()=>{
    if(pickupLocation && destinationLocation){
      setDisableBtn(false);
    }
  },[pickupLocation,destinationLocation])

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.upperBox}>
        <View>
          <Image
            source={require('../img/logo.png')}
            style={styles.profileImg}
          />
      <Text style={styles.txtStyling}>METRO ISLAMABAD</Text>
        </View>
      </View>
      <View style={styles.lowerBox}>
      <SelectPicker
            label="Pickup Station"
            selected={pickupLocation}
            handleValueChange={selectPickupLocation}
            placeholder="Select pickup station"
            options={options}
            style={{marginBottom:20}}
          />
       <SelectPicker
            label="Destination Station"
            selected={destinationLocation}
            handleValueChange={selectDestinationLocation}
            placeholder="Select pickup station"
            options={options}
          />
          <Btn onPress={moveNext} label='Next' disabled={disableBtn} bgColor={disableBtn? '#b3d9ff' : 'cornflowerblue'} />
      </View>
      {/* Loader */}
      <Loader isShow={isLoading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  upperBox: {
    backgroundColor: 'cornflowerblue',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 60,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 5,
  },
  editBox: {
    backgroundColor: 'white',
    padding: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 5,
    gap: 10,
    marginVertical: 5,
  },
  lowerBox: {
    padding: 20,
    paddingBottom: 100,
  },
  txtStyling: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 10,
    alignSelf:'center'
  },
});
