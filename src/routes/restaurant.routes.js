const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

// Route for getting ALL restaurants (This is what was missing/failing)
router.get('/', restaurantController.getAllRestaurants);

// Route for getting ONE restaurant details
router.get('/:id', restaurantController.getRestaurantById);

module.exports = router;