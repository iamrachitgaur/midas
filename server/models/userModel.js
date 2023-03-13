const mongoose = require('mongoose');
const collectionName = 'user';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let schema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
        default:0
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value) {
            if (!value.includes('@') && !value.includes('.com')) {
            throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})


schema.statics.findByCredentials = async function(email,password){

    
    const user = await model.findOne({email})
    if(!user){
        throw new Error('unable to signIn')
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to signIn')
    }

    return user

    }



schema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'midas')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

schema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    const maxId = await model.findOne().sort('-id')

    if(maxId){
        user.id = maxId.id+1
    }
    else{
        user.id = 1
    }

    next()
})

const model = mongoose.model(collectionName,schema)
module.exports = model