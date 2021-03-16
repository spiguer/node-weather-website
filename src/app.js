const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')//se quiser usar outro nome na pasta que não views
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)//se quiser usar outro nome na pasta que não views
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Nuno Batista'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Nuno Batista'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Nuno Batista'
    })
})


app.get('/weather', (req, res) =>{
    if(!req.query.address){
        res.send({
            error: 'You must provide a valid address'
        })
    }else{

            geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
                if(error){
                    res.send({error: 'error'})
                }else{
                    forecast(latitude, longitude, (error, forecastData)=> {
                        if(error){
                            res.send({error: 'error'})
                        }else{
                            res.send({
                                forecast: forecastData,
                                location,
                                address: req.query.address
                            })
                        }
                    })
                }
            })
            
        /*res.send([{
            forecast: 'Estão 20 graus',
            Location: 'Fafe',
            address: req.query.address
        }])*/
    }

    
})

app.get('/products', (req, res) => {
    if(!req.query.search ){
        res.send({
            error: 'You must provide a search term'
        })
    }else{
        console.log(req.query.search)
        res.send({
            products: []
        })

    }
    
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Nuno Batista',
        errorMessage: 'Help article not found' 
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Nuno Batista',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})