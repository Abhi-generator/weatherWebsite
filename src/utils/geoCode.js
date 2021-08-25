const request = require('request');

const geoCode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYml0dHUzMjEiLCJhIjoiY2tzaDdwdDF5MWFkMzJ2dGI0cG0wc2xoOSJ9.HWcA2a8XKMyOfrSaVPyjTA&limit=1';
    const geoCodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYml0dHUzMjEiLCJhIjoiY2tzaDdwdDF5MWFkMzJ2dGI0cG0wc2xoOSJ9.HWcA2a8XKMyOfrSaVPyjTA&limit=1';
      
    request({url:geoCodeurl, json:true}, (error, {body}) => {
      if(error){
        callback('unable to connect to the location services', undefined)
      }else if( body.features.length == 0){
        callback('Unable to find location', undefined);
      }else{
        callback(undefined, {
          latitude:  body.features[0].center[1],
          longitude:  body.features[0].center[0],
          location:  body.features[0].place_name
        })
      }
    })
    }

   
  
module.exports = geoCode
