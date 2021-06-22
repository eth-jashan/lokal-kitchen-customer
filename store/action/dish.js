import Dish from "../../model/Dish";

export const FETCH_DISH = 'FETCH_DISH';


export const fetchDish=()=>{
    return async (dispatch,getState)=>{

        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/Dish.json?`)
        const resData=await response.json()
        const list=[]
        for(const key in resData){
            list.push(new Dish(key,
                resData[key].name,
                resData[key].description,
                resData[key].imguri,
                resData[key].spicy,
                resData[key].cuisine,
                resData[key].price,
                resData[key].noServe,
                resData[key].quantity,
                resData[key].categoryid,
                resData[key].categoryname,
                resData[key].uid))
        }
        //console.log(resData);
        dispatch({type:FETCH_DISH,data:list})
    }
}