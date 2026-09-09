const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

const { upload } = require('../config/cloudinary');

router.route('/').get(getProjects).post(protect, upload.single('imageFile'), createProject);
router.route('/:id').get(getProjectById).put(protect, upload.single('imageFile'), updateProject).delete(protect, deleteProject);

module.exports = router;
