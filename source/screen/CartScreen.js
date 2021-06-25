import React from 'react' 
import {View, Text, Image,FlatList, Dimensions, ScrollView} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import AddButton from '../component/AddButton'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import MapView from 'react-native-maps'
import { FontAwesome,AntDesign } from '@expo/vector-icons';

const CartScreen = () => {

    const cartArray = []
    const cartObject = useSelector(x=>x.cart.cartObject)
    const cartAmount = useSelector(x=>x.cart.cartAmount)

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
                console.log('Ccccc', item)
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
         <View style={{width:'100%', backgroundColor:'white', padding:8, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
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
            <Text style={{fontSize:16, fontFamily:'medium',color:'#f8a73b' }}>Change</Text>
        </View>   
        <View style={{width:'100%', backgroundColor:'white', flexDirection:'row'}}>
            <View style={{width:'50%', padding:10, backgroundColor:'white'}}>
            
                <Text style={{fontSize:18, fontFamily:'medium', }}>₹ {cartAmount}</Text> 
                <Text style={{fontSize:16, fontFamily:'book', marginVertical:4, color:'#08818a'}}>Detailed View</Text>
            
            </View>
            <View style={{width:'50%', padding:10, backgroundColor:'#08818a',justifyContent:'center'}}>
                <Text style={{alignSelf:'center', color:'white', fontSize:20,}}>Proceed To Pay</Text>
            </View>
        </View>
        
        </View>

        
        </SafeAreaView>
    )

}

export default CartScreen