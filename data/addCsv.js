const express = require('express');
const insertRouter = express.Router();
const Products = require('./../models/products.js')
const fs = require('fs')
const productCSV = '/Users/lenordc/Desktop/SDC/Product-review/data/product.csv'
const featuresCSV = '/Users/lenordc/Desktop/SDC/Product-review/data/features.csv'
const csv = require('csv-parser')

console.log()
insertRouter.post('/addProduct', async(req, res) => {
  var insertData = [];
  var thousandDataSet = 0
  const readable = fs.createReadStream(productCSV)
  .pipe(csv({ headers: true}))
  .on('data', async (data) => {
      var currentDataObj = data
      //modify the data format to match the schema
      var modifyDataObj = {product_id: currentDataObj._0,
      name: currentDataObj._1,
      slogan: currentDataObj._2,
      description: currentDataObj._3,
      category: currentDataObj._4,
      default_pric: currentDataObj._5}
      insertData.push(modifyDataObj)

      if (insertData.length === 1000) {
        readable.pause()
        await Products.insertMany(insertData)
        .then(() => {
          console.log(thousandDataSet, 'thousand data insert successfully')
          insertData = []
          thousandDataSet ++
        })
        .then(() => {
          readable.resume()
        })
        .catch((err) => {
          console.log(err);
        })
      }
  })
  .on('end', async () => {
    //insert the rest of it
    await Products.insertMany(insertData)
    console.log('products insert complete');
  });
})

insertRouter.post('/addFeatures', (req, res) => {
  var insertPromise = [];
  var hundredDataSet = 0
  const readable = fs.createReadStream(featuresCSV)
  .pipe(csv({ headers: true}))
  .on('data', async (data) => {
    var productID = data._1
    var pushObj = {"feature": data._2, "value": data._3}
    var updateOne = Products.updateOne({'product_id': productID}, {$push: {'features': pushObj}})
    insertPromise.push(updateOne)
  if (insertPromise.length === 1000) {
    readable.pause()
    await Promise.all(insertPromise)
    .then (() => {
      console.log(hundredDataSet, "hundred insert")
      hundredDataSet ++
      insertPromise = []
    })
    .then(() => {
      readable.resume()
    })
    .catch((err) => {
      console.log(err);
    })
  }
  })


  .on('end', async () => {
    await Promise.all(inserData)
    .then (() => {
      console.log("rest of the insert")
    })
    .catch((err) => {
      console.log(err);
    })
    console.log('features insert complete')
  });
})



module.exports = insertRouter

