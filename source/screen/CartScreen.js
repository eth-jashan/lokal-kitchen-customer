import React, { useEffect, useRef, useState } from 'react' 
import {View, Text, Image,FlatList, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import AddButton from '../component/AddButton'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import MapView from 'react-native-maps'
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import {PROVIDER_GOOGLE, Marker,Polyline} from 'react-native-maps'
import { Modalize } from 'react-native-modalize';

//actions
import * as addressActions from '../../store/action/address';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const {width, height} = Dimensions.get('window')

const CartScreen = ({navigation}) => {

    const modalizeRef = useRef(null);
    const dispatch = useDispatch();
    const address = useSelector(x=>x.address.noAddress)
    const selectedAddress = useSelector(x=>x.address.selected)
    const[flatHeight,setFlatHeight] = useState(height/2.1);
    const[viewMore,setViewMore] = useState(false);
    const[isScrollable,setIsScrollable] = useState(false);
    const[isDisable,setIsDisable] = useState(true);
    // console.log('ssssssssssssssssssssssssssssssssssssssssssssssss:',selectedAddress[0].SA.addressId)


    const cartArray = []
    const cartObject = useSelector(x=>x.cart.cartObject)
    const cartAmount = useSelector(x=>x.cart.cartAmount)
    const currentAddress = useSelector(x=>x.address.currentAddress)
    const header = useSelector(x=>x.address.header)
    const lat = useSelector(x=>x.address.lat)
    const long = useSelector(x=>x.address.long)

    const onOpen = async() => {
        modalizeRef.current?.open();
        if(address.length>2){
            setViewMore(true);
            setFlatHeight(height/2.1)
            setIsScrollable(false)
        }
        console.log('show address')
        console.log(address)
        
       
    
    };

  

    useEffect(()=>{
        const startupCalls = async() => {
            await dispatch(addressActions.fetchAddress())
    }
        startupCalls()
    },[dispatch])
    

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

    if(cartArray.length === 0){

        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{width:'100%', height:'100%', justifyContent:'center'}}>
                <Image  
                    source={{uri:'https://i.pinimg.com/originals/b3/aa/49/b3aa496cfe5ec68bda6d0ad56f8fa05d.png'}}
                    style={{height:Dimensions.get('window').width, width:Dimensions.get('window').width, alignSelf:'center'}}
                />
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{justifyContent:'center',width:"80%", padding:16,marginTop:20, borderRadius:16, backgroundColor:'#08818a', alignSelf:'center'}}>
                    <Text style={{fontSize:18, fontFamily:'book', color:'white', alignSelf:'center'}}>Browse Home Chefs</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
    
    
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{}}>
            <View style={{width:'100%', padding:8}}>
                <Text style={{fontFamily:'medium', fontSize:26,alignSelf:'center'}}>My Cart</Text>
            </View>

            <View style={{width:'100%', padding:8, flexDirection:'row'}}>
            
            <Image                
                style={{height:70, width:70, borderRadius:70, alignSelf:'center', margin:8}}
                source={{uri:'https://static.vecteezy.com/system/resources/previews/000/364/628/original/vector-chef-avatar-illustration.jpg'}}
            />

            <View style={{marginHorizontal:6, alignSelf:'center'}}>
                <Text style={{fontSize:18, fontFamily:'book', marginVertical:4}}>Anna's Kitchen</Text>
                <Text style={{fontSize:16, fontFamily:'light', marginVertical:4, color:'gray'}}>Andheri</Text>
            </View>

            </View>
            
            <View>
            
            {cartArray.map((item, index) =>{
               // console.log('Ccccc', item)
                return<View key={item.id} style={{width:Dimensions.get('window').width, padding:8, flexDirection:'row', backgroundColor:'white'}}>
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
            
            </View>
            
            <View style={{justifyContent:'space-between', width:'100%', padding:12, flexDirection:'row', backgroundColor:'white', borderWidth:1, borderColor:'#f5f6f6'}}>
            
            <View style={{flexDirection:'row'}}>
            <FontAwesome style={{marginHorizontal:8, alignSelf:'center'}} name="ticket" size={26} color={"gold"} />
            <Text style={{fontFamily:'book', fontSize:20, marginHorizontal:8,alignSelf:'center'}}>Add Promo Code</Text>
            </View>

            <AntDesign name="right" size={24} color="black" />
            </View>
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
            </View>

            <View style={{height:150}}/>
            
            </ScrollView>
        
        <View style={{width:'100%',   position:'absolute', bottom:0}}>
            <View style={{backgroundColor:'white',flexDirection:'row',padding:15}}>
               
                {selectedAddress.length === 0  ?
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%'}}>
                <TouchableOpacity onPress={onOpen} 
                style={{borderWidth:1.5,borderRadius:4,padding:5,borderColor:'#08818a',marginHorizontal:15,backgroundColor:'#08818a'}}>
                    <Text style={{fontSize:17,alignSelf:'center',color:'white' }}>Select Address</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('AddAddress')}} style={{borderWidth:1.5,borderRadius:4,padding:5,borderColor:'#08818a',marginHorizontal:15}}>
                    <Text style={{fontSize:17,alignSelf:'center',color:'#08818a' }}>Add Address</Text>
                </TouchableOpacity>
                </View> :
                            <View style={{flexDirection:'row',width:width}}>
                            <MapView
                                zoomControlEnabled={false}
                                region={{
                                    latitude: selectedAddress[0].SA.lat,
                                    longitude: selectedAddress[0].SA.long,
                                    latitudeDelta: 0.0012,
                                    longitudeDelta: 0.0021,
                                }}
                                style={{height:60, width:60, borderRadius:20}}
                            >
                                <Marker
                                 draggable={false}
                                 image={require('../../assets/marker.png')}
                                
                                coordinate={{latitude: selectedAddress[0].SA.lat, longitude: selectedAddress[0].SA.long}}
                                 />
                            </MapView>
                            <View>
                            <View style={{marginHorizontal:6,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <Text style={{fontSize:16, fontFamily:'medium',alignSelf:'flex-start' }}>Deliver to {selectedAddress[0].SA.addressType}</Text> 
                                <TouchableOpacity onPress={onOpen}>
                                <Text style={{fontSize:12, fontFamily:'medium',color:'black',alignSelf:'flex-end',color:'#f8a73b'}}>CHANGE</Text>
                                </TouchableOpacity>
                                
                            </View>
                                <View style={{marginHorizontal:6,alignItems:'flex-start',width:width*0.7}}>
                                <Text style={{fontSize:14, fontFamily:'book', marginVertical:4, color:'gray'}}>{selectedAddress[0].SA.houseAddress}</Text>
                                </View>
                               
                            
                            </View>
                            </View>
                }

                
            </View>
        <View style={{width:'100%', backgroundColor:'white', flexDirection:'row'}}>
            <View style={{width:'50%', padding:10, backgroundColor:'white'}}>
            
                <Text style={{fontSize:18, fontFamily:'medium', }}>₹ {cartAmount}</Text> 
                <Text style={{fontSize:16, fontFamily:'book', marginVertical:4, color:'#08818a'}}>Detailed View</Text>
            
            </View>
            <TouchableOpacity disabled={isDisable} onPress={()=>navigation.navigate('Payment')} style={{width:'50%', padding:10, backgroundColor:selectedAddress.length === 0?'#cccccc':'#08818a',justifyContent:'center',borderRadius:4}}>
                <Text style={{alignSelf:'center', color:'white', fontSize:20,}}>Proceed To Pay</Text>
            </TouchableOpacity>
        </View>
        
        </View>

        <Modalize ref = {modalizeRef}  >
            {address.length>0?<View style={{width:width,height:flatHeight}}>
                <View style={{justifyContent:'center',height:height*0.09,width:width,backgroundColor:'rgba(165,185,210,0.5)',borderTopLeftRadius:10,borderTopRightRadius:10}}>
                    <Text style={{fontFamily:'medium',fontSize:15,marginHorizontal:15}} >Choose a Delivery address</Text>
                </View>
                <ScrollView scrollEnabled={isScrollable} keyboardShouldPersistTaps='always'>
                    <FlatList style={{flex:1}} data={address}
                        keyExtractor = {x=>x.id}
                        scrollEnabled = {isScrollable}
                        renderItem={({item}) =>{
                            return(
                                <TouchableOpacity onPress={()=>{dispatch(addressActions.selectAddress(item.id,item.houseAddress,item.landmark,item.direction,item.addressType,item.lat,item.long,item.generatedAddress));
                                                                modalizeRef.current?.close();
                                                                setIsDisable(false);}}>
                                        <View style={{flexDirection:'row',padding:20,borderWidth:0.5,borderColor:'#cccccc'}}>
                                    <MaterialCommunityIcons name="map-marker-outline" size={30} color="#2e2e2e" />
                                    <View style={{width:width*0.85,marginHorizontal:10}}>
                                        <Text style={{fontFamily:'medium',color:'#f8a73b'}}>{item.addressType}</Text>
                                        <Text style={{fontFamily:'light',width:'90%'}}>{item.houseAddress}</Text>
                                    </View>
                                       
                                </View>
                                </TouchableOpacity>

                                
                            )
                        }}/>
                </ScrollView>
                {address.length>3 && viewMore?<TouchableOpacity onPress={()=>{setFlatHeight(height/1.5);setViewMore(false);setIsScrollable(true)}}>
                <View style={{flexDirection:'row',padding:20,alignItems:'center'}}>
                <Text style={{marginHorizontal:10,fontFamily:'medium',color:'#08818a'}}>VIEW MORE</Text>
                </View>
                </TouchableOpacity>:null}
                <TouchableOpacity onPress={()=>{navigation.navigate('AddAddress')}}>
                <View style={{flexDirection:'row',padding:20,alignItems:'center'}}>
                <Entypo name="plus" size={24} color="#08818a" />
                <Text style={{marginHorizontal:10,fontFamily:'medium',color:'#08818a'}}>ADD NEW ADDRESS</Text>
                </View>
                </TouchableOpacity>
                
            </View>:<View>
            <TouchableOpacity onPress={()=>{navigation.navigate('AddAddress')}}>
                <View style={{flexDirection:'row',padding:20,alignItems:'center'}}>
                <Entypo name="plus" size={24} color="#08818a" />
                <Text style={{marginHorizontal:10,fontFamily:'medium',color:'#08818a'}}>ADD NEW ADDRESS</Text>
                </View>
                </TouchableOpacity>
                </View>}
            
        </Modalize>

        
        </SafeAreaView>
    )

}

export default CartScreen