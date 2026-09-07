const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  category: { type: String, required: [true, 'Category is required'] },
  status: { type: String, default: 'Live in Production' },
  summary: { type: String, required: [true, 'Summary is required'] },
  image: { type: String, required: [true, 'Image URL is required'] },
  techStack: [String],
  overview: String,
  keyFeatures: [String],
  architecture: String,
  githubUrl: String,
  liveUrl: String,
  featured: { type: Boolean, default: false },
  stats: [{
    value: String,
    label: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
