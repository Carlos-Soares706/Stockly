# 🛒 Stockly - Sistema de Gerenciamento de Estoque

O **Stockly** é um sistema simples de gerenciamento de estoque que permite **cadastrar, visualizar, editar e deletar produtos**. O projeto é composto por:

1. **Back-end**: API REST desenvolvida em **Node.js** e **Express**, com integração ao banco de dados **MongoDB**.
2. **Front-end**: Aplicativo **mobile** construído com **React Native** e **Expo**.

---

## 📋 Funcionalidades

### **Gerenciamento de Produtos**
- ✅ **Cadastrar produtos**: Adicione um novo produto ao estoque (Nome, Descrição, Quantidade e Foto).
- ✅ **Listar produtos**: Visualize todos os produtos cadastrados.
- ✅ **Editar produtos**: Atualize as informações de um produto existente.
- ✅ **Deletar produtos**: Remova um produto do estoque.

---

## 🚀 Tecnologias Utilizadas

### Back-end
- **Node.js**
- **Express**
- **MongoDB** (banco de dados)
- **Mongoose** (ORM)
- **Dotenv** (variáveis de ambiente)
- **Multer** (upload de imagens)
- **Cors** (controle de acesso)
- **Nodemon** (reinicialização automática)

### Front-end
- **React Native**
- **Expo**
- **Axios** (requisições HTTP)
- **React Navigation** (navegação entre telas)

---

## ⚙️ Estrutura do Projeto

### **Back-end**: `/api-produtos`

```plaintext
api-produtos/
├── /config
│   └── db.js                  # Configuração da conexão com o MongoDB
├── /controllers
│   └── productController.js   # Lógica CRUD dos produtos
├── /models
│   └── Product.js             # Modelo do produto (Mongoose Schema)
├── /routes
│   └── productRoutes.js       # Rotas da API (CRUD de produtos)
├── /uploads                   # Armazena imagens dos produtos
├── .env                       # Variáveis de ambiente (PORT, URI do MongoDB)
├── server.js                  # Ponto de entrada da aplicação
└── package.json               # Dependências do projeto
Front-end: /frontend
plaintext
Copiar código
frontend/
├── /assets                    # Imagens e recursos estáticos
├── /components
│   └── ProductItem.js         # Componente de lista para produtos
├── /screens
│   ├── ProductList.js         # Tela de listagem de produtos
│   └── ProductForm.js         # Tela de cadastro/edição de produtos
├── /services
│   └── api.js                 # Configuração do Axios para consumir a API
├── /navigation
│   └── AppNavigator.js        # Configuração da navegação
├── App.js                     # Arquivo principal do React Native
└── package.json               # Dependências do projeto
🔧 Configuração e Execução
Pré-requisitos
Certifique-se de ter instalado:

Node.js e npm
MongoDB (local ou em nuvem, como MongoDB Atlas)
Expo CLI
1. Configurar o Back-end
Clone o repositório:

bash
Copiar código
git clone <URL-DO-REPOSITÓRIO>
cd Stockly/api-produtos
Instale as dependências:

bash
Copiar código
npm install
Configurar as variáveis de ambiente: Crie um arquivo .env na raiz do back-end e adicione:

plaintext
Copiar código
PORT=5000
MONGO_URI=<URL-DO-SEU-MONGODB>
Inicie o servidor:

bash
Copiar código
npm run dev
O servidor estará disponível em: http://localhost:5000.

2. Configurar o Front-end
Acesse o diretório do front-end:

bash
Copiar código
cd ../frontend
Instale as dependências:

bash
Copiar código
npm install
Configure a URL da API: No arquivo services/api.js, atualize a URL da API:

javascript
Copiar código
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://<IP-DO-SEU-SERVIDOR>:5000/api',
});

export default api;
Nota: Se estiver rodando no emulador ou dispositivo físico, substitua <IP-DO-SEU-SERVIDOR> pelo IP da sua máquina.

Inicie o Expo:

bash
Copiar código
npx expo start
Escaneie o QR Code com o aplicativo Expo Go (disponível para Android/iOS) ou rode em um emulador.

🛠️ Endpoints da API
Método	Rota	Descrição
GET	/api/products	Listar todos os produtos
POST	/api/products	Cadastrar um novo produto
GET	/api/products/:id	Buscar produto por ID
PUT	/api/products/:id	Atualizar um produto
DELETE	/api/products/:id	Deletar um produto
🖥️ Demonstração das Telas
Tela de Listagem
Exibe os produtos cadastrados.

Tela de Cadastro/Edição
Formulário para adicionar ou editar um produto.

📷 Upload de Imagens
O upload de imagens é feito usando o Multer no back-end. As imagens são armazenadas na pasta /uploads.

🌐 Tecnologias Futuras
Implementação de autenticação (JWT).
Melhorias no design usando Styled Components.
Adição de filtros e buscas avançadas.
🤝 Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:

Faça um fork do projeto.
Crie uma branch com sua funcionalidade:
bash
Copiar código
git checkout -b minha-feature
Commit suas alterações:
bash
Copiar código
git commit -m "Adicionei nova funcionalidade X"
Envie para o GitHub:
bash
Copiar código
git push origin minha-feature
Abra um Pull Request.
📄 Licença
Este projeto está sob a licença MIT.

👨‍💻 Autor
Carlos Soares