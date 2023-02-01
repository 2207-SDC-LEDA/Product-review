const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  sku_id: {
    type: String,
    required: true,
    index: true
  },
  count: {
    type: Number,
    required: true
  }
})


const Cart = mongoose.model('Cart', CartSchema);


// collection name
module.exports = Cart



