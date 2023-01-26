require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

//show error if error
db.on('error', (error) => console.error(error))
//when open db, only run once
db.once('open', () => console.log('Connected to Database'))

//server accept JSON type
app.use(express.json())

const productRouter = require('./routes/products')

//this endpoint use this router
app.use('/products', productRouter)

const insertRouter = require('./data/addCsv.js')

// uncomment when insert
// app.use('/addcsv', insertRouter)

app.listen(3000, () => console.log ("Server Running"))