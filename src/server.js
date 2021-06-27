const express = require('express')
const {sequelize} = require('../models')
const  linksRoute = require('./routes/links')
const redirectRoute = require('./routes/redirection')
const adminRoute = require('./routes/admin')
const {port} = require('../conifg')


const app = express()
app.use(express.json())
// app.get('/', (req,res)=>{
//     res.send('hello world')
// })
app.use('/',redirectRoute)
app.use('/api/links', linksRoute)
app.use('/api/admin', adminRoute)

sequelize.sync().then().catch()

app.listen(port, ()=>{
    console.log(`Server listening to ${port}`)
})