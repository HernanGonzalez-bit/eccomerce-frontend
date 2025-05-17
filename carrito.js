export const carrito = [];
const cantidad = document.getElementById("cantidad");

const mensajeCarritoVacio = document.getElementById("icono-carrito-contenido");

mensajeCarritoVacio.addEventListener("click", (e) => {
  console.log("carritovacio");
});

// Agregar producto al carrito
export function agregarAlCarrito(producto, popup, contenidoCarrito, contador, totalCarrito) {
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito(popup, contenidoCarrito, contador, totalCarrito);
}

//-----------------------------------------------------------------------------------------------

// Actualizar el carrito
export function actualizarCarrito(popup, contenidoCarrito, contador, totalCarrito) {
  let total = 0;
  let cantidadTotal = 0;
  contenidoCarrito.innerHTML = ""; // Limpiar el contenido previo

  if (carrito.length === 0) {
    contenidoCarrito.innerHTML = `
              
    <div style="display: flex; align-items: center; gap: 10px;">
     
    <p> Carrito vacio jum </p>
    
    </div>
  `;
  }

  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
    cantidadTotal += producto.cantidad;

    const item = document.createElement("div");
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.classList.add("carrito-item");

    item.innerHTML = `
              
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="${producto.imagenUrl}" style="width: 50px; height: 50px; object-fit: cover;">
      <p> ${producto.descripcion}  </p>
      
      
      </div>
    `;
    contenidoCarrito.appendChild(item);
  });

  // Actualizar el contador y el total del carrito
  contador.innerText = cantidadTotal;
  totalCarrito.innerText = `Total: $${total}`;

  if (carrito.length > 0) {
    popup.classList.add("visible");
  } else {
    //popup.classList.remove("visible");
  }
}

//-----------------------------------------------------------------------------------------------

//vaciar carrito

// Actualizar la cantidad de un producto
export function actualizarCantidad(id, cambio, popup, contenidoCarrito, contador, totalCarrito) {
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
      const index = carrito.indexOf(producto);
      carrito.splice(index, 1);
    }
    actualizarCarrito(popup, contenidoCarrito, contador, totalCarrito); // Actualizar el carrito después del cambio
  }
}

export function vaciarCarrito(popup, contenidoCarrito, contador, totalCarrito, cantidadTotal) {
  carrito.length = 0;
  cantidadTotal = 0;

  actualizarCarrito(popup, contenidoCarrito, contador, totalCarrito);
}
