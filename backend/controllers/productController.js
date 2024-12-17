const Product = require('../models/Product');

// Listar todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// Buscar produto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// Criar produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, quantity, image } = req.body;
    const product = new Product({ name, description, quantity, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, quantity, image } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, description, quantity, image }, { new: true });
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

// Deletar produto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};
