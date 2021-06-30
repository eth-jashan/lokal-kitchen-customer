import React, { useEffect, useState,useRef } from 'react'
import {View,TouchableOpacity,StyleSheet,Text,SafeAreaView,Dimensions,ScrollView, Pressable,Button,Alert} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker,Polyline} from 'react-native-maps'
import { Modalize } from 'react-native-modalize';
import { EvilIcons } from '@expo/vector-icons';
import { TextInput }  from 'react-native-paper'
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

//actions
import { useDispatch } from 'react-redux';
import * as addressActions from '../../store/action/address';

const {width, height} = Dimensions.get('window')

const AddAddress = (props) => {

    const dispatch = useDispatch();


    const[mapHeight,setMapHeight] = useState(height/1.5);
    const[mapWidth,setMapWidth] = useState(width*0.98);

    const[postal,setPostal] = useState();
    const[finalLat,setFinalLat] = useState()
    const[finalLong,setFinalLong] = useState()

    const modalizeRef = useRef(null);
    const[checked,setChecked] = useState('');
    const[loc,setLoc] = useState();
    const[address,setAddress] = useState();

    const[initial,setInitial] = useState(false);
    const[header,setHeader] = useState();
    const[addressAs,setAddressAs] = useState('');

    const[latD,setLatD] = useState();
    const[longD,setLongD] = useState();

    const[confirm,setConfirm] = useState(false);
    const[enteredAddress,setEnteredAddress] = useState('');
    const[landMark,setLandmark] = useState('');
    const[direction,setDirection] = useState('');

    const[isDragable,setIsDragable] = useState(true);

    useEffect(()=>{
        initialAddressFunc()
      },[initial])
    
      const initialAddressFunc = async() => {
        let location = await Location.getCurrentPositionAsync({});
        setLoc(location.coords);
        setLatD(location.coords.latitude);setLongD( location.coords.longitude);
        await revereGeoCodeResponse(location.coords.latitude, location.coords.longitude)   
      }

      const onMarkerDragEnd = async(coord) => {
        setLatD(coord.latitude)
        setLongD(coord.longitude)
        await revereGeoCodeResponse(coord.latitude, coord.longitude)
    }

    const onOpen = async() => {
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
            console.log(loc)
            
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

    const validate = async() => {
        if(enteredAddress.trim().length>0 && checked.trim().length>0 && finalLat && finalLong && address){
            if(checked === 'third'){
                if(addressAs.trim().length>0){
                   
                    await dispatch(addressActions.addNewAddress(enteredAddress,landMark,direction,addressAs,finalLat,finalLong,address))
                    props.navigation.goBack()
                }
                else{
                    await dispatch(addressActions.addNewAddress(enteredAddress,landMark,direction,addressAs,finalLat,finalLong,address))
                    props.navigation.goBack()
                }
            }
            else{
                
                await dispatch(addressActions.addNewAddress(enteredAddress,landMark,direction,addressAs,finalLat,finalLong,address))
                props.navigation.goBack()
            }
        }
        else{
            Alert.alert('Invalid Submission','Please Enter The Details',[{text:'Okay'}])
            console.log('Please Enter The Details')
        }
    }

    return(
        <SafeAreaView style={{width:'100%',height:'100%',marginTop:height*0.07}}>
            <ScrollView>
            {loc?<View>
        <Pressable  style={{width:mapWidth, height:mapHeight, alignSelf:'center'}}>
                <MapView
                    provider={PROVIDER_GOOGLE} 
                   
                    style={{width:'100%', height:'100%'}}
                    region={{
                        latitude: latD,
                        longitude: longD,
                        latitudeDelta: 0.0012,
                        longitudeDelta: 0.0021,
                    }}
                    >
        <Marker
        draggable={isDragable}
        image={require('../../assets/marker.png')}
        onDragEnd={(e) => onMarkerDragEnd(e.nativeEvent.coordinate)}
          coordinate={{latitude: latD, longitude: longD}}
        />        
        </MapView>
        </Pressable>
        <View style={{padding:10}}>
        <Text style={{fontSize:12,color:'#08818a',fontFamily:'medium'}}>SET DELIVERY LOCATION</Text> 
        
        <View style={{marginVertical:5,flexDirection:'row',alignItems:'center',width:width*0.8}}>
        <EvilIcons  name="location" size={40} color="#0a789f" />
        {address?<Text style={{width:'90%',fontSize:20,fontFamily:'bold',color:'black'}} numberOfLines={2}>{header}</Text>:<DotIndicator  size={10} color='#cccccc'/>}

        {address?<TouchableOpacity onPress={onOpen} style={{ backgroundColor:'#949494', padding:5, alignSelf:'center', marginVertical:5, borderRadius:4}}>
        <MaterialCommunityIcons name="crosshairs-gps" size={17} color="white" />
                        </TouchableOpacity>:null}

        </View>
        {address?<Text style={{width:'90%',padding:7,fontFamily:'medium'}} numberOfLines={3}>{address}</Text>:<DotIndicator  size={10} color='#08818a'/>}
        
        </View>
        {address && !confirm?<TouchableOpacity onPress = {() =>{setConfirm(true),setMapHeight(height/5);setIsDragable(false)}}
                    style={{width:'70%', backgroundColor:'#08818a', padding:10, alignSelf:'center', marginVertical:10, borderRadius:5}}>
                            <Text style={{fontSize:14, fontFamily:'book', color:'white', textAlign:'center'}}>CONFIRM</Text>
                        </TouchableOpacity>:null}
        
        {address && confirm?<View style={{width:width,height:height}}>
            <View style={{alignSelf:'center',width:'90%',marginVertical:10,borderRadius:5,borderWidth:0.5,backgroundColor:'rgba(8,129,138,0.2)',borderColor:'#076e75'}}>
                <Text style={{fontFamily:'light',padding:7,fontSize:12,color:'#076e75'}}>A detailed address will help our Delivery Partner reach your destination easily</Text>
            </View>

            <View>
            <TextInput
                       value={enteredAddress}
                       onChangeText={setEnteredAddress}
                       mode = 'flat'
                      label = 'HOUSE /FLAT /BLOCK NO.'
                      theme ={{colors:{primary:'#08818a',underlineColor:'trasparent'}}}
                       style={{ fontFamily: 'medium',fontSize:14,backgroundColor:'transparent' ,width:'95%',alignSelf:'center',marginBottom:5}}
                       />
             <TextInput
                       value={landMark}
                       onChangeText={setLandmark}
                       mode = 'flat'
                      label = 'APARTMENT /ROAD /AREA (OPTIONAL)'
                      theme ={{colors:{primary:'#08818a',underlineColor:'trasparent'}}}
                       style={{ fontFamily: 'medium',fontSize:14,backgroundColor:'transparent' ,width:'95%',alignSelf:'center',marginBottom:5}}
                       />
            <TextInput
                       value={direction}
                       onChangeText={setDirection}
                       mode = 'flat'
                      label = 'DIRECTION TO REACH (OPTIONAL)'
                      multiline={true}
                      placeholder='e.g. Ring the bell on the yellow gate'
                      theme ={{colors:{primary:'#08818a',underlineColor:'trasparent'}}}
                      style={{ fontFamily: 'medium',fontSize:14,backgroundColor:'transparent' ,width:'95%',alignSelf:'center',marginBottom:5}}
                       />
            </View>
            <Text style={{marginHorizontal:10,marginTop:23,color:'#08818a',fontFamily:'medium'}}>SAVE THIS ADDRESS AS</Text>
            {address && confirm?<View style={{flexDirection:'row',alignItems:'center',marginHorizontal:21,marginTop:10}}>
        
        <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => {setChecked('first');setAddressAs('Home')}}
      />
        <Text style={{fontSize:14, fontFamily:'book', color:'black', textAlign:'center'}}>Home</Text>
        
        
            <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => {setChecked('second');setAddressAs('Work')}}
      />
      <Text style={{fontSize:14, fontFamily:'book', color:'black', textAlign:'center'}}>Work</Text>
      
      <RadioButton
        value="third"
        status={ checked === 'third' ? 'checked' : 'unchecked' }
        onPress={() => {setChecked('third');setAddressAs('Other')}}
      />
      <Text style={{fontSize:14, fontFamily:'book', color:'black', textAlign:'center'}}>Other</Text>
      
        </View>:null}

               {checked === 'third'?
                                   <TextInput
                                   value={addressAs}
                                   onChangeText={setAddressAs}
                                   mode = 'flat'
                                  label = "SAVE THIS LOCATION AS (OPTIONAL)"
                                  multiline={true}
                                  placeholder="e.g. Mom's Place, Raj's Home"
                                  theme ={{colors:{primary:'#08818a',underlineColor:'trasparent'}}}
                                   style={{ fontFamily: 'medium',fontSize:14,backgroundColor:'transparent' ,width:'95%',alignSelf:'center',marginBottom:5}}
                                   />:null}
        
        <TouchableOpacity onPress = {validate}
                    style={{width:'70%', backgroundColor:'#08818a', padding:10, alignSelf:'center', borderRadius:5}}>
                            <Text style={{fontSize:14, fontFamily:'book', color:'white', textAlign:'center'}}>SAVE AND PROCEED</Text>
                        </TouchableOpacity>

 


        </View>:null}
                

           </View>:<DotIndicator  size={10} color='#08818a'/>}
           </ScrollView>
        
        </SafeAreaView>
    )

}



export default AddAddress;
