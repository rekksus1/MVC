import pool from '../servidor/config.js';

export default class ModeloTareas{
    constructor(){
    //leer tareas guardadas
        /* const tareasGuardadas = localStorage.getItem('tareas')
        this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : []; */
        //lista de tareas
        this.tareas = [];
    }
    async incializar(){
        this.tareas =  await this.obtenerTareas();
    }

    async agregarTarea(titulo, description){
        const conn = await pool.getConnection();
        const resultado = await conn.query(
            'INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)',
        [titulo,description]);
        conn.release();
        /* const nuevaTarea = {
            id: Date.now(), //ID unico
            titulo,
            description,
            completado: false
        };
        this.tareas.push(nuevaTarea);
        this.guardarEnstorage();
        return nuevaTarea; */
        return resultado;
    }

    async obtenerTareas(){
        //return [...this.tareas];// copia para evitar que la vista las modifique
        const conn = await pool.getConnection();
        const filas = await conn.query('SELECT * from tareas');
        conn.release();
        return filas;
    }
    guardarEnstorage(){
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }
    
    eliminarTarea(id){
       this.tareas = this.tareas.filter(tarea => tarea.id !== Number(id));
       this.guardarEnstorage();
    }

    modificarTarea(id,nuevoTitulo, nuevoDescripcion,checkedNuevo){ 
          this.tareas = this.tareas.map(tarea => tarea.id === Number(id) 
                                           ?{...tarea, titulo: nuevoTitulo, description: nuevoDescripcion,completado: checkedNuevo}
                                           : tarea
                                        );
          this.guardarEnstorage();
    }

}