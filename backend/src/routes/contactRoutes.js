const express = require('express');
const router = express.Router();
const { 
  sendContactEmail, 
  getMessages, 
  getUnreadCount, 
  markAsRead, 
  markAsUnread, 
  deleteMessage 
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route for portfolio visitors
router.post('/', sendContactEmail);

// Admin routes (protected)
router.get('/', protect, getMessages);
router.get('/unread-count', protect, getUnreadCount);
router.patch('/:id/read', protect, markAsRead);
router.patch('/:id/unread', protect, markAsUnread);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
