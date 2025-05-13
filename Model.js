const mongoose = require('mongoose')
const ModelSchema = new mongoose.Schema({
  name: String,
  url: String
})
module.exports = mongoose.model('Model', ModelSchema)
