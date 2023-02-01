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



const Products = mongoose.model('Products', ProductSchema);
// const Styles = mongoose.model('Styles', StyleSchema);

// collection name
module.exports = Products