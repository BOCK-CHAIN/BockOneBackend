const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

// Get all menu items (optionally filtered by cuisine query param)
router.get('/', menuController.getAllMenuItems);

// Get menu items by restaurant ID
router.get('/restaurant/:restaurantId', menuController.getMenuItemsByRestaurant);

module.exports = router;
