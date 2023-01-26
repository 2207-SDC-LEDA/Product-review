const express = require('express')
const router = express.Router()
const {Products, Styles} = require('../models/products')

//getting list of Products
router.get('/', async (req, res) => {
  try {
    console.log(req.query)
    var count = req.query.count || 5
    const listProducts = await Products.find().limit(count)
    const modify = listProducts.map((data) => {
      return {
        "id": data.product_id,
        "name": data.name,
        "slogan": data.slogan,
        "description": data.description,
        "category": data.category,
        "default_price": data.default_pric
      }
    })
    res.send(modify)

  } catch (err) {
    //sent error message if error 500 is server error
    res.status(500).json({message: err.message})
  }
})

//getting product information
router.get('/:product_id', checkID, async (req, res) => {
  const product = await Products.findOne({product_id: req.params.product_id})
  const modify = {
    "id": product.product_id,
    "name": product.name,
    "slogan": product.slogan,
    "description": product.description,
    "category": product.category,
    "default_price": product.default_pric
  }
  res.send(modify)
})

//getting product styles
router.get('/:product_id/styles', checkID, async (req, res) => {
  var id = req.params.product_id
  const style = await Styles.find({product_id: id})

  const modify = style.map((data) => {
    const photos = data.photos.map((result) => {
      return {
        "thumbnail_url": result.thumbnail_url,
        "url": result.url
      }
    })
    return {
      "style_id": data.style_id,
      "name": data.name,
      "original_price": data.original_price,
      "sale_price": data.sale_price,
      "default?": data.default_style,
      "photos": photos
      // missing "skus":
    }
  })

  const send = {
    "product_id": id,
    "results": modify
  }
  res.send(send)
})


// get related ID arr

router.get('/:product_id/related', checkID, async (req, res) => {
  const product = await Products.findOne({product_id: req.params.product_id})
  res.send(product.relatedItems)
})

// middleware check product exsit
// add middleware to second arg in the request
async function checkID(req, res, next) {
  let product
  try {
    if (isNaN(req.params.product_id) == true) {
      return res.status(404).json({message: 'invalid input'})
    }
    product = await Products.find({product_id: req.params.product_id})
    if (product.length == 0) {
      return res.status(404).json({message: 'cannot find the product'})
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
  // other route can use res.product to access the product detail
  res.product = product
  next()
}

module.exports = router