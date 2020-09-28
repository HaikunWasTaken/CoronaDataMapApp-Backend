const request = require('request-promise');
const accessTokenCovidAPI = "7a12b9b9-3a11-4408-a8f5-c864b4724653";
const accessTokenMapbox = "pk.eyJ1IjoibWszMDYiLCJhIjoiY2tlNXNmZGhtMDV3NjJ4bWl2ZmZzZjN2NSJ9.BN7hDrnIXUftAl5u2bVxVQ"


module.exports.getBasicData = async(req, res) => {
    try {
        const data = await request.get({
            url: `https://api.covid19api.com/total/country/${req.slug}?from=${req.from}&to=${req.to}`,
            headers: {
                "X-Access-Token": accessTokenCovidAPI
            }
        });
        return evaluateBasicData(JSON.parse(data));
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.getPremiumData = async(req, res) => {
    try {
        const data = await request.get({
            url: `https://api.covid19api.com/premium/country/${req.slug}?from=${req.from}&to=${req.to}`,
            headers: {
                "X-Access-Token": accessTokenCovidAPI
            }
        });
        return evaluatePremiumData(JSON.parse(data));

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.getPremiumCountryData = async(req, res) => {
    try {
        const data = await request.get({
            url: `https://api.covid19api.com/premium/country/data/${req.slug}`,
            headers: {
                "X-Access-Token": accessTokenCovidAPI
            }
        });
        return evaluatePremiumCountryData(JSON.parse(data));

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.getSearchResult = async(req, res) => {
    try {
        const response = await request.get({
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query}.json?access_token=${accessTokenMapbox}`,
        });
        return JSON.parse(response);

    } catch (error) {
        console.log(error.message);
    }
}

function evaluateBasicData(data) {
    const latestData = data[data.length - 1];

    latestData.Active = formateNumber(latestData.Active);
    latestData.Confirmed = formateNumber(latestData.Confirmed);
    latestData.Recovered = formateNumber(latestData.Recovered);
    latestData.Deaths = formateNumber(latestData.Deaths);

    return latestData;
}

function evaluatePremiumData(data) {
    const latestData = data[data.length - 1];

    latestData.CaseFatalityRatio = replaceDot(latestData.CaseFatalityRatio).slice(0, 6);
    latestData.NewCases = formateNumber(latestData.NewCases);
    latestData.NewCasesPerMillion = formateNumber(replaceDot(latestData.NewCasesPerMillion));
    latestData.NewDeaths = formateNumber(latestData.NewDeaths);
    latestData.NewDeathsPerMillion = formateNumber(replaceDot(latestData.NewDeathsPerMillion));
    latestData.TotalCases = formateNumber(latestData.TotalCases);
    latestData.TotalCasesPerMillion = formateNumber(replaceDot(latestData.TotalCasesPerMillion));
    latestData.TotalDeaths = formateNumber(latestData.TotalDeaths);
    latestData.TotalDeathsPerMillion = formateNumber(replaceDot(latestData.TotalDeathsPerMillion));

    return latestData;
}

function evaluatePremiumCountryData(data) {
    const latestData = data[data.length - 1];

    latestData.Population = formateNumber(latestData.Population);
    latestData.PopulationDensity = formateNumber(replaceDot(latestData.PopulationDensity));
    latestData.MedianAge = replaceDot(latestData.MedianAge);
    latestData.Aged65Older = replaceDot(latestData.Aged65Older) + "%";
    latestData.Aged70Older = replaceDot(latestData.Aged70Older) + "%";

    return latestData;
}

function formateNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function replaceDot(number) {
    return number.toString().replace(/\./g, ',');
}