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
 *  "tag_name": "..."
 *  "productIds": [1, 2, 3, 4]
 * }
 */
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    if(req.body.productIds.length){
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          tag_id: tag.id,
          product_id
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    const newTag = await Tag.findByPk(tag.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(newTag);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    const productTags = await ProductTag.findAll({
      where: {
        tag_id: req.params.id
      }
    });
    const productTagIds = productTags.map(({ product_id }) => product_id );
    const newProductTags = req.body.productIds
      .filter((product_id) => !productTagIds.includes(product_id))
      .map((product_id) => {
        return {
          tag_id: req.params.id,
          product_id
        };
      });
    const productTagsToRemove = productTags
      .filter(({ product_id }) => !req.body.productIds.includes(product_id))
      .map(({ id }) => id);

    await ProductTag.destroy({
      where: { id: productTagsToRemove }
    });
    await ProductTag.bulkCreate(newProductTags);

    const updatedTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(updatedTag);
  }
  catch(error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({ where: { id: req.params.id }});

    const productTags = await ProductTag.findAll({
      where: {
        tag_id: req.params.id
      }
    });
    await Product.destroy({ where: { id: productTags }});

    res.status(200).json({ Message: "Deleted tag" });
  }
  catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;
