const mongoose = require('mongoose');
const collectionName = 'DrsCase';
const schema = mongoose.Schema(
    {
        caseId:{
            type:Number,
            required:true,
            unique:true
        },
        caseDate:{
            type:String,
            required:true,
            default:(new Date().getMonth()+1)+'/'+new Date().getDate()+'/'+new Date().getFullYear()
        },
        drId:{
            type:Number,
            required:true
        },
        patientId:{
            type:Number,
            required:true
        },
        chiefComplaints:[],
        allergies:[],
        drsNotes:[],
        diagnosis:[],
        prescribedTests:[],
        prescriptions:[{
            reportId:[],
            medicine:{
                type:String,
                trim:true,
            },
            dosage:{
                type:String,
                trim:true
            },
            frequency:{
                feq1:{type:Number,trim:true},
                feq2:{type:Number,trim:true},
                feq3:{type:Number,trim:true},
                feq4:{type:Number,trim:true},
            },
            duration:{
                durationNumber: {type:Number,trim:true},
                durationRadio: {type:String,trim:true}
            },
            instructions:{
                type:String,
            }
        }],
        createdBy:{
            type:String,
            required:true
        },
        createdDate:{
            type:Date,
            required:true,
            default: Date.now()
        },
        updatedBy:{
            type:String,
            required:true
        },
        updatedDate:{
            type:Date,
            required:true,
            default: Date.now()
        }

    },
    {
        timestamps:true
    }
)

schema.index({caseDate:1,drId:1,patientId:1},{unique:true})

const model = mongoose.model(collectionName,schema)
module.exports = model