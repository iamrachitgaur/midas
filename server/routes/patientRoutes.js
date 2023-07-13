const express = require('express');
const mongoose = require('mongoose')
const model = require('../models/patientModel')
const Auth = require('../middleware/auth')
const fileUpload = require('express-fileupload')
const router = express.Router();

router.post('/patient',Auth,fileUpload(),async (req,res)=>{
    const formBody = JSON.parse(req.body.formBody)
    const options = Object.keys(formBody)
    const optionMain = ["clinicId","firstName","middleName","lastName","age","gender","mobileNumber","bloodGroup","apartment","street","city","state","pincode","nationality","patientImage"]

    const isMatch = options.every((option) => optionMain.includes(option))

    if(!isMatch){
        return res.status(400).send({error:'You Provide Invalid Input'})
     }

     var maxPatientId = await model.findOne().sort('-patientId')

     if(!maxPatientId){
        maxPatientId = {patientId:0}
     }     
    try{

        if(req.files){
            var objectId = new mongoose.Types.ObjectId().toString()
        var fileName = 'patient-'+objectId
        req.files.patientImage.mv('./src/assets/profile-picture/'+fileName+'.png',function(error){
           if(error){
               console.log(error)
               return error
           }
       })
        }
        else{
            return res.status(400).send({error:'please select image!!'})
        }
   
        const patient = await new model({
            patientId:maxPatientId.patientId+1,
            clinicId:1,
            firstName:formBody.firstName,
            middleName:formBody.middleName,
            lastName:formBody.lastName,
            age:formBody.age,
            gender:formBody.gender,
            mobileNumber:formBody.mobileNumber,
            bloodGroup:formBody.bloodGroup,
            apartment:formBody.apartment,
            street:formBody.street,
            city:formBody.city,
            state:formBody.state,
            pincode:formBody.pincode,
            nationality:formBody.nationality,
            profilePic:fileName,
            createdBy:req.user.email,
            updatedBy:req.user.email
        })
        await patient.save()
        res.status(201).send(patient)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/patient',Auth,async (req,res)=>{
    try{
        const patient = await model.find()
        res.status(200).send(patient)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/patient/:id',Auth,async (req,res)=>{
    try{
        const patient = await model.findById(req.params.id)
        res.status(200).send(patient)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/patient/:id',Auth,fileUpload(),async (req,res)=>{
    const formBody = JSON.parse(req.body.formBody)
    const options = Object.keys(formBody)
    const optionMain = ["clinicId","firstName","middleName","lastName","age","gender","mobileNumber","bloodGroup","apartment","street","city","state","pincode","nationality","patientImage"]

    const isMatch = options.every((option) => optionMain.includes(option))

    if(!isMatch){
        return res.status(400).send({error:'You Provide Invalid Input'})
     }
     if(req.files){
        var objectId = new mongoose.Types.ObjectId().toString()
     var fileName = 'patient-'+objectId
     req.files.patientImage.mv('./src/assets/profile-picture/'+fileName+'.png',function(error){
        if(error){
            console.log(error)
            return error
        }
    })

     }
     
     try{
         const patient = await model.findById(req.params.id)
        options.every((option)=>patient[option] = formBody[option])
        if(req.files){
            patient.profilePic = fileName
        }
        patient.updatedBy = req.user.email
        patient.updatedDate = Date.now()
        await patient.save()
        res.status(201).send(patient)
     }
     catch(e){
        res.status(500).send(e)
     }

})


module.exports = router