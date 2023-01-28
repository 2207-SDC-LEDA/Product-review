const mongoose = require('mongoose')

const StyleSchema = new mongoose.Schema({
  style_id: {type: Number, index: true},
  product_id: String,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: Boolean,
  skus: [
    {size: String,
    quantity: Number}
  ],
  photos: [
    {
      thumbnail_url: String,
      url: String
    }
  ]
})

const Styles = mongoose.model('Styles', StyleSchema);
module.exports = {Styles}