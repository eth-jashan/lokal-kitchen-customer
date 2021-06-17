import { FETCH_CATEGORY } from "../action/category"

const initialState={
    category:[]
}

export default(state = initialState,action)=>{
    switch(action.type){
        case FETCH_CATEGORY:
            return{
                ...state,
                category:action.data
            }
        default:
            return state
    }
}