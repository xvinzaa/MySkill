const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  saveContent,
  unsaveContent,
  getSavedContents
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/save/:contentId', protect, saveContent);
router.delete('/unsave/:contentId', protect, unsaveContent);
router.get('/saved', protect, getSavedContents);

module.exports = router;
