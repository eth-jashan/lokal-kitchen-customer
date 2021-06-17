export const LOGIN="LOGIN"

export const createAccount=(uid,token)=>{
    return (dispatch)=>{
        dispatch({type:LOGIN,userid:uid,tokenid:token})
    }
}