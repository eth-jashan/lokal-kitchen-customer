import React from 'react'
import { Dimensions } from 'react-native'
import { View,Text,Image,TouchableOpacity } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const StartupScreen=props=>{
    return(
        <SafeAreaView style={{flex:1}} >
        <View style={{flex:1,backgroundColor:'#ededee'}}>
            <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:'50%'}} >
            <Text style={{fontFamily:'logo',fontSize:20,textAlign:'center'}} >Welcome To <Text style={{fontFamily:'book',fontSize:20}} >Lokal Kitchen</Text></Text>
            <Image source={{uri:'https://static.wixstatic.com/media/5225cf_871c4f751a444e81beae1d2b782541fc~mv2.png/v1/fill/w_358,h_354,al_c,q_85,usm_0.66_1.00_0.01/QR%20Code%20Logo%20(1).webp'}} 
                style={{width:'50%',height:'50%',marginTop:20}}
            />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',position:'absolute',right:0,bottom:Dimensions.get('screen').height*0.15,left:0}} >
                <View style={{marginLeft:20,height:120,justifyContent:'center'}}  >
                    <Text style={{fontFamily:'book',fontSize:18}} >Unlock your dineline</Text>
                    <Text style={{fontFamily:'book',fontSize:15}} >Sign-in Now</Text>
                </View>
                <View style={{borderBottomLeftRadius:100,borderTopLeftRadius:100,height:120,width:70,padding:10,justifyContent:'center',backgroundColor:'#08818a'}} >
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}}>
                <Ionicons name='arrow-forward' size={35} color='white'/> 
                </TouchableOpacity>
                </View>
            </View>
            
        </View>

        </SafeAreaView>
    )
}

export default StartupScreen