import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNav from './navigatior/AppNav';
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading"

const fontLoading = () =>{ 
  return Font.loadAsync({
    
    'black':require('./assets/fonts/AirbnbCereal-Black.ttf'),
    'bold':require('./assets/fonts/AirbnbCereal-Bold.ttf'),
    'book':require('./assets/fonts/AirbnbCereal-Book.ttf'),
    'extraBold':require('./assets/fonts/AirbnbCereal-ExtraBold.ttf'),
    'light':require('./assets/fonts/AirbnbCereal-Light.ttf'),
    'medium':require('./assets/fonts/AirbnbCereal-Medium.ttf'),
    'logo': require('./assets/fonts/Cocon-Regular-Font.otf')
})}
export default function App() {
  const[fontLoad, setFontLoad] = useState(false)

  if(!fontLoad)
      {
        return <AppLoading
        startAsync ={fontLoading}
        onFinish = {() => setFontLoad(true)}
        onError = {(test)=> console.log(test) }
        /> 
      }
  return (
    <AppNav/>
  );
}


