const { handleDatabaseError } = require('../utils/dbErrorHandler');
const prisma = require('../lib/prisma');

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.groceryCategory.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    handleDatabaseError(error, res);
  }
};

exports.getFeatured = async (req, res) => {
  try {
    // Fetches 5 grocery items to show as featured
    const featured = await prisma.groceryItem.findMany({
      where: { isFeatured: true },
      take: 5,
      include: {
        category: true,
        store: true,
      },
    });
    res.json(featured);
  } catch (error) {
    handleDatabaseError(error, res);
  }
};

// Get all grocery items, optionally filtered by category
exports.getAllGroceryItems = async (req, res) => {
  try {
    const { categoryId, q } = req.query;
    
    let where = {};

    // Filter by category if provided
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const groceryItems = await prisma.groceryItem.findMany({
      where,
      include: {
        category: true,
        store: true,
      },
    });

    // Filter by search query if provided
    let filteredItems = groceryItems;
    if (q) {
      const queryLower = q.toLowerCase();
      filteredItems = groceryItems.filter(
        (item) =>
          item.name.toLowerCase().includes(queryLower) ||
          (item.category && item.category.name.toLowerCase().includes(queryLower))
      );
    }

    res.json(filteredItems);
  } catch (error) {
    handleDatabaseError(error, res);
  }
};
