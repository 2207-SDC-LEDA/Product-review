const express = require('express')
const router = express.Router()
const Products = require('../models/products')

//getting list of Products
router.get('/', async (req, res) => {
  try {
    const listProducts = await Products.find()
    //set up defult result number
    res.json(listProducts)
  } catch (err) {
    //sent error message if error 500 is server error
    res.status(500).json({message: err.message})
  }
})

//getting product information
router.get('/:id', getProduct, (req, res) => {
  res.send(res.product.name)
})

//getting product styles
router.get('/style/:id', (req, res) => {
  var id = req.params.id

})


// middleware check product exsit
async function getProduct(req, res, next) {
  let product
  try {
    product = await productSchema.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({message: 'cannot find the product'})
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
  //other route can use res.product to access the product detail
  res.product = product
  next()
}

module.exports = router