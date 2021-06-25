import Profile from "../../model/Profile";

export const FETCH_PROFILE = 'FETCH_PROFILE';

export const fetchProfile = () => {
    return async(dispatch) => {
        const response = await fetch('https://mineral-concord-314020-default-rtdb.asia-southeast1.firebasedatabase.app/chef/profile.json?')
        const resData=await response.json()
        const profiles = []
        console.log("Chef List", resData)
        for(const key in resData){
            profiles.push(new Profile(key,
                resData[key].name,
                resData[key].email,
                resData[key].phone,
                resData[key].cuisine,
                resData[key].type,
                resData[key].geoAddress,
                resData[key].house,
                resData[key].created,
                resData[key].kyc,
                resData[key].uid,
                resData[key].city))
        }
        dispatch({type:FETCH_PROFILE,pData:profiles})
    }
}

