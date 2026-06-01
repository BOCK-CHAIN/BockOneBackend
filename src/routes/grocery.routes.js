const express = require('express');
const router = express.Router();
const groceryController = require('../controllers/grocery.controller');

router.get('/categories', groceryController.getCategories);
router.get('/featured', groceryController.getFeatured);
router.get('/items', groceryController.getAllGroceryItems);

module.exports = router;