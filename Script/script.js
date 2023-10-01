document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');
  
    fetch('./Script/products.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(producto => {
          const productoCard = document.createElement('div');
          productoCard.classList.add('cards');
          productoCard.innerHTML = `
            <h2>${producto.titulo}</h2>
            <img src="${producto.detalle.imagenes}" alt="${producto.titulo}">
            <h3>${producto.detalle.precio}</h3>
            <button class="ver-detalle btn btn-dark" data-id="${producto.id}">Ver Detalle</button>
          `;
          productosContainer.appendChild(productoCard);
        });
      });
  
    // productosContainer.addEventListener('click', (event) => {
    //   if (event.target.classList.contains('ver-detalle')) {
    //     const productoId = event.target.getAttribute('data-id');
    //     localStorage.setItem('productoSeleccionado', productoId);
    //     window.location.href = `./details.html`;
    //   }
    // });
  });
  