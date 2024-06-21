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
    let form = document.querySelector('.registration-form');
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        if (email === "") {
            alert("Por favor complete el campo email");
            return;
        }

        if (password === "") {
            alert("Por favor complete el campo contraseña");
            return;
        }

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        // Guardar el email en localStorage
        localStorage.setItem('userEmail', email);

        // Redirigir a la página principal
        window.location.href = 'index.html';
    });
});
