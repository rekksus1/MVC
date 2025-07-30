const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;
const path = require('path');
const app = express();
const pool = require('./config.js');

const rutaCrud = path.join(__dirname, '..', 'crud')

app.use(express.static(rutaCrud));

/* app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname, 'crud', 'index.html'))
}); */

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function fetchData() {
  let connection;
  try {
    connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM usuarios");
    console.log(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    if (connection) connection.release();
  }
}

fetchData();