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

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del producto desde la URL
    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    // URL base de la API
    let baseUrl = 'https://fakestoreapi.com/products/';

    let categories = {
        'electronics': 'Electrónica',
        'jewelery': 'Accesorios',
        "men's clothing": 'Ropa de Hombre',
        "women's clothing": 'Ropa de Mujer'
    };

    // Elementos HTML donde se mostrará la información del producto
    let productNameElement = document.querySelector('.product-name');
    let productDescriptionElement = document.querySelector('.product-description');
    let productImageElement = document.querySelector('.product-image img');
    let productCategoryElement = document.querySelector('.product-category');
    let cardHeaderElement = document.createElement('h1');

    // Obtener los datos del producto desde la API
    fetch(baseUrl + productId)
        .then(function(response) {
            return response.json();
        })
        .then(function(product) {
            // Insertar los datos del producto en los elementos HTML correspondientes
            productNameElement.textContent = product.title;
            productDescriptionElement.textContent = product.description;
            productDescriptionElement.id = 'product-description'; // Reutilizamos el css y le agregamos estilo solamente a product-description.
            productImageElement.src = product.image;
            
            // Crear enlace para la categoría
            let categoryLink = document.createElement('a');
            let categoryUrl = 'category.html?category=' + product.category.replace(/\s+/g, '%20'); // Reemplaza los espacios por '%20' para mantener la URL
            categoryLink.href = categoryUrl;
            categoryLink.textContent = 'Categoría: ' + categories[product.category];
            productCategoryElement.appendChild(categoryLink);

            cardHeaderElement.textContent = categories[product.category];
            document.querySelector('.card-header').appendChild(cardHeaderElement);

            let productPrice = '$' + product.price;

            // Actualizar el texto del botón "Agregar al Carrito" con el precio del producto
            let addToCartButton = document.querySelector('.btn');
            addToCartButton.textContent = 'Agregar al Carrito ' + productPrice;

            // Manejar el evento de clic en el botón "Agregar al carrito"
            addToCartButton.addEventListener('click', function(event) {
                event.preventDefault();
                // Verificar si el producto ya ha sido agregado previamente
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                if (cartItems.includes(productId)) {
                    alert('Este producto ya ha sido agregado al carrito.');
                } else {
                    // Agregar el ID del producto al array de productos en el carrito
                    cartItems.push(productId);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    alert('El producto ha sido agregado al carrito.');
                }
            });
        })
        .catch(function(error) {
            console.error('Error fetching product data:', error);
        });
});
