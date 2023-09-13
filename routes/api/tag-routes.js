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

/**
 * Create a new tag
 * @body JSON
 * {
 *  tag_name: "..."
 *  productIds: [1, 2, 3, 4]
 * }
 */
router.post('/', async (req, res) => {
  try {
    let tag = await Tag.create(req.body);
    if(req.body.productIds.length){
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          tag_id: tag.id,
          product_id
        }
      });
      tag = await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(tag);
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
