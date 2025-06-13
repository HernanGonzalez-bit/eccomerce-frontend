import { formatearPrecio } from "./utils";

const carritoGuardado = localStorage.getItem("carrito");
export let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
const contenidoCarrito = document.getElementById("producto-mini");


export function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const btnCompra = document.getElementById("btn-iniciar-compra");
const popup = document.getElementById("carrito-popup");
const contador = document.getElementById("contador-carrito");
const totalCarrito = document.getElementById("total-carrito");
const iconClose = document.getElementById("icon-close")
const iconoCarrito = document.getElementById("icono-carrito-contenido")

const cantidad = document.getElementById("cantidad")



// Agregar producto al carrito
export function agregarAlCarrito(producto, popup, contenidoCarrito, contador, totalCarrito) {
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito(popup, contenidoCarrito, contador, totalCarrito)
  popup.classList.add("visible");
 
}

//-----------------------------------------------------------------------------------------------


// Actualizar el carrito
export function actualizarCarrito(popup, contenidoCarrito, contador, totalCarrito) {
 
  let total = 0;
  let cantidadTotal = 0;
  contenidoCarrito.innerHTML = "";
  // contenidoCarrito.innerHTML = ""; // Limpiar el contenido previo

  
  if (carrito.length == 0) {
    totalCarrito.style.display = "none";
    btnCompra.style.display = "none";
    cantidad.style.display = "none";
    carrito.length = 0;
  
    contenidoCarrito.innerHTML = `
            
    <p class = "mensaje-carrito-vacio"><strong>El carrito esta vacio</strong></p>
    
  
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
          <span class ="cantidad"  data-id = "${producto.id}" >${producto.cantidad}</span>
          <button class="btn-sumar" data-id="${producto.id}">+</button>
        </div>
        <div class="price">$${formatearPrecio(producto.precio) * producto.cantidad}</div>
         <span class="material-symbols-outlined delete-btn" data-id=${producto.id}>
        delete
      </span>
      </li>
    </ul>
    `;
    contenidoCarrito.appendChild(item);
  });

  // Actualizar el contador y el total del carrito
  contador.innerText = carrito.length;
  totalCarrito.innerText = `Total: $${formatearPrecio(total)}`;

  guardarCarrito()
}



//Eliminar cualquier producto del carrito
contenidoCarrito.addEventListener("click",(e) => {
  if (e.target.classList.contains("delete-btn")) {
  
  const id = parseInt(e.target.dataset.id);
  carrito = carrito.filter(producto => producto.id !== id );


  }
  
  
  if (e.target.classList.contains("btn-sumar")) {
    const id = parseInt(e.target.dataset.id);
    actualizarCantidad(id, 1, popup, contenidoCarrito, contador, totalCarrito);
    cantidad.textContent = parseInt(cantidad.textContent) + 1;
    guardarCarrito()
  
  }
  
  if (e.target.classList.contains("btn-restar")) {
    const id = parseInt(e.target.dataset.id);
    actualizarCantidad(id, -1, popup, contenidoCarrito, contador, totalCarrito);
    cantidad.textContent = parseInt(cantidad.textContent) - 1;
    guardarCarrito()
  }
  


  actualizarCarrito(popup, contenidoCarrito, contador, totalCarrito);
  guardarCarrito()

  })
  

//-----------------------------------------------------------------------------------------------

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
    guardarCarrito()
  }
}

//iconos para cerrar la ventana del carrito

iconClose.addEventListener("click", ()=> {

  popup.classList.remove('visible');
  document.body.style="overflow-y:'auto'"
  
})


iconoCarrito.addEventListener("click",() => {

  if (popup.classList.contains("popup-carrito")){

    popup.classList.add("visible")
    document.body.style="overflow-y:hidden"
  } 

    
  
})




guardarCarrito()
actualizarCarrito(popup, contenidoCarrito, contador, totalCarrito);
