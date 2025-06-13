import { agregarAlCarrito, guardarCarrito, } from "./carrito.js";
import { formatearPrecio } from "./utils.js";



// Obtener el ID del producto de la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Obtener elementos del DOM
const popup = document.getElementById("carrito-popup");
const contenidoCarrito = document.getElementById("producto-mini");
const contador = document.getElementById("contador-carrito");
const totalCarrito = document.getElementById("total-carrito");
const btnCompra = document.getElementById("btn-iniciar-compra");

// Fetch del producto

if (!isNaN(id)) {
fetch(`http://localhost:8020/api/productos/${id}`)
  .then((res) => res.json())
  .then((producto) => {
    const detalleDiv = document.getElementById("detalle-producto");

    detalleDiv.innerHTML = `
      <div class="card col-md-5 shadow" id="contenedor-detalle">
        <img src="${producto.imagenUrl}" class="card-img-top product-img" alt="${producto.nombre}">
        <div class="card-body-detalle">
          <h5 class="card-title text-center">${producto.nombre}</h5>
          <p class="card-text text-center" style="font-size: 30px;"><strong>${producto.descripcion}</strong></p>
          <p class="card-text fw-bold text-center">${formatearPrecio(producto.precio)}</p>
          <div class="btn-agregar-contenedor center">
           <button id="btn-agregar">Agregar al carrito</button>
            
          </div>
        </div>
      </div>
    `;

    const botonAgregar = document.getElementById("btn-agregar");
   

    // Agregar producto al carrito
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto, popup, contenidoCarrito, contador, totalCarrito);

      totalCarrito.style.display = "block";
      btnCompra.style.display = "block";
      contador.style.display = "block";
     
      
    });

    guardarCarrito();
  })
  .catch((error) => console.error("Error al obtener el producto", error));

}