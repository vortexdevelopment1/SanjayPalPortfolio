const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'] 
  },
  type: { 
    type: String, 
    default: 'General Inquiry' 
  },
  message: { 
    type: String, 
    required: [true, 'Message is required'] 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
