import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartupScreen from '../source/screen/StartupScreen';
import LoginScreen from '../source/screen/LoginScreen';
import HomeScreen from '../source/screen/HomeScreen';
import MapStartupScreen from '../source/screen/MapStartupScreen';

const AuthStack=createStackNavigator()

const MyAuth=()=>{
    return(
        <AuthStack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}} >
            <AuthStack.Screen name='Welcome' component={StartupScreen} />
            <AuthStack.Screen name='Login' component={LoginScreen} />
        </AuthStack.Navigator>
    )
}

const MainStack=createStackNavigator()
const MainApp=()=>{
    return(
        <MainStack.Navigator initialRouteName='MapStartup' screenOptions={{headerShown:false}} >
            <MainStack.Screen name = 'MapStartup' component={MapStartupScreen}/>
            <MainStack.Screen name='Home' component={HomeScreen}  />
        </MainStack.Navigator>
    )
}

const AppFlow=createStackNavigator()
const AppNav=()=>{
    return(
        <NavigationContainer>
            <AppFlow.Navigator screenOptions={{headerShown:false}} >
            {/* <AppFlow.Screen name='Auth' component={MyAuth} /> */}
            <AppFlow.Screen name='Main' component={MainApp} />
            </AppFlow.Navigator>
        </NavigationContainer>
    )
}

export default AppNav
