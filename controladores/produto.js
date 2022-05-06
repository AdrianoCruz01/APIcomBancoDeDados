const conexao = require('../conexao');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const criarProduto = async (req, res) => {
    const { nome, empresa, foto, valor, descricao, especificacoes, etiquetasEcologicas, token } = req.body;

    if (!nome, !empresa, !valor, !descricao, !especificacoes, !token) {
        return res.status(400).json('Campo obrigatório não preenchido!');
    }

    try {
        const usuario = jwt.verify(token, jwtSecret);

        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const pessoa = await conexao.query(query, [usuario.email]);

        if (!pessoa.rowCount) {
            return res.status(400).json('Email não cadastrado');
        }
    } catch (error) {
        return res.status(400).json(error.message);
    }

    try {
        const query = 'INSERT INTO produtos (nome, empresa, foto, valor, descricao, especificacoes, etiquetasEcologicas) VALUES ($1, $2, $3, $4, $5, $6, $7)';

        const umProduto = await conexao.query(query, [nome, empresa, foto, valor, descricao, especificacoes, etiquetasEcologicas]);

        if (umProduto.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o produto!');
        }

        return res.status(200).json('Produto cadastrado com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const listarProdutos = async (req, res) => {
    try {
        const { rows: produtos } = await conexao.query('SELECT * FROM produtos');

        return res.status(200).json(produtos);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtos = await conexao.query('SELECT * FROM produtos WHERE id = $1', [id]);

        if (produtos.rowCount === 0) {
            return res.status(404).json('Produto não encontrado!');
        }

        return res.status(200).json(produtos.rows[0]);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, valor } = req.body;

    try {
        const produtos = await conexao.query('SELECT * FROM produtos WHERE id = $1', [id]);

        if (produtos.rowCount === 0) {
            return res.status(404).json('Produto não encontrado!');
        }

        if (!nome) {
            return res.status(400).json('O campo nome é obrigatório!');
        }

        if (!valor) {
            return res.status(400).json('O campo valor é obrigatório!');
        }

        const query = ('UPDATE produtos SET nome = $1, valor = $2 WHERE id = $3');

        const produtoAtualizado = await conexao.query(query, [nome, valor, id]);

        if (produtoAtualizado.rowCount === 0) {
            return res.status(404).json('Não foi possível atualizar o produto!');
        }

        return res.status(200).json('O produto foi atualizado com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deletarProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await conexao.query('SELECT * FROM produtos WHERE id = $1', [id]);

        if (produto.rowCount === 0) {
            return res.status(404).json('Produto não encontrado!');
        }

        const query = ('DELETE FROM produtos WHERE id = $1');
        const produtoDeletado = await conexao.query(query, [id]);

        if (produtoDeletado.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o produto!');
        }

        return res.status(200).json('Produto excluido com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    criarProduto,
    listarProdutos,
    obterProduto,
    atualizarProduto,
    deletarProduto
}