import React, { useState } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

//components
import SearchAddress from '../component/SearchAddress';

const AddressSearch = (props) => {

    
    const[address,setAddress] = useState('');
    const onAddressAdd = () => {
        props.navigation.navigate('Home')
    }

    return(<View>
                <SearchAddress onAddress = {onAddressAdd}/>
        <Text style={{color:'black'}}>{address}</Text>
    </View>

    )
}

const styles = StyleSheet.create({})

export default AddressSearch;