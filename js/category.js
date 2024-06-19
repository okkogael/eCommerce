document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('category');

    // URL base de la API
    var baseUrl = 'https://fakestoreapi.com/products/category/';

    var categories = {
        'electronics': 'Electrónica',
        'jewelery': 'Accesorios',
        "men's clothing": 'Ropa de Hombre',
        "women's clothing": 'Ropa de Mujer'
    };

    // Configurar el título de la categoría
    var categoryTitleElement = document.getElementById('category-title');
    var categoryTitle = categories[category] || 'Categoría';
    categoryTitleElement.textContent = categoryTitle;

    // Configurar el título de la página dependiendo del titulo de la categoria, como en los buenos sitios
    document.title = 'Lucrum - ' + categoryTitle;

    // Elemento donde se mostrarán los productos
    var productListElement = document.getElementById('product-list');

    // Obtener los productos de la categoría seleccionada desde la API
    fetch(baseUrl + category)
        .then(function(response) {
            return response.json();
        })
        .then(function(products) {
            // Limpiar la lista de productos
            productListElement.innerHTML = '';

            // Recorrer los productos y crear los elementos HTML
            for (var i = 0; i < products.length; i++) {
                var product = products[i];
                var card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = '<a href="producto.html?id=' + product.id + '" title="Ver Más">' +
                                 '<div class="card-header" style="background-image: url(\'' + product.image + '\');"></div>' +
                                 '</a>' +
                                 '<div class="card-body">' +
                                 '<h2 class="titulo-producto">' + product.title + '</h2>' +
                                 '<p>' + product.description + '</p>' +
                                 '</div>';
                productListElement.appendChild(card);
            }
        })
        .catch(function(error) {
            console.log('Error fetching data:', error);
        });
});
