import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNav from './navigatior/AppNav';
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading"
import {Provider} from 'react-redux'
import authReducer from './store/reducer/auth';
import {applyMiddleware, createStore, combineReducers} from 'redux'
import ReduxThunk from 'redux-thunk'
import categoryHandler from './store/reducer/category';
import dishHandler from './store/reducer/dish';
import profileHandler from './store/reducer/profiles';
import cartHandler  from './store/reducer/cart'

const reducers=combineReducers({
  auth:authReducer,
  category:categoryHandler,
  dish:dishHandler,
  profile:profileHandler,
  cart:cartHandler
})

const store=createStore(reducers,applyMiddleware(ReduxThunk))

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
    <Provider store={store} >
      <AppNav/>
    </Provider>
  );
}


