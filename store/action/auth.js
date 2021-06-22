export const CREATE='CREATE'
export const SIGN_UP = 'SIGN_UP';

export const createAccount=(uid,token)=>{
    return (dispatch)=>{
        dispatch({type:CREATE,userid:uid,tokenid:token})
    }
}

export const signUp = (phoneNumber,email,name,avatar,location,address,created) => {
    return async(dispatch,getState) => {
        const token = getState().auth.tokenId;
        const userId = getState().auth.userId;

        const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user.json`,{
            method:'POST',
            header:{
                'Content Type':'application/json'
            },
            body:JSON.stringify({
                phoneNumber:phoneNumber,
                email:email,
                name:name,
                avatar:avatar,
                location:location,
                address:address,
                uid:userId,
                created:created
            })
        });
        const resData = await response.json();
        console.log(resData.name);
        
        dispatch({
            type:SIGN_UP,
            userCredentials:{
            id:resData.name,
            uid:userId,
            phoneNumber,
            email,
            name,
            avatar,
            location,
            address,
            created
            }
        })
    }
}
