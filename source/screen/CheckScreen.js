import React, { useEffect } from 'react'
import {View, Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomer, register } from '../../store/action/auth'

const CheckScreen = ({navigation, route}) => {

    const user = useSelector(x=>x.auth.created)
    const {userId, token, number} = route.params
    const dispatch = useDispatch()
    useEffect(()=>{
        loginTransform()
    })
    const loginTransform = async() => {
        if(user){
            await dispatch(fetchCustomer())
            navigation.navigate('Map',{phoneNumber:number})   
        }else{
            
            await dispatch(register(false,number,userId,token))
            navigation.navigate('Profile',{type:'Phone',pNumber:number})
        }
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>

        </SafeAreaView>
    )

}

export default CheckScreen