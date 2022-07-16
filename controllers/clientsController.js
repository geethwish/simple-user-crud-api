const asyncHandler = require('express-async-handler');

const Clients = require('../models/clientsModel')


// Get Clients - GET/api/clients - public
const getClients = asyncHandler(async (req, res) => {

    const clients = await Clients.find();

    res.status(200).json(clients)

});

// Add New Client - POST/api/clients - public
const saveClients = asyncHandler(async (req, res) => {

    console.log(req.body);

    const { name, amount, image } = req.body

    console.log(req.body);

    if (!name) {

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


    const updatedClient = await Clients.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.status(200).json(updatedClient)

});

// Delete Client - DELETE/api/todo/id - public

const deleteClient = asyncHandler(async (req, res) => {

    const client = await Clients.findById(req.params.id).exec();

    if (!client) {

        res.status(404)

        throw new Error("Todo not found")
    }

    await client.remove();

    res.status(200).json({ id: req.params.id })

});

module.exports = {
    getClients,
    saveClients,
    updateClient,
    deleteClient
}