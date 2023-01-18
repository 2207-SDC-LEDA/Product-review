const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  product_id: Number,
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_pric: String,
  features: [
    {
      feature: String,
      value: Number
    }
  ],
  related: []
})

const StyleSchema = new mongoose.Schema({
  id: Number,
  style_id: Number,
  name: String,
  original_price: Number,
  default: Boolean,
  photos: [
    {
      thumbnail_url: String,
      url: String
    }
  ]
})
// collection name
module.exports = mongoose.model('Products',productSchema)
module.exports = mongoose.model('Styles',StyleSchema)