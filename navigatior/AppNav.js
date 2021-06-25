import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import StartupScreen from '../source/screen/StartupScreen';
import LoginScreen from '../source/screen/LoginScreen';
import HomeScreen from '../source/screen/HomeScreen';
import MapStartupScreen from '../source/screen/MapStartupScreen';
import ProfileScreen from '../source/screen/ProfileScreen';
import ProfileCreation from '../source/screen/ProfileCreation';
import CartScreen from '../source/screen/CartScreen';
import { Entypo, Feather  } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import {View, Text} from 'react-native'

const Tab = createMaterialBottomTabNavigator();

const BottomNav = () => {

    const count = useSelector(x=>x.cart.cartTotal)

  return (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#08818a"
    barStyle={{ backgroundColor: 'white' }}
    shifting={true}
    screenOptions={{headerShown:false}}

  >
      <Tab.Screen options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }} 
            name="Home" 
            component={HomeScreen} />
      <Tab.Screen options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                count>0?<View>
                <View style={{elevation:4, height:16, width:16, backgroundColor:'red', borderRadius:10, left:20, bottom:4, justifyContent:'center'}}>
                  <Text style={{fontFamily:'book',color:'white', fontSize:8, alignSelf:'center'}}>{count}</Text>
                </View>
                <Feather style={{position:'absolute'}} name="shopping-cart" size={24} color={color}/>
                </View>:<Feather style={{position:'absolute'}} name="shopping-cart" size={24} color={color}/>
              ),
            }}
            name="Cart" 
            component={CartScreen} />
    </Tab.Navigator>
  );
}

const AuthStack=createStackNavigator()

const MyAuth=()=>{
    return(
        <AuthStack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}} >
            <AuthStack.Screen name='Welcome' component={StartupScreen} />
            <AuthStack.Screen name='Login' component={LoginScreen} />
            <AuthStack.Screen name='Profile' component={ProfileCreation} />
            <AuthStack.Screen name= 'Map' component = {MapStartupScreen} />
        </AuthStack.Navigator>
    )
}

const MainStack=createStackNavigator()
const MainApp=()=>{
    return(
        <MainStack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}} >
            <MainStack.Screen name='Home' component={BottomNav}  />
        </MainStack.Navigator>
    )
}

const AppFlow=createStackNavigator()
const AppNav=()=>{
    return(
        <NavigationContainer>
            <AppFlow.Navigator screenOptions={{headerShown:false}} >
            <AppFlow.Screen name='Auth' component={MyAuth} />
            <AppFlow.Screen name='Main' component={MainApp} />
            </AppFlow.Navigator>
        </NavigationContainer>
    )
}

export default AppNav
