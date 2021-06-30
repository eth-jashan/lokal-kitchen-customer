import React from 'react'
import {TouchableOpacity, Text, View, Dimensions} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addDish, decreaseDish } from '../../store/action/cart'
import { AntDesign } from '@expo/vector-icons';


const DetailAddButton = ({item, onclose}) => {

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
        <View style={{width:Dimensions.get('window').width*0.8, alignSelf:'center', }}>
        {cartObject[item.id]?
        <View style={{borderColor:'#08818a', padding:8, flexDirection:'row', justifyContent:'space-between',width:'100%'}}>
            <View style={{backgroundColor:'#f3f6f7', width:'50%', height:50, flexDirection:'row', justifyContent:'space-between'}}>
            
            <TouchableOpacity onPress={decreaseHandler} style={{justifyContent:'center', borderBottomLeftRadius:6, borderTopLeftRadius:6, width:"30%", height:50, backgroundColor:'#08818a'}}>
            <AntDesign name="minus" style={{alignSelf:'center'}} size={16} color="white" />
            </TouchableOpacity>   
            
            <View style={{width:"40%", alignSelf:'center', height:50, justifyContent:'center'}}>
            <Text style={{fontFamily:'book', fontSize:20, alignSelf:'center'}}>{cartObject[item.id].quantity}</Text>
            </View>

            <TouchableOpacity onPress={addHandler} style={{justifyContent:'center', width:"30%", height:50, backgroundColor:'#08818a',borderBottomRightRadius:6, borderTopRightRadius:6,}}>
            <AntDesign name="plus" style={{alignSelf:'center'}} size={16} color="white" />
            </TouchableOpacity>  
            </View>

            <TouchableOpacity onPress={onclose} style={{height:50, borderRadius:8, backgroundColor:'#08818a',  width:'45%', justifyContent:'center'}}>
            <Text style={{fontSize:18, color:'white', alignSelf:'center'}}>₹ {cartObject[item.id].price}</Text>
        </TouchableOpacity>

        </View>
        :
        <TouchableOpacity onPress={addHandler} style={{height:50, borderRadius:8, backgroundColor:'#08818a',  width:'100%', justifyContent:'center'}}>
            <Text style={{fontSize:18, color:'white', alignSelf:'center'}}>Add To Cart</Text>
        </TouchableOpacity>}
        </View>

    )

}

export default DetailAddButton