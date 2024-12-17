const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: './uploads/imagens',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Rotas CRUD
router.post('/products', upload.single('photo'), createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', upload.single('photo'), updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
