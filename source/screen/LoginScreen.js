import React, { useState } from 'react'
import { View,Text,Dimensions,Pressable,TextInput  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'

const LoginScreen=props=>{
    const[number,setNumber]=useState()
    const[confirm,setConfirm]=useState(false)
    const[code,setCode]=useState()
    const onSubmit = async() => {
        try {
            let number  = "+91"+ number.toString() 
            const confirmation = await auth().signInWithPhoneNumber(number);
            setConfirm(confirmation)    
          } catch (error) {
            alert(error);
            console.log(error)
        }

    }
    const createAccount = async(code) => {
        console.log('Start')
        auth().onAuthStateChanged( async(user) => {
            if (user) {
                console.log("uid", )
                const uid = auth().currentUser.uid                
                const token = await auth().currentUser.getIdToken(true)
                await dispatch(profileAction.createAccount(name, mail, phone, uid, token ))
                navigation.navigate('CuinsineSetting')
            } 
            else 
            {
                try {
                   await confirm.confirm(code)
                   navigation.navigate('CuinsineSetting')
                } catch (error) {
                    throw(error)
                }
            }})
    
        console.log('Done')
        
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
            onChangeText={code}
            placeholder = 'Enter the OTP'
            style={{ fontFamily: 'medium',fontSize:16,backgroundColor:'transparent' , height: 60, width: Dimensions.get('screen').width*0.65, alignSelf:'center' }}
            />
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}} >
                <Pressable onPress={()=>{props.navigation.navigate('Main')}} style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',backgroundColor:'#08818a'}} >
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
            keyboardType='number-pad'
            onChangeText={setNumber}
            placeholder = 'Enter the Mobile Number'
            style={{ fontFamily: 'medium',fontSize:16,backgroundColor:'transparent' , height: 60, width: Dimensions.get('screen').width*0.65, alignSelf:'center' }}
            />
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}} >
                <Pressable onPress={()=>setConfirm(true)} style={{width:50,height:50,borderRadius:25,justifyContent:'center',alignItems:'center',backgroundColor:'#08818a'}} >
                <Ionicons name='arrow-forward' color='white' size={25} />
                </Pressable>
            </View>
            </View>}
            
        </View>
        </SafeAreaView>
    )
}


export default LoginScreen