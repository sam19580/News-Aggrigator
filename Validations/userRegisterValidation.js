class Validation{

static registerValidation(username,password){
    console.log("username validation---"+username==='string');
    if(typeof(username)==='string'&&typeof(password)==='string'&&username.length>3&&password.length>4){
        return true;
    }else{
        return false;
        }
    }

    static registrationPropertyCheck(body){
        if(body.hasOwnProperty("username")&&body.hasOwnProperty("password")){
            return true;
        }else
            { 
                return false}
        }

}
module.exports=Validation;