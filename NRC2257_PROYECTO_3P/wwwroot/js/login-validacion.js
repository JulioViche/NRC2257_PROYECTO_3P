// Función para validar el formulario de administrador
function validateAdminLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Verifica las credenciales de administrador
    if (email === 'admin@autosrent.com' && password === 'admin123') {
        // Ocultar mensaje de error si existe
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');

        // Redireccionar a IndexAdmin
        window.location.href = '/Admin/IndexAdmin';
    } else {
        // Mostrar mensaje de error
        errorMessage.textContent = 'Credenciales incorrectas. Por favor, verifique.';
        errorMessage.classList.remove('hidden');
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