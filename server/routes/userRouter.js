const express = require('express');
const model = require('../models/userModel');
const auth = require('../middleware/auth')
const router = express.Router();

router.post('/userSignup',async (req,res)=>{
        
    const options = Object.keys(req.body);
    const optionMain = ['name','email','password'];
    const isMatch = options.every((option) => optionMain.includes(option) )

    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }

    var maxUserId = await model.findOne().sort('-userId')
     
    if(!maxUserId){
        maxUserId = {userId:0}
    }

    try{
        const user = await new model({userId:maxUserId.userId+1,name:req.body.name,email:req.body.email,password:req.body.password})
        const token = await user.generateAuthToken()
        await user.save()
        res.setHeader('Authorization',`Bearer ${token}`)
        res.status(201).send({user,token,})
    }catch(e){
        if(e.code === 11000){
           return res.status(405).send({error:'email is already taken'})
        }
        res.status(400).send(e)
    }
})

router.post('/userSignin',async (req,res)=>{

    const options = Object.keys(req.body);
    const optionMain = ['email','password'];
    const isMatch = options.every((option) => optionMain.includes(option) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }
    try{

        const user = await model.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()

        // res.setHeader('Authorization',`Bearer ${token}`)
        res.status(200).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/user/me',auth,(req,res)=>{
    res.status(200).send({user:req.user,token:req.token})
})

router.get('/user',auth,async(req,res)=>{
    try{
        const user = await model.find({})
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.patch('/user/me',auth,async (req,res)=>{
   
    const options = Object.keys(req.body);
    const optionMain = ['name','email','password'];
    const isMatch = options.every((option) => optionMain.includes(option) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }
    try{ 
            options.every((option)=> req.user[option] = req.body[option] )
            await req.user.save()
            res.status(201).send({'user':req.user,'token':req.token})
    }catch(e){
            res.status(400).send(e)
    }
})

router.post('/logout',auth,async (req,res)=>{

    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.post('/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send()

    }
    catch(e){
        res.send(500).send(e)
    }

})

router.delete('/user/me',auth,async (req,res)=>{
    
   try{
    await req.user.remove()
    await res.send(req.user)
   }
   catch(e){
       res.status(500).send(e)
   }
      
})

module.exports = router