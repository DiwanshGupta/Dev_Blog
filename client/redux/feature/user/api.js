import {getuser} from "./slice"
import instance from '../../../utils/axios';

export const currentuser=()=>async(dispatch)=>{
    try {
        const response=await instance('/auth/getUser')
        if(response.status===200){
            console.log("res",response.data)
            dispatch(getuser(response.data)); 
    }
    } catch (error) {
        console.log("error",error.message)
    }
}