import React, { useEffect } from 'react'
import { Dimensions, View,Text, Image, TouchableOpacity } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '../../store/action/auth';

const {width, height} = Dimensions.get('window')

const HomeHeader = (props) => {
    const customer=useSelector(x=>x.auth.user)
    const currentAddress = useSelector(x=>x.address.currentAddress)
    const header = useSelector(x=>x.address.header)
    const lat = useSelector(x=>x.address.lat)
    const long = useSelector(x=>x.address.long)
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
        {header?<Text style={{fontFamily:'black',fontSize:20, alignSelf:'center' }}>{header}</Text>
        :<Text>loading</Text>}
        </View>
        {/* <Text numberOfLines={1} style={{fontFamily:'light'}}>{customer[0].address}</Text> */}
        {currentAddress?<Text numberOfLines={1} style={{fontFamily:'light',left:14}}>{currentAddress}</Text>
        :
        <Text>loading</Text>}
        </View>
    

        
        <Image
            style={{height:45, width:45, borderRadius:60, alignSelf:'center', margin:6}}
            source={{uri:customer[0].avatar}}
        />

        </View>
    )

}

export default HomeHeader