const containerCardsProducts = document.getElementById('container-cards-products');
const fetchgalaxiasButton = document.getElementById('fetchgalaxiasButton');
const createSantoButton = document.getElementById('createSantoButton');
const updateSantoButton = document.getElementById('updateSantoButton');
const deleteSantoButton = document.getElementById('deleteSantoButton');

// Función para obtener los galaxias

  fetch('http://localhost:3000/galaxias')
    .then((res) => res.json())
    .then((items) => {
    
      items.forEach((product) => {
        containerCardsProducts.innerHTML += `
       <div class="container-cards">
          <h3>${product.nombre}</h3>
              <div class="texto-cards-container"> 
                <span class="texto_cards">Descripción: ${product.constelacion}</span>
              
              </div>
              <div class="card" id="product-${product.id}">
            <div class="container-img">
                <img class="card-img" src="${product.img}" alt=""> 
            </div>
            <div class="buttons-card-container">
              <button class="delete" data-product-id="${product.id}">eliminar</button>
              <button class="editar" data-product-id="${product.id}">editar</button>
              <button class="vermas" data-product-id="${product.id}">ver mas</button>
            </div>
        </div>
          `;
      });

      // Agregar evento de clic a los botones de eliminación
      const deleteButtons = document.querySelectorAll('.delete');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const productId = event.target.getAttribute('data-product-id');
          deleteSanto(productId);
        });
      });
        // Agregar evento de clic a los botones de editar
    const editButtons = document.querySelectorAll('.editar');
    editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-product-id');
      editSanto(productId);
    });
  });
     
  
    })
    .catch((error) => {
      console.error('Error al obtener los productos:', error);
    });


// Función para eliminar un santo por el id obtenido
function deleteSanto(itemsId) {
  fetch(`http://localhost:3000/galaxias/${itemsId}`, {
    method: 'DELETE'
  })
    .then(() => {
      console.log(`Santo con ID ${itemsId} eliminado.`);
    })
    .catch((error) => {
      console.error('Error al eliminar el santo:', error);
    });
}

// Función para crear un nuevo elemento
createSantoButton.addEventListener('click', () => {
  const name = document.querySelector('.nombre').value;
  const constelacion = document.querySelector('.conste').value;
  const nuevoSanto = {
    nombre: name,
    constelacion: constelacion
  };
  
  fetch('http://localhost:3000/galaxias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoSanto)
  })
    .then((res) => res.json())
    .then((newProduct) => {
      console.log('Nuevo santo creado:', newProduct);
    })
    .catch((error) => {
      console.error('Error al crear el nuevo santo:', error);
    });
});



// Función para editar el elemento
function editSanto(productId) {
  // Obtener los datos existentes del las contelaciones 
  fetch(`http://localhost:3000/galaxias/${productId}`)
    .then((res) => res.json())
    .then((product) => {
     
      const nombreInput = document.createElement('input');
      nombreInput.value = product.nombre;
      const constelacionInput = document.createElement('input');
      constelacionInput.value = product.constelacion;

      const container = document.getElementById(`product-${productId}`);
      container.innerHTML = ''; // Limpiar el contenedor existente
      container.appendChild(nombreInput);
      container.appendChild(constelacionInput);

      // Agregar un botón de guardado
      const saveButton = document.createElement('button');
      saveButton.innerText = 'Guardar';
      saveButton.addEventListener('click', () => {
        const updatedProduct = {
          nombre: nombreInput.value,
          constelacion: constelacionInput.value,
          img:product.img,
        };
        saveEditedSanto(productId, updatedProduct);
      });
      container.appendChild(saveButton);
    })
    .catch((error) => {
      console.error('Error al obtener los datos del producto:', error);
    });
}

// Función para guardar la edición de un santo
function saveEditedSanto(productId, updatedProduct) {
  fetch(`http://localhost:3000/galaxias/${productId}`, {
    method: 'PUT', // Puedes cambiar a 'PATCH' si es necesario
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct)
  })
    .then(() => {
      console.log(`Santo con ID ${productId} actualizado.`);
    })
    .catch((error) => {
      console.error('Error al actualizar el santo:', error);
    });
}
