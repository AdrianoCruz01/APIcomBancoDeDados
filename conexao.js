// função que usamos para acessar oo bd
const { Pool } = require('pg');

// acessando o bd
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hackthon',
    password: '123456',
    port: 5432
});

// exportando uma função onde podemos fazer qualquer alteração futuramente
const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query
}
