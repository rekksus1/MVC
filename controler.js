export default class controladorTareas {
    constructor (modelo, vista) {
        try {
            this.modelo = modelo;
            this.vista = vista;
        } catch (e) {
            console.error("Error al leer tareas del localStorage:", e)
       }
    }

    iniciar (){
        //mostrar las tareas al iniciar

        this.vista.mostrarTareas(this.modelo.obtenerTareas()); 
        
        //escuchar las tareas al iniciar
        this.vista.inicializarEventos({
            alAgregar: (titulo, description) => {
            this.modelo.agregarTarea(titulo, description);
            this.vista.filtro.value = "todas"; // Cambia el select a "todas"
            this.aplicarFiltroActual();        // Aplica el filtro para mostrar todas
            },
            alEliminar: (id) => {
                //Eliminar del modelo
                this.modelo.eliminarTarea(id);
                this.aplicarFiltroActual();
            },
            alModificar: (id,titulo,descripcion,checkNuevo) => {
                this.modelo.modificarTarea(id,titulo,descripcion,checkNuevo);
                this.aplicarFiltroActual();
            }
        });
        this.vista.inicializarFiltro((filtro) => {
            let tareas = this.modelo.obtenerTareas();
            switch (filtro) {
                case "completadas":
                    tareas = tareas.filter(tarea => tarea.completado);
                    break;
                case "pendientes":
                    tareas = tareas.filter(tarea => !tarea.completado);
                    break;
                default:
                    tareas = this.modelo.obtenerTareas();
                    break;
            }
            this.vista.mostrarTareas(tareas);
        });
    }

    aplicarFiltroActual() {
        const filtro = this.vista.filtro.value;
        let tareas = this.modelo.obtenerTareas();
        switch (filtro) {
                case "completadas":
                    tareas = tareas.filter(tarea => tarea.completado);
                    break;
                case "pendientes":
                    tareas = tareas.filter(tarea => !tarea.completado);
                    break;
                default:
                    tareas = this.modelo.obtenerTareas();
                    break;
            }
            this.vista.mostrarTareas(tareas);
    }
}