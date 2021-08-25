
const path = require("path")
const express = require('express');
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forcast  = require('./utils/forcast')

const app = express();

//// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

/// setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebars engine and view location 
app.set('view engine', 'hbs');
app.set('views', viewpath);
hbs.registerPartials(partialPath);

app.get('/', (req, res) =>{
 res.render('index',{
     title:'Index Page',
     author:'Abhishek'
 });
})

app.get('/about', (req, res)=>{
    res.render('about',{
        citizen:'Indian',
        age:21
    })
})

app.get('/contact', (req, res)=>{
    res.render('contact',{
        name:'Abhishek',
        age:21,
        college:'Sage University'
    })
})
app.get('/weather', (req, res) =>{
    /* if(!req.query.address){
        return res.send({
            error:'You must provide an Address'
        })
    } */
    geoCode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
           return res.send({error})
        }
        forcast(latitude, longitude, (error, forecastData)=>{
            if(error){
            return res.send({error})
            }
            res.render('weather',{
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
}) 
app.get('/products',(req, res) =>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term....."
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    });
})
app.get('*', (req, res) =>{
    res.render('404',{
        title:'404 Error',
        errorMessage:'Page not Found'
    })
})


/* 
app.get('/', (req, res) =>{
    //res.send("Hello!...Express");
    //res.send("<h1>Express</h2>");
    res.sendFile("../public/index.html")
})
app.get('/about', (req, res) =>{
    res.send({
        name:'abhishek',
        age:21
    });
})
app.get('/contact', (req, res) =>{
   // res.send("Contact us.....");
   [{
       name:'abhishek',
       contact:454545,
       age:21
   },
   {
    name:'Padam',
   contact:4454545,
   age:21
}]
})*/

app.listen(3000, () => {
    console.log('App is on the server....')
})