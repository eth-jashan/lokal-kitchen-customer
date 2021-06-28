import React, { useState } from 'react'
import {View, Text, Image,Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView from 'react-native-maps'
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const PaymentPage = () => {
    
    const cartArray = []
    const cartObject = useSelector(x=>x.cart.cartObject)
    const cartAmount = useSelector(x=>x.cart.cartAmount)
    const [payment, setPayment] = useState()
    class CartModel {
        constructor(id, name, price,  category, catid, image, quantity, mrp){
            this.id = id;
            this.name = name;
            this.price = price;
            this.category = category;
            this.catid = catid;
            this.image = image;
            this.quantity = quantity
            this.mrp = mrp
        }
    }

    for(const key in cartObject){
        cartArray.push(new CartModel(key, cartObject[key].name, cartObject[key].price, cartObject[key].category,cartObject[key].catid, cartObject[key].image, cartObject[key].quantity, cartObject[key].mrp))
    }


    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <ScrollView>
            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'medium', fontSize:26,alignSelf:'center'}}>Checkout </Text>
            </View>

            <View style={{marginTop:16, width:'100%', backgroundColor:'white', padding:8, flexDirection:'row', justifyContent:'space-between'}}>
            
            <View style={{flexDirection:'row',}}>
            <MapView
                zoomControlEnabled={false}
                style={{height:60, width:60, borderRadius:20}}
            />
            <View>
            <View style={{marginHorizontal:6, alignSelf:'center'}}>
                <Text style={{fontSize:16, fontFamily:'medium', }}>Delivery to Home</Text> 
                <Text style={{fontSize:14, fontFamily:'book', marginVertical:4, color:'gray'}}>Andheri</Text>
            </View>
            </View>
            </View>
            <Text style={{fontSize:16, fontFamily:'medium',color:'#f8a73b',  }}>Change</Text>
            </View>   

            <View style={{width:'90%', borderWidth:0.7, borderColor:'#f5f7f9', alignSelf:'center', marginVertical:16}}/>
            
            {cartArray.map((item, index) =>{
                console.log('Ccccc', item)
                return<View key={item.id} style={{width:Dimensions.get('window').width, padding:8, flexDirection:'row', backgroundColor:'white', }}>
                <Image
                    source={{uri:item.image}}
                    style={{width:80, height:80, borderRadius:16}}
                />

                <View style={{alignSelf:'center', justifyContent:'center'}}>
                    <Text numberOfLines={1} style={{fontFamily:'book', fontSize:20, left:8, width:'70%', marginVertical:4}}>{item.name}</Text>
                    <View style={{left:8, flexDirection:'row', justifyContent:'space-between',width:Dimensions.get('window').width - 110 }}>
                        <Text style={{fontSize:20, fontFamily:'medium', color:'#f8a73b', alignSelf:'center'}}>₹ {item.price}</Text>
                        
                        <View style={{width:78, height:26, borderRadius:6,  borderColor:'#08818a', flexDirection:'row', alignSelf:'center'}}>
                            <View style={{justifyContent:'center', width:26, height:26, borderTopLeftRadius:6, borderBottomLeftRadius:6, backgroundColor:'#08818a'}}>
                            <AntDesign name="minus" style={{alignSelf:'center'}} size={14} color="white" />
                            </View>
                            <View style={{width:30, height:26, backgroundColor:'white',justifyContent:'center'}}>
                                <Text style={{fontFamily:'book', fontSize:18, alignSelf:'center'}}>{item.quantity}</Text>
                            </View>
                            <View style={{width:26, justifyContent:'center', height:26, borderTopRightRadius:6, borderBottomRightRadius:6, backgroundColor:'#08818a'}}>
                            <AntDesign name="plus" style={{alignSelf:'center'}} size={14} color="white" />
                            </View>
                        </View>
                      
                    </View>
                </View>

                
            </View>
            })}

            <View style={{width:'90%', borderWidth:0.7, borderColor:'#f5f7f9', alignSelf:'center', marginVertical:16}}/>

            <Text style={{fontFamily:'medium', fontSize:18, paddingHorizontal:8}}>Payment Method</Text>
            
            <TouchableOpacity onPress={()=>setPayment('cash')} style={{justifyContent:'space-between', width:'90%', borderRadius:30, backgroundColor:'#f5f7f9', padding:10, alignSelf:'center', marginVertical:10, flexDirection:'row'}}>
                <Image
                    style={{width:36, height:36, left:10}}
                    source={require('../../assets/money.png')}
                />
                <Text style={{fontFamily:'book', fontSize:18, left:16, alignSelf:'center'}}>Cash On Delivery</Text>
                {payment === 'cash'?<AntDesign name="checkcircle" size={26} color="#f8a73b" style={{alignSelf:'center'}} />:<View
                style={{height:26, width:26,  borderRadius:26, alignSelf:'center'}}
            ></View>}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setPayment('online')} style={{justifyContent:'space-between', width:'90%', borderRadius:30, backgroundColor:'#f5f7f9', padding:10, alignSelf:'center', marginVertical:10, flexDirection:'row'}}>
                <Image
                    
                    style={{width:36, height:36, left:10}}
                    source={require('../../assets/mobile-payment.png')}
                />
                <Text style={{fontFamily:'book', fontSize:18, left:16, alignSelf:'center'}}>Online Payment</Text>
                {payment === 'online'?<AntDesign name="checkcircle" size={26} color="#f8a73b" style={{alignSelf:'center'}} />:<View
                style={{height:26, width:26,  borderRadius:26, alignSelf:'center'}}></View>}
            </TouchableOpacity>

            <View style={{width:'90%', borderWidth:0.7, borderColor:'#f5f7f9', alignSelf:'center', marginVertical:16}}/>
            
            <View style={{width:'100%', padding:10, backgroundColor:'white'}}>
                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:16, fontFamily:'light'}}>Item Total</Text>
                <Text style={{fontSize:16, fontFamily:'medium'}}>Rs 400</Text>
                </View>

                <View style={{marginVertical:6, width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:16, fontFamily:'light'}}>Discount Total</Text>
                <Text style={{fontSize:16, fontFamily:'light'}}>Not Applied</Text>
                </View>

                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:16, fontFamily:'light', color:'#08818a'}}>Delivery Total</Text>
                <Text style={{fontSize:16, fontFamily:'medium',color:'#08818a'}}>Rs 40</Text>
                </View>
                <View style={{width:'100%', borderWidth:0.5, borderColor:'black', alignSelf:'center', marginVertical:8}}/>
                <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:24, fontFamily:'light', color:'#08818a'}}>Total Cost</Text>
                <Text style={{fontSize:24, fontFamily:'medium',color:'#08818a'}}>Rs 440</Text>
                </View>

                <TouchableOpacity style={{justifyContent:'center',width:"80%", padding:16,marginTop:20, borderRadius:16, backgroundColor:'#08818a', alignSelf:'center'}}>
                    <Text style={{fontSize:18, fontFamily:'book', color:'white', alignSelf:'center'}}>confirm order</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default PaymentPage