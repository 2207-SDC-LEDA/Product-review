const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  product_id: {type: String, index: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_pric: String,
  features: [
    {
      feature: String,
      value: String
    }
  ],
  relatedItems: [],
  styles:[]
})

// const StyleSchema = new mongoose.Schema({
//   style_id: {type: String, index: true},
//   product_id: String,
//   name: String,
//   sale_price: String,
//   original_price: String,
//   default_style: Boolean,
//   skus: [
//     {size: String,
//     quantity: Number}
//   ],
//   photos: [
//     {
//       thumbnail_url: String,
//       url: String
//     }
//   ]
// })


const Products = mongoose.model('Products', ProductSchema);
// const Styles = mongoose.model('Styles', StyleSchema);

// collection name
module.exports = {Products}