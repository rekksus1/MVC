import express  from 'express';
import pool from './config.js';
import path from 'path';
import ModeloTareas from '../crud/model.js';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rutaCrud = path.join(__dirname, '..', 'crud')

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

const modelo = new ModeloTareas();

app.use(express.json());
app.use(express.static(rutaCrud))
app.get('/tareas',async (req,res) => {
  const tareas = await modelo.obtenerTareas();
  res.json(tareas);
}); 

app.post('/tareas', async (req,res) => {
  const { titulo, descripcion } = req.body;
  const resultado = await modelo.agregarTarea(titulo, descripcion);
  res.json({ insertID: resultado.insertId });
});  

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