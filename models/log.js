const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
  title: String,
  entry: String,
  shipIsBroken: Boolean
});
module.exports = mongoose.model('log', logSchema);
