document.addEventListener('DOMContentLoaded', function() {
    let userEmail = localStorage.getItem('userEmail');
    let navbar = document.getElementById('main-nav');
    let loginLink = navbar.querySelector('a[href="login.html"]');
    let registerLink = navbar.querySelector('a[href="register.html"]');

    if (userEmail) {
        // Obtener el nombre de usuario antes del '@'
        let userName = userEmail.split('@')[0];

        // Crear enlace con icono de Font Awesome para logout
        let logoutLink = document.createElement('li');
        logoutLink.className = 'nav-item';
        logoutLink.innerHTML = `
            <a href="#" class="nav-links" id="logout">
                <i class="fas fa-sign-out-alt"></i> ¡Bienvenido ${userName}!
            </a>
        `;
        // Insertar el nuevo enlace de logout después del enlace de login
        if (loginLink) {
            navbar.insertBefore(logoutLink, loginLink.parentElement.nextSibling);
            loginLink.parentElement.style.display = 'none';
        }
        
        if (registerLink) {
            registerLink.parentElement.style.display = 'none';
        }

        // Añadir funcionalidad de logout con confirmación
        let logoutIcon = document.getElementById('logout');
        logoutIcon.addEventListener('click', function(event) {
            event.preventDefault();
            let confirmLogout = confirm(`Hola ${userName} ¿Seguro que queres cerrar sesión?`);
            if (confirmLogout) {
                localStorage.removeItem('userEmail');
                window.location.reload();
            }
        });
    }
});
