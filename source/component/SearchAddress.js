import React, { useEffect, useState,useRef } from 'react'
import {View,TouchableOpacity,StyleSheet,Text,SafeAreaView,Dimensions,ScrollView, Pressable,FlatList} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker,Polyline} from 'react-native-maps'
import { Modalize } from 'react-native-modalize';
import { EvilIcons } from '@expo/vector-icons';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
  import { RadioButton } from 'react-native-paper';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

//api
import GoogleLocationApi from '../api/GoogleLocationApi';
import { Button } from 'react-native-paper';

//actions
import * as currentAddressAction from '../../store/action/address';
import { useDispatch, useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window')

const SearchAddress = (props) => {

  const savedAddress = useSelector(x=>x.address.noAddress)

    const dispatch = useDispatch();

    const[finalLat,setFinalLat] = useState()
    const[finalLong,setFinalLong] = useState()

    const modalizeRef = useRef(null);
    const[checked,setChecked] = useState('first');
    const[loc,setLoc] = useState();
    const[address,setAddress] = useState();
    const[isLocated,setIsLocated] = useState()
    const[city,setCity] = useState(null);
    const[postal,setPostal] = useState(null);
    const[coordinates,setCoordinates] = useState()
    const[initial,setInitial] = useState(false);
    const[header,setHeader] = useState();

    const[latD,setLatD] = useState();
    const[longD,setLongD] = useState();
    const[isLoading,setIsLoading] = useState(false);

    const addAddress = async(value,header,lat,long) => {
      await dispatch(currentAddressAction.addCurrentAddress(value,header,lat,long))
      props.onAddress()
    }

    useEffect(()=>{
      const startupCalls = async() => {
        setIsLoading(true);
          await dispatch(currentAddressAction.fetchAddress())
          setIsLoading(false);
  }
      startupCalls()
  },[dispatch])

     const initialAddressFunc = async() => {
       let location = await Location.getCurrentPositionAsync({});
       setLatD(location.coords.latitude);setLongD( location.coords.longitude);
     }

     useEffect(()=>{
       initialAddressFunc()
     },[initial])


    const onMarkerDragEnd = async(coord) => {
        setLatD(coord.latitude)
        setLongD(coord.longitude)
        await revereGeoCodeResponse(coord.latitude, coord.longitude)
    }

    const onOpen = async() => {
        modalizeRef.current?.open();
        let location = await Location.getCurrentPositionAsync({});
        setLoc(location.coords);
        setLatD(location.coords.latitude);setLongD( location.coords.longitude);
        await revereGeoCodeResponse(location.coords.latitude, location.coords.longitude)   
    };

    const revereGeoCodeResponse = async(latitude,longitude) =>{
        try{
            const response = await GoogleLocationApi.get(`geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDsDKH-37DS6ZnGY_oIi7t5YE0oAAZ-V88`)
            const address =  response.data.results[0].formatted_address;
            const loc = JSON.stringify(response.data.results[0].address_components) ;
            
            const array = response.data.results[0].address_components;
            const length = array.length;
            const city = response.data.results[0].address_components[length-4].long_name
            const postal = response.data.results[0].address_components[length-1].long_name
            const header = response.data.results[0].address_components[1].short_name
            const finalLat = response.data.results[0].geometry.location.lat
            const finalLong = response.data.results[0].geometry.location.lng
            
            setAddress(address);
            // setCity(city);
             setPostal(postal);
            setHeader(header);
            setFinalLat(finalLat);
            setFinalLong(finalLong);
            
        }
        catch(e){
            console.log('error!', e)
        }
    }

    return(
        <SafeAreaView style={{width:'100%',height:'100%',marginTop:height*0.07}}>
            <ScrollView keyboardShouldPersistTaps={true}>
                <Text style={{fontSize:12,marginHorizontal:21,color:'#08818a',fontFamily:'light'}}>SET DELIVERY LOCATION</Text>
            <GooglePlacesAutocomplete
         placeholder='Search for area, street name...'
         fetchDetails={true}
         styles={Gstyles}
    
        onPress={(data, details) => {
            setIsLocated(false);
            
           // 'details' is provided when fetchDetails = true
         const loc = JSON.stringify(details.address_components);
         const address = details.formatted_address;
         setLoc(loc);
         
         setAddress(address);
         addAddress(details.formatted_address,details.address_components[1].short_name,details.geometry.location.lat,details.geometry.location.lng);
        }}
        query={{
               key: 'AIzaSyDsDKH-37DS6ZnGY_oIi7t5YE0oAAZ-V88',
               language: 'en',
        }}
       />
       <TouchableOpacity onPress={onOpen}>
       <View style={{alignItems:'center',marginHorizontal:21,marginVertical:15,flexDirection:'row'}}>
           
           <MaterialCommunityIcons name="crosshairs-gps" size={27} color="#08818a" />
           
       
       <View style={{marginHorizontal:10}}>
       <Text style={{color:'#08818a',fontFamily:'medium'}}>Current Location</Text>
       <Text style={{color:'#08818a',fontFamily:'light'}}>Using GPS</Text>
       </View>
       
       </View>
       </TouchableOpacity>

       {savedAddress.length>0 && !isLoading?<View style={{width:width,marginTop:width*0.5}}>
        <View style={{justifyContent:'center',height:height*0.06,width:width,backgroundColor:'rgba(165,185,210,0.5)',borderTopLeftRadius:10,borderTopRightRadius:10}}>
                    <Text style={{fontFamily:'medium',fontSize:15,marginHorizontal:15}} >Saved Locations</Text>
                </View>
                <ScrollView scrollEnabled={true}>
                    <FlatList style={{flex:1}} data={savedAddress}
                        keyExtractor = {x=>x.id}
                        scrollEnabled = {true}
                        renderItem={({item}) =>{
                            return(
                                <TouchableOpacity onPress={()=>{addAddress(item.houseAddress,item.addressType,item.lat,item.long)
                                                                }}>
                                        <View style={{flexDirection:'row',padding:20,borderWidth:0.5,borderColor:'#cccccc'}}>
                                    <MaterialCommunityIcons name="map-marker-outline" size={30} color="#2e2e2e" />
                                    <View style={{width:width*0.85,marginHorizontal:10}}>
                                        <Text style={{fontFamily:'medium',color:'#08818a'}}>{item.addressType}</Text>
                                        <Text style={{fontFamily:'light',width:'90%'}}>{item.houseAddress}</Text>
                                    </View>
                                       
                                </View>
                                </TouchableOpacity>

                                
                            )
                        }}/>
                </ScrollView>
                
            </View>:isLoading?<DotIndicator style={{marginTop:50}} size={10} color='rgba(165,185,210,0.5)'/>:null}


            </ScrollView>
  

            
       <Modalize ref={modalizeRef}>
       {loc?<View>
        <Pressable  style={{width:width*0.98, height:height/2.1, alignSelf:'center',marginVertical:2.7}}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                   // onRegionChangeComplete={mapHandler}
                    style={{width:'100%', height:'100%'}}
                    region={{
                        latitude: latD,
                        longitude: longD,
                        latitudeDelta: 0.0012,
                        longitudeDelta: 0.0021,
                    }}
                    //onRegionChangeComplete={mapHandler}
                    >
        <Marker
        draggable={true}
        image={require('../../assets/marker.png')}
        onDragEnd={(e) => onMarkerDragEnd(e.nativeEvent.coordinate)}
          coordinate={{latitude: latD, longitude: longD}}
        />        
        </MapView>
        </Pressable>
        <View style={{padding:10}}>
        <Text style={{fontSize:12,color:'#08818a',fontFamily:'medium'}}>SET DELIVERY LOCATION</Text> 
        
        <View style={{marginVertical:5,flexDirection:'row',alignItems:'center',width:width*0.55}}>
        <EvilIcons  name="location" size={40} color="#0a789f" />
        {address?<Text style={{width:'90%',fontSize:20,fontFamily:'bold',color:'black'}} numberOfLines={2}>{header}</Text>:<DotIndicator  size={10} color='#cccccc'/>}

        {address?<TouchableOpacity onPress={()=>{modalizeRef.current?.close()}} style={{width:'60%', backgroundColor:'#949494', padding:5, alignSelf:'center', marginVertical:5, borderRadius:4}}>
                            <Text style={{fontSize:14, fontFamily:'book', color:'white', textAlign:'center'}}>Change</Text>
                        </TouchableOpacity>:null}

        </View>
        {address?<Text style={{width:'90%',padding:7,fontFamily:'medium'}} numberOfLines={3}>{address}</Text>:<DotIndicator  size={10} color='#08818a'/>}
        
        </View>

        {address?<TouchableOpacity onPress = {() =>{addAddress(address,header,finalLat,finalLong)}}
                    style={{width:'70%', backgroundColor:'#08818a', padding:10, alignSelf:'center', marginVertical:10, borderRadius:4}}>
                            <Text style={{fontSize:14, fontFamily:'book', color:'white', textAlign:'center'}}>Confirm</Text>
                        </TouchableOpacity>:null}
           </View>:null}
       </Modalize>
    
        </SafeAreaView>
    )

}

const Gstyles = StyleSheet.create({
    textInputContainer:{
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth:0,
        zIndex:999,
        width:'90%',
        alignSelf:'center',
        marginTop:10
    },
    textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 45,
        color: '#08818a',
        fontSize: 15,
        zIndex:999,
        fontFamily:'medium'
      },
      predefinedPlacesDescription: {
        color: '#1faadb'
      },
      separator:{
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ad552b',
      },
      description:{
        flexDirection:"row",
        flexWrap:"wrap",
        fontSize:13,
        maxWidth:'60%',
      }
})

export default SearchAddress;