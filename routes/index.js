const express = require('express')
const router = express.Router()
const Item = require('../models/items')
const Brand = require('../models/brands')



router.get('/', async (req,res) => {
   
    let numBrands = -1
    let numItems = -1
    try {
        numBrands = await Brand.countDocuments({});
        numItems = await Item.countDocuments({});
    } catch (error) {
        console.error('Error fetching counts:', error);
    }
    
    res.render('index', {
        numBrands : numBrands,
        numItems : numItems
    });
    
})


module.exports = router