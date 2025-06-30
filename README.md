# 📒 Agenda

Projeto desenvolvido com **Node.js**, **Express** e **MongoDB**, que consiste em uma aplicação de agenda de contatos.  
O principal objetivo é implementar um sistema de **CRUD** completo (Criar, Ler, Atualizar e Deletar), permitindo que usuários cadastrados possam gerenciar seus próprios contatos.

Cada usuário logado tem acesso apenas aos seus registros, garantindo privacidade e organização.

---

## ✨ Funcionalidades

- Registro de novos usuários (Sign Up)
- Autenticação de usuário (Sign In / Sign Out)
- CRUD completo de contatos:
  - Criar contato
  - Editar contato
  - Visualizar contato
  - Deletar contato
- Validações com feedbacks visuais
- Proteção de rotas com sessões

---

## 🚀 Tecnologias Utilizadas

**Front-end:**  
- HTML + CSS (Bootstrap)
- JavaScript (EJS)

**Back-end:**  
- Node.js  
- Express  
- MongoDB (com Mongoose)  
- Sessions com MongoStore  
- Validações com Validator.js  
- Hash de senhas com Bcryptjs  
- Mensagens com Connect-Flash  
- Proteção CSRF com Csurf  

---

## 📚 Documentação e Links Úteis

- [Express.js](https://expressjs.com/pt-br/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Bootstrap](https://getbootstrap.com/)
- [Validator.js](https://github.com/validatorjs/validator.js)
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)

---


## 🧠 Aprendizados

Esse projeto teve como foco o domínio de:
- Criação de servidores com Express
- Integração com banco de dados NoSQL (MongoDB)
- Criação de middlewares personalizados
- Gerenciamento de sessões e autenticação
- Segurança básica em aplicações web com CSRF

---

## 📁 Clonar o projeto

```bash
git clone https://github.com/kaio-d/nodeAgenda.git
cd nodeAgenda
npm install
npm run dev
