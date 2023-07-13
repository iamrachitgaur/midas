const express = require('express');
const mongoose = require('mongoose');
const model = require('../models/drsCaseModel')
const Auth = require('../middleware/auth')
const fileUpload = require('express-fileupload')
const router = express.Router();


router.get('/drsCase',Auth,async (req,res)=>{
    try{
        const drsCase = await model.findOne({caseDate:req.query.caseDate,drId:1,patientId:req.query.patientId})
        res.status(200).send(drsCase)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/previousDrsCase',Auth,async (req,res)=>{
    try{
        const previousCase = await model.find({caseDate:{$lt:req.query.caseDate},drId:1,patientId:req.query.patientId})
       if(!previousCase){
           return res.status(200).send({"error":"no previos case!!"})
       }
        res.status(200).send(previousCase)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/drsCase/:patientId',Auth,fileUpload(),async (req,res)=>{
    const formBody = JSON.parse(req.body.formBody)
    const options = Object.keys(formBody);
    const optionMain = ['drId','patientId','chiefComplaints','allergies','drsNotes','diagnosis','prescriptions','prescribedTests'];
    const isMatch = options.every((option) => optionMain.includes(option) )

    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }
    var maxCaseId = await model.findOne().sort('-caseId')
    if(!maxCaseId){
        maxCaseId = {caseId:0}
    }
    try{

        if(req.files){
            var objectId = new mongoose.Types.ObjectId().toString()
        var fileName = 'report-'+objectId
        req.files.reportFile.mv('./src/assets/profile-picture/'+fileName+'.png',function(error){
           if(error){
               console.log(error)
               return error
           }
       })
        }

        const drsCase = await new model({
            caseId:maxCaseId.caseId+1,
            drId:1,
            patientId:req.params.patientId,

            
            drsNotes:formBody.drsNotes,
            chiefComplaints:formBody.chiefComplaints,
            allergies:formBody.allergies,
            diagnosis:formBody.diagnosis,
            prescriptions:formBody.prescriptions,
            prescribedTests:formBody.prescribedTests,

            createdBy:req.user.email,
            updatedBy:req.user.email
        })
        await drsCase.save()
        res.status(201).send(drsCase)
    }
    catch(e){

        if(e.code === 11000){
            return res.status(405).send({error:'this case is already created!!'})
         }

        res.status(500).send(e)
    }

})

router.patch('/chiefComplaints/:id',Auth,async (req,res)=>{
try{

    const complaint = await model.findById(req.params.id)
    complaint.chiefComplaints.push(req.body.chiefComplaints)
    await complaint.save()
    res.status(201).send(complaint)
}
catch(e){
    res.status(500).send(e)
}


})

router.patch('/removeChiefComplaints/:id',Auth,async (req,res)=>{

    try{
    const complaint = await model.findById(req.params.id)
    complaint.chiefComplaints = req.body.chiefComplaints
    await complaint.save()
    res.status(201).send(complaint)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/allergies/:id',Auth,async (req,res)=>{
    try{
    
        const allergie = await model.findById(req.params.id)
        allergie.allergies.push(req.body.allergies)
        await allergie.save()
        res.status(201).send(allergie)
    }
    catch(e){
        res.status(500).send(e)
    }
    
    
    })

router.patch('/removeAllergies/:id',Auth,async (req,res)=>{
    try{
        const allergie = await model.findById(req.params.id)
        allergie.allergies = req.body.allergies
        await allergie.save()
        res.status(201).send(allergie)
    }
    catch(e){
        res.status(500).send(e)
    }
})    

router.patch('/drsNotes/:id',Auth,async (req,res)=>{
    try{
    
        const drsNote = await model.findById(req.params.id)
        drsNote.drsNotes.push(req.body.drsNotes)
        await drsNote.save()
        res.status(201).send(drsNote)
    }
    catch(e){
        res.status(500).send(e)
    }
    
    
    })

router.patch('/removeDrsNotes/:id',Auth,async (req,res)=>{
    try{
        const drsNote = await model.findById(req.params.id)
        drsNote.drsNotes = req.body.drsNotes
        await drsNote.save()
        res.status(201).send(drsNote)
    }
    catch(e){
    res.status(500).send(e)        
    }
})    

router.patch('/diagnosis/:id',Auth,async (req,res)=>{
    try{
    
        const diagnos = await model.findById(req.params.id)
        diagnos.diagnosis.push(req.body.diagnosis)
        await diagnos.save()
        res.status(201).send(diagnos)
    }
    catch(e){
        res.status(500).send(e)
    }
    
    
    })

router.patch('/removeDiagnosis/:id',Auth,async (req,res)=>{
    try{
        const diagnos = await model.findById(req.params.id)
        diagnos.diagnosis = req.body.diagnosis
        await diagnos.save()
        res.status(201).send(diagnos)
    }
    catch(e){
        res.status(500).send(e)
    }
})    
// more perfection
router.post('/prescription/:id',Auth,fileUpload(),async (req,res)=>{
    try{
        var fileArray = []
        if(req.files){
// length error
        // for(var i=0;i<req.files.reportFile.length;i++){
        //     var objectId = new mongoose.Types.ObjectId().toString()
        // var fileName = 'report-'+objectId
        
        //     if(req.files.reportFile[i].mimetype.match(/image/)){
        //         req.files.reportFile[i].mv('./src/assets/drsCaseReport/images/'+fileName+'.png',function(error){
        //             if(error){
        //                 console.log(error)
        //                 return error
        //             }
        //         })
        //         fileArray.push(fileName)
        //     }
        //     else if(req.files.reportFile[i].mimetype.match(/application/)){
        //         req.files.reportFile[i].mv('./src/assets/drsCaseReport/files/'+fileName+'.pdf',function(error){
        //             if(error){
        //                 console.log(error)
        //                 return error
        //             }
        //         })
        //         fileArray.push(fileName)
        //     }
        //     else{
        //         return res.status(400).send({error:'unsupported file type!!'})
        //     }

        // }

        }
        else{
            return res.status(400).send({error:'please select image!!'})
        }
   

    // const prescription = await model.findById(req.params.id)
    const formBody = JSON.parse(req.body.formBody)
    // prescription.prescriptions.push({
    //     reportId:fileArray,
    //     medicine: formBody.medicine,
    //     dosage: formBody.dosage,
    //     duration: formBody.duration,
    //     frequency: formBody.frequency,        
    //     instructions: formBody.instructions
    //   })
    // await prescription.save() 
    console.log(req.files.reportFile)
    console.log(formBody) 
    console.log(fileArray)

    res.status(201).send({res:'response static'})
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/prescribedTests/:id',Auth,async (req,res)=>{
    try{

        const prescribedTest = await model.findById(req.params.id)
        prescribedTest.prescribedTests.push(req.body.prescribedTests)
        await prescribedTest.save()
        res.status(201).send(prescribedTest)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/removePrescribedTests/:id',Auth,async (req,res)=>{
    try{

        const prescribedTest = await model.findById(req.params.id)
        prescribedTest.prescribedTests = req.body.prescribedTests
        await prescribedTest.save()
        res.status(201).send(prescribedTest)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router