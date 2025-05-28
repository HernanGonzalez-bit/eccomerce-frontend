const carritoGuardado = localStorage.getItem("carrito");
export const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
const contenidoCarrito = document.getElementById("producto-mini");


export function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}



const btnCompra = document.getElementById("btn-iniciar-compra");

const popup = document.getElementById("carrito-popup");
const contador = document.getElementById("contador-carrito");
const totalCarrito = document.getElementById("total-carrito");
const cantidadSpan = document.getElementById("cantidad");




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
  contenidoCarrito.innerHTML = "";
  // contenidoCarrito.innerHTML = ""; // Limpiar el contenido previo

  
  if (carrito.length === 0) {
    totalCarrito.style.display = "none";
    btnCompra.style.display = "none";
    cantidad.style.display = "none";
    carrito.length = 0;
  
    contenidoCarrito.innerHTML = `
              

    <p><strong>El carrito esta vacio</strong></p>
   
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
              
      
    <ul class="product-list">
      <li class="product-item">
        <div class="product-info">
          <img src="${producto.imagenUrl}" >
          <div class="product-details">
            <span>${producto.descripcion}</span>

          </div>
        </div>
        <div class="product-cantidad">
          <button class= "btn-restar" data-id = "${producto.id}">-</button>
          <span class ="cantidad" data-id = "${producto.id}" >${producto.cantidad}</span>
          <button class="btn-sumar" data-id="${producto.id}">+</button>
        </div>
        <div class="price">$${producto.precio * producto.cantidad}</div>
         <span class="material-symbols-outlined delete-btn" id="icon-delete" >
        delete
      </span>
      </li>
    </ul>
 
      
      
    `;
    contenidoCarrito.appendChild(item);
  });

  // Actualizar el contador y el total del carrito
  contador.innerText = cantidadTotal;
  totalCarrito.innerText = `Total: $${total}`;

  if (carrito.length >= 0) {
    popup.classList.add("visible");
  } else {
    //popup.classList.remove("visible");
  }
}

//-----------------------------------------------------------------------------------------------

//vaciar carrito




//-----------------------------------------------------------------------------------------------

// Actualizar la cantidad de un producto
export function actualizarCantidad(id, cambio, popup, contenidoCarrito, contador, totalCarrito) {
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
      const index = carrito.indexOf(producto);
      carrito.splice(index, 1);
      totalCarrito.style.display = "none";
      btnCompra.style.display = "none";
      cantidad.style.display = "none";
      carrito.length = 0;
    }
    actualizarCarrito(popup, contenidoCarrito, contador, totalCarrito); // Actualizar el carrito después del cambio
  }
}


// Incrementar cantidad


contenidoCarrito.addEventListener("click",(e) => {
if (e.target.classList.contains("btn-sumar")) {
  const id = parseInt(e.target.dataset.id);
  actualizarCantidad(id, 1, popup, contenidoCarrito, contador, totalCarrito);
  cantidadSpan.textContent = parseInt(cantidadSpan.textContent) + 1;
  guardarCarrito()

}

if (e.target.classList.contains("btn-restar")) {
  const id = parseInt(e.target.dataset.id);
  actualizarCantidad(id, -1, popup, contenidoCarrito, contador, totalCarrito);
  cantidadSpan.textContent = parseInt(cantidadSpan.textContent) - 1;
  guardarCarrito()
}


})



guardarCarrito()

