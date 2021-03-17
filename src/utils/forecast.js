const request = require('postman-request')

const forecast = (latitude, longitude, callback ) =>{
    const url = 'http://api.weatherstack.com/current?access_key=ef3df7b12b42fbaeaad6febc75ce3357&query='+latitude+','+longitude+'&units=m'

    request ({url, json: true}, (error, {body})=>{
        if(error){
          callback('Unable to connect to the weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, 'Tempuratura: '+body.current.temperature + ' Descrição: '+body.current.weather_descriptions + '- Sensação térmica: '+body.current.feelslike + '- Humidade: '+body.current.humidity + '- Velocidade vento: '+body.current.wind_speed)
        }
    })
}

module.exports = forecast