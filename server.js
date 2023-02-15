require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://54.146.57.84:27017/productConverFrom-Csv")
.catch((err) => {
  console.log(err)
})
try {
  const db = mongoose.connection
  //show error if error
  db.on('error', (error) => console.error(error))
  //when open db, only run once
  db.once('open', () => console.log('Connected to Database'))
} catch(err) {
  console.log(error)
}


//server accept JSON type
app.use(express.json())

var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use("/heartbeats", () => (console.log('heartbeats successed')))
const productRouter = require('./routes/products')

//this endpoint use this router
app.use('/products', productRouter)

//loaderio
app.get('/loaderio-a416e9ac1ea0dd9698d6e70193e51a24.txt', (req, res) => {
  res.status(200).download('./loaderio-a416e9ac1ea0dd9698d6e70193e51a24.txt')
})


/* ====== uncomment when insert ====== */
// const insertRouter = require('./data/addCsv.js')
// app.use('/addcsv', insertRouter)


/* ====== commentout when doing jest test ====== */
app.listen(8000, () => console.log ("Server Running"))

module.exports = app