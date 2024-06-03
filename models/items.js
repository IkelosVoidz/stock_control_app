const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
      },
      /*brand: {
        type: String,
        required: true,
        minLength: 1,
      },
      description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300,
      },
      /*category: { //TODO : hacer todo lo de la categoria si da tiempo
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
      size: {
        type: String,
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
      },*/
})

module.exports = mongoose.model('Items', itemSchema)