import React from 'react'
import {Dimensions, FlatList,  Image, View} from 'react-native'

const {width, height} = Dimensions.get('window')

const OfferCarousel = () => {

    const bannerArray = ['1', '2', '3']

    return(
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={bannerArray}
                keyExtractor = {x=>x}
                snapToAlignment={"center"}
                snapToInterval={width*0.9}
                renderItem={({item}) =>{
                    return<View style={{width:width*0.9, height:width*0.9/2, marginHorizontal:8}}>
                        <Image
                            style={{height:'100%', width:'100%'}}
                            source={{uri:'https://i.ytimg.com/vi/n07vmL34mMM/maxresdefault.jpg'}}
                        />
                    </View>
                }}
            />
        </View>
    )

}

export default OfferCarousel