import React from 'react'
import {Text,Dimensions, FlatList,  Image, View,TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window')

const ChefList  = () => {

    const cuisineArray = ['Chineese', 'Indian', 'Punjabi', 'Arabic']

    return(
        <View style={{marginVertical:16}}>
            <View style={{padding:8, marginBottom:12}}>
            <Text style={{fontFamily:'medium', fontSize:22}}>Popular Chefs</Text>
            <Text style={{fontFamily:'light', fontSize:16}}>Well curated list of chefs to help you choose</Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={['1', '2', '3']}
                keyExtractor = {x=>x}
                // snapToAlignment={"center"}
                // snapToInterval={width*0.9}
                renderItem={({item}) =>{
                    return<View style={{width:150, padding:8, marginHorizontal:8, backgroundColor:'#f9f9fb', borderRadius:10}}>
                        <Image
                            
                            style={{height:70, width:70, borderRadius:70, alignSelf:'center', margin:8}}
                            source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR7S58NLhyA1hSfDYEEq4adZxAODjXRSeL7fxzXZyGa0MEcktAh5zjr8EgGQaHw267Ah0&usqp=CAU'}}
                        />
                        <Text style={{fontFamily:'medium', fontSize:18, alignSelf:'center'}}>Hebba's Kitchen</Text>
                        <Text numberOfLines={1} style={{width:'90%', fontFamily:'light', fontSize:14, alignSelf:'center'}}>{cuisineArray.toString()}</Text>
                        <Text numberOfLines={1} style={{ fontFamily:'book', fontSize:16, alignSelf:'center'}}>Andheri</Text>
                        <View style={{flexDirection:'row', alignSelf:'center'}}>
                            <AntDesign name="star" size={16} color="gold" />
                            <Text style={{alignSelf:'center'}}>4.5</Text>
                        </View>

                        <TouchableOpacity style={{width:'70%', backgroundColor:'#08818a', padding:8, alignSelf:'center', marginVertical:10, borderRadius:4}}>
                            <Text style={{fontSize:16, fontFamily:'book', color:'white', alignSelf:'center'}}>Check Out</Text>
                        </TouchableOpacity>

                    </View>
                }}
            />
        </View>
    )

}

export default ChefList