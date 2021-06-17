import { FETCH_DISH } from "../action/dish"

const initialState = {
    dish:[]

}

export default(state=initialState,action) => {
    switch(action.type){
        case FETCH_DISH:
            return{
                ...state,
                dish:action.data
            }
        default:
            return state
    }
}