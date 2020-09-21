const fs = require('fs');
const path = require('path');
const PATH_PROD_RESPONSE = path.join(__dirname, '/../geojson/map.json');
const PATH_PROD_RESPONSE_COUNTRIES = path.join(__dirname, '/../geojson/countries.json');
const PATH_PROD_RESPONSE_TEST = path.join(__dirname, '/../geojson/map_high.json');

var featureCollection;

generateGeoJSON();

module.exports.getGeoJSONFeatureCollection = () => {
    var response;
    try {
        if (fs.existsSync(PATH_PROD_RESPONSE)) {
            response = JSON.parse(fs.readFileSync(PATH_PROD_RESPONSE, 'utf8'));
        }
        else {
            console.log("error, file does not exist");
            generateGeoJSON();
        }
    } catch (e) {
        console.log("No valid map.json found! " + e);
    }
    return response;
}

function generateGeoJSON(){
    var countries = JSON.parse(fs.readFileSync(PATH_PROD_RESPONSE_COUNTRIES, 'utf8'));
    var map = JSON.parse(fs.readFileSync(PATH_PROD_RESPONSE_TEST, 'utf8'));
    var features = createGeoJSON(countries, map);
    featureCollection = JSON.parse('{"type":"FeatureCollection","features":[' + features + ']}');
    console.log(featureCollection.features.length);
    
    fs.writeFile(path.join(__dirname, '/../geojson/map.json'), JSON.stringify(featureCollection, null, 2), function (err) {
        if (err) throw err;
    });
}

function createGeoJSON(countries, map) {
    var features = new Array();
    var mapCountries = map.features;
    for (let i = 0; i < countries.length; i++) {
        for (let j = 0; j < mapCountries.length; j++) {
            if(countries[i].ISO2 == mapCountries[j].properties.iso_a2){
                var name = countries[i].Country;
                var slug = countries[i].Slug;
                var ISO2 = countries[i].ISO2;
                var geometry = JSON.stringify(mapCountries[j].geometry);
                features[i] = '{"type":"Feature","properties":{"name":"' + name + '","slug":"' + slug +'","ISO2":"' + ISO2 + '"},"geometry":' + geometry + '}';
            }
        }       
    }
    return features;
}