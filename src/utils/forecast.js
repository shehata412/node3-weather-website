const request = require('request')
const forecast = (long, lat, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=8feb35d4ca196c9d08c0ded57d195fbc&query=' + encodeURIComponent(lat) +','+ encodeURIComponent(long)
    request({url, json : true}, (error, {body}) =>{
        if(error){
            callback('unable to connect to weather service!')
        }
        else if (body.error) {
            callback('unable to find location')
        }
        else{
            callback(undefined, {
                weather_desc: body.current.weather_descriptions[0],
                current_temp: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }

    })
}

module.exports = forecast