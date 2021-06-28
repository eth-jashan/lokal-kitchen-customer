import AsyncStorage from "@react-native-async-storage/async-storage";
import Customer from "../../model/Customer";

export const CREATE='CREATE'
export const SIGN_UP = 'SIGN_UP';
export const FETCH_CUSTOMER='FETCH_CUSTOMER'
export const Register='Register'
export const CHECK_USER = 'CHECK_USER'

export const createAccount=(uid,token)=>{
    return async (dispatch)=>{
        dispatch({type:CREATE,userid:uid,tokenid:token})        
    }
}
export const checkuser = (uid) => {

    return async (dispatch, getState)=>{

        const response = await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user/check.json')
        const resData = await response.json()
        const uidList = []

        for(const key in resData){
            uidList.push(resData[key].uid)
        }
        console.log('Checkkkk-------', uidList.includes(uid.toString()))
        dispatch({type:CHECK_USER, status:uidList.includes(uid.toString())})
        
    }

}
export const register=(created,number,uid,token)=>{
    return async(dispatch)=>{
        const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user/profile.json`,{
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
        const response = await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user/profile/${id}.json`,{
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
        const response2 = await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user/check.json',{
            method:'POST',
            header:{
                'Content Type':'application/json'
            },
            body:JSON.stringify({
                uid:userId
            })
        })
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
        const response=await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/user/profile.json')
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Customer(key,
                resData[key].phoneNumber,
                resData[key].email,
                resData[key].name,
                resData[key].avatar,
                resData[key].location,
                resData[key].address,
                resData[key].uid,
                resData[key].created))
        }
        console.log('list',resData, list.filter(x=>x.uid === userId))
        dispatch({type:FETCH_CUSTOMER,data:list,uid:userId})
    }
}
