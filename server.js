const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const porta = process.env.PORT || 3000;

// Servir os arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middlewares do JSON Server
app.use(middlewares);

// Rotas do JSON Server
app.use(router);

// Iniciar servidor
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});