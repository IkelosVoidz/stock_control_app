const express = require('express')
const router = express.Router()
const Brand = require('../models/brands')


//All Brands route
router.get('/', async (req,res) => {
    let searchOptions = {}
    const errorMessage = req.query.errorMessage;
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        //get all brands
        const brands = await Brand.find(searchOptions)
        res.render('brands/index' , {
            brands: brands , 
            searchOptions: req.query,
            errorMessage : errorMessage
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
        //res.redirect(`/brands/${newBrand.id}`) 
        res.redirect('brands'); 
    }  
    catch{
        res.render('brands/new', {
            brand: brand, 
            errorMessage: 'Error creating Brand'
        })
    } 
})

router.get('/:id/edit' , async (req, res) =>{
    try {
        const brand = await Brand.findById(req.params.id)
        res.render('brands/edit' , { brand : brand })
    } catch (error) {
        res.redirect('/brands')
        console.log(error)
    }
})

router.put('/:id', async (req,res)=>{
    
    let brand

    try{
        brand = await Brand.findByIdAndUpdate(req.params.id, 
            {
                name: req.body.name
            }) //get the brand
        //res.redirect(`/brands/${brand.id}`) 
        res.redirect('/brands'); 
    }  
    catch(error){
        console.log(error)
        if(brand == null){
            res.redirect('/')
        }
        else{
            res.render('/brands/edit', {
                brand: brand, 
                errorMessage: 'Error Updating Brand'
            })
        }
    } 
})

router.delete('/:id' , async (req,res) =>{
    let brand
    const searchOptions = {}

    try{
        brand = await Brand.findByIdAndDelete(req.params.id) //get the brand
        res.redirect('/brands') 
    }  
    catch(error){
        //console.log(error)
        res.redirect(`/brands?errorMessage=${encodeURIComponent(error)}`);
    } 
})

module.exports = router