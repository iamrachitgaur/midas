const express = require('express');
const database = require('./server/db/database')
const userRouter = require('./server/routes/userRouter')
const patientRoutes = require('./server/routes/patientRoutes')
const drsCaseRoutes = require('./server/routes/drsCaseRoutes')
const medicineRoutes = require('./server/routes/medicineRoutes')


const app = express();
const port = 4200 || process.env.PORT;

app.use(express.static('./dist/midas'))
app.use(express.json())
app.use('/userApi',userRouter)
app.use('/patientApi',patientRoutes)
app.use('/drsCaseApi',drsCaseRoutes)
app.use('/medicineApi',medicineRoutes)

app.get('/*',(req,res)=>{
    res.sendFile('index.html',{root:'./dist/midas'})
})

app.listen(port,()=>{console.log(`listen on port : ${port}!!`)})
