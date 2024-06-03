const express = require('express')
const router = express.Router()
const Brand = require('../models/brands')


//All Brands route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        //get all brands
        const brands = await Brand.find(searchOptions)
        res.render('brands/index' , {
            brands: brands , 
            searchOptions: req.query
        });
    } catch (error) {
        res.redirect('/')
    }
})


//new item route

router.get('/new' , (req,res) =>{
    res.render('brands/new' , { brand : new Brand() })
})


//create item route
router.post('/' , async (req,res) =>{

    const brand = new Brand({
        name: req.body.name
    })

    try{
        const newBrand = await brand.save()
        //res.redirect(`brands/${newBrand.id}`) 
        res.redirect('brands'); 
    }  
    catch{
        res.render('brands/new', {
            brand: brand, 
            errorMessage: 'Error creating Brand'
        })
    } 
})
module.exports = router