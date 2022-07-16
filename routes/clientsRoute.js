const express = require('express');
const { getClients, saveClients, updateClient, deleteClient } = require('../controllers/clientsController');
const { upload } = require('../middleware/imageUploadMiddleware');

const router = express.Router();

router.get('/', getClients);

router.post('/', upload.single('image'), saveClients);

router.put('/:id', upload.single('image'), updateClient);

router.delete('/:id', deleteClient);

module.exports = router;