export default class ModeloTareas{
    constructor(){
    //leer tareas guardadas
        const tareasGuardadas = localStorage.getItem('tareas')
        this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];//lista de tareas
    }

    agregarTarea(titulo, description){
        const nuevaTarea = {
            id: Date.now(), //ID unico
            titulo,
            description,
            completado: false
        };
        this.tareas.push(nuevaTarea);
        this.guardarEnstorage();
        return nuevaTarea;
    }
    guardarEnstorage(){
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }
    obtenerTareas(){
        return [...this.tareas];// copia para evitar que la vista las modifique
    }
    
    eliminarTarea(id){
       this.tareas = this.tareas.filter(tarea => tarea.id !== Number(id));
       this.guardarEnstorage();
    }

    modificarTarea(id,nuevoTitulo, nuevoDescripcion){ 
          this.tareas = this.tareas.map(tarea => tarea.id === Number(id) 
                                           ?{...tarea, titulo: nuevoTitulo, description: nuevoDescripcion}
                                           : tarea
                                        );
          this.guardarEnstorage();
    }
    guardarTarea(titulo,descripcion){
        this.tareas.tarea.titulo = titulo;
        this.tareas.tarea.descripcion = descripcion;  
    }
}