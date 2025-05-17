import { agregarAlCarrito, actualizarCantidad, vaciarCarrito } from "./carrito.js";

const btnVaciar = document.getElementById("icon-delete");
btnVaciar.addEventListener("click", () => {
  vaciarCarrito(popup, contenidoCarrito, contador, totalCarrito);
});

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
    const btnIncremento = document.getElementById("incremento");
    const btnDecremento = document.getElementById("decremento");
    const cantidadSpan = document.getElementById("cantidad");

    // Agregar producto al carrito
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto, popup, contenidoCarrito, contador, totalCarrito);

      totalCarrito.style.display = "block";
      btnCompra.style.display = "block";
      contador.style.display = "flex";
      cantidad.style.display = "flex";
      btnIncremento.style.display = "block";
      btnDecremento.style.display = "block";
    });

    // Incrementar cantidad
    btnIncremento.addEventListener("click", () => {
      actualizarCantidad(id, 1, popup, contenidoCarrito, contador, totalCarrito);
      cantidadSpan.textContent = parseInt(cantidadSpan.textContent) + 1;
    });

    // Decrementar cantidad
    btnDecremento.addEventListener("click", () => {
      if (parseInt(cantidadSpan.textContent) > 0) {
        actualizarCantidad(id, -1, popup, contenidoCarrito, contador, totalCarrito);
        cantidadSpan.textContent = parseInt(cantidadSpan.textContent) - 1;
      }
    });
  })
  .catch((error) => console.error("Error al obtener el producto", error));
