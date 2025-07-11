const API_URL = 'https://fakestoreapi.com/products';
const productosDiv = document.getElementById('productos');
const carritoDiv = document.getElementById('carrito');
const totalSpan = document.getElementById('total');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

async function obtenerProductos() {
  const res = await fetch(API_URL);
  const productos = await res.json();
  mostrarProductos(productos);
}

function mostrarProductos(productos) {
  productosDiv.innerHTML = '';
  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h4>${p.title}</h4>
      <p>$${p.price.toFixed(2)}</p>
      <button class="btncarrito" onclick="agregarAlCarrito(${p.id})">Agregar</button>
    `;
    productosDiv.appendChild(card);
  });
}

function agregarAlCarrito(id) {
  const item = carrito.find(i => i.id === id);
  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({ id, cantidad: 1 });
  }
  guardarCarrito();
  mostrarAlerta("Agregar","Se agrego el producto al carrito",1)

  mostrar();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  mostrarAlerta("Eliminar","se quito el producto del carrito", 3)
  mostrar();
}

async function mostrar() {
  const res = await fetch(API_URL);
  const productos = await res.json();

  carritoDiv.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const producto = productos.find(p => p.id == item.id);
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-carrito';
    const subtotal = producto.price * item.cantidad;
    total += subtotal;

    itemDiv.innerHTML = `
      
      <p class="texto_carrito">${producto.title}$${producto.price.toFixed(2)} x <strong> ${item.cantidad}<strong> = $${subtotal.toFixed(2)} <button class="btneliminar" onclick="eliminarDelCarrito(${item.id})">❌</button></p>      
    `;
    carritoDiv.appendChild(itemDiv);
  });

  totalSpan.textContent = total.toFixed(2);
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

obtenerProductos();
mostrar();

// Función alerta
function mostrarAlerta(titulo, mensaje, tipo) {
  var alerta = document.getElementById("miAlerta");
  var icono = document.getElementById("iconoAlerta");
  var tituloAlerta = document.getElementById("tituloAlerta");
  var mensajeAlerta = document.getElementById("mensajeAlerta");

  //  tipo de alerta
  if (tipo === 1) {
    alerta.className = 'alerta info';  // INFO (azul)
    icono.className = 'fas fa-info-circle';
  } else if (tipo === 2) {
    alerta.className = 'alerta warning';  // WARNING (amarillo)
    icono.className = 'fas fa-exclamation-triangle';
  } else if (tipo === 3) {
    alerta.className = 'alerta error';  // Tipo ERROR (rojo)
    icono.className = 'fas fa-times-circle';
  }

  tituloAlerta.textContent = titulo;
  mensajeAlerta.textContent = mensaje;

  alerta.style.display = "block";

  setTimeout(cerrarAlerta, 5000);

}
function cerrarAlerta() {
  var alerta = document.getElementById("miAlerta");
  alerta.style.display = "none";
}

document.getElementById("btncarrito_full").addEventListener("click", function() {
  const paso2 = document.getElementById('paso2');
  const btn_next = document.getElementById('btncarrito_full');
  const paso1 = document.getElementById('paso1');
  paso = this.innerText

  if (paso == 'Entrega') {
  
  paso1.hidden = true;
  paso2.hidden = false;
  btn_next.innerHTML='Confirmar'  
    
  }if (paso == 'Confirmar') {
    mostrarAlerta('Confirmado','Pedido confirmado!',1)
    paso2.innerText='Pedido confirmado, gracias por su compra'
  btn_next.innerHTML='inicio'  
  }
  if (paso == 'inicio') {    
    window.location.href = "index.html";
  }

});

  
  
