const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    email: String,
    code: String
},{
    timestamps: true
});

module.exports = mongoose.model('Lead', LeadSchema);
