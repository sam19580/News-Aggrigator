const express = require('express');
const fs = require('fs');
const bcrypt=require('bcrypt');
const app = express();
const port = 3000;
const Valid=require('./util/functions');
const data =require('./data/users.json');
const Validation = require('./Validations/userRegisterValidation');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});
app.post('/register',(req,res)=>{
    let body=req.body;
    let result=Validation.registrationPropertyCheck(body);
    if(result==true){
        console.log("pass");
        let result=Validation.registerValidation(body.username,body.password);
        
        if(result===false){
            return res.status(400).json("invalid credentials")
        }
    }else{
        return res.status(400).json("Missing parameter")
    }
    
    
    const id=parseInt(data.users[data.users.length-1].id+1);
    data.users.push({
        id:id,
        username:body.username,
        password:body.password,
        preferences:[]


    })
    fs.writeFile('./data/users.json',JSON.stringify(data),(err)=>{
        if(err){
            res.status(500).json("internal server error");
        }else{
            return res.status(200).json("user registered successfully");
        }
    })
    return res.status(200).json("sucessfully registered");
})
app.post('/login',(req,res)=>{
     respond="";
    if(Valid.findUsername(req.body.username)){
        if(Valid.findPassword(req.body.password)){
            return res.status(200).json("Sucessfull login")
        }else{
            respond="invalid username/password";
        }
    }else{
        respond="invalid username/password";
    }
    return res.status(401).json(respond);

})


module.exports = app;