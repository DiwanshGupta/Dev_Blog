import {getuser, logout, requestFail, requestStart} from "./slice"
import instance from '../../../utils/axios';
import Swal from "sweetalert2";

export const currentuser=()=>async(dispatch)=>{
    dispatch(requestStart())
    try {
        const response=await instance('/auth/getUser')
        if(response.status===200){
            dispatch(getuser(response.data)); 
            console.log("respo",response.data)
    }
    } catch (error) {
        console.log("error",error.message)
        dispatch(requestFail())
    }
}
export const userLogout = () => async (dispatch) => {
    try {
        const response = await instance('/auth/logout'); // Make API call to logout
        if (response.status === 200) {
            Swal.fire({
                title: 'Logout',
                text: 'user Logout successfully',
                icon: 'success',
              })
            dispatch(logout()); // Dispatch the logout action to clear user state
        }
    } catch (error) {
        console.log("Logout error:", error.message);
    }
};