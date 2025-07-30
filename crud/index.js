import ModeloTareas from "./model.js";
import VistaTareas from "./view.js";
import ControladorTareas from "./controler.js";

document.addEventListener('DOMContentLoaded',()=>
{
    const model = new ModeloTareas();
    const view = new VistaTareas();
    const controller = new ControladorTareas(model, view);
    controller.iniciar();
    console.log('todo cargado correctamente');
});

