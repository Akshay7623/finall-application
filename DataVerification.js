const Jwt = require('jsonwebtoken');

const isNull = (data)=>{
    if (typeof data === 'object') {
        return true;
    }else{
        return false;
    }
};

const isUndefined = (data)=>{
    if (typeof data === 'undefined') {
        return true;
    }else{
        return false;
    }
}

const isEmail = (data)=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(data).toLowerCase());
}

const isMobile = (data)=>{
    if(data.toString().trim().length === 10){
        return true;
    }else {
        return false;
    }
}

const isIfsc = (data)=>{
    if(data.toString().trim().length === 11){
        return true;
    }else {
        return false;
    }
}

const isBank = (data)=>{
    if(data.toString().trim().length >=9){
        return true;
    }else {
        return false;
    }
}

const isPassword = (data)=>{
    if(data.toString().trim().length >=6){
        return true;
    }else {
        return false;
    }
}

const isOtp = (data)=>{
    if(data.toString().trim().length === 6){
        return true;
    }else {
        return false;
    }
}

const isReferalCode = (data)=>{
    if(data.toString().trim().length === 10){
        return true;
    }else {
        return false;
    }
}

const isValidtoken = (Bearer,secret)=>{
    if (isNull(Bearer) ||isUndefined(Bearer) || Bearer.trim()==='') {
        return false;
    }else{
        const token = Bearer.split(" ")[1];
        return Jwt.verify(token, secret, (err, authData) => {
            if (err) {
              return false;
            } else {
              return authData;
            }
          });
    }
}


module.exports = {isNull,isUndefined,isEmail,isMobile,isIfsc,isBank,isPassword,isOtp,isReferalCode,isValidtoken};