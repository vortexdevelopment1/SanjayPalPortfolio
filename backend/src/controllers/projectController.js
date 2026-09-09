const mongoose = require('mongoose');
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const parseProjectData = (req) => {
  let data = { ...req.body };
  if (req.file) {
    data.image = `/uploads/${req.file.filename}`;
  }
  
  // Parse arrays from FormData
  ['techStack', 'keyFeatures', 'stats'].forEach(field => {
    if (data[field] && typeof data[field] === 'string') {
      try { data[field] = JSON.parse(data[field]); } catch(e) {}
    }
  });
  return data;
};

const deleteLocalImage = (imageUrl) => {
  if (imageUrl && imageUrl.includes('/uploads/')) {
    try {
      const filename = imageUrl.split('/uploads/')[1];
      const filePath = path.join(__dirname, '../../uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error('Failed to delete image:', err);
    }
  }
};

const createProject = async (req, res) => {
  try {
    const data = parseProjectData(req);
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (error) {
    if (req.file) deleteLocalImage(`/uploads/${req.file.filename}`); // cleanup if db fails
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      if (req.file) deleteLocalImage(`/uploads/${req.file.filename}`);
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      if (req.file) deleteLocalImage(`/uploads/${req.file.filename}`);
      return res.status(404).json({ message: 'Project not found' });
    }

    const data = parseProjectData(req);
    
    // If a new image was uploaded, delete the old one
    if (req.file && existingProject.image) {
      deleteLocalImage(existingProject.image);
    }

    const project = await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    res.status(200).json(project);
  } catch (error) {
    if (req.file) deleteLocalImage(`/uploads/${req.file.filename}`);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Cleanup image on delete
    if (project.image) {
      deleteLocalImage(project.image);
    }

    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
