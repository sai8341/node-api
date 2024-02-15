const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json())
const Product = require('./models/product.model.js')


// All Products API

app.get('/api/products', async(request, response) => {
    try{
        const products = await Product.find({});
        response.status(200).json(products)
    } catch(error) {
        response.status(500).json({message: error.message})
    }
})

// API Product by ID

app.get('/api/product/:id', async (request, response) => {

    const { id } = request.params;

    try {
        const product = await Product.findById(id)
        response.status(200).json(product);
    } catch(error) {
        response.status(500).json({message: error.message})
    }
})

// API Update Product by ID

app.put('/api/product/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const product = await Product.findByIdAndUpdate(id, request.body);
        if (!product) {
            response.status(500).json({message: "Product Not Found"})
        }
        const updatedProduct = await Product.findById(id);
        response.status(200).json(updatedProduct);
    } catch(error) {
        response.status(500).json({message: error.message})
    }
})

// API Delete Product by ID

app.delete('/api/product/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            response.send(404).json({message: "Product Not Found"})
        }
        response.status(200).json({message: "Product Deleted Successfully"})

    } catch(error) {
        response.status(500).json({ message: error.message })
    }
})

// API Post

app.post('/api/products/', async (request, response) => {
    try{
        const product = await Product.create(request.body)
        response.status(200).json(product);
    } catch(error) {
         response.status(500).json({message: error.message})
    }
})


mongoose.connect(
  "mongodb+srv://saikumarrlap:G32ywrNOPEb05wWm@backenddb.y6avqcl.mongodb.net/Node-API?retryWrites=true&w=majority"
)

.then(() => {
    console.log("Connected to database")
    app.listen(3000, () => console.log("Server is running on port: 3000"));
}).catch(() => {
    console.log('Connection Failed')
})