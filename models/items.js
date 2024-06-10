const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
      },
      description: {
        type: String,
        minLength: 1,
        maxLength: 300,
      },
      brand: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brands',
        required: true,
        default: null
      },
      price: {
        type: Number,
        required: true,
        min: 1,
      },
      num_in_stock: {
        type: Number,
        required: true,
        min: 0,
      }
})

module.exports = mongoose.model('Items', itemSchema)