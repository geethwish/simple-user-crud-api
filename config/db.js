const mongoose = require('mongoose');

const connectDB = async () => {

    try {

        // connect to mongo data base
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDb Connected${connection.connection.host}`.cyan.underline);

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
};

module.exports = connectDB