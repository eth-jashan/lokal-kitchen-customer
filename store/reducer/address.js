import { ADD_CURRENT_ADDRESS } from "../action/address"

const initialState = {
    currentAddress:null,
    header:null
}

export default (state = initialState,action) => {
    switch(action.type){
        case ADD_CURRENT_ADDRESS:
            return{
                ...state,
                currentAddress:action.currentAddress,
                header:action.header
            }
        default:
            return state
    }
}