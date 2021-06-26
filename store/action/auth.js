import AsyncStorage from "@react-native-async-storage/async-storage";
import Customer from "../../model/Customer";

export const CREATE='CREATE'
export const SIGN_UP = 'SIGN_UP';
export const FETCH_CUSTOMER='FETCH_CUSTOMER'
export const Register='Register'

export const createAccount=(uid,token)=>{
    return async (dispatch)=>{
        dispatch({type:CREATE,userid:uid,tokenid:token})        
    }
}
export const register=(created,number,uid,token)=>{
    return async(dispatch)=>{
        const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user.json`,{
            method:'POST',
            header:{
                'Content Type':'application/json'
            },
            body:JSON.stringify({
                phoneNumber:number,
                uid:uid,
                created:created
            })
        });
        const resData=await response.json()
        dispatch({type:Register,id:resData.name})
        saveDataToStorage(token,uid,created,number)
    }
}

export const signUp = (phoneNumber,email,name,avatar,location,address,created) => {
    return async(dispatch,getState) => {
        const token = getState().auth.tokenId;
        const userId = getState().auth.userId;
        const id=getState().auth.id
        const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user/${id}.json`,{
            method:'PATCH',
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
        saveDataToStorage(token,userId,created,phoneNumber)
    }
}

const saveDataToStorage = (token,userId,created,number) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token:token,
        userId:userId,
        created:created,
        number:number,
    }));
}

export const fetchCustomer=()=>{
    return async (dispatch,getState)=>{
        const token = getState().auth.tokenId;
        const userId = getState().auth.userId;
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user.json')
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Customer(resData[key].id,
                resData[key].phoneNumber,
                resData[key].email,
                resData[key].name,
                resData[key].avatar,
                resData[key].location,
                resData[key].address,
                resData[key].uid,
                resData[key].created))
        }
        dispatch({type:FETCH_CUSTOMER,data:list,uid:userId})
    }
}
