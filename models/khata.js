const mongoose = require('mongoose');

const khataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Ensure that details are provided
    },
    details: {
        type: String,
        required: true, // Ensure that details are provided
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
});

// Export the model
module.exports = mongoose.model("Khata", khataSchema);
