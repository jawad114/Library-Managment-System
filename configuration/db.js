const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 5; // Maximum number of retries
    let retries = 0;

    while (retries < maxRetries) {
        try {
            await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sarmaya', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected...');
            break;
        } catch (err) {
            retries += 1;
            console.error(`MongoDB connection attempt ${retries} failed. Error: ${err.message}`);
            
            if (retries === maxRetries) {
                console.error('Max retries reached. Exiting...');
                process.exit(1); // Exit process with failure
            }

            // Wait for a second before retrying
            await new Promise(res => setTimeout(res, 1000));
        }
    }
};

module.exports = connectDB;
