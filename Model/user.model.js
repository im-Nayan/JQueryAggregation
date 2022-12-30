const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type:String,default:''},
    country_id: { type: mongoose.Schema.Types.ObjectId, required:true,default: null },
    state_id: { type: mongoose.Schema.Types.ObjectId, required:true,default: null },
    city_id: { type: mongoose.Schema.Types.ObjectId, required:true,default: null },
    isDelete:{type:Boolean,default:false},
    status:{type:Number,default:0}


})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;