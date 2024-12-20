const Product = require('../models/Product');
const fs = require('fs'); // Para manipulação de arquivos

// Listar todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos', details: error.message });
  }
};

// Buscar produto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto', details: error.message });
  }
};

// Criar produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, quantity } = req.body;

    // Verifica se a imagem foi recebida
    const photo = req.file ? req.file.path : null;

    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      quantity: parseInt(quantity, 10),
      photo,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto', details: error.message });
  }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, quantity } = req.body;

    // Prepara os dados para atualização
    const updates = {
      name: name?.trim(),
      description: description?.trim(),
      quantity: quantity ? parseInt(quantity, 10) : undefined,
    };

    // Se houver uma foto, atualiza o campo 'photo' e exclui a antiga
    if (req.file) {
      const product = await Product.findById(req.params.id);
      if (product?.photo) {
        fs.unlink(product.photo, (err) => {
          if (err) console.error('Erro ao deletar imagem antiga:', err);
        });
      }
      updates.photo = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto', details: error.message });
  }
};

// Deletar produto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    // Remove a imagem associada ao produto
    if (product.photo) {
      fs.unlink(product.photo, (err) => {
        if (err) console.error('Erro ao deletar imagem:', err);
      });
    }

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto', details: error.message });
  }
};
