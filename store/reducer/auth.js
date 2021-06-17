import { LOGIN } from "../action/auth"

const intitalState={
    userId:null,
    tokenId:null
}

export default AuthHandler=(state=intitalState,action)=>{
    switch(action.type){
        case LOGIN:
            return{
                userId:action.userid,
                tokenId:action.tokenid
            }
        default:return state;
    }
}