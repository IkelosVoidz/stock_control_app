if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


//we dont need body parser as it is built into express
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const brandsRouter = require('./routes/brands')
const itemsRouter = require('./routes/items')

app.set('view engine', 'ejs')
app.set('views' , __dirname + '/views')
app.set('layout' , 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({ limit: '10mb', extended: false}))
app.use(express.json());

const mongoose = require ('mongoose')
mongoose.connect(process.env.DATABASE_URL) 
const db = mongoose.connection
db.on('error' , error => console.error(error))
db.on('open' , () => console.log("Connected to Mongoose"))

app.use('/', indexRouter)
app.use('/brands', brandsRouter)
app.use('/items', itemsRouter)


app.listen(process.env.PORT || 3000)