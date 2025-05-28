import { agregarAlCarrito, guardarCarrito, } from "./carrito.js";

/*const btnVaciar = document.getElementById("icon-delete");
btnVaciar.addEventListener("click", () => {
  vaciarCarrito(popup, contenidoCarrito, contador, totalCarrito);
});*/

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
fetch(`http://localhost:8020/api/productos/${id}`)
  .then((res) => res.json())
  .then((producto) => {
    const detalleDiv = document.getElementById("detalle-producto");

    detalleDiv.innerHTML = `
      <div class="card col-md-4 shadow" id="contenedor-detalle">
        <img src="${producto.imagenUrl}" class="card-img-top product-img" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title text-center">${producto.nombre}</h5>
          <p class="card-text text-center" style="font-size: 30px;"><strong>${producto.descripcion}</strong></p>
          <p class="card-text fw-bold text-center">$${producto.precio}</p>
          <div class="btn-group mt-auto d-flex justify-content-evenly">
            <button class="btn btn-primary" id="btn-agregar">Agregar al carrito</button>
          </div>
        </div>
      </div>
    `;

    const botonAgregar = document.getElementById("btn-agregar");
    
    const cantidadSpan = document.getElementById("cantidad");

    // Agregar producto al carrito
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto, popup, contenidoCarrito, contador, totalCarrito);

      totalCarrito.style.display = "block";
      btnCompra.style.display = "block";
      contador.style.display = "flex";
      cantidadSpan.textContent = parseInt(cantidadSpan.textContent) + 1;
      console.log("produ agregado");
      
   

    });

    guardarCarrito();
  })
  .catch((error) => console.error("Error al obtener el producto", error));