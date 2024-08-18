const express = require('express');
const { addService, getAllServices, updateService, deleteService } = require('../controllers/serviceController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// POST /api/services
router.post('/', upload.single('image'), addService);

router.get('/', getAllServices);

// PUT /api/services/:id
router.put('/:id', upload.single('image'), updateService);

// DELETE /api/services/:id
router.delete('/:id', deleteService);

module.exports = router;
