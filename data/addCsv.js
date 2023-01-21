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
  fs.createReadStream(productCSV)
  .pipe(csv({ headers: true}))
  .on('data', (data) => {
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
        Products.insertMany(insertData)
        .then(() => {
          console.log(thousandDataSet, 'thousand data insert successfully')
          insertData = []
          thousandDataSet ++
        })
        .catch((err) => {
          console.log(err);
        })
      }
  })
  .on('end', () => {
    //insert the rest of it
    Products.insertMany(insertData)
    console.log('products insert complete');
  });
})

insertRouter.post('/addFeatures', (req, res) => {
  var data = 0
  fs.createReadStream(featuresCSV)
  .pipe(csv({ headers: true}))
  .on('data', async (data) => {
    var productID = data._1
    var pushObj = {"feature": data._2, "value": data._3}
    await Products.updateOne({'product_id': productID}, {$push: {'features': pushObj}})
    .then(()=> {
      console.log('insert' + data)
      data ++
    })
    .catch((err) => {
      console.log(err)
    })
  })

  .on('end', () => {
    console.log('features insert complete');
  });
})



module.exports = insertRouter

