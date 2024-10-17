import express from 'express'
const app = express()
const dbconfig = require('../config/dbConfig.js')

app.post('/api/register', (req,res)=>{
    console.log("hello");
    
})