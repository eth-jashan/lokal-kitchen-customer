import Address from "../../model/Address";
import SelectedAddress from "../../model/SelectedAddress";

export const ADD_CURRENT_ADDRESS = 'ADD_CURRENT_ADDRESS';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const STORE_CUSTOMER_ID = 'STORE_CUSTOMER_ID'
export const FETCH_ADDRESS = 'FETCH_ADDRESS';
export const SELECT_ADDRESS = 'SELECT_ADDRESS';
export const addCurrentAddress = (currentAddress,header,lat,long) => {
    return async(dispatch) => {
        dispatch({type:ADD_CURRENT_ADDRESS,currentAddress:currentAddress,header:header
        ,lat:lat,long:long})
    }
}

export const storeCustomerId = (id) =>{
    return async(dispatch) => {
        dispatch({type:STORE_CUSTOMER_ID,customerId:id})
    }
}


export const addNewAddress = (houseAddress,landmark,direction,addressType,lat,long,generatedAddress) => {
    return async(dispatch,getState) => {
        const id=getState().address.customerId;
        const userId = getState().auth.userId;

        const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user/profile/${id}/houseAddress.json`,{
            method:'POST',
            headers:{'Content-Type':'application\json'},
            body:JSON.stringify({id,
                houseAddress,landmark,direction,addressType,lat,long,generatedAddress
            })
        })

        const resData = await response.json()

        dispatch({type:ADD_ADDRESS,addressData:{
            id:resData.name,
            houseAddress,landmark,direction,addressType,uid:userId,lat,long,generatedAddress
        }})
    }
}

export const fetchAddress = () => {
    return async(dispatch,getState) => {
        const id=getState().address.customerId;
        const userId = getState().auth.userId;

        const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user/profile/${id}/houseAddress.json`)
        const resData=await response.json()
        const list = []
        for(const key in resData){
            list.push(new Address(key,userId,resData[key].houseAddress,resData[key].landmark
                ,resData[key].direction,resData[key].addressType,resData[key].lat,resData[key].long,resData[key].generatedAddress))
        }
        dispatch({type:FETCH_ADDRESS,data:list})
    }
}

 export const selectAddress = (addressId,houseAddress,landmark,direction,addressType,lat,long,generatedAddress) =>{
     return async(dispatch,getState) => {
        const profileId = getState().address.customerId;
         const list = {}
          //   list.push(new SelectedAddress(addressId,houseAddress,landmark,direction,addressType,lat,long,generatedAddress,profileId))
          list['SA'] = new SelectedAddress(addressId,houseAddress,landmark,direction,addressType,lat,long,generatedAddress,profileId);
         
         dispatch({type:SELECT_ADDRESS,data:list})
     }
 }