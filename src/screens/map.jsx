import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { points1,points2,points3 } from '../data/points';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Map({route}) {
  //Markers
  let [stations, setStations] = useState([
    {
      id: 1,
      title: 'Katchery',
      coodinates: {
        latitude: 33.7022,
        longitude: 73.0414,
      },
    },
    {
      id: 2,
      title: 'Ibne Sina',
      coodinates: {
        latitude: 33.695533,
        longitude: 73.038752,
      },
    },
    {
      id: 3,
      title: 'Chaman',
      coodinates: {
        latitude: 33.69,
        longitude: 73.0428,
      },
    },
    {
      id: 4,
      title: 'Peshawar Morh',
      coodinates: {
        latitude: 33.68503,
        longitude: 73.04723,
      },
    },
    {
      id: 5,
      title: 'Faiz Ahmed faiz',
      coodinates: {
        latitude: 33.676,
        longitude: 73.05421,
      },
    },
    {
      id: 6,
      title: 'Khayaban e Johar',
      coodinates: {
        latitude: 33.669162,
        longitude: 73.059263,
      },
    },
    {
      id: 7,
      title: 'Potohar',
      coodinates: {
        latitude: 33.660771,
        longitude: 73.0656,
      },
    },
    {
      id: 8,
      title: 'IJP road',
      coodinates: {
        latitude: 33.656172,
        longitude: 73.071713,
      },
    },
    {
      id: 9,
      title: 'Faizabad metro',
      coodinates: {
        latitude: 33.66128,
        longitude: 73.08312,
      },
    },
    {
      id: 10,
      title: 'Shamsabad',
      coodinates: {
        latitude: 33.6504871,
        longitude: 73.0803493,
      },
    },
    {
      id: 11,
      title: '6th road',
      coodinates: {
        latitude: 33.64361,
        longitude: 73.0779,
      },
    },
    {
      id: 12,
      title: 'Rehamanabad',
      coodinates: {
        latitude: 33.636418,
        longitude: 73.075071,
      },
    },
  ]);
  //to set  markers on points
  let [pickupStationCoord,setPickupStationCoord] = useState(false)  
  let [destinationStationCoord,setDestinationStationCoord] = useState(false)  
  //buses stimulate array
  let [index1,setIndex1] = useState(246)
  let [index2,setIndex2] = useState(0)
  let [index3,setIndex3] = useState(0)
  let [index4,setIndex4] = useState(points1.length-50)
  let [index5,setIndex5] = useState(points2.length-50)
  let [index6,setIndex6] = useState(points3.length-50)
  //these points will stimulate buses
  let [simulation1,setSimulation1] = useState([33.70226290198485, 73.04144024197555])
  let [simulation2,setSimulation2] = useState([33.70226290198485, 73.04144024197555])
  let [simulation3,setSimulation3] = useState([33.70226290198485, 73.04144024197555])
  let [simulation4,setSimulation4] = useState([33.70226290198485, 73.04144024197555])
  let [simulation5,setSimulation5] = useState([33.70226290198485, 73.04144024197555])
  let [simulation6,setSimulation6] = useState([33.70226290198485, 73.04144024197555])
  //data gotton from back screen
  const pickup = +route.params.pickup;
  const destination = +route.params.destination;
  let gottenTime;
  let alphabet;
  //timing for up move and down time
  const timing = {
    up: {
      A: [0,5,2,0,2,2,4,6,8,2,4,5,7],
      B: [0,7,2,4,1,8,2,4,5,7,0,2,5,],
      C: [0,4,6,4,2,4,5,7,0,2,5,7,2],
      D: [0,2,4,5,7,0,2,5,7,2,4,6,8],
    },
    down: {
      A: [0,6,4,2,5,3,1,9,7,5,3,1,7],
      B: [0,9,7,5,3,1,7,6,4,2,5,3,1,],
      C: [0,1,9,7,5,3,1,7,6,4,2,5,3,],
      D: [0,7,5,3,1,7,6,4,2,5,3,1,9,],
    }
  }
//logic for shuffler not worked
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('time', getCurrentTime(0))
    } catch (e) {
      // console.log(e)
    }
  }
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('time')
      if(value !== null) {
        console.log('Data retrieved successfully.')
        gottenTime = value;
        console.log(gottenTime)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }
//ignore for async
  function getTimeDifference(start, end) {
    const startSplit = start.split(":");
    const endSplit = end.split(":");
    
    let startHour = parseInt(startSplit[0]);
    let startMinute = parseInt(startSplit[1].replace(/\D/g, ""));
    const startSuffix = startSplit[1].replace(/[0-9]/g, "").toLowerCase();
    
    let endHour = parseInt(endSplit[0]);
    let endMinute = parseInt(endSplit[1].replace(/\D/g, ""));
    const endSuffix = endSplit[1].replace(/[0-9]/g, "").toLowerCase();
    
    if (startSuffix === "pm" && startHour !== 12) {
      startHour += 12;
    }
    
    if (endSuffix === "pm" && endHour !== 12) {
      endHour += 12;
    }
    
    const startTime = new Date(0, 0, 0, startHour, startMinute);
    const endTime = new Date(0, 0, 0, endHour, endMinute);
    
    let difference = endTime.getTime() - startTime.getTime();
    difference /= 60000;
    
    return difference;
  }
//shuffler
  function randomLetter() {
    const letters = ["A", "B", "C","D"];
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }
//it gets current time and adds the minuteS of A,B,C,D(anything)
  function getCurrentTime(minute) {
    const now = new Date();
    const adjustedNow = new Date(now.getTime() + minute * 60 * 1000);
    const hours = adjustedNow.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const adjustedHours = hours % 12 || 12;
    const adjustedMinutes = adjustedNow.getMinutes().toString().padStart(2, '0');
    return `${adjustedHours}:${adjustedMinutes}${ampm}`;
  }
  //use effect runs the shuffler
  useEffect(()=>{
    //storeData();
    //getData();
    alphabet = randomLetter();
    if(alphabet === 'A'){
      console.log("Case A running")
      setIndex1(400)
      setIndex2(400)
      setIndex3(400)
      setIndex4(points1.length-400)
      setIndex5(points2.length-400)
      setIndex6(points3.length-400)
      //agr negative result ae to its up case
      if(pickup-destination < 0){
        Alert.alert(`Bus will arrive at ${getCurrentTime(timing.up.A[pickup])} and you will reach till ${getCurrentTime(Math.abs(pickup-destination)*2+timing.up.A[pickup])}.`) 
      }
      else{
        Alert.alert(`Bus will arrive at ${getCurrentTime(timing.down.A[pickup])} and you will reach till ${getCurrentTime(Math.abs(pickup-destination)*2+timing.up.A[pickup])}.`) 
      }
    }
    if(alphabet === 'B'){
      console.log("Case b running")
      setIndex1(150)
      setIndex2(150)
      setIndex3(150)
      setIndex4(points1.length-150)
      setIndex5(points2.length-150)
      setIndex6(points3.length-150)
      if(pickup-destination < 0){
        Alert.alert(`Bus will arrive at ${getCurrentTime(timing.up.B[pickup])} and you will reach till ${getCurrentTime(Math.abs(pickup-destination)*2+timing.up.B[pickup])}.`) 
      }
      else{
        Alert.alert(`Bus will arrive at ${getCurrentTime(timing.down.B[pickup])} and you will reach till ${getCurrentTime(Math.abs(pickup-destination)*2+timing.up.B[pickup])}.`) 
      }
    }
    if(alphabet === 'C'){
      console.log("Case C running")
      setIndex1(350)
      setIndex2(350)
      setIndex3(350)
      setIndex4(points1.length-350)
      setIndex5(points2.length-350)
      setIndex6(points3.length-350)
      if(pickup-destination < 0){
        Alert.alert(`Bus will arrive at ${getCurrentTime(timing.up.C[pickup])} and you will reach till ${getCurrentTime(Math.abs(pickup-destination)*2+timing.up.C[pickup])}.`) 
      }
      else{
        Alert.alert(`Bus will arrive at ${getCurrentTime(timing.down.C[pickup])} and you will reach till ${getCurrentTime(Math.abs(pickup-destination)*2+timing.up.C[pickup])}.`) 
      }
    }
    if(alphabet === 'D'){
      console.log("Case D running")
      setIndex1(550)
      setIndex2(550)
      setIndex3(550)
      setIndex4(points1.length-550)
      setIndex5(points2.length-550)
      setIndex6(points3.length-550)
      if(pickup-destination < 0){
        Alert.alert(`Bus will arrive at ${getCurrentTime(timing.up.D[pickup])} and you will reach till ${getCurrentTime(Math.abs(pickup-destination)*2+timing.up.D[pickup])}.`) 
      }
      else{
        Alert.alert(`Bus will arrive at ${getCurrentTime(timing.down.D[pickup])} and you will reach till ${getCurrentTime(Math.abs(pickup-destination)*2+timing.up.D[pickup])}.`) 
      }
    }
    
  },[])
//bus movement occuring here
    useEffect(() => {

      const interval = setInterval(()=>{
        //due to this three buses run in forward and reverse
        setSimulation1(points1[index1])
        setSimulation2(points2[index2])
        setSimulation3(points3[index3])
        //Reverse Simulation
        setSimulation4(points1[index4])
        setSimulation5(points2[index5])
        setSimulation6(points3[index6])

        //Forward Simulations
        //it runs the points in forrward untill end point of route is not reached
        //1st
        if(index1 < points1.length-2){
          setIndex1(index1+1)
        }
        else{
          setIndex1(0)
        }
        //2nd
        if(index2 < points2.length-2){
          setIndex2(index2+1)
        }
        else{
          setIndex2(0)
        }
        //3rd
        if(index3 < points3.length-2){
          setIndex3(index2+1)
        }
        else{
          setIndex3(0)
        }

        //Reverse Simulation
        //will run from end point in reverse order
        if(index4 > 2){
          setIndex4(index4-1)
        }else{setIndex4(points1.length - 1)}

        if(index5 > 2){
          setIndex5(index5-1)
        }else{setIndex5(points2.length - 1)}

        if(index6 > 2){
          setIndex6(index6-1)
        }else{setIndex6(points3.length - 1)}


      },500)
      return () => clearInterval(interval);
    }, [index1]);


  const GOOGLE_MAPS_APIKEY = 'AIzaSyDPOBwFVgzOZHiB-lwGMConS-SFTRnqRj0';
  //gets cordinates for placing markers on destination and source
  useEffect(()=>{
    //getting from stations array
    setPickupStationCoord(stations[pickup-1].coodinates)
    setDestinationStationCoord(stations[destination-1].coodinates)
  },[])

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        //shows map part
        region={{
          latitude: 33.660771,
          longitude: 73.0656,
          //sets zoom in zoom out
          latitudeDelta: 0.062,
          longitudeDelta: 0.062,
        }}>
          {/*place marker on stations */}
        {stations.map((station, index) => {
          return (
            <Marker
            key={index}
              image={require('../img/metro.png')}
              title={station.title}
              coordinate={station.coodinates}
            />
          );
        })}
        {/* Source & Destination Markers  */}
        {pickupStationCoord && destinationStationCoord &&
        <>
          <Marker
              pinColor='green'
              coordinate={destinationStationCoord}
            />
            <Marker
              pinColor='cornflowerblue'
              coordinate={pickupStationCoord}
            />
          </>}
          {/* Directions */}
          {pickupStationCoord && destinationStationCoord &&
         <MapViewDirections
            origin={pickupStationCoord}
            destination={destinationStationCoord}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="cornflowerblue"
         />}
          {/* Simulations */}
          {/* 1st (cordinates k andr jo stimulation rki ha thats a state jo change hogi to data change show hoga, so marker moves)*/}
            <Marker 
            image={require('../img/bus.png')}
            coordinate={{latitude: simulation1[0],longitude: simulation1[1]}}
            />
          {/* 2nd */}
            <Marker 
            image={require('../img/bus.png')}
            coordinate={{latitude: simulation2[0],longitude: simulation2[1]}}
            />
          {/* 3rd */}          
            <Marker 
            image={require('../img/bus.png')}
            coordinate={{latitude: simulation3[0],longitude: simulation3[1]}}
            />
          {/* 4th */}          
            <Marker 
            image={require('../img/bus.png')}
            coordinate={{latitude: simulation4[0],longitude: simulation4[1]}}
            />
             {/* 5th */}          
             <Marker 
            image={require('../img/bus.png')}
            coordinate={{latitude: simulation5[0],longitude: simulation5[1]}}
            />
             {/* 6th */}          
             <Marker 
            image={require('../img/bus.png')}
            coordinate={{latitude: simulation6[0],longitude: simulation6[1]}}
            />
          

       
        
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
