const path = require('path')
const express = require('express') //it is a function we call to create it
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname) easy to get path

//console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

// defone path for express config
const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views') //default name is view so we changed it
const partialspath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

// setup static directory to serve usually html
app.use(express.static(publicdirectorypath))

//firt is the route so /help or /about, second is a function with two paramters req and response
app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: "Omar Shehata"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Omar Shehata'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help_msg: 'If you need any help please contact the developer',
        title: 'Help',
        name: 'Omar Shehata'
    })
})

app.get('/weather', (req,res) =>{ 
    if(!req.query.address){
        return res.send({
            error: 'address has to be specified'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude ,location } = {})=>{
        if(error){
           return res.send({error})
        }
    
        forecast(latitude,longtitude, (error, forecastdata) => {
            if(error){
                return res.send ({error})
            }
            res.send({
                thelocation: location,
                thedata: forecastdata
            })
          })
    })
})


app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    
    res.send({
        products: []
    })

})

app.get('/help/*', (req,res) =>{
   // res.send('Help article not found')
   res.render('err',{
       title: '404',
       error_message: 'Help article not found',
       name: 'Omar Shehata'
    })
})

app.get('*', (req,res)=>{
    //res.send('My 404 page')
    res.render('err',{
        title: '404',
        error_message: 'Page not found',
        name: 'Omar Shehata'
    })
})

//app.com
//app.com/help
//app.com/about

//start the server
app.listen(port, ()=>{
    console.log('server is up on port ' + port)
}) 