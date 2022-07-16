const express = require('express');
const { getClients, saveClients, updateClient, deleteClient } = require('../controllers/clientsController');

const router = express.Router();

router.get('/', getClients);

router.post('/', saveClients);

router.put('/:id', updateClient);

router.delete('/:id', deleteClient);

module.exports = router;