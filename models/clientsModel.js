const mongoose = require('mongoose');

const clientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please Enter Name']
        },
        amount: {
            type: Number,
            required: [true, 'Please Add Amount']
        },
        image: {
            type: String,
            required: [true, 'Please Add image']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Clients', clientSchema)