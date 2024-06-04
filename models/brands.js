const mongoose = require('mongoose')
const Item = require('./items')

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
      },
})



  
  

  /*console.log("estoy llegando guarro")
  try {
      const items = await Item.find({ brand: this._id });
      if (items.length > 0) {
          next(new Error('This brand has associated items and cannot be deleted.'));
      } else {
          next();
      }
  } catch (error) {
      next(error);
  }*/

// Apply the middleware to both deleteOne and findByIdAndDelete
brandSchema.pre('findOneAndDelete',{ query: true, document: false }, function (next) {

  Item.find({brand: this.getQuery()._id})
    .then(items => {

      if (items.length > 0) {
        next(new Error('This brand has associated items and cannot be deleted'))
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
      console.log("Hay error")
     }) // Handle errors using catch
})


module.exports = mongoose.model('Brands', brandSchema)