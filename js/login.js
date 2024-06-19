document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.registration-form');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        var email = emailInput.value.trim();
        var password = passwordInput.value.trim();

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
