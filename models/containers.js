const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
    containerName: { type: String, required: true },
    User:{ 
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
        username: String
        },
});

module.exports = mongoose.model("Containers",containerSchema);