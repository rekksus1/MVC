export default class VistaTareas{
        constructor() {
            this.listaElemento = document.getElementById("cuerpo-tabla-tareas");
            this.btnAgregar = document.getElementById("btn-agregar");
            this.inputTitulo = document.getElementById("titulo");
            this.inputDescription = document.getElementById("descripcion");
        }
        inicializarEventos(callBacks) {
            this.setTarea(callBacks.alAgregar);
            this.detectarFila(callBacks);            
        }

        setTarea(callBackAgregar){
            this.btnAgregar.addEventListener("click",()=>{
                const titulo = this.inputTitulo.value.trim();
                const description = this.inputDescription.value.trim();
                if(titulo && description) {
                    callBackAgregar(titulo, description)
                    this.inputTitulo.value = ""
                    this.inputDescription.value = "";
                } else {
                    alert("debes escribir titulo y description");
                }
            })
        }

        detectarFila(callBacks){
            this.listaElemento.addEventListener("click", (event) => {
 

                const boton = event.target.closest("button");
 
                if (!boton) return;

                const fila = boton.closest("tr");
                const primerTd =  fila.querySelector("td")
                const id = primerTd.id;
                
                const celdaTitulo = fila.querySelector(".td-titulo")

                const celdaDescripcion = fila.querySelector(".td-descripcion");
                const icono = boton.querySelector("i");
                let tituloAModificar = celdaTitulo.textContent.trim();
                let descripcionAModificar = celdaDescripcion.textContent.trim();
                if (boton.classList.contains("btn-eliminar")) {
                    callBacks.alEliminar && callBacks.alEliminar(id,fila);
                }

                if (boton.classList.contains("btn-modificar")) {
                    if(icono.classList.contains("fa-pen")) {
                      
                        icono.classList.remove("fa-pen");
                        icono.classList.add("fa-floppy-disk");
                        
                        celdaTitulo.innerHTML = `<input type = "text" id = "inputTitulo-${id}" placeholder="titulo" value = "${tituloAModificar}" data-original="${tituloAModificar}"/>`;
                        celdaDescripcion.innerHTML = `<input type = "text" id = "inputDescripcion-${id}" placeholder="descripcion" value = "${descripcionAModificar}" data-original="${descripcionAModificar}"/>`;

                    }else if (icono.classList.contains("fa-floppy-disk")) {
                        const tituloModificado = document.getElementById(`inputTitulo-${id}`);
                        const descripcionModificado = document.getElementById(`inputDescripcion-${id}`);
                        
                        const tituloNuevo = tituloModificado?.value.trim();
                        const descripcionNuevo = descripcionModificado?.value.trim();

                        const tituloOriginal = tituloModificado.dataset.original;
                        const descripcionOriginal = descripcionModificado.dataset.original;


                        if(!tituloNuevo || !descripcionNuevo){
                            alert("debes escribir titulo y descripcion");
                            return;
                        }
                        if(tituloNuevo === tituloOriginal   && descripcionNuevo === descripcionOriginal) {
                            alert("no has modificado algunos de los datos");
                            return;
                        }
                        celdaTitulo.textContent = tituloNuevo;
                        celdaDescripcion.textContent = descripcionNuevo;
                        callBacks.alModificar && callBacks.alModificar(id,tituloNuevo,descripcionNuevo);

                        icono.classList.remove("fa-floppy-disk");
                        icono.classList.add("fa-pen");

                        
                        
                    }                   
                  }

            });
        }
        mostrarTareas(tareas) {
            this.listaElemento.innerHTML = "";
            tareas.forEach(tarea => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td id = "${tarea.id}" >${tarea.id}</td>
                                <td class = td-titulo>${tarea.titulo}</td>
                                <td class = td-descripcion>${tarea.description}</td>
                                <td><input type="checkbox" id="check-${tarea.id}" ></td>
                                <td><button class = "btn-modificar" id="btn-modificar-${tarea.id}"><i class="fas fa-pen" id = "icono-${tarea.id}"></i></button></td>
                                <td><button class = "btn-eliminar " id="btn-eliminar-${tarea.id}"><i class="fas fa-trash"></i></button></td>`
                if(tarea.completado) {
                    const td = document.getElementById(tarea.id);
                    td.checked = "true";
                }
                this.listaElemento.appendChild(tr);
            })
        }
    }