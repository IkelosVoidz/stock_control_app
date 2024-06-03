const express = require('express')
const router = express.Router()
const Item = require('../models/items')
const Brand = require('../models/brands')


//All items route
router.get('/', async (req,res) => {

    let query = Item.find({})

    if(req.query.name != null && req.query.name !== ''){
        query = query.regex('name', new RegExp(req.query.name , 'i'))
    }
    if(req.query.brand != null && req.query.brand !== '' && req.query.brand !== 'all'){
        query = query.where('brand').equals(req.query.brand);
    }


    try {
        //get all brands
        const items = await query.exec()
        const brands = await Brand.find({})
        res.render('items/index' , {
            items: items , 
            brands : brands,
            searchOptions: req.query
        });
    } catch (error) {
        res.redirect('/')
    }
})


//new item route

router.get('/new' , async (req,res) =>{
    renderNewPage(res, new Item())
})


//create item route
router.post('/' , async (req,res) =>{
    const item = new Item({
        name : req.body.name,
        brand: req.body.brand,
        description: req.body.description,
        price: req.body.price,
        num_in_stock: req.body.stock
    })
  try {
    const newItem = await item.save()
    //res.redirect(`items/${newItem.id}`) 
    res.redirect('items'); 
  } catch{
    renderNewPage(res, item , true)
  }
})
module.exports = router

async function renderNewPage(res, item, hasError = false) {
    try {
        const brands = await Brand.find({})
        const params = {
            brands: brands,
            item: item
        }
        if(hasError) params.errorMessage = 'Error Creating Item'
        res.render("items/new",params)
    } catch {
        res.redirect('/items')
    }
}
