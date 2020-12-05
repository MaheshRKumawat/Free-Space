const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todoTask: String,
    containerRelated: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Containers"
        },
    User:{ 
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
        username: String
        }
});

module.exports = mongoose.model("Todo",todoSchema);