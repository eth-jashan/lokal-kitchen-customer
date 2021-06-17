import React, { useState,useRef } from 'react'
import { View,Text,Dimensions,Pressable,TextInput  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'
import * as FirebaseCore from 'expo-firebase-core';
import firebase from '../../firebase'
import { createAccount } from '../../store/action/auth';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
const LoginScreen=props=>{
    const[number,setNumber]=useState()
    const[confirm,setConfirm]=useState(false)
    const[code,setCode]=useState()
    const[verificationId,setVerificationId]=useState()
    const recaptchaVerifier = useRef(null);
    const dispatch=useDispatch()
    const onSubmit = async() => {
        const newNum = '+91'+number
        console.log(newNum)
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verId=await phoneProvider.verifyPhoneNumber(newNum,recaptchaVerifier.current)
        setVerificationId(verId)
        setConfirm(true)

    }
    const CreateAccount = async() => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              code
            );
            const response = await firebase.auth().signInWithCredential(credential)
            const token = await response.user.getIdToken(true)
            const userId=response.user.uid
            console.log(userId,token)
            await dispatch(createAccount(userId,token))
            props.navigation.navigate('MapStartup')
          } catch (err) {
            Alert.alert('Error','Invalid Code',[{text:'Okay'}])
          }
        
    }   

    return(
        <SafeAreaView style={{flex:1}} >
        <View style={{flex:1}} >
            <View style={{marginTop:50,flexDirection:'row',justifyContent:'space-between',alignSelf:'center',width:'100%'}} >
            <View style={{marginLeft:15,marginTop:10}} >
            <Text style={{fontFamily:'logo',fontSize:18}} >Welcome!</Text>
            <Text style={{fontFamily:'book',fontSize:18}}>Sign In To Continue</Text>
            </View>
            <View style={{marginRight:15,marginTop:10}}  >
            <Ionicons size={50} name='fast-food-outline' />
            </View>
            </View>
            <FirebaseRecaptchaVerifierModal
                    ref = {recaptchaVerifier}
                    firebaseConfig = {firebase.apps.length ? firebase.app().options : undefined}
            />
            {confirm?
                <View style={{marginTop:50}} >
            <Text style={{fontFamily:'book',fontSize:18,margin:5,marginLeft:10}}>OTP has been sent to <Text style={{fontFamily:'book', color:'#08818a'}} >{number}</Text></Text>
            <View style={{flexDirection:'row',margin:10,borderRadius:20,backgroundColor:'#ededee'}} >
            <View style={{marginTop:20,margin:5}} >
            <Ionicons name='phone-portrait-outline' size={30} />
            </View>
            <View style={{padding:5,justifyContent:'center',alignItems:'center'}} >
            <TextInput
            value={code}
            keyboardType='number-pad'
            onChangeText={setCode}
            placeholder = 'Enter the OTP'
            style={{ fontFamily: 'medium',fontSize:16,backgroundColor:'transparent' , height: 60, width: Dimensions.get('screen').width*0.65, alignSelf:'center' }}
            />
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}} >
                <Pressable onPress={CreateAccount} style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',backgroundColor:'#08818a'}} >
                <Ionicons name='arrow-forward' color='white' size={25} />
                </Pressable>
            </View>
            </View>
            </View>
            :<View style={{flexDirection:'row',margin:10,marginTop:50,borderRadius:20,backgroundColor:'#ededee'}} >
            <View style={{marginTop:20,margin:5}} >
            <Ionicons name='phone-portrait-outline' size={30} />
            </View>
            <View style={{padding:5,justifyContent:'center',alignItems:'center'}} >
            <TextInput
            value={number}
            keyboardType='phone-pad'
            onChangeText={setNumber}
            placeholder = 'Enter the Mobile Number'
            style={{ fontFamily: 'medium',fontSize:16,backgroundColor:'transparent' , height: 60, width: Dimensions.get('screen').width*0.65, alignSelf:'center' }}
            />
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}} >
                <Pressable onPress={onSubmit} style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',backgroundColor:'#08818a'}} >
                <Ionicons name='arrow-forward' color='white' size={25} />
                </Pressable>
            </View>
            
            </View>}
            
        </View>
        </SafeAreaView>
    )
}


export default LoginScreen