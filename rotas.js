const express = require('express');
const produto = require('./controladores/produto');
const usuarios = require('./controladores/usuarios')

const rotas = express();

rotas.post('/produto', produto.criarProduto);
rotas.get('/produto', produto.listarProdutos);
rotas.get('/produto/:id', produto.obterProduto);
rotas.put('/produto/:id', produto.atualizarProduto);
rotas.delete('/produto/:id', produto.deletarProduto);

rotas.post('/cadastrar', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);

module.exports = rotas;