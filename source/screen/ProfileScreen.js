import React from 'react'
import { Dimensions } from 'react-native'
import { View,Text,Image,TouchableOpacity } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../component/HomeHeader'
import OfferCarousel from '../component/OfferCarousel'

const ProfileScreen=({navigation})=>{
    return(
        <SafeAreaView style={{flex:1}} >
        <HomeHeader/>
        
        <View style={{padding:10}}>
        <Text style={{fontFamily:'light', fontSize:30}}>Welcome</Text>
        <Text style={{fontFamily:'book', fontSize:45}}>Jashan Shetty</Text>
        </View>

        
        

        </SafeAreaView>
    )
}

export default ProfileScreen