const mongoose = require('mongoose');
const collectionName = 'medicine';

let schema = mongoose.Schema({

    medicine:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    }


},{
    timestamps:true
})

const model = mongoose.model(collectionName,schema)
module.exports = model