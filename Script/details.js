document.addEventListener('DOMContentLoaded', () => {
  const detallePrincipal = document.getElementById('detalle-principal');
  const volverButton = document.getElementById('volver');
  const productoId = localStorage.getItem('productoSeleccionado');

  if (productoId) {
    fetch('./Script/products.json')
      .then(response => response.json())
      .then(data => {
        const producto = data.find(p => p.id === parseInt(productoId));
        if (producto) {
          detallePrincipal.innerHTML = `
            <h1>${producto.titulo}</h1>
            <img src="${producto.detalle.imagenes}" alt="${producto.titulo}">
            <p class="descripcion">${producto.detalle.descripcionExtendida}</p>
            <p class="precio">${producto.detalle.precio}</p>
            
            ${
              producto.talles
                ? `
                <div class="talles">
                <label>Talles disponibles:</label>
                <div id="talle-buttons" class="btn-group" role="group">
                  ${producto.talles.map(talleObj => `
                    <button
                      type="button"
                      class="btn btn-secondary"
                      ${talleObj.cantidadDisponible === 0 ? 'disabled' : ''}
                    >
                      ${talleObj.talle}
                    </button>
                  `).join('')}
                </div>
              </div>
                  `
                : ''
            }
            
            <div class="cantidad">
              <label for="cantidad-input">Cantidad</label>
              <input id="cantidad-input" type="number" class="cantidad" min="1" disabled>
            </div>
            
            <button class="comprar btn btn-dark" id="comprar-btn" disabled>Comprar</button>
          `;
          
          const talleButtons = document.querySelectorAll('#talle-buttons button');
          const cantidadInput = document.getElementById('cantidad-input');
          const comprarButton = document.getElementById('comprar-btn');

          function talleSeleccionado(selectedButton) {
            talleButtons.forEach(button => {
              if (button === selectedButton) {
                button.classList.add('talle-elegido');
              } else {
                button.classList.remove('talle-elegido');
              }
            });
          }
          
          if (producto.talles) {
            talleButtons.forEach(button => {
            button.addEventListener('click', () => {
              if (!button.hasAttribute('disabled')) {
                cantidadInput.removeAttribute('disabled');
                comprarButton.removeAttribute('disabled');
                talleSeleccionado(button);
              }
            });
          });
        } else {
          cantidadInput.removeAttribute('disabled');
          comprarButton.removeAttribute('disabled');
        }
      }
      });
  }
  
  volverButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});