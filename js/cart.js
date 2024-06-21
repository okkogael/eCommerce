document.addEventListener('DOMContentLoaded', function() {
    let mainNav = document.getElementById('main-nav');
    let navbarToggle = document.getElementById('navbar-toggle');

    navbarToggle.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            mainNav.style.display = "none";
            this.classList.remove('active');
        } else {
            mainNav.style.display = "flex";
            this.classList.add('active');
        }
    });

    let cartItemsContainer = document.getElementById('cart-items-container');
    let finalizePurchaseButton = document.getElementById('finalize-purchase');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Su carrito está vacío.</p>';
        finalizePurchaseButton.style.display = 'none';
        document.querySelector('.cart-footer').style.marginTop = '405px';
    } else {
        document.querySelector('.cart-footer').style.marginTop = '0';
    }

    function createProductCard(product) {
        let card = document.createElement('div');
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

    function loadCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(function(itemId) {
            fetch(`https://fakestoreapi.com/products/${itemId}`)
                .then(function(response) { return response.json(); })
                .then(function(product) {
                    let productCard = createProductCard(product);
                    cartItemsContainer.appendChild(productCard);
                })
                .catch(function(error) { console.error('Error fetching product data:', error); });
        });
    }

    function removeFromCart(itemId) {
        let updatedCartItems = cartItems.filter(function(id) {
            return id !== itemId;
        });
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        location.reload();
    }

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            let itemId = event.target.getAttribute('data-id');
            removeFromCart(itemId);
        }
    });

    finalizePurchaseButton.addEventListener('click', function() {
        localStorage.removeItem('cartItems');
        alert('Gracias por su compra.');
        window.location.href = 'index.html';
    });

    loadCartItems();
});
