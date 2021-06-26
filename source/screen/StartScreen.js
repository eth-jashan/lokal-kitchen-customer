import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import {View,ActivityIndicator} from 'react-native'
import { useDispatch } from 'react-redux';
import { createAccount } from '../../store/action/auth';

const StartScreen=props=>{
    const dispatch = useDispatchtch();

    const Authenticate = useCallback( async(userId,token) =>{
        await dispatch(createAccount(userId,token))
        
        props.navigation.navigate('Main')

    },[dispatch])
    useEffect(()=>{
        const login=async()=>{
            const userData = await AsyncStorage.getItem('userData');
        if(!userData){
            props.navigation.navigate('Welcome')
            return;
        }
        const transformedData = JSON.parse(userData);
        const {token,userId,created,number} = transformedData;
        if(!created){
            props.navigation.navigate('Profile',{type:'Phone',pNumber:number})
        }
        else{
            Authenticate(userId,token)
        }
        }
        login()
    },[dispatch])
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <ActivityIndicator color='' size='large' />
        </View>
    )
}