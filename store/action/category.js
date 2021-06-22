export const FETCH_CATEGORY = 'FETCH_CATEGORY';

import Category from "../../model/Category";

export const fetchCategory=(uid)=>{
    return async (dispatch,getState)=>{
        //console.log(uid);
        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/category.json?`)
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Category(key,
                resData[key].name,
                resData[key].description,
                resData[key].imguri))
        }
        //console.log(resData);
        dispatch({type:FETCH_CATEGORY,data:list})
    }
}