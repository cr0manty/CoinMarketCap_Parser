const request = require('request-promise');
let express = require('express');
let router = express.Router();

let options = {
    method: 'GET',
    headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_API_KEY
    },
    json: true
};

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/'

router.get('/list', function (req, res) {
    options.uri = BASE_URL + 'listings/latest';
    request(options).then(response => {
        let result = [];
        response.data.forEach(coin => {
            result.push({
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                price: coin.quote.USD.price,
                volume_24h: coin.quote.USD.volume_24h,
                percent_change_24h: coin.quote.USD.percent_change_24h,
                market_cap: coin.quote.USD.market_cap,
                circulating_supply: coin.circulating_supply
            });
        })
        res.json({result: result})
    }).catch((err) => {
        res.json({error: err.message})
    });
});

router.get('/metadata/:id', function (req, res) {
    options.url = BASE_URL + 'info';
    options.qs = {
        'id': +req.params.id
    }
    request(options).then(response => {
        res.json({result: response.data[req.params.id]})
    }).catch((err) => {
        res.json({error: err.message})
    });
});

router.get('/quotes/:id', function (req, res) {
    options.url = BASE_URL +'quotes/latest';
    options.qs = {
        'id': +req.params.id
    }
    request(options).then(response => {
        res.json({result: response.data[req.params.id]})
    }).catch((err) => {
        res.json({error: err.message})
    });
});

module.exports = router;
