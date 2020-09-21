const request = require('request-promise');
const accessTokenCovidAPI = "7a12b9b9-3a11-4408-a8f5-c864b4724653";
const accessTokenMapbox = "pk.eyJ1IjoibWszMDYiLCJhIjoiY2tlNXNmZGhtMDV3NjJ4bWl2ZmZzZjN2NSJ9.BN7hDrnIXUftAl5u2bVxVQ"


module.exports.getBasicData = async (req, res) => {
    try {
        const response = await request.get({
            url: `https://api.covid19api.com/total/country/${req.slug}?from=${req.from}&to=${req.to}`,
            headers: {
                "X-Access-Token": accessTokenCovidAPI
            }
        });
        return JSON.parse(response);

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.getPremiumData = async (req, res) => {
    try {
        const response = await request.get({
            url: `https://api.covid19api.com/premium/country/${req.slug}?from=${req.from}&to=${req.to}`,
            headers: {
                "X-Access-Token": accessTokenCovidAPI
            }
        });
        return JSON.parse(response);

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.getPremiumCountryData = async (req, res) => {
    try {
        const response = await request.get({
            url: `https://api.covid19api.com/premium/country/data/${req.slug}`,
            headers: {
                "X-Access-Token": accessTokenCovidAPI
            }
        });
        return JSON.parse(response);

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.getSearchResult = async (req, res) => {
    try {
        const response = await request.get({
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query}.json?access_token=${accessTokenMapbox}`,
        });
        return JSON.parse(response);

    } catch (error) {
        console.log(error.message);
    }
}


