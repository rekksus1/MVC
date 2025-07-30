const mariadb = require('mariadb');

const pool = mariadb.createPool({
       host: '127.0.0.1',
       user: 'admin',
       password: '',
       database: 'miapp',
       connectionLimit: 5
});

module.exports = pool;