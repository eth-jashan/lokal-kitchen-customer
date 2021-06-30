import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity, SafeAreaView} from 'react-native';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux';

//icons
import { Feather } from '@expo/vector-icons'; 

//actions
import * as authActions from '../../store/action/auth';
import * as currentAddressActions from '../../store/action/address';

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


//api
import GoogleLocationApi from '../api/GoogleLocationApi';


const{width, height} = Dimensions.get('window')

const MapStartupScreen = (props) => {
    
    

    const [location, setLocation] = useState(null);
    const[address,setAddress] = useState();
    const[foundLocation,setFoundLocation] = useState(false);

    const[finalLat,setFinalLat] = useState()
    const[finalLong,setFinalLong] = useState()

    const[number,setNumber] = useState('');
    const[emailId,setEmailId] = useState('');
    const[customerName,setCustomerName] = useState('');
    const[profilePic,setProfilePic] = useState('');
    const[Method,setMethod] = useState('');
    const[header,setHeader] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
    
        })();
      }, []);

    useEffect(()=>{
        startMap();
        // setNumber(phoneNumber);
        // setEmailId(email);
        // setCustomerName(name);
        // setProfilePic(avatar);
        // setMethod(method);
        dispatch(authActions.fetchCustomer())
    },[foundLocation])
   
    const startMap = async() => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        await revereGeoCodeResponse(location.coords.latitude, location.coords.longitude)   
        setFoundLocation(true)
    }

  

    const revereGeoCodeResponse = async(latitude,longitude) =>{
        try{
            const response = await GoogleLocationApi.get(`geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDsDKH-37DS6ZnGY_oIi7t5YE0oAAZ-V88`)
           // console.log(response.data);
            const address =  response.data.results[0].formatted_address;
            const header = response.data.results[0].address_components[1].short_name
           // setLoc(JSON.stringify( response.data.results[0].geometry.location))
            const loc = JSON.stringify(response.data.results[0].address_components) ;
            const finalLat = response.data.results[0].geometry.location.lat
            const finalLong = response.data.results[0].geometry.location.lng
            
            const array = response.data.results[0].address_components;
            const length = array.length;
            // const city = response.data.results[0].address_components[length-4].long_name
            // const postal = response.data.results[0].address_components[length-1].long_name
            
            setAddress(address);
            setHeader(header);
            setFinalLat(finalLat);
            setFinalLong(finalLong);
        }
        catch(e){
            console.log('error!', e)
        }
    }

    const proceed = async() => {
        
            await dispatch(currentAddressActions.addCurrentAddress(address,header,finalLat,finalLong))
            props.navigation.navigate('Main')
                
    }   

    return(
        <SafeAreaView>
            <View style={{width:width,height:height,alignItems:'center',justifyContent:'center'}}>
                <View style={{width:250,height:250,borderWidth:0,overflow: 'hidden',borderRadius: width/2,borderColor:'#08818a'}}>
                
                {location?<MapView
                    provider={PROVIDER_GOOGLE}
                    minZoomLevel={17} // remove if not using Google Maps
                    style={{width:'100%', height:'100%'}}
                    mapType='standard'
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0222,
                        longitudeDelta: 0.0121,
                    }}>
        
        <Marker
          coordinate={{latitude: location.latitude, longitude: location.longitude}}
        />        
        </MapView>:
         <WaveIndicator size={100} color='#08818a' />
        }
                </View>
                
                <View style={{justifyContent:'center',alignItems:'center',width:width*0.6}}>
                    {location?<View style={{flexDirection:'row',marginVertical:Dimensions.get('window').height*0.02}}>
                    
                    <Text style={{fontSize:18, color:'black',fontFamily:'medium'}}>DELIVERING TO</Text>
                   
                    </View>:null}
                    <Text style={{fontSize:16,fontFamily:'book',textAlign:'center', color:'#8f8f8f'}}>{address}</Text>
                    {address?<TouchableOpacity  style={styles.button}  onPress={()=>{proceed()}}>
                        <Text style={{fontFamily:'book',fontSize:15,color:'#08818a',textAlign:'center'}} >Proceed</Text>
                    
                     </TouchableOpacity>:<DotIndicator size={10} color='#08818a' />}
                    
                   
                </View>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius:100,
        margin:10,
        padding:10,
        alignSelf:'center',
        position:'relative',
        borderWidth:1,
        borderColor:'#08818a'

    }
});


export default MapStartupScreen;