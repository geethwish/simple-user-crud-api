const asyncHandler = require('express-async-handler');

const Clients = require('../models/clientsModel')


// Get Clients - GET/api/clients - public
const getClients = asyncHandler(async (req, res) => {

    const clients = await Clients.find();

    res.status(200).json(clients)

});

// Add New Client - POST/api/clients - public
const saveClients = asyncHandler(async (req, res) => {

    const { name, amount } = req.body

    const image = req.file.path;


    if (!name || !image) {

        res.status(400);

        throw new Error('Please Enter Valid Details');
    }

    const client = await Clients.create({
        name,
        amount,
        image
    });

    res.status(201).json(client);

});

// Update Client - PUT/api/client/id - public
const updateClient = asyncHandler(async (req, res) => {

    const client = await Clients.findById(req.params.id).exec();

    if (!client) {

        res.status(404)

        throw new Error("Todo not found")
    }

    const { name, amount, image } = req.body;

    const newImage = req.file.path;

    const replaceImage = newImage ? newImage : image

    await Clients.findByIdAndUpdate(req.params.id, { name, amount, image: replaceImage }, {
        new: true
    });

    const clients = await Clients.find();

    res.status(200).json(clients)

});

// Delete Client - DELETE/api/todo/id - public

const deleteClient = asyncHandler(async (req, res) => {

    const client = await Clients.findById(req.params.id).exec();

    if (!client) {

        res.status(404)

        throw new Error("Todo not found")
    }

    await client.remove();

    const clients = await Clients.find();

    res.status(200).json(clients)

});

module.exports = {
    getClients,
    saveClients,
    updateClient,
    deleteClient
}