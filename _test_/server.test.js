const mongoose = require('mongoose');
const Products = require('../models/products.js');
const request = require('supertest');
const app = require('../server.js');
const productRouter = require('../routes/products.js');

describe('Test the root path', () => {
  test('It should respond with 200 for the GET request', async () => {
    const response = await request(app).get('/products/').query();
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the product info route', () => {
  test('It should respond with 200 for the product GET request', async () => {
    const response = await request(app).get('/products/1');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the product style route', () => {
  test('It should respond with 200 for the style GET request', async () => {
    const response = await request(app).get('/products/1/styles');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the product info route', () => {
  test('It should respond with 200 for the related GET request', async () => {
    const response = await request(app).get('/products/1/related');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the product info route with invalid input', () => {
  test('It should respond with 404 for the invalid input', async () => {
    const response = await request(app).get('/products/1/invalid');
    expect(response.statusCode).toBe(404);
  });
});

describe('Test the product info route with not exist product', () => {
  test('It should respond with 500 for the not exist product', async () => {
    const response = await request(app).get('/products/0');
    expect(response.statusCode).toBe(404);
  });
});

describe('Test the cart route with adding product', () => {
  test('It should respond with 201 for adding product successfully', async () => {
    var product = {
      sku_id: "00001",
      count: "1"
    }
    const response = await request(app).post('/products/cart').send(product);
    expect(response.statusCode).toBe(201);
  });
});

describe('Test clear cart product', () => {
  it('should delete all products in cart', async () => {
    const deleteResponse = await request(app).delete('/products/cart');
    expect(deleteResponse.statusCode).toBe(200);
  })
});

afterAll(async () => {
  await mongoose.connection.close();
});