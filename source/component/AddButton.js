import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addDish, decreaseDish } from '../../store/action/cart'
import { AntDesign } from '@expo/vector-icons';


const AddButton = ({item}) => {

    const dispatch = useDispatch()

    const addHandler = () => {

        dispatch(addDish(item))
        
    }

    const decreaseHandler = () => {

        dispatch(decreaseDish(item))

    }

    const cartObject = useSelector(x=>x.cart.cartObject)
    const cartTotal = useSelector(x=>x.cart.cartTotal)
    const cartAmount = useSelector(x=>x.cart.cartAmount)

    console.log('cart', cartObject, cartAmount, cartTotal)

    return(
        <View style={{width:100}}>
        {cartObject[item.id]?
        <View style={{borderColor:'#08818a', padding:8, flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity onPress={decreaseHandler} style={{justifyContent:'center', borderBottomLeftRadius:6, borderTopLeftRadius:6, width:30, height:30, backgroundColor:'#08818a'}}>
            <AntDesign name="minus" style={{alignSelf:'center'}} size={16} color="white" />
            </TouchableOpacity>
            <View style={{width:40, alignSelf:'center'}}>
            <Text style={{fontFamily:'book', fontSize:20, alignSelf:'center'}}>{cartObject[item.id].quantity}</Text>
            </View>
            <TouchableOpacity onPress={addHandler} style={{justifyContent:'center', width:30, height:30, backgroundColor:'#08818a',borderBottomRightRadius:6, borderTopRightRadius:6,}}>
            <AntDesign name="plus" style={{alignSelf:'center'}} size={16} color="white" />
            </TouchableOpacity>
        </View>
        :
        <TouchableOpacity onPress={addHandler} style={{padding:8, borderRadius:6, borderColor:'#08818a', borderWidth:1, width:100}}>
            <Text style={{fontSize:20, color:'#08818a', alignSelf:'center'}}>Add +</Text>
        </TouchableOpacity>}
        </View>

    )

}

export default AddButton