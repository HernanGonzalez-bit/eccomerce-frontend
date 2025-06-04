import { actualizarCarrito } from "./carrito.js";



  const popup = document.getElementById("carrito-popup");
  const contenidoCarrito = document.getElementById("producto-mini");
  const contador = document.getElementById("contador-carrito");
  const totalCarrito = document.getElementById("total-carrito");

 

fetch("http://localhost:8020/api/productos")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("productos-container");

    //Renderizado productos index.html
    data.forEach((p) => {
      const card = document.createElement("div");
      card.className = "col-6 col-md-3 mb-4"; //3 por fila en escritorio,2 en mobile.
      card.innerHTML = `
      <div class= "card h-100 shadow card-inicio"  >
        <img src ="${p.imagenUrl}" class = "card-img-top" alt ="${p.nombre}" >
        <div class = "card-body">
        <h5 class ="card-title text-center">
        <a href="detalle.html?id=${p.id}" class ="text-decoration-none text-dark">
        ${p.nombre} </a>

        </h5>
        <p class= "card-text text-center" style ="font-size :13px"><strong> ${p.descripcion} </strong></p>

        <p class= "card-text fw-bold text-center" > $ ${p.precio} </p>
        <span class ="vermas-contenedor">
        <button class = "btn btn-secondary vermas" id = "vermas" onclick = "verMas(${p.id})"> Ver mas </button>
         </span>
      
        </div>
      </div>
       `;
      container.appendChild(card);
   
    });
    


  });
  
  

window.verMas = function (id) {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "flex";
  setTimeout(() => {
    window.location.href = `detalle.html?id=${id}`;
  }, 1500);
  //preloader.style.display = "block";
};


actualizarCarrito(popup,contenidoCarrito,contador,totalCarrito)