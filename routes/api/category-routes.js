const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

/**
 * Get all categories
 */
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

/**
 * Get a category by ID
 * @param {int} id - ID of category
 */
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

/**
 * Create a new category
 * @body JSON
 * {
 *  "category_name": "..."
 * }
 */
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(200).json(category);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

/**
 * Update a category
 * @param {int} id - ID of category
 * @body JSON
 * {
 *  "category_name": "..."
 * }
 */
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    const updatedCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(updatedCategory);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

/**
 * Delete a category
 * @param {int} id - ID of category
 */
router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id }});

    res.status(200).json({ Message: "Deleted category" });
  }
  catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;
