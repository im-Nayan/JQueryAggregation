const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    title: { type: String,required:true, default: '' },
    country_id: { type: mongoose.Schema.Types.ObjectId, required:true,default: null },
    isDeleted: { type: Boolean, default: false},
    status:{type:Number,default:0}
})

module.exports = mongoose.model('state', stateSchema);