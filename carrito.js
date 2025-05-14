// Obtener los elementos del DOM al cargar el script
const mini = document.getElementById("producto-mini");
const contador = document.getElementById("contador-carrito");
const totalCarrito = document.getElementById("total-carrito");
const popup = document.getElementById("carrito-popup");

export const carrito = [];

export function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
}

export function actualizarCarrito() {
  // Verificar si los elementos están correctamente obtenidos
  if (!mini || !contador || !totalCarrito || !popup) {
    console.error("No se encontraron los elementos del carrito en el DOM.");
    return;
  }

  mini.innerHTML = ""; // Limpiar el contenido actual
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;

    const item = document.createElement("div");
    item.classList.add("producto-item");
    item.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="${
          producto.imagenUrl
        }" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
        <div>
          <p style="margin: 0;">${producto.nombre}</p>
          <small>${producto.descripcion}</small>
          <small>$${producto.precio}</small>
        </div>
        <div style="margin-left: auto;">
          <button onclick="actualizarCantidad(${index}, -1)">-</button>
          <span>${producto.cantidad || 1}</span>
          <button onclick="actualizarCantidad(${index}, 1)">+</button>
        </div>
      </div>
      <hr>
    `;
    mini.appendChild(item);
  });
  popup.classList.add("visible");
  // Actualizar el contador y el total
  contador.innerText = carrito.length;
  totalCarrito.innerText = `Total: $${total}`;
}
