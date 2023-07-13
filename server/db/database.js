const mongoose = require('mongoose');

const connectionURL = process.env.MONGODB_URL;
// const connectionURL = 'mongodb://127.0.0.1:27017/'+databaseName
const database = mongoose.connect(connectionURL,{useNewUrlParser:true},(error)=>{
    if(error){
       return console.log(error)
    }
    console.log('Database is up NOW!')
})

module.exports = database