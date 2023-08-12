const mongoose = require('mongoose')

const TransportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [3, "Name must be at least 3 characters"]
    },
    refId: {
        type: String,
        required: [true, "An ID is required"],
        minLength: [3, "ID must be at least 3 characters"]
    },
    description: {
        type: String,
        required: [true, "A description is required"],
        minLength: [3, "A description must be at least 10 characters"]
    },
    currentLocation: {
        type: String,
        required: [true, "A current location is required"],
        minLength: [3, "A current location must be at least 5 characters"]
    },
    dropoffLocation: {
        type: String,
        // required: [true, "A drop off location is required"],
        minLength: [3, "A drop off location must be at least 3 characters"]
    },
    deadline: {
        type: Date,
        required: [true, "A date is required"],
    },
    rescue: {
        type: String,
        minLength: [3, "The rescue name must be at least 3 characters"],
        required: [true, "A date is required"],
    },
    pickupDate: {
        type: String
    },
    pickupTime: {
        type: String
    }
    // picture: {
    //     type: String
    // }
}, { timestamps: true });

module.exports = mongoose.model('Transport', TransportSchema);