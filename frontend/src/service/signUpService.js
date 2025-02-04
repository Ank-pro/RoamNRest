import axios from 'axios'

export const signUpHandler = async(mobileNumber,name,email,password)=>{
    try {
        const {data} = await axios.post('http://localhost:5000/api/auth/register',{
            mobileNumber,
            name,
            email,
            password
        });
        console.log(data);
        return data;
    } catch (error) {
        return error.response?.data || { message: "Something went wrong" };
    }
}

