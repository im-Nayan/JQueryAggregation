const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    title: { type: String, default: '' },
    state_id: { type: mongoose.Schema.Types.ObjectId, default: null },
    isDeleted: { type: Boolean, default: false},
    status:{type:Number,default:0}
})

module.exports = mongoose.model('city', CitySchema);