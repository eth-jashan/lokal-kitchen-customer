import React from 'react'
import {Dimensions, FlatList,  Image, View, Text, ScrollView,TouchableOpacity,Pressable} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window')

const DishList = () => {

    const dishArray = ['1', '2', '3']
    const ImageLink = 'https://images.unsplash.com/photo-1617692855027-33b14f061079?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMGNoaWNrZW4lMjBmb29kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    return(
        <View style={{marginVertical:16}}>
            <View style={{padding:8, marginBottom:12}}>
            <Text style={{fontFamily:'medium', fontSize:22}}>Popular Dishes Near you</Text>
            {/* <Text style={{fontFamily:'light', fontSize:16}}>Well curated list of categories to help you choose</Text> */}
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={dishArray}
                keyExtractor = {x=>x}
                renderItem={({item}) =>{
                    return(
                    <View style={{marginVertical:8, alignSelf:'center'}}>
                        <View style={{width:width*0.9, height:width*0.9/2, alignSelf:'center'}}>
                        <Image
                            style={{height:'100%', width:'100%', borderRadius:10}}
                            source={{uri:ImageLink}}
                        />
                        </View>
                        <View style={{alignSelf:'center', width:width*0.9, marginVertical:6, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row'}}>
                                <Image
                                    style={{width:45, height:45, borderRadius:45}}
                                    source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR7S58NLhyA1hSfDYEEq4adZxAODjXRSeL7fxzXZyGa0MEcktAh5zjr8EgGQaHw267Ah0&usqp=CAU'}}
                                />

                                <View style={{marginHorizontal:4, alignSelf:'center'}}>
                                <Text>Archana's Kitchen</Text>
                                <View style={{flexDirection:'row'}}>
                                <AntDesign name="star" size={16} color="gold" />
                                <Text style={{alignSelf:'center'}}>4.5</Text>
                                </View>
                                </View>
                            </View>

                            <AntDesign style={{alignSelf:'center'}} name="heart" size={24} color="red" />

                        </View>
                    
                    <View style={{width:width*0.9, marginVertical:8,alignSelf:'center'}}>
                        <Text style={{fontSize:18, fontFamily:'medium'}}>North Indian Thali</Text>
                        <Text numberOfLines={2} style={{fontSize:14, fontFamily:'light'}}>North Indian Thali North Indian Thali North Indian Thali North Indian Thali North Indian Thali North Indian Thali North Indian Thali North Indian Thali</Text>
                    </View>
                    
                    <View style={{height:50, width:width*0.9}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection:'row', alignSelf:'center'}}>
                    
                    <TouchableOpacity style={{backgroundColor:'#08818a',padding:8, borderRadius:8, marginVertical:6,marginHorizontal:2, height:35}}>
                        <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center'}}>Non-Veg 🐔</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'#08818a',  padding:8, borderRadius:8, margin:6,height:35 }}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center',}}>less spicy 😀</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'#08818a',padding:8, borderRadius:8, marginVertical:6,marginHorizontal:2, height:35}}>
                        <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center'}}>Thali/Meal 🍱</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'#08818a',  padding:8, borderRadius:8, margin:6, height:35}}>
                    <Text style={{fontFamily:'book', fontSize:18, color:'white', alignSelf:'center',}}>serves 1-2 🧑‍🤝‍🧑</Text>
                    </TouchableOpacity>                  
                    
                    </ScrollView>
                    </View>
                    <View style={{width:width*0.9, flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontFamily:'medium', fontSize:20, alignSelf:'center'}}>₹ 300</Text>

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