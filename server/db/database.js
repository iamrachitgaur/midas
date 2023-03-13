const mongoose = require('mongoose');
const databaseName = 'midasApp';

const connectionURL = 'mongodb+srv://angularDatabase:angularDatabase@angulardatabase.vcicwrb.mongodb.net/'+databaseName+'?retryWrites=true&w=majority';
// const connectionURL = 'mongodb://127.0.0.1:27017'
const database = mongoose.connect(connectionURL,{useNewUrlParser:true},(error)=>{
    if(error){
       return console.log(error)
    }
    console.log('Database is up NOW!')
})

module.exports = database