import React, { useEffect, useRef, useState } from 'react'
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
import { Modalize } from 'react-native-modalize';
import { AntDesign } from '@expo/vector-icons';

//actions
import { fetchProfile } from '../../store/action/profile'
import { fetchDish } from '../../store/action/dish'

import { ActivityIndicator } from 'react-native-paper'
import MapView from 'react-native-maps'
import DetailAddButton from '../component/DetailAddButton'

import * as addressActions from '../../store/action/address';

const HomeScreen=({navigation})=>{

    const customer=useSelector(x=>x.auth.user)
    const profile=useSelector(x=>x.profile.profile)
    const dispatch=useDispatch()  
    const modalizeRef = useRef(null);
    
    console.log("Customerssssssssss========-====", customer)

    useEffect(()=>{
        const startupCalls = async() => {

        await dispatch(fetchProfile())
        // await dispatch(fetchCustomer())
        await dispatch(fetchDish())
        await dispatch(addressActions.storeCustomerId(customer[0].id))

    }
        startupCalls()
    },[dispatch])
    
    const onOpen = async(item) => {
        modalizeRef.current?.open();
        console.log("item", item) 
        setCurrent(item)
    };
    const [current, setCurrent] = useState(false)
    const cuisineList= [

        {title:'Breakfast 🍳'},{title:"Appetizer 🍤"}, {title:"Maincourse 🍲"}, {title:'Thali/Meal 🍱'},{title:'Desert 🍨'}]

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
        <DishList
            onOpen = {onOpen}
        />        
        </ScrollView>
        <Modalize modalHeight={520} ref={modalizeRef}>
                {current?<View style={{width:Dimensions.get('window').width, backgroundColor:'white'}}>
                    <Image
                        source={{uri:current.imguri}}
                        style={{width:Dimensions.get('window').width, height:(Dimensions.get('window').width)/2}}
                    />
                <View style={{width:'100%', padding:8,alignSelf:'center', marginTop:10, flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{width:'70%'}}>
                    <Text numberOfLines={1} style={{fontFamily:'medium', fontSize:26, width:"100%"}}>{current.name}</Text>
                    <Text style={{fontSize:24, fontFamily:'book', color:'#f8a73b'}}>₹ {current.price}</Text>
                    </View>
                    <AntDesign name="hearto" size={24} color="red" />
                </View>
                <View style={{padding:8}}>
                <Text style={{fontFamily:'light', fontSize:18}}>{current.description}</Text>
                </View>
                <View style={{height:50, width:Dimensions.get('window').width}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection:'row', alignSelf:'center'}}>
                    
                    <TouchableOpacity style={{backgroundColor:'#08818a',padding:8, borderRadius:8, marginVertical:6,marginHorizontal:2, height:38}}>
                        <Text style={{fontFamily:'book', fontSize:18, color:'white', textAlign:'center'}}>Non-Veg 🐔</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'#08818a',  padding:8, borderRadius:8, margin:6,height:38 }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', textAlign:'center',}}>{current.spicy.title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'#08818a',padding:8, borderRadius:8, marginVertical:6,marginHorizontal:2, height:38}}>
                        <Text style={{fontFamily:'book', fontSize:18, color:'white', textAlign:'center'}}>{cuisineList[2].title}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{backgroundColor:'#08818a',  padding:8, borderRadius:8, margin:6, height:38}}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', textAlign:'center'}}>serves {current.noServe} 🧑‍🤝‍🧑</Text>
                    </TouchableOpacity>                  
                    
                    </ScrollView>
                    </View>
                    <View style={{width:'90%', borderWidth:0.7, borderColor:'#f5f7f9', alignSelf:'center', marginTop:10}}/>
                    <View style={{marginHorizontal:4, alignSelf:'center', flexDirection:'row', width:'100%', padding:8, }}>
                    <View style={{borderRadius:16, overflow:'hidden'}}>
                    <MapView
                        style={{width:60, height:60, borderRadius:5}}
                        region={{latitude:current.lat, longitude:current.long, latitudeDelta:0.01, longitudeDelta:0.04}}
                    />
                    </View>
                    <View style={{marginLeft:14, alignSelf:'center'}}>
                    <Text style={{fontSize:16, fontFamily:'medium',marginVertical:4}}>{profile.some(x=>x.uid==current.uid)?profile[profile.findIndex(x=>x.uid==current.uid)].name:null}</Text>
                    <Text style={{fontSize:16, fontFamily:'book',}}>11 km</Text>
                    </View>
                    </View>
                    <View style={{width:'90%', borderWidth:0.7, borderColor:'#f5f7f9', alignSelf:'center', marginBottom:10}}/>
                    <DetailAddButton
                        item={current}
                        onclose={()=>modalizeRef.current?.close()}
                    />
                </View>:null}
            </Modalize>
        </SafeAreaView>
    )
}

export default HomeScreen