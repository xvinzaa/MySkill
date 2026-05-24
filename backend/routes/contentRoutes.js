const express = require('express');
const router = express.Router();
const {
  getAllContents,
  getContentById,
  getRelatedContents,
  getCategories
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/categories', protect, getCategories);
router.get('/', protect, getAllContents);
router.get('/:id', protect, getContentById);
router.get('/:id/related/:category', protect, getRelatedContents);

module.exports = router;
