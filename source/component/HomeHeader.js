import React, { useEffect } from 'react'
import { Dimensions, View,Text, Image } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '../../store/action/auth';

const {width, height} = Dimensions.get('window')

const HomeHeader = ({}) => {
    const customer=useSelector(x=>x.auth.user)
    const dispatch=useDispatch()

    useEffect(()=>{
        const fetch=async()=>{
            await dispatch(fetchCustomer())
        }
        fetch()
    },[dispatch])

    return(
        <View style={{width:width, padding:8,flexDirection:'row', justifyContent:'space-between'}}>
        
        <View style={{width:'70%',alignSelf:'center'}}>
        <View style={{flexDirection:'row'}}>
        <View style={{margin:4}} ><EvilIcons name="location" size={30} color="#0a789f" /></View>
        <Text style={{fontFamily:'black',fontSize:20 }}>Home</Text>
        </View>
        <Text numberOfLines={1} style={{fontFamily:'light'}}>{customer[0].address}</Text>
        </View>
        
        <Image
            style={{height:60, width:60, borderRadius:60}}
            source={{uri:customer[0].avatar}}
        />

        </View>
    )

}

export default HomeHeader