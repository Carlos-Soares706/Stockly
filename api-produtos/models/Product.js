const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  photo: { type: String }, // Caminho da imagem
});

module.exports = mongoose.model('Product', ProductSchema);
