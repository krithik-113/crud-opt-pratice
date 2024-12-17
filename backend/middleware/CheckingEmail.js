const checkEmail = (email) => {
    if (/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) { 
        return email
    }
    return false
}

const checkPhone = (phoneNo) => {
    if (phoneNo.toString().length < 10) {
        return {success:false,message:"Phone no.; must be 10 digits"}
    } else if (phoneNo.toString().length > 10) {
        return {success:false,message:"Phone no.; cannot be more than 10 digits"}
    } else {
        return {success:true,message:phoneNo}
    }
}

module.exports = { checkEmail, checkPhone };