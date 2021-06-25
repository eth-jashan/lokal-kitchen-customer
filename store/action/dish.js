import Dish from "../../model/Dish";

export const FETCH_DISH = 'FETCH_DISH';
import {getDistance, getPreciseDistance} from 'geolib';


export const fetchDish=()=>{
    return async (dispatch,getState)=>{

        const calculateDistance = (lat, long) => {
            var dis = getDistance(
              {latitude: 19.049370, longitude: 73.020462},
              {latitude: lat, longitude: long},
            );
            const kmDis = dis/1000
            return kmDis 
        }

        const response=await fetch(`https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/Dish.json?`)
        const resData=await response.json()
        const list=[]
        console.log("Dish List", resData)
        for(const key in resData){
            if(parseInt(calculateDistance(resData[key].lat, resData[key].long))<15){
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
                resData[key].uid, 
                resData[key].lat,
                resData[key].long))}else{
                    null
                }
        }
        //console.log(resData);
        dispatch({type:FETCH_DISH,data:list})
    }
}