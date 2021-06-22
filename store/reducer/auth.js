import Customer from "../../model/Customer"
import { CREATE, SIGN_UP} from "../action/auth"

const initialState={
    user:[],
    userId:null,
    tokenId:null
}

export default (state=initialState,action)=>{
    switch(action.type){
        case CREATE:
            return{
                userId:action.userid,
                tokenId:action.tokenid
            }
        case SIGN_UP:
            const newCustomer = new Customer(
                action.userCredentials.id,
                action.userCredentials.phoneNumber,
                action.userCredentials.email, 
                action.userCredentials.name, 
                action.userCredentials.avatar, 
                action.userCredentials.location, 
                action.userCredentials.address, 
                action.userCredentials.uid, 
                action.userCredentials.created
            )
            return{...state,
                user:state.user.concat(newCustomer)};

        default:
            return state;
    }
}