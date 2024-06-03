const express = require('express')
const router = express.Router()
const Item = require('../models/items')


//All items route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        //get all items
        const items = await Item.find(searchOptions)
        res.render('items/index' , {
            items: items , 
            searchOptions: req.query
        });
    } catch (error) {
        res.redirect('/')
    }
})


//new item route

router.get('/new' , (req,res) =>{
    res.render('items/new' , { item : new Item() })
})


//create item route
router.post('/' , async (req,res) =>{

    const item = new Item({
        name: req.body.name
    })

    try{
        const newItem = await item.save()
        //res.redirect(`items/${newItem.id}`) 
        res.redirect('items'); 
    }  
    catch{
        res.render('items/new', {
            item: item, 
            errorMessage: 'Error creating Item'
        })
    } 
})
module.exports = router