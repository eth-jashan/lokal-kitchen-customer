import Customer from "../../model/Customer"
import { CHECK_USER, CREATE, FETCH_CUSTOMER, Register, SIGN_UP} from "../action/auth"

const initialState={
    user:[],
    userId:null,
    tokenId:null,
    id:null,
    created:false
}

export default (state=initialState,action)=>{
    switch(action.type){
        case Register:
            return{
                ...state,
                id:action.id
            }
        case CREATE:
            console.log(action.userid)
            return{
                ...state,
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
            return{
                ...state,
                user:state.user.concat(newCustomer)
            };
        case FETCH_CUSTOMER:
            return{
                ...state,
                user:action.data.filter(x=>x.uid==action.uid)
            }
        case CHECK_USER:
            return{
                ...state,
                created:action.status
            }
        default:
            return state;
    }
}