// Elementos principales 
const carritoIcono = document.getElementById('carrito-icono');
const carrito = document.getElementById('carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const itemsCarrito = document.getElementById('items-carrito');
const totalCarrito = document.getElementById('total-carrito');
const finalizarCompra = document.getElementById('finalizar-compra');
const contadorCarrito = document.getElementById('contador-carrito');
const botonesAgregar = document.querySelectorAll('.boton-agregar');

// Estado del carrito
let carritoItems = [];

// Mostrar/ocultar el carrito
carritoIcono.addEventListener('click', () => {
    carrito.style.display = 'block';
});

cerrarCarrito.addEventListener('click', () => {
    carrito.style.display = 'none';
});

// Agregar producto al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.getAttribute('data-nombre');
        const precio = parseFloat(boton.getAttribute('data-precio'));

        // Verificar si el producto ya está en el carrito
        const productoExistente = carritoItems.find(item => item.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carritoItems.push({ nombre, precio, cantidad: 1 });
        }

        actualizarCarrito();
    });
});

// Actualizar el contenido del carrito
function actualizarCarrito() {
    itemsCarrito.innerHTML = '';
    let total = 0;

    carritoItems.forEach((item, index) => {
        total += item.precio * item.cantidad;

        // Crear elementos del producto en el carrito
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrito');
        itemDiv.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;

        // Botón para eliminar el producto
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar-item');
        botonEliminar.addEventListener('click', () => {
            carritoItems.splice(index, 1);
            actualizarCarrito();
        });

        itemDiv.appendChild(botonEliminar);
        itemsCarrito.appendChild(itemDiv);
    });

    // Actualizar totales y contador
    totalCarrito.textContent = total.toFixed(2);
    contadorCarrito.textContent = carritoItems.reduce((acc, item) => acc + item.cantidad, 0);
    finalizarCompra.disabled = carritoItems.length === 0;
}

// Finalizar compra
finalizarCompra.addEventListener('click', () => {
    if (carritoItems.length > 0) {
        alert('¡Gracias por tu compra!');
        carritoItems = [];
        actualizarCarrito();
        carrito.style.display = 'none';
    }
});
