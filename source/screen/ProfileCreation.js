import React, { useState } from 'react'
import {View,Text, Dimensions,FlatList, ScrollView,TextInput,Pressable} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SetAvatar from '../components/SetAvatar'

const ProfileCreation=props=>{
    const[name,setName]=useState()
    const[number,setNumber]=useState()
    const[email,setEmail]=useState()
    const[avatar,setAvatar]=useState()
    const avatarList=['https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/burgerAvatar.jpg?alt=media&token=5c0db996-cacb-4525-b448-76d8beca6506',
    'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/icecreamAvatar.jpg?alt=media&token=56989787-d4e9-4874-af52-c331814df3fa',
    'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/milshakeAvatar.jpg?alt=media&token=491804b9-a247-4651-9bc7-12afbe57ad36',
    'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/pizzaAvatar.jpg?alt=media&token=af4fd181-268b-4b5b-b4f6-3d5cf8e18c16',
    'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/sushiAvatar.jpg?alt=media&token=cc3dcd0a-3cff-487e-9fe7-84a8373588d7'
    ]
    const getAvatar=(uri)=>{
        setAvatar(uri)
    }
    return(
        <SafeAreaView style={{flex:1,opacity:0.9}} >
        <View style={{marginTop:30,margin:10}} >
        <Text style={{fontFamily:'logo',fontSize:18}} >Just One More Step!</Text>
        <Text style={{fontFamily:'book',fontSize:18}}>Add your Details and Explore Unlimited Cuisines</Text>
        </View>
        <View style={{width:Dimensions.get('window').width, height:160, marginVertical:16}}>
        
        <FlatList
            showsHorizontalScrollIndicator ={false}
            horizontal
            style={{alignSelf:'center'}}
            data={avatarList}
            keyExtractor ={x=>x}
            renderItem = {({item}) => {
                return<SetAvatar
                    list = {item}
                    setUri = {getAvatar}
                    selectedUri = {avatar}
                />
            }}
        />
        <Text style={{fontFamily:'book', fontSize:18,alignSelf:'center'}}>Select An Avatar For You</Text>
        </View>
        <ScrollView>
        <View style={{margin:5,padding:5}}>
        <TextInput
            value={name}
            onChangeText={setName}
            placeholder='Full Name'
            style={{ fontFamily: 'medium',padding:10,fontSize:14,borderRadius:20,backgroundColor:'#ededee', height: 60, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
        />
        </View>
        <View style={{margin:5,padding:5}}>
        <TextInput
            value={number}
            onChangeText={setNumber}
            placeholder='Mobile Number'
            style={{ fontFamily: 'medium',padding:10,fontSize:14,borderRadius:20,backgroundColor:'#ededee', height: 60, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
        />
        </View>
        <View style={{margin:5,padding:5}}>
        <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder='Email-Id'
            style={{ fontFamily: 'medium',padding:10,fontSize:14,borderRadius:20,backgroundColor:'#ededee', height: 60, width: Dimensions.get('screen').width*0.95, alignSelf:'center' }}
        />
        </View>
        
        <Pressable onPress={()=>{props.navigation.navigate('Main')}} style={{borderRadius:10,width:Dimensions.get('screen').width*0.95,margin:10,justifyContent:'center',alignItems:'center',height:50,backgroundColor:'#08818a'}} >
            <Text style={{fontFamily:'book',color:'white',fontSize:14}} >Submit</Text>
        </Pressable>
        </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileCreation