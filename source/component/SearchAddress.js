import React, { useEffect, useState,useRef } from 'react'
import {View,TouchableOpacity,StyleSheet,Text,SafeAreaView,Dimensions,ScrollView, Pressable,TextInput} from 'react-native';
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

//api
import GoogleLocationApi from '../api/GoogleLocationApi';
import { Button } from 'react-native-paper';

const {width, height} = Dimensions.get('window')

const SearchAddress = () => {
    const[landMark,setLandmark] = useState();
    const[newAddress,setNewAddress] = useState();

    const modalizeRef = useRef(null);
    const[checked,setChecked] = useState('first');
    const[loc,setLoc] = useState();
    const[address,setAddress] = useState();
    const[isLocated,setIsLocated] = useState()
    const[city,setCity] = useState(null);
    const[postal,setPostal] = useState(null);
    const[coordinates,setCoordinates] = useState()
    const[initial,setInitial] = useState(false);

    const[latD,setLatD] = useState();
    const[longD,setLongD] = useState();

    const initialAddressFunc = async() => {
      let location = await Location.getCurrentPositionAsync({});
      setLoc(location.coords);
      setLatD(location.coords.latitude);setLongD( location.coords.longitude);
      await revereGeoCodeResponse(location.coords.latitude, location.coords.longitude) 
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
           // console.log(response.data);
            const address =  response.data.results[0].formatted_address;
           // setLoc(JSON.stringify( response.data.results[0].geometry.location))
            const loc = JSON.stringify(response.data.results[0].address_components) ;
            
            const array = response.data.results[0].address_components;
            const length = array.length;
            const city = response.data.results[0].address_components[length-4].long_name
            const postal = response.data.results[0].address_components[length-1].long_name
            
            setAddress(address);
            setCity(city);
            setPostal(postal);
            
            console.log('*************************',address);
            console.log('*******city******************',loc);
        }
        catch(e){
            console.log('error!', e)
        }
    }

    return(
        <SafeAreaView style={{width:'100%',height:'100%',marginTop:35}}>
            <ScrollView keyboardShouldPersistTaps={true}>
                <Text style={{fontSize:12,marginHorizontal:21,color:'#08818a',fontFamily:'light'}}>SET DELIVERY LOCATION</Text>
            <GooglePlacesAutocomplete
         placeholder='Search for area, street name...'
         fetchDetails={true}
         styles={Gstyles}
    
        onPress={(data, details) => {
            setAddress('');
            setIsLocated(false);
            
           // 'details' is provided when fetchDetails = true
         const loc = JSON.stringify(details.address_components);
         const address = details.formatted_address;
         setLoc(loc);
         setAddress(address);
         // console.log(details)
         //console.log(loc)
        }}
        query={{
               key: 'AIzaSyDsDKH-37DS6ZnGY_oIi7t5YE0oAAZ-V88',
               language: 'en',
        }}
       />
       <TouchableOpacity onPress={onOpen}>
       <View style={{alignItems:'baseline',marginHorizontal:21,marginVertical:10,flexDirection:'row'}}>
           
           <MaterialCommunityIcons name="crosshairs-gps" size={27} color="#08818a" />
           
       
       <View style={{marginHorizontal:10}}>
       <Text style={{color:'#08818a',fontFamily:'medium'}}>Current Location</Text>
       <Text style={{color:'#08818a',fontFamily:'light'}}>Using GPS</Text>
       </View>
       
       </View>
       </TouchableOpacity>


            </ScrollView>
            
       <Modalize ref={modalizeRef}>
       {loc?<View>
        <Pressable  style={{width:width*0.98, height:height/2.2, alignSelf:'center',marginVertical:2.7}}>
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
        onDragEnd={(e) => onMarkerDragEnd(e.nativeEvent.coordinate)}
          coordinate={{latitude: latD, longitude: longD}}
        />        
        </MapView>
        </Pressable>
        <View style={{padding:10}}>
        <Text style={{fontSize:12,color:'#08818a',fontFamily:'medium'}}>SET DELIVERY LOCATION</Text> 
        
        <View style={{marginVertical:5,flexDirection:'row',alignItems:'center',width:width*0.55}}>
        <EvilIcons  name="location" size={40} color="#0a789f" />
        {address?<Text style={{width:'90%',fontSize:20,fontFamily:'bold',color:'black'}} numberOfLines={2}>{postal}</Text>:<DotIndicator  size={10} color='#cccccc'/>}

        {address?<TouchableOpacity onPress={()=>{modalizeRef.current?.close()}} style={{width:'60%', backgroundColor:'#949494', padding:5, alignSelf:'center', marginVertical:5, borderRadius:4}}>
                            <Text style={{fontSize:14, fontFamily:'book', color:'white', textAlign:'center'}}>Change</Text>
                        </TouchableOpacity>:null}

        </View>
        {address?<Text style={{width:'90%',padding:7,fontFamily:'medium'}} numberOfLines={3}>{address}</Text>:<DotIndicator  size={10} color='#08818a'/>}
        
        </View>
        {address?<View style={{flexDirection:'row',alignItems:'center',marginHorizontal:21}}>
        
        <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
        <Text style={{fontSize:14, fontFamily:'book', color:'black', textAlign:'center'}}>Home</Text>
        
        
            <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
      <Text style={{fontSize:14, fontFamily:'book', color:'black', textAlign:'center'}}>Office</Text>
      
      <RadioButton
        value="third"
        status={ checked === 'third' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('third')}
      />
      <Text style={{fontSize:14, fontFamily:'book', color:'black', textAlign:'center'}}>Other</Text>
      
        </View>:null}
       {checked === 'third'?
                       <TextInput
                       value={newAddress}
                       onChangeText={setNewAddress}
                       placeholder = 'Save This Location As'
                       style={{ fontFamily: 'medium',fontSize:16,backgroundColor:'transparent' , width: Dimensions.get('screen').width*0.65,marginHorizontal:15 }}
                       />:null}
                {address?<TextInput
                       value={landMark}
                       onChangeText={setLandmark}
                       placeholder = 'Enter LandMark'
                       style={{ fontFamily: 'medium',fontSize:16,backgroundColor:'transparent' , width: Dimensions.get('screen').width*0.65,marginHorizontal:15 }}
                       />:null}
        {address?<TouchableOpacity style={{width:'70%', backgroundColor:'#08818a', padding:10, alignSelf:'center', marginVertical:10, borderRadius:4}}>
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