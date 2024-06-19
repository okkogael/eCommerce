// Porque somos mas originales, hicimos algo mas lindo, no se preocupen, esta aclarado en el README.
document.addEventListener('DOMContentLoaded', function() {
    var userEmail = localStorage.getItem('userEmail');
    var navbar = document.getElementById('main-nav');
    var loginLink = navbar.querySelector('a[href="login.html"]');
    var registerLink = navbar.querySelector('a[href="register.html"]');

    if (userEmail) {
        // Obtener el nombre de usuario antes del '@'
        var userName = userEmail.split('@')[0];

        // Crear elemento de bienvenida
        var welcomeMessage = document.createElement('li');
        welcomeMessage.className = 'nav-item';

        // Crear enlace con icono de Font Awesome para logout
        var logoutLink = document.createElement('li');
        logoutLink.className = 'nav-item';
        logoutLink.innerHTML = `
            <a href="#" class="nav-links" id="logout">
                <i class="fas fa-sign-out-alt"></i>
            </a>
        `;

        // Insertar elementos en la barra de navegación
        if (loginLink && loginLink.parentElement) {
            loginLink.parentElement.insertBefore(logoutLink, loginLink.nextSibling);
            loginLink.style.display = 'none';
        }
        
        if (registerLink) {
            registerLink.style.display = 'none';
        }

        // Añadir funcionalidad de logout con confirmación
        var logoutIcon = document.getElementById('logout');
        logoutIcon.addEventListener('click', function(event) {
            event.preventDefault();
            var confirmLogout = confirm(`Hola ${userName} ¿Seguro que queres cerrar sesión?`);
            if (confirmLogout) {
                localStorage.removeItem('userEmail');
                window.location.reload();
            }
        });
    }
});
