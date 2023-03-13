const express = require('express');
const model = require('../models/patientModel')
const router = express.Router();

router.post('/patient',async (req,res)=>{

    const options = Object.keys(req.body)
    const optionMain = ["patientId","doctorId","firstName","middleName","lastName","age","gender","mobileNumber","apartment","street","city","state","pincode","nationality","profilePic","createdBy","creationDate","updatedBy","updatedDate"]

    const isMatch = options.every((option) => optionMain.includes(option))

    if(!isMatch){
        return res.status(400).send({error:'You Provide Invalid Input'})
     }
    try{
        const patient = await new model(req.body)
        await patient.save()
        res.status(201).send(patient)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/patient',async (req,res)=>{
    try{
        const patient = await model.find()
        res.status(200).send(patient)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/patient/:patientId',async (req,res)=>{
    try{
        const patient = await model.findOne({patientId:req.params.patientId})
        res.status(200).send(patient)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router