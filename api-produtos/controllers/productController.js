const Product = require('../models/Product');

// Criar um novo produto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, quantity } = req.body;
    const photo = req.file ? req.file.path : null; // Caminho da imagem
    const product = new Product({ name, description, quantity, photo });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
};

// Listar todos os produtos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
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
    res.status(500).json({ error: 'Erro ao buscar o produto' });
  }
};

// Atualizar um produto
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, quantity } = req.body;
    const photo = req.file ? req.file.path : null;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, quantity, photo },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
};

// Deletar um produto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o produto' });
  }
};
