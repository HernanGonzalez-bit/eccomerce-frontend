export const carrito = [];

export function agregarAlCarrito(
  producto,
  iconoCarrito,
  popup,
  contenidoCarrito,
  contador,
  totalCarrito
) {
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito(
    iconoCarrito,
    popup,
    contenidoCarrito,
    contador,
    totalCarrito
  );
}

//funciones del carrito
export function actualizarCarrito(
  iconoCarrito,
  popup,
  contenidoCarrito,
  contador,
  totalCarrito
) {
  //se reinicia el total en cada actualizacion
  let total = 0;
  contenidoCarrito.innerHTML = " ";
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;

    const item = document.createElement("div");
    item.classList.add("mb-5");
    item.innerHTML = `
    <div> 
        <div>
        <p> ${producto.nombre} </p>
      <small> $ ${producto.nombre}</small>
      </div> 
      <div style="display: flex; align-items: center;">
      <button class ="btn btn-sm btn-secondary"  onclick ="actualizarCantidad(${producto.id},-1)">-</button>
      <button class ="btn btn-sm btn-secondary"  onclick ="actualizarCantidad(${producto.id},1)">+</button>
         </div>
            </div>
     `;
    contenidoCarrito.appendChild(item);
  });

  totalCarrito.innerText = `Total: $${total}`;

  contador.innerText = carrito.length;
  contador.style.display = carrito.length > 0 ? "inline-block" : "none";

  if (carrito.length > 0) {
    popup.classList.add("visible");
  }
}
// Función para actualizar la cantidad de un producto
export function actualizarCantidad(id, cambio) {
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
      const index = carrito.indexOf(producto);
      carrito.splice(index, 1); // Si la cantidad llega a 0, eliminamos el producto
    }

    actualizarCarrito(
      iconoCarrito,
      popup,
      contenidoCarrito,
      contador,
      totalCarrito
    ); // Volvemos a renderizar el carrito
  }
}
