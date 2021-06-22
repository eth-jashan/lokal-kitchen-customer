import { FETCH_PROFILE } from "../action/profile"

const initialState = {
    profile:[]

}

export default profileHandler= (state=initialState,action) => {
    switch(action.type){
        case FETCH_PROFILE:
            return{
                ...state,
                profile:action.pData
            }
        default:
            return state
    }
}