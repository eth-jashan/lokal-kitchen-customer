import { FETCH_CATEGORY } from "../action/category"

const initialState={
    category:[]
}

export default categoryHandler=(state = initialState,action)=>{
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