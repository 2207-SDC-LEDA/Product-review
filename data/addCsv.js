const express = require('express');
const insertRouter = express.Router();
const {Styles} = require('./../models/products.js')
const fs = require('fs')
const productCSV = '/Users/lenordc/Desktop/SDC/Product-review/data/product.csv'
const featuresCSV = '/Users/lenordc/Desktop/SDC/Product-review/data/features.csv'
const stylesCSV = '/Users/lenordc/Desktop/SDC/Product-review/data/styles.csv';
const skusCSV = '/Users/lenordc/Desktop/SDC/Product-review/data/skus.csv';
const photosCSV = '/Users/lenordc/Desktop/SDC/Product-review/data/photos.csv';
const relatedCSV = '/Users/lenordc/Desktop/SDC/Product-review/data/related.csv';
const csv = require('csv-parser')

/*==========Product============*/

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
    console.log(insertData.length, "data insert")
    await Products.insertMany(insertData)
    console.log('products insert complete');
  });
})

insertRouter.post('/addFeatures', (req, res) => {
  var insertPromise = [];
  var thousandDataSet = 0
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
      console.log(thousandDataSet, "thousand insert")
      thousandDataSet ++
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
    await Promise.all(insertPromise)
    .then (() => {
      console.log(insertPromise.length, "of the insert")
    })
    .catch((err) => {
      console.log(err);
    })
    console.log('features insert complete')
  });
})

insertRouter.post('/addRelated', (req, res) => {
  var insertPromise = [];
  var thousandDataSet = 0
  const readable = fs.createReadStream(relatedCSV)
  .pipe(csv({ headers: true}))
  .on('data', async (data) => {
    var productID = data._1
    var pushRelatedID = Number(data._2)
    var updateOne = Products.updateOne({'product_id': productID}, {$push: {'relatedItems': pushRelatedID}})
    insertPromise.push(updateOne)
  if (insertPromise.length === 1000) {
    readable.pause()
    await Promise.all(insertPromise)
    .then (() => {
      console.log(thousandDataSet, "thousand insert")
      thousandDataSet ++
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
    await Promise.all(insertPromise)
    .then (() => {
      console.log(insertPromise.length, "of the insert")
    })
    .catch((err) => {
      console.log(err);
    })
    console.log('features insert complete')
  });
})

/*==========Style============*/


insertRouter.post('/addStyles', async(req, res) => {
  var insertData = [];
  var thousandDataSet = 0
  const readable = fs.createReadStream(stylesCSV)
  .pipe(csv({ headers: true}))
  .on('data', async (data) => {
      var currentDataObj = data
      var defaultStyle = true
      if (currentDataObj._5 == 0) {
        defaultStyle = false
      }
      var modifyDataObj = {style_id: currentDataObj._0,
      product_id: currentDataObj._1,
      name: currentDataObj._2,
      sale_price: currentDataObj._3,
      original_price: currentDataObj._4,
      default_style: defaultStyle}
      insertData.push(modifyDataObj)

      if (insertData.length === 1000) {
        readable.pause()
        await Styles.insertMany(insertData)
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
    console.log(insertData.length, "data insert")
    await Styles.insertMany(insertData)
    console.log('products insert complete');
  });
})

insertRouter.post('/addPhotos', (req, res) => {
  var insertPromise = [];
  var thousandDataSet = 0
  const readable = fs.createReadStream(photosCSV)
  .pipe(csv({ headers: true}))
  .on('data', async (data) => {
    var styleID = data._1
    var pushObj = {"thumbnail_url": data._3, "url": data._2}
    var updateOne = Styles.updateOne({'style_id': styleID}, {$push: {'photos': pushObj}})
    insertPromise.push(updateOne)
  if (insertPromise.length === 1000) {
    readable.pause()
    await Promise.all(insertPromise)
    .then (() => {
      console.log(thousandDataSet, "thousand insert")
      thousandDataSet ++
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
    await Promise.all(insertPromise)
    .then (() => {
      console.log(insertPromise.length, "data insert")
    })
    .catch((err) => {
      console.log(err);
    })
    console.log('features insert complete')
  });
})

insertRouter.post('/addSkus', (req, res) => {
  var insertPromise = [];
  var thousandDataSet = 0
  const readable = fs.createReadStream(skusCSV)
  .pipe(csv({ headers: true}))
  .on('data', async (data) => {

    var styleID = data._1
    var quantity = Number(data._3)
    var pushObj = {'size': data._2, 'quantity': quantity}
    // console.log(typeof(data._2), data._2)
    // console.log(typeof(quantity), quantity)
    var updateOne = Styles.updateOne({'style_id': styleID}, {$push: {'skus': pushObj}})
    insertPromise.push(updateOne)
  if (insertPromise.length === 1000) {
    readable.pause()
    await Promise.all(insertPromise)
    .then (() => {
      console.log(thousandDataSet, "thousand insert")
      thousandDataSet ++
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
    await Promise.all(insertPromise)
    .then (() => {
      console.log(insertPromise.length, "data insert")
    })
    .catch((err) => {
      console.log(err);
    })
    console.log('features insert complete')
  });
})



module.exports = insertRouter

