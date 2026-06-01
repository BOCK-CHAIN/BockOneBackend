const { handleDatabaseError } = require('../utils/dbErrorHandler');
const prisma = require('../lib/prisma');

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    handleDatabaseError(error, res);
  }
};

exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: id },
      include: {
        menuItems: true, // <--- CHANGED FROM 'menu' TO 'menuItems'
      },
    });
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    handleDatabaseError(error, res);
  }
};
