const { handleDatabaseError } = require('../utils/dbErrorHandler');
const prisma = require('../lib/prisma');

// Get all menu items, optionally filtered by cuisine
exports.getAllMenuItems = async (req, res) => {
  try {
    const { cuisine, q } = req.query;
    
    let where = {
      isAvailable: true,
    };

    // Filter by cuisine if provided
    if (cuisine) {
      where.restaurant = {
        cuisine: {
          contains: cuisine,
          mode: 'insensitive',
        },
      };
    }

    const menuItems = await prisma.menuItem.findMany({
      where,
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            cuisine: true,
            imageUrl: true,
          },
        },
      },
    });

    // Filter by search query if provided
    let filteredItems = menuItems;
    if (q) {
      const queryLower = q.toLowerCase();
      filteredItems = menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(queryLower) ||
          item.description.toLowerCase().includes(queryLower)
      );
    }

    res.json(filteredItems);
  } catch (error) {
    handleDatabaseError(error, res);
  }
};

// Get menu items by restaurant ID
exports.getMenuItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menuItems = await prisma.menuItem.findMany({
      where: {
        restaurantId,
        isAvailable: true,
      },
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            cuisine: true,
          },
        },
      },
    });
    res.json(menuItems);
  } catch (error) {
    handleDatabaseError(error, res);
  }
};
