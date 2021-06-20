import React from 'react'
import {Text,Dimensions, FlatList,  Image, View} from 'react-native'

const {width, height} = Dimensions.get('window')

const TypeCarousel = () => {

    const bannerArray = [{name:"Breakfast", link:'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/breakfast.jpg?alt=media&token=0a80b543-a477-4aad-9f5b-7924e0d93cf9'},
    {name:"Appetizer", link:'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/appetizer.jpg?alt=media&token=cb2e3a35-49ab-468b-ac5d-4ada461cfe71'},
    {name:"Maincourse", link:'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/maincorse.jpg?alt=media&token=0b33ec10-96da-40fe-8138-ecf2ce32ce37'},
    {name:"Thali", link:'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/thali.jpg?alt=media&token=9e2fd458-1e50-4e7b-a217-e4f52525c66c'},
    {name:"Deserts", link:'https://firebasestorage.googleapis.com/v0/b/mineral-concord-314020.appspot.com/o/desert.jpg?alt=media&token=119a065e-8739-4bec-bc6c-11d0dff08566'}]

    return(
        <View style={{marginVertical:16}}>
            <View style={{padding:8, marginBottom:12}}>
            <Text style={{fontFamily:'medium', fontSize:22}}>Popular Category</Text>
            <Text style={{fontFamily:'light', fontSize:16}}>Well curated list of categories to help you choose</Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={bannerArray}
                keyExtractor = {x=>x.link}
                // snapToAlignment={"center"}
                // snapToInterval={width*0.9}
                renderItem={({item}) =>{
                    return<View style={{width:150, height:150, marginHorizontal:8}}>
                        <Image
                            blurRadius={2}
                            style={{height:'100%', width:'100%', borderRadius:8, opacity:1}}
                            source={{uri:item.link}}
                        />
                        <Text style={{fontFamily:'book',position:'absolute',bottom:10, left:8, color:'white', fontSize:18}}>{item.name}</Text>
                    </View>
                }}
            />
        </View>
    )

}

export default TypeCarousel