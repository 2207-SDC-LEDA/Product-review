const mongoose = require('mongoose');
const Products = require('./../models/products');
const ProductData = {
    "product_id": "1",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_pric": "140",
    "relatedItems": [
      2,
      3,
      8,
      7
    ],
    "styles": [
      {
        "style_id": 1,
        "product_id": "1",
        "name": "Forest Green & Black",
        "sale_price": "null",
        "original_price": "140",
        "default_style": true,
        "skus": [
          {
            "size": "XS",
            "quantity": 8,
          },
          {
            "size": "S",
            "quantity": 16,
          },
        ],
        "photos": [
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
          }
        ],
      },
      {
        "style_id": 2,
        "product_id": "1",
        "name": "Desert Brown & Tan",
        "sale_price": "null",
        "original_price": "140",
        "default_style": false,
        "skus": [
          {
            "size": "XS",
            "quantity": 8,
          },
          {
            "size": "S",
            "quantity": 16,
          }
        ],
        "photos": [
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          },
          {
            "thumbnail_url": "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            "url": "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          },
        ],
      },
    ],
    "features": [
      {
        "feature": "Fabric",
        "value": "Canvas",
      },
      {
        "feature": "Buttons",
        "value": "Brass",
      }
    ],
  }


describe("Jest default test", () => {
  test ("Jest is working", () => {
    const work = true;
    expect(work).toBe(true);
  })
})

describe('Products Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server
    // By using mongoose.connect
    beforeAll(async () => {
      await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true }, (err) => {
          if (err) {
              console.error(err);
              process.exit(1);
          }
      });
  });

    it('create & save user successfully', async () => {
        const validProduct = new Products(ProductData);
        const savedProduct = await validProduct.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.name).toBe(ProductData.name);
        expect(savedProduct.slogan).toBe(ProductData.slogan);
        expect(savedProduct.description).toBe(ProductData.description);
        expect(savedProduct.category).toBe(ProductData.category);
        expect(savedProduct.default_pric).toBe(ProductData.default_pric);
        expect(savedProduct.styles).toHaveLength(2);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert product successfully, but the field does not defined in schema should be undefined', async () => {
        const InvalidField = new Products({ product: '2', productName: 'not avail' });
        const savedProduct = await InvalidField.save();
        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.productName).toBeUndefined();
    });

    //close connection
    afterAll(async () => {
      await mongoose.connection.close();
    });
})

