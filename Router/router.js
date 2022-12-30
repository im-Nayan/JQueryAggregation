const express = require('express');
const controller = require('../Controller/controller');

const route = express.Router();

// GET 
route.get('/',controller.country)
route.get('/state',controller.state)
route.get('/city',controller.city);
route.get('/useradd',controller.useradd);
route.get('/showUser',controller.showUser);


// POST 
route.post('/country_post',controller.country_post)
route.post('/state_post',controller.state_post)
route.post('/city_post',controller.city_post)
route.post('/countryWiseState',controller.countryWiseState);
route.post('/StateWiseCity',controller.StateWiseCity);

// USER POST
route.post('/user_post',controller.user_post)


// EXPORTS
module.exports = route;