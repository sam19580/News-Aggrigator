const data=require('../data/users.json');
const express=require('express');
const app=express();
app.use(express.json());
class Valid{
    
    static findUsername(value){
        
        console.log(value+"username----");
        const result =data.users.find(element=>element.username==value)
        
        if(result){
            return true;
        }else{
            return false;
        }
    }
    static findPassword(value){
        
        console.log(value);
        const result =data.users.find(el=>el.password===value)
        
        if(result){
            return true;
        }else{
            return false;
        }
    }
}
module.exports=Valid;