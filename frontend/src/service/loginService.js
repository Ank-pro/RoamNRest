import axios from "axios"

export const loginHandler = async (mobileNumber,password)=>{
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login',{mobileNumber,password})
        return res;
    } catch (error) {
        console.log(error.response.data)
    }
}