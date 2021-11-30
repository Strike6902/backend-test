const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/SignUpModels');
const bcrypt = require('bcrypt');


router.post('/signup',async(request,response)=>{

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password,saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:securePassword
    })

    signedUpUser.save()
    .then(data =>{
        response.json(data);
        console.log("Sucesso!");
        console.log(data);
    })
    .catch(error =>{
        response.json(error);
        console.log("Falhou!");
        console.log(error);
    })
})

module.exports = router