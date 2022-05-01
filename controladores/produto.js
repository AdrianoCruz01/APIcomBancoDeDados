const conexao = require('../conexao');

const criarProduto = async (req, res) => {
    const { nome, empresa, foto, valor, descricao, especificacoes, etiquetasEcologicas } = req.body;


    if (!nome, !empresa, !valor, !descricao, !especificacoes) {
        return res.status(400).json('Campo obrigatório não preenchido.');
    }

    try {

        const query = 'INSERT INTO produtos (nome, empresa, foto, valor, descricao, especificacoes, etiquetasEcologicas) VALUES ($1, $2, $3, $4, $5, $6, $7)';

        const umProduto = await conexao.query(query, [nome, empresa, foto, valor, descricao, especificacoes, etiquetasEcologicas]);

        if (umProduto.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o produto.');
        }

        return res.status(200).json('Produto cadastrado com sucesso.');

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
    const { id } = req.params

    try {

        const produtos = await conexao.query('SELECT * FROM produtos WHERE id = $1', [id]);

        if (produtos.rowCount === 0) {
            return res.status(404).json('Produto não encontrado');
        }

        return res.status(200).json(produtos.rows[0]);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    criarProduto,
    listarProdutos,
    obterProduto
}