//Obtiene el ID del producto de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("id obtenido ", id);
//Obtener los elemntos para el carrito
const iconoCarrito = document.getElementById("carrito-icono");
const popup = document.getElementById("carrito-popup");
const contenidoCarrito = document.getElementById("producto-mini");
const contador = document.getElementById("contador-carrito");
const totalCarrito = document.getElementById("total-carrito");

import { carrito, agregarAlCarrito } from "./carrito.js";

//Fetch y rernderizado de productos detalle.html

fetch(`http://localhost:8020/api/productos/${id}`)
  .then((res) => res.json())
  .then((producto) => {
    const detalleDiv = document.getElementById("detalle-producto");

    detalleDiv.innerHTML = `
    <div class = "card col-md-4 shadow " id ="contenedor-detalle">
    <img src="${producto.imagenUrl}" class ="card-img-top product-img"  alt ="${producto.nombre}" id = "produ-carrito">
    <div class="card-body"> 
        <h5 class ="card-title text-center">${producto.nombre}</h5>
        <p class= "card-text text-center" style ="font-size :30px"><strong> ${producto.descripcion} </strong></p>
        <p class= "card-text fw-bold text-center" > $ ${producto.precio} </p>
        <div class ="btn-group mt-auto d-flex justify-content-evenly">
        <button class ="btn btn-primary me-center" id="btn-agregar"> Agregar al carrito </button>
    
          </div>
        </div>
      </div>
      
        
`;
    const mini = document.getElementById("producto-mini");

    //Evento para el boton "Agregar al carrito"
    const botonAgregar = document.getElementById("btn-agregar");
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(
        producto,
        iconoCarrito,
        popup,
        contenidoCarrito,
        contador,
        totalCarrito
      );
      //Mostrar la venta emergente con el producto añdadido
      mini.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="${producto.imagenUrl}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
      <div>
        <p style="margin: 0;">${producto.nombre}</p>
        <small> ${producto.descripcion}</small>
        <small>$${producto.precio}</small>
      </div>
    </div>

  `;
      popup.classList.add("visible");
      console.log("Carrito actualizado", carrito);
    });
  }) //then

  .catch((error) => console.error("Error al obtener producto", error));
