export default class controladorTareas {
    constructor (modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }

    iniciar (){
        //mostrar las tareas al iniciar
        this.vista.mostrarTareas(this.modelo.obtenerTareas()); 
        
        //escuchar las tareas al iniciar
        this.vista.inicializarEventos({
            alAgregar: (titulo, description) => {
            this.modelo.agregarTarea(titulo, description);
            this.vista.mostrarTareas(this.modelo.obtenerTareas());
            },
            alEliminar: (id,fila) => {
                //Eliminar del modelo
                this.modelo.eliminarTarea(id);
                //Eliminar fila del DOM
                fila.remove();
            },
            alModificar: (id,titulo,descripcion) => {
                this.modelo.modificarTarea(id,titulo,descripcion);
            },
            alGuardar: () =>{
                this.modelo.GuardarTarea();
            }
        });
    }
}