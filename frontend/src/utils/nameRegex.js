export const nameValidate = (name)=>{
    const regex = /^[a-zA-Z]+$/
    return regex.test(name)
}