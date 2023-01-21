const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  product_id: String,
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
  related: []
})


// const StyleSchema = new mongoose.Schema({
//   product_id: Number,
//   name: String,
//   sale_price: Number,
//   original_price: Number,
//   default_style: Boolean,
//   photos: [
//     {
//       thumbnail_url: String,
//       url: String
//     }
//   ],
//   skus: {
//     xs: Number,
//     s: Number,
//     M: Number,
//     L: Number,
//     XL: Number,
//     XXL: Number
//   }
// })

// const CartSchema = new mongoose.Schema({
//   user_session: Number,
//   product_id: Number,
//   active: Number
// })

// collection name
module.exports = mongoose.model('Products', ProductSchema)
// module.exports = mongoose.model('Styles', StyleSchema)
// module.exports = mongoose.model('Cart', CartSchema)