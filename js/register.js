document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.querySelector('.registration-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terminos');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Resetear mensajes de error
        clearErrors();

        let isValid = true;

        // Validar email
        if (!emailInput.value.trim()) {
            isValid = false;
            showErrorMessage(emailInput, 'Por favor complete el campo "Correo electrónico".');
        } else if (!validateEmail(emailInput.value)) {
            isValid = false;
            showErrorMessage(emailInput, 'Ingrese un correo electrónico válido.');
        }

        // Validar contraseña
        if (!passwordInput.value.trim()) {
            isValid = false;
            showErrorMessage(passwordInput, 'Por favor complete el campo "Contraseña".');
        } else if (passwordInput.value.length < 6) {
            isValid = false;
            showErrorMessage(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
        }

        // Validar coincidencia de contraseñas
        if (passwordInput.value !== confirmPasswordInput.value) {
            isValid = false;
            showErrorMessage(confirmPasswordInput, 'Las contraseñas no coinciden.');
        }

        // Validar aceptación de términos y condiciones
        if (!termsCheckbox.checked) {
            isValid = false;
            showErrorMessage(termsCheckbox, 'Debes aceptar los términos y condiciones.');
        }

        // Si todas las validaciones pasan, se puede proceder con el registro
        if (isValid) {
            // Aquí iría el código para enviar el formulario o redirigir al usuario
            // Por ejemplo, redirigir al formulario de login
            window.location.href = 'login.html';
        }
    });

    // Función para validar formato de email
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Función para mostrar mensajes de error
    function showErrorMessage(input, message) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.innerText = message;
            input.parentElement.classList.add('error');
        }
    }

    // Función para limpiar los mensajes de error
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(function(element) {
            element.innerText = '';
            element.parentElement.classList.remove('error');
        });
    }
});
