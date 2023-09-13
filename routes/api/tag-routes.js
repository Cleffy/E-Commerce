const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

/**
 * Get all tags
 */
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

/**
 * Get a tag by ID
 * @param {int} id - ID of tag
 */
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {

  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {

  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {

  }
  catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;
