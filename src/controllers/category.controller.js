const { handleDatabaseError } = require('../utils/dbErrorHandler');
const prisma = require('../lib/prisma');

// Get all available categories (combines grocery categories and restaurant cuisines)
exports.getCategories = async (req, res) => {
  try {
    // Get unique cuisines from restaurants
    const restaurants = await prisma.restaurant.findMany({
      select: { cuisine: true },
      distinct: ['cuisine'],
    });
    const cuisines = restaurants.map((r) => r.cuisine).filter(Boolean);

    // Get grocery categories
    const groceryCategories = await prisma.groceryCategory.findMany({
      select: { name: true },
      orderBy: { name: 'asc' },
    });
    const groceryCategoryNames = groceryCategories.map((c) => c.name);

    // Combine and return as a unified list
    // We'll use a mapping: "Foods" -> menu items, "Groceries" -> grocery items, etc.
    const categories = [
      'Foods', // All menu items
      'Groceries', // All grocery items
      'Dining', // Restaurants grouped by cuisine
      ...cuisines.slice(0, 5), // Top 5 cuisines
      ...groceryCategoryNames.slice(0, 3), // Top 3 grocery categories
    ];

    // Remove duplicates and return
    const uniqueCategories = [...new Set(categories)];
    res.json(uniqueCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to default categories if database is unavailable
    if (error.code === 'P1001' || error.message.includes("Can't reach database")) {
      return res.json(['Foods', 'Groceries', 'Dining', 'Drones', 'Agriculture']);
    }
    handleDatabaseError(error, res);
  }
};
