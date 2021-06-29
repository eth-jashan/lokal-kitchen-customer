export const ADD_CURRENT_ADDRESS = 'ADD_CURRENT_ADDRESS';

export const addCurrentAddress = (currentAddress,header) => {
    return async(dispatch) => {
        dispatch({type:ADD_CURRENT_ADDRESS,currentAddress:currentAddress,header:header})
    }
}