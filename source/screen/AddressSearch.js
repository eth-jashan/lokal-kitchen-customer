import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet,Dimensions,ScrollView,FlatList,TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDish } from '../../store/action/dish';

//components
import SearchAddress from '../component/SearchAddress';

//actions
import * as addressActions from '../../store/action/address';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const {width, height} = Dimensions.get('window')

const AddressSearch = (props) => {
    const address = useSelector(x=>x.address.noAddress)
    // console.log('yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',address)

    const dispatch = useDispatch()
    const onAddressAdd = async() => {
        console.log("statrttt")
        await dispatch(fetchDish())
        props.navigation.navigate('Home')
    }

    useEffect(()=>{
        const startupCalls = async() => {
            await dispatch(addressActions.fetchAddress())
    }
        startupCalls()
    },[dispatch])
    

    return(<View style={{width:width,height:height}}>
                <SearchAddress onAddress = {onAddressAdd}/>

    </View>

    )
}

const styles = StyleSheet.create({})

export default AddressSearch;