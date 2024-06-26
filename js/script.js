let mainNav=document.getElementById('main-nav');
let navbarToggle=document.getElementById('navbar-toggle');

navbarToggle.addEventListener('click',function(){

    if(this.classList.contains('active')){
        mainNav.style.display="none";
        this.classList.remove('active');
    }
    else{
        mainNav.style.display="flex";
        this.classList.add('active');

    }
});

document.addEventListener('DOMContentLoaded', function() {
    let baseUrl = 'https://fakestoreapi.com/products/category/';
    let categories = {
        'electronics': 'Electrónica',
        'jewelery': 'Accesorios',
        "men's clothing": 'Ropa de Hombre',
        "women's clothing": 'Ropa de Mujer'
    };

    function fetchCategoryData(category) {
        fetch(baseUrl + category)
            .then(function(response) {
                return response.json();
            })
            .then(function(products) {
                let section = document.getElementById(category);
                if (section) {
                    for (let i = 0; i < products.length; i++) {
                        let product = products[i];
                        let card = document.createElement('div');
                        card.className = 'card';
                        card.innerHTML = '<a href="producto.html?id=' + product.id + '" title="Ver Más">' +
                                         '<div class="card-header" style="background-image: url(\'' + product.image + '\');"></div>' +
                                         '</a>' +
                                         '<div class="card-body">' +
                                         '<h2 class="titulo-producto">' + product.title + '</h2>' +
                                         '<p>' + product.description + '</p>' +
                                         '<a href="./producto.html?id=' + product.id + '" class="btn">Ver Más $' + product.price + '</a>' +
                                         '</div>';
                        section.appendChild(card);
                    }
                }
            })
            .catch(function(error) {
                console.log('Error fetching data:', error);
            });
    }

    let categoryLinks = document.querySelectorAll('.categoria');
    for (let i = 0; i < categoryLinks.length; i++) {
        categoryLinks[i].addEventListener('click', function(event) {
            event.preventDefault();
            let category = this.getAttribute('data-category');
            window.location.href = 'category.html?category=' + category;
        });
    }

    for (let category in categories) {
        fetchCategoryData(category);
    }
});