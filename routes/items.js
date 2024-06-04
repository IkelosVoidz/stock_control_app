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
    renderFormPage(res,  new Item(), 'new')
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
    res.redirect(`items/${newItem.id}`) 
  } catch{
    renderFormPage(res ,item ,'new', true)
  }
})


async function renderFormPage(res, item, form,  hasError = false) {
    try {
        const brands = await Brand.find({})
        const params = {
            brands: brands,
            item: item
        }
        if(hasError){
            if(form === 'edit'){
                params.errorMessage = 'Error Updating Item'
            }
            else {
                params.errorMessage = 'Error Creating Item'
            }
        } 
        res.render(`items/${form}`,params)
    } catch {
        res.redirect('/items')
    }
}

//item detail
router.get('/:id', async(req,res) =>{
    try {
        const item = await Item.findById(req.params.id)
                                .populate('brand')
                                .exec()
        res.render('items/show' , {item:item})
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})

//edit item route

router.get('/:id/edit' , async (req,res) =>{
   
    try { 
        const item = await Item.findById(req.params.id)
        renderFormPage(res,item , 'edit')
    }catch (error) {
        res.redirect('/')
    }
   
})

//update item route
router.put('/:id' , async (req,res) =>{
    let item 
  try {

    item = await Item.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            price: req.body.price,
            num_in_stock: req.body.stock
        }) 

    
    res.redirect(`items/${item.id}`) 
  } catch{

    if(item != null){
        renderFormPage(res ,item ,'edit', true)
    }
    else{
        redirectr('/')
    }
  }
})

//delete item page
router.delete('/:id' , async(req,res)=>{
    let item
    try{
        item = await Item.findByIdAndDelete(req.params.id)
        res.redirect('/items')
    }catch{
        if(item != null){
            res.render('items/show', {
                item : item,
                errorMessage: 'Could not delete Item'
            })
        }
        else{
            res.redirect('/')
        }
    }
})

module.exports = router