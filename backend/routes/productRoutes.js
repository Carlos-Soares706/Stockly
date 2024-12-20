const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');

const router = express.Router();

// Configuração do armazenamento para salvar as imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nomeia o arquivo com timestamp
  },
});

// Configuração para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Aceita imagens
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos'), false); // Rejeita outros tipos de arquivo
  }
};

// Cria o middleware do multer
const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 2 * 1024 * 1024 } // Limita o tamanho da imagem para 2MB
});

// Middleware para deletar arquivos
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Erro ao deletar o arquivo: ${filePath}`, err);
    });
  }
};

// Criar Produto
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, description, quantity } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({ error: 'Nome e quantidade são obrigatórios.' });
    }

    const photo = req.file ? req.file.path : null;

    const product = new Product({ name, description, quantity, photo });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao salvar o produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto: ' + error.message });
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
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    if (req.file) {
      if (product.photo) deleteFile(product.photo); // Remove a imagem antiga
      updates.photo = req.file.path;
    }

    Object.assign(product, updates);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto: ' + error.message });
  }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    if (product.photo) deleteFile(product.photo); // Remove a imagem associada ao produto

    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto: ' + error.message });
  }
});

module.exports = router;
