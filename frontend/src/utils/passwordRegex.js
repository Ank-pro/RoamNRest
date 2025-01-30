export const passwordValidate = (pass)=>{
    const regex = /^(?=.*\d)(?=.*[@#$!&%])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(pass)
}