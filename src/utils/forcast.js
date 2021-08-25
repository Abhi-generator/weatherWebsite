 ///////////////////// it is for forcast url
 const request = require('request');

 const forcast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=9fbe6c0802203b089e4f2c6013435b5c&query='+latitude+','+longitude;

request({url, json: true}, (error,{ body }) =>{
  if(error){
    callback("Unable to connect to the weather service", undefined);
  }else if( body.error){
    callback("Unable to find location", undefined);
  }else{
    callback(undefined, body.current.weather_descriptions[0] + ' It is currently '+ body.current.temperature+ ' degrees out. There is a '+body.current.feelslike+ ' % chance of rain')
  } 
})     
}

 module.exports = forcast;