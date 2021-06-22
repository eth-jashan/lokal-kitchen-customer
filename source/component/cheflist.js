import React, { useEffect } from 'react'
import {Text,Dimensions, FlatList,  Image, View,TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../store/action/profile';

const {width, height} = Dimensions.get('window')

const ChefList  = () => {

    const profile=useSelector(x=>x.profile.profile)
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetch=async()=>{
            await dispatch(fetchProfile())
        }
        fetch();
    },[dispatch])
    return(
        <View style={{marginVertical:16}}>
            <View style={{padding:8, marginBottom:12}}>
            <Text style={{fontFamily:'medium', fontSize:22}}>Popular Chefs</Text>
            <Text style={{fontFamily:'light', fontSize:16}}>Well curated list of chefs to help you choose</Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={profile}
                keyExtractor = {x=>x.id}
                // snapToAlignment={"center"}
                // snapToInterval={width*0.9}
                renderItem={({item}) =>{
                    return<View style={{width:150, padding:8, marginHorizontal:8, backgroundColor:'#f9f9fb', borderRadius:10}}>
                        <Image
                            
                            style={{height:70, width:70, borderRadius:70, alignSelf:'center', margin:8}}
                            source={{uri:item.imguri?imguri:'https://static.vecteezy.com/system/resources/previews/000/364/628/original/vector-chef-avatar-illustration.jpg'}}
                        />
                        <Text style={{fontFamily:'medium', fontSize:18, alignSelf:'center'}}>{item.name}</Text>
                        <Text numberOfLines={1} style={{width:'90%', fontFamily:'light', fontSize:14, alignSelf:'center'}}>{item.cuisine.toString()}</Text>
                        <Text numberOfLines={1} style={{ fontFamily:'book', fontSize:16, alignSelf:'center'}}>{item.address}</Text>
                        <View style={{flexDirection:'row', alignSelf:'center'}}>
                            <View style={{margin:4}} ><AntDesign name="star" size={16} color="gold" /></View>
                            <Text style={{alignSelf:'center'}}>4.5</Text>
                        </View>

                        <TouchableOpacity style={{width:'70%', backgroundColor:'#08818a', padding:8, alignSelf:'center', marginVertical:10, borderRadius:4}}>
                            <Text style={{fontSize:16, fontFamily:'book', color:'white', textAlign:'center'}}>Check Out</Text>
                        </TouchableOpacity>

                    </View>
                }}
            />
        </View>
    )

}

export default ChefList