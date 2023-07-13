const express = require('express');
const model = require('../models/medicineModel')
const Auth = require('../middleware/auth')
const router = express.Router();

router.post('/medicine',Auth,async (req,res)=>{
    try{
     const medicine = await new model(req.body)
     await medicine.save()
     res.status(201).send(medicine)   
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/medicine',Auth,async (req,res)=>{
    try{
        const medicine = await model.find()
        res.status(200).send(medicine)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/searchMedicine',Auth,async (req,res)=>{
    try{


        const medicine = await model.find().regex("medicine",req.query.medicine)
        // const medicine = await model.aggregate([
        //     {$group:{
        //         _id:{medicineName:"$medicine"}
        //     }}
        // ])
        res.status(200).send(medicine)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router
