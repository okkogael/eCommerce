document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del producto desde la URL
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    // URL base de la API
    var baseUrl = 'https://fakestoreapi.com/products/';

    var categories = {
        'electronics': 'Electrónica',
        'jewelery': 'Accesorios',
        "men's clothing": 'Ropa de Hombre',
        "women's clothing": 'Ropa de Mujer'
    };

    // Elementos HTML donde se mostrará la información del producto
    var productNameElement = document.querySelector('.product-name');
    var productDescriptionElement = document.querySelector('.product-description');
    var productImageElement = document.querySelector('.product-image img');
    var productCategoryElement = document.querySelector('.product-category');
    var cardHeaderElement = document.createElement('h1');

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
            productCategoryElement.textContent = 'Categoría: ' + categories[product.category]; // Esto lo hacemos porque queremos que figure el nombre lindo que nosotros le asignemos, no crudo de la API, en un futuro esto soportaria un LAN System, es decir, un sistema de traducciones.
            cardHeaderElement.textContent = categories[product.category]; // Lo mismo en el card-header.
            document.querySelector('.card-header').appendChild(cardHeaderElement); // Para que herede el estilo, hacemos el h1.

            var productPrice = '$' + product.price;

            // Actualizar el texto del botón "Agregar al Carrito" con el precio del producto
            var addToCartButton = document.querySelector('.btn');
            addToCartButton.textContent = 'Agregar al Carrito ' + productPrice;

            // Manejar el evento de clic en el botón "Agregar al carrito"
            addToCartButton.addEventListener('click', function(event) {
                event.preventDefault();
                // Verificar si el producto ya ha sido agregado previamente
                var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
				console.log(cartItems)
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
