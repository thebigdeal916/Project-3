const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PunchcodeSchema = new Schema({
    name: {
        type: String,
        type: Number,
        required: true
    },
   
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Punchcode = mongoose.model('punchcode', PunchcodeSchema);