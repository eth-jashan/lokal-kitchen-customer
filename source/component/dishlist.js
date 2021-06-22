import React, { useEffect } from 'react'
import {Dimensions, FlatList,  Image, View, Text, ScrollView,TouchableOpacity,Pressable} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDish } from '../../store/action/dish';
import { fetchProfile } from '../../store/action/profile';

const {width, height} = Dimensions.get('window')

const DishList = () => {
    const dish=useSelector(x=>x.dish.dish)
    const profile=useSelector(x=>x.profile.profile)
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetch=async()=>{
            await dispatch(fetchDish())
            await dispatch(fetchProfile())
        }
        fetch()
    },[dispatch])
    return(
        <View style={{marginVertical:16}}>
            <View style={{padding:8, marginBottom:12}}>
            <Text style={{fontFamily:'medium', fontSize:22}}>Popular Dishes Near you</Text>
            {/* <Text style={{fontFamily:'light', fontSize:16}}>Well curated list of categories to help you choose</Text> */}
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={dish}
                keyExtractor = {x=>x.id}
                renderItem={({item}) =>{
                    return(
                    <View style={{marginVertical:8, alignSelf:'center'}}>
                        <View style={{width:width*0.9, height:width*0.9/2, alignSelf:'center'}}>
                        <Image
                            style={{height:'100%', width:'100%', borderRadius:10}}
                            source={{uri:item.imguri}}
                        />
                        </View>
                        <View style={{alignSelf:'center', width:width*0.9, marginVertical:6, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row'}}>
                                <Image
                                    style={{width:45, height:45, borderRadius:45}}
                                    source={{uri:profile.some(x=>x.uid==item.uid)?profile[profile.findIndex(x=>x.uid==item.uid)].profileimg?profile[profile.findIndex(x=>x.uid==item.uid)].profileimg:'https://static.vecteezy.com/system/resources/previews/000/364/628/original/vector-chef-avatar-illustration.jpg':null}}
                                />

                                <View style={{marginHorizontal:4, alignSelf:'center'}}>
                                <Text style={{fontSize:16, fontFamily:'medium',margin:4}}>{profile.some(x=>x.uid==item.uid)?profile[profile.findIndex(x=>x.uid==item.uid)].name:null}</Text>
                                <View style={{flexDirection:'row'}}>
                                <View style={{margin:4}} ><AntDesign name="star" size={16} color="gold" /></View>
                                <Text style={{alignSelf:'center'}}>4.5</Text>
                                </View>
                                </View>
                            </View>

                            <AntDesign style={{alignSelf:'center'}} name="heart" size={24} color="red" />

                        </View>
                    
                    <View style={{width:width*0.9, marginVertical:8,alignSelf:'center'}}>
                        <Text style={{fontSize:18, fontFamily:'medium'}}>{item.name}</Text>
                        <Text numberOfLines={2} style={{fontSize:14, fontFamily:'light'}}>{item.description}</Text>
                    </View>
                    
                    <View style={{height:50, width:width*0.9}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection:'row', alignSelf:'center'}}>
                    
                    <TouchableOpacity style={{backgroundColor:'#08818a',padding:8, borderRadius:8, marginVertical:6,marginHorizontal:2, height:38}}>
                        <Text style={{fontFamily:'book', fontSize:18, color:'white', textAlign:'center'}}>Non-Veg 🐔</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'#08818a',  padding:8, borderRadius:8, margin:6,height:38 }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', textAlign:'center',}}>{item.spicy.title}</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={item.cuisine}
                        renderItem={(itemData)=>{
                            return(
                                <TouchableOpacity style={{backgroundColor:'#08818a',padding:8, borderRadius:8, marginVertical:6,marginHorizontal:2, height:38}}>
                                    <Text style={{fontFamily:'book', fontSize:18, color:'white', textAlign:'center'}}>{itemData.item}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />

                    <TouchableOpacity style={{backgroundColor:'#08818a',  padding:8, borderRadius:8, margin:6, height:38}}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', textAlign:'center'}}>serves {item.noServe} 🧑‍🤝‍🧑</Text>
                    </TouchableOpacity>                  
                    
                    </ScrollView>
                    </View>
                    <View style={{width:width*0.9, flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontFamily:'medium', fontSize:20, alignSelf:'center'}}>₹ {item.price}</Text>

                        <TouchableOpacity style={{padding:8, borderRadius:6, borderColor:'#08818a', borderWidth:1, width:"40%"}}>
                            <Text style={{fontSize:20, color:'#08818a', alignSelf:'center'}}>Add +</Text>
                        </TouchableOpacity>

                    </View>
                    </View>)
                }}
            />
        </View>
    )

}

export default DishList