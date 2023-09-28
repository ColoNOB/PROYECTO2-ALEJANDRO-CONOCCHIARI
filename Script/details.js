document.addEventListener('DOMContentLoaded', () => {
    const detallePrincipal = document.getElementById('detalle-principal');
    const volverButton = document.getElementById('volver');
  
    const productoId = localStorage.getItem('productoSeleccionado');
  
    if (productoId) {
      fetch('https://raw.githubusercontent.com/ColoNOB/Proyecto-JS/main/Script/products.json')
        .then(response => response.json())
        .then(data => {
          const producto = data.find(p => p.id === parseInt(productoId));
          if (producto) {
            detallePrincipal.innerHTML = `
              <h1>${producto.titulo}</h1>
              <img src="${producto.detalle.imagenes}" alt="${producto.titulo}">
              <p class="descripcion">${producto.detalle.descripcionExtendida}</p>
              <p class="precio">${producto.detalle.precio}</p>
              <button class="comprar btn btn-dark">Comprar</button>
            `;
          }
        });
    }
  
    volverButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  });
  