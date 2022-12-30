const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    country:{type:String,default:''},
    isDelete:{type:Boolean,default:false},
    status:{type:Number,default:0}


})

const countryModel = mongoose.model('country',countrySchema);

module.exports = countryModel;