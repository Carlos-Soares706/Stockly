const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Criar Produto
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, description, quantity } = req.body;

    // Validação de campos obrigatórios
    if (!name || !quantity) {
      return res.status(400).json({ error: 'Nome e quantidade são obrigatórios.' });
    }

    const photo = req.file ? req.file.path : null; // Verifica se a foto foi enviada

    const product = new Product({
      name,
      description,
      quantity,
      photo,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao salvar o produto:', error);
    res.status(400).json({ error: 'Erro ao criar produto: ' + error.message });
  }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos: ' + error.message });
  }
});

// Atualizar informações de um produto
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const { name, description, quantity } = req.body;

    const updates = { name, description, quantity };

    // Adiciona a foto ao objeto de updates caso tenha sido enviada
    if (req.file) {
      updates.photo = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar produto: ' + error.message });
  }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto: ' + error.message });
  }
});

module.exports = router;
