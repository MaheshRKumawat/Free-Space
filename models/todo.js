const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todoTask: String,
    containerRelated: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Containers"
        }
});

module.exports = mongoose.model("Todo",todoSchema);