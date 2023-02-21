const express = require('express')
const router = express.Router()
const Products = require('../models/products')
const Cart = require('../models/cart')
const redis = require("redis");


/* ====== Redis ====== */
const client = redis.createClient();
  client
    .connect()
    .then((res) => {
      console.log('connected to redis!');
    });

//getting list of Products
router.get('/', async (req, res) => {
  try {
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
  // console.log("get " + req.params.product_id + " detail")
  const idString = req.params.product_id.toString();
  let isCached = false;
  try {
    const catchResponse = await client.get(idString);
    if (catchResponse) {
      isCached = true;
      results = JSON.parse(catchResponse);
      res.status(200).json(results);
    } else {
    const product = await Products.findOne({product_id: req.params.product_id})
    const modify = {
      "id": product.product_id,
      "name": product.name,
      "slogan": product.slogan,
      "description": product.description,
      "category": product.category,
      "default_price": product.default_pric
    }
    await client.set(idString, JSON.stringify(modify), 'EX', 60*60*24*30)
    res.send(modify)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'err with getting detail'})
  }
})

//getting product styles
router.get('/:product_id/styles', checkID, async (req, res) => {
  var id = req.params.product_id
  // console.log("get " + req.params.product_id + " style")
  const style = await Products.find({product_id: id})

  var result = style[0].styles.map((data) => {
    var skus = {}
    for (var x = 0; x < data.skus.length; x ++) {
      skus[x] = data.skus[x]
    }

    return {
      style_id: data.style_id,
      name: data.name,
      original_price: data.original_price,
      sale_price: data.sale_price,
      "default?": data.default_style,
      photos: data.photos,
      skus: skus
    }
  })
  const format = {
    product_id: id,
    results: result
  }

  res.send(format)
})


// get related ID arr

router.get('/:product_id/related', checkID, async (req, res) => {
  // console.log("get " + req.params.product_id + " related")
  const product = await Products.findOne({product_id: req.params.product_id})
  res.send(product.relatedItems)
})




// post request add sku id to cart

router.post('/cart', async (req, res) => {
  var sku_id = req.body.sku_id;
  var count = Number(req.body.count)
  // console.log("post " + sku_id + " style " + count + " count to cart")
  if (!sku_id || !count) {
    res.status(500).send('No SKU id or count provided.')
  } else {
    Cart.findOneAndUpdate({
      sku_id: sku_id
    }, {
      $inc: {
        count: count
      }
    }, { upsert: true })
    .then((data) => {
      res.status(201).send("cart updated");
    })
  }
});

// delete request clear the cart

router.delete('/cart', (req, res) => {
  Cart.deleteMany({})
  .then((data) => {
    res.status(200).send("cart was cleared");
  })
  .catch((err) => {
    res.status(500).send(`${err}`);
  });
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