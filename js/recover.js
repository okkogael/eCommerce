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
    const form = document.getElementById('recover-form');
    const emailInput = document.getElementById('email');
    const confirmacionCheckbox = document.getElementById('confirmacion');
    const emailError = document.getElementById('email-error');
    const confirmacionError = document.getElementById('confirmacion-error');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        hideErrors();

        const emailValue = emailInput.value.trim();
        const confirmacionChecked = confirmacionCheckbox.checked;

        let isValid = true;

        if (emailValue === '') {
            showError(emailError, 'Por favor escriba su email.');
            isValid = false;
        } else if (!validateEmail(emailValue)) {
            showError(emailError, 'Por favor ingrese un email válido.');
            isValid = false;
        }

        if (!confirmacionChecked) {
            showError(confirmacionError, 'Por favor acepte el campo "Quiero recuperar mi contraseña".');
            isValid = false;
        }

        if (isValid) {
            // Simulando el envío del formulario
            setTimeout(function() {
                showSuccessMessage();
            }, 1000);
        }
    });

    function validateEmail(email) {
        // Expresión regular para validar email simple
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function hideErrors() {
        emailError.textContent = '';
        emailError.style.display = 'none';
        confirmacionError.textContent = '';
        confirmacionError.style.display = 'none';
    }

    function showSuccessMessage() {
        form.reset();
        successMessage.classList.remove('hidden');
    }
});
