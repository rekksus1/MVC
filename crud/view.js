export default class VistaTareas{
        constructor() {
            this.listaElemento = document.getElementById("cuerpo-tabla-tareas");
            this.btnAgregar = document.getElementById("btn-agregar");
            this.inputTitulo = document.getElementById("titulo");
            this.inputDescription = document.getElementById("descripcion");
            this.alerta = document.getElementById("alert");
            this.filtro = document.getElementById("filtro-tareas");
            this.alerta.style.display = "none"; // Ocultar alerta al inicio
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
                    this.alerta.style.display = "none";
                } else {
                    this.mostrarAlerta("Debes ingresar titulo y descripcion")
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
                    callBacks.alEliminar && callBacks.alEliminar(id);
                }

                if (boton.classList.contains("btn-modificar")) {
                    if(icono.classList.contains("fa-pen")) {
                      
                        icono.classList.remove("fa-pen");
                        icono.classList.add("fa-floppy-disk");
                        
                        celdaTitulo.innerHTML = `<input type = "text" id = "inputTitulo-${id}" placeholder="titulo" value = "${tituloAModificar}" data-original="${tituloAModificar}" size = "15"/>`;
                        celdaDescripcion.innerHTML = `<textarea id = "inputDescripcion-${id}" placeholder="descripcion" value = "" data-original="${descripcionAModificar}" size = "15">${descripcionAModificar}</textarea>`;
                        document.getElementById(`check-${id}`).disabled = false;

                    }else if (icono.classList.contains("fa-floppy-disk")) {
                        const tituloModificado = document.getElementById(`inputTitulo-${id}`);
                        const descripcionModificado = document.getElementById(`inputDescripcion-${id}`);
                        const checkNuevo = document.getElementById(`check-${id}`).checked;
                        console.log(document.getElementById(`check-${id}`).dataset.original);
                        console.log(checkNuevo);
                        const tituloNuevo = tituloModificado?.value.trim();
                        const descripcionNuevo = descripcionModificado?.value.trim();

                        const tituloOriginal = tituloModificado.dataset.original;
                        const descripcionOriginal = descripcionModificado.dataset.original;
                        
                        if(!tituloNuevo || !descripcionNuevo){
                            this.mostrarAlerta("Debes ingresar titulo y descripcion");
                            return;
            }
                        if(tituloNuevo === tituloOriginal   && descripcionNuevo=== descripcionOriginal &&  checkNuevo === (document.getElementById(`check-${id}`).dataset.original === "true")) {
                            this.mostrarAlerta("No has modificado titulo y descripcion");
                            return;
                        }
                        this.alerta.style.display = "none";
                
                        callBacks.alModificar && callBacks.alModificar(id,tituloNuevo,descripcionNuevo,checkNuevo);

                        icono.classList.remove("fa-floppy-disk");
                        icono.classList.add("fa-pen");
                        document.getElementById(`check-${id}`).disabled = true;             
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
                                ${tarea.completado
                                    ?`<td><input type="checkbox" id="check-${tarea.id}" checked disabled data-original = ${tarea.completado}></td>`
                                    :`<td><input type="checkbox" id="check-${tarea.id}" disabled data-original = ${tarea.completado}></td>`}
                                <td><button class = "btn-modificar" id="btn-modificar-${tarea.id}"><i class="fas fa-pen" id = "icono-${tarea.id}"></i></button></td>
                                <td><button class = "btn-eliminar " id="btn-eliminar-${tarea.id}"><i class="fas fa-trash"></i></button></td>`
            
                this.listaElemento.appendChild(tr);
            });
        }

        mostrarAlerta(textoAlerta) {
            
        this.alerta.style.display = "block";
        
        this.alerta.innerText = textoAlerta;
        
        setTimeout(() => {
            this.alerta.style.display = "none";
            this.alerta.innerText = "";
        }, 2000);
        }

        inicializarFiltro(onFiltar) {
            const filtro = document.getElementById("filtro-tareas");
            filtro.addEventListener("change", (e) => {
                onFiltar(e.target.value);
            })
        }
    }

    

    