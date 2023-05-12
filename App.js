import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/splash';
import Map from './src/screens/map';
import SourceDestination from './src/screens/sourceDestination';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{headerShown:false}}
          >
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="sourceDestination" component={SourceDestination} />
            <Stack.Screen name="map" component={Map} />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
