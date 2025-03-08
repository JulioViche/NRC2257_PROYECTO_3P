// Función para validar el formulario de administrador
function validateAdminLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Verifica que el correo sea exactamente admin@autosrent.com
    if (email === 'admin@autosrent.com') {
        // Aquí puedes añadir la validación de contraseña si es necesario
        if (password.length > 0) {
            errorMessage.textContent = '';
            errorMessage.classList.add('hidden');

            // Aquí iría el código para procesar el inicio de sesión del administrador
            console.log('Administrador autenticado correctamente');
            // adminLoginSuccess(); // Función que redirigiría al panel de administración

            // Para demostración, mostramos un mensaje de éxito
            alert('Inicio de sesión de administrador exitoso');
        } else {
            errorMessage.textContent = 'Por favor, ingrese su contraseña';
            errorMessage.classList.remove('hidden');
        }
    } else {
        // Si no es el correo de administrador, mostramos mensaje de error
        errorMessage.textContent = 'Acceso solo para administradores. Los usuarios deben iniciar sesión con Google o Facebook.';
        errorMessage.classList.remove('hidden');

        // Ocultamos el formulario y destacamos los botones sociales
        document.getElementById('admin-form').classList.add('opacity-50');
        document.getElementById('social-login-section').classList.add('border-2', 'border-blue-500', 'p-4', 'rounded-lg');
    }
}

// Función para manejar el inicio de sesión con Google
function handleGoogleLogin() {
    // Aquí iría la integración con la API de Google
    console.log('Iniciando sesión con Google...');
    // Para demostración
    alert('Iniciando sesión con Google para usuario regular');
}

// Función para manejar el inicio de sesión con Facebook
function handleFacebookLogin() {
    // Aquí iría la integración con la API de Facebook
    console.log('Iniciando sesión con Facebook...');
    // Para demostración
    alert('Iniciando sesión con Facebook para usuario regular');
}

// Añadir oyentes de eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Asociar la función de validación al envío del formulario
    document.getElementById('admin-form').addEventListener('submit', validateAdminLogin);

    // Asociar funciones a los botones de redes sociales
    document.getElementById('google-login').addEventListener('click', handleGoogleLogin);
    document.getElementById('facebook-login').addEventListener('click', handleFacebookLogin);

    // Mostrar mensaje informativo para usuarios
    const infoBox = document.createElement('div');
    infoBox.className = 'text-sm bg-gray-100 p-3 rounded-md mt-4 text-gray-700';
    infoBox.innerHTML = '<strong>Nota:</strong> Si eres administrador, usa tu correo oficial. Usuarios regulares deben usar los botones de Google o Facebook.';
    document.getElementById('login-container').appendChild(infoBox);
});