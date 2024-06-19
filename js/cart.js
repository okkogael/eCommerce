document.addEventListener('DOMContentLoaded', function() {
    // Obtener contenedor de elementos del carrito
    var cartItemsContainer = document.getElementById('cart-items-container');
    var finalizePurchaseButton = document.getElementById('finalize-purchase');
    var baseUrl = 'https://fakestoreapi.com/products/';
    
    // Obtener IDs de productos del carrito desde localStorage
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Mostrar mensaje si el carrito está vacío
    if (cartItems.length === 0) { // Usamos logica con el carrito para usar la pagina entera o no dependiendo del carrito.
        cartItemsContainer.innerHTML = '<p>Su carrito está vacío.</p>';
        finalizePurchaseButton.style.display = 'none';
    
        // Agregar margin-top al footer cuando el carrito está vacío
        var footer = document.querySelector('.cart-footer');
        if (footer) {
            footer.style.marginTop = '405px';
        }
    
        return;
    } else {
        // Quitar margin-top del footer cuando hay elementos en el carrito
        var footer = document.querySelector('.cart-footer');
        if (footer) {
            footer.style.marginTop = '0'; // O puedes usar 'none' si prefieres
        }
    }
    
    // Función para crear la tarjeta del producto
    function createProductCard(product) {
        var card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <a href="producto.html?id=${product.id}" title="Ver Más">
                <div class="card-header" style="background-image: url('${product.image}');"></div>
            </a>
            <div class="card-body">
                <h2 class="titulo-producto">${product.title}</h2>
                <p>${product.description}</p>
                <button class="btn remove-from-cart" data-id="${product.id}">Remover -${product.price}</button>
            </div>
        `;
        return card;
    }
    
    // Función para cargar productos del carrito
    function loadCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(function(itemId) {
            fetch(baseUrl + itemId)
                .then(function(response) { return response.json(); })
                .then(function(product) {
                    var productCard = createProductCard(product);
                    cartItemsContainer.appendChild(productCard);
                })
                .catch(function(error) { console.error('Error fetching product data:', error); });
        });
    }
    
    // Función para remover un producto del carrito
    function removeFromCart(itemId) {
        var updatedCartItems = cartItems.filter(function(id) {
            return id !== itemId;
        });
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        location.reload(); // Refrescar la página
    }
    
    // Manejar el evento de clic en el botón "Remover"
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            var itemId = event.target.getAttribute('data-id');
            removeFromCart(itemId);
        }
    });
    
    // Manejar el evento de clic en el botón "Finalizar Compra"
    finalizePurchaseButton.addEventListener('click', function() {
        localStorage.removeItem('cartItems');
        alert('Gracias por su compra.');
        window.location.href = 'index.html';
    });
    
    // Cargar los productos del carrito
    loadCartItems();
});
