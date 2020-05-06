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
    options.url = BASE_URL + 'quotes/latest';
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
