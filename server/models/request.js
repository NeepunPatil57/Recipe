const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  accepted: { type: Boolean, default: false }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
