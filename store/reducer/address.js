import Address from "../../model/Address"
import SelectedAddress from "../../model/SelectedAddress"
import { ADD_ADDRESS, ADD_CURRENT_ADDRESS, FETCH_ADDRESS, SELECT_ADDRESS, STORE_CUSTOMER_ID } from "../action/address"

const initialState = {
    customerId:null,
    currentAddress:null,
    header:null,
    lat:null,
    long:null,
    selected:[],
    noAddress:[]
}

export default (state = initialState,action) => {
    switch(action.type){
        case ADD_CURRENT_ADDRESS:
            return{
                ...state,
                currentAddress:action.currentAddress,
                header:action.header,
                lat:action.lat,
                long:action.long
            }
        case ADD_ADDRESS:
            const newAddress = new Address(
                action.addressData.id,
                action.addressData.uid,
                action.addressData.houseAddress,
                action.addressData.landmark,
                action.addressData.direction,
                action.addressData.addressType,
                action.addressData.lat,
                action.addressData.long,
                action.addressData.generatedAddress
                
            )
            return{
                ...state,
                noAddress:state.noAddress.concat(newAddress)
            }
        case STORE_CUSTOMER_ID:
            return{
                ...state,
                customerId:action.customerId
            }
         case SELECT_ADDRESS:{
             return{
                 ...state,
                 selected:state.selected.length = 0,
                 selected:state.selected.concat(action.data) 
             }
         }
        case FETCH_ADDRESS:{
            return{
                ...state,
                noAddress:action.data
            }
        }

        default:
            return state
    }
}