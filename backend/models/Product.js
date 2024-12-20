const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'O nome do produto é obrigatório'], 
      trim: true, 
      maxlength: [100, 'O nome do produto deve ter no máximo 100 caracteres'] 
    },
    description: { 
      type: String, 
      required: [true, 'A descrição é obrigatória'], 
      trim: true 
    },
    quantity: { 
      type: Number, 
      required: [true, 'A quantidade é obrigatória'], 
      min: [0, 'A quantidade não pode ser negativa'] 
    },
    image: { 
      type: String, 
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/.test(v);
        },
        message: 'A imagem deve ser uma URL válida'
      },
      default: null 
    }
  },
  {
    timestamps: true // Cria automaticamente os campos `createdAt` e `updatedAt`
  }
);

// Middleware para normalizar o nome do produto antes de salvar
productSchema.pre('save', function (next) {
  this.name = this.name.trim();
  this.description = this.description.trim();
  next();
});

module.exports = mongoose.model('Product', productSchema);
