const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type:String
},
consent:{
  type: String,
  required: true
},
waiver:{
  type: String,
  required: true
},
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);