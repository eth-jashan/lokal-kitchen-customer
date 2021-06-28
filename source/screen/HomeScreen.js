import React, { useEffect } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { View,Text,Image,TouchableOpacity } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../component/HomeHeader'
import OfferCarousel from '../component/OfferCarousel'
import TypeCarousel from '../component/TypeCarousel'
import DishList from '../component/dishlist'
import ChefList from '../component/cheflist'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProfile } from '../../store/action/profile'
import { fetchDish } from '../../store/action/dish'
import { ActivityIndicator } from 'react-native-paper'

const HomeScreen=({navigation})=>{

    const customer=useSelector(x=>x.auth.user)
    const profile=useSelector(x=>x.profile.profile)
    const dispatch=useDispatch()  
    
    console.log("Customer", customer)

    useEffect(()=>{
        const startupCalls = async() => {

        await dispatch(fetchProfile())
        // await dispatch(fetchCustomer())
        await dispatch(fetchDish())

    }
        startupCalls()
    },[dispatch])
    // if(customer.length==0){
    //     return(
    //         <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
    //             <ActivityIndicator size='large' color='#08818a' />
    //         </View>
    //     )
    // }

    return(
        <SafeAreaView style={{flex:1}} >
            <TouchableOpacity onPress={() => {navigation.navigate('SearchAddress')}}>
            <HomeHeader/>
            </TouchableOpacity>
        
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
        <View style={{padding:10}}>
        <Text style={{fontFamily:'medium', fontSize:24}}>Welcome</Text>
        <Text style={{fontFamily:'book', fontSize:30}}>{customer[0].name}</Text>
        {/* <Text style={{fontFamily:'book', fontSize:35}}>Jashan Shetty</Text> */}
        </View>

        <OfferCarousel/>
        <TypeCarousel/>
        <ChefList
            list={profile}
        />
        <DishList/>
        
        </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen