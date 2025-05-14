// Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("ID obtenido:", id);

import { agregarAlCarrito, carrito } from "./carrito.js";

// Fetch y renderizado del producto
fetch(`http://localhost:8020/api/productos/${id}`)
  .then((res) => res.json())
  .then((producto) => {
    const detalleDiv = document.getElementById("detalle-producto");

    // Crear la estructura del detalle del producto
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

    // Botón para agregar al carrito
    const botonAgregar = document.getElementById("btn-agregar");
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto);
      console.log("Carrito actualizado:", carrito);
    });
  })
  .catch((error) => console.error("Error al obtener el producto:", error));
