# 📱 Cómo Usar el Sistema de Alquiler de Vehículos en una App

Este documento explica las diferentes formas de usar el Sistema de Alquiler de Vehículos **AutosRent.com** como una aplicación móvil o integrarla en diferentes tipos de aplicaciones.

## 🎯 Opciones Disponibles

### 1. 🌐 Como Aplicación Web (Estado Actual)
El sistema ya funciona como una aplicación web completa y responsiva que se puede usar directamente desde cualquier navegador móvil.

**Ventajas:**
- ✅ Ya está desplegada en: https://www.nrc2257.somee.com/
- ✅ Interfaz responsiva que se adapta a móviles
- ✅ No requiere instalación
- ✅ Funciona en cualquier dispositivo con navegador

**Cómo usar:**
1. Abre el navegador en tu dispositivo móvil
2. Ve a: https://www.nrc2257.somee.com/
3. Usa las credenciales según tu rol:
   - **Administradores**: `admin@autosrent.com` / `admin123`
   - **Usuarios**: Botones de Google o Facebook

### 2. 📱 Como Progressive Web App (PWA)
Convierte la aplicación web en una PWA para que se sienta como una app nativa.

### 3. 🔌 Como API para Aplicaciones Móviles
Usa el backend como API REST para desarrollar aplicaciones móviles nativas.

### 4. 📦 Empaquetada como App Híbrida
Usar frameworks como Cordova/PhoneGap o Electron para crear aplicaciones nativas.

---

## 🚀 Guía de Implementación

### Opción 1: Progressive Web App (PWA)

#### Paso 1: Crear el archivo del service worker
```javascript
// wwwroot/sw.js
const CACHE_NAME = 'autosrent-v1';
const urlsToCache = [
  '/',
  '/css/site.css',
  '/js/generic.js',
  '/Home/Index',
  '/Login/IndexLogin'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

#### Paso 2: Crear el archivo manifest
```json
{
  "name": "AutosRent - Alquiler de Vehículos",
  "short_name": "AutosRent",
  "description": "Sistema de alquiler de vehículos online",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#007bff",
  "icons": [
    {
      "src": "images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Opción 2: API REST para Apps Móviles

#### Endpoints Disponibles:
```
GET  /Cliente/listar          - Obtener lista de clientes
POST /Cliente/guardar         - Crear/actualizar cliente
GET  /Vehiculo/listar         - Obtener lista de vehículos
POST /Reserva/guardar         - Crear reserva
GET  /Pago/listar            - Obtener lista de pagos
POST /Pago/guardar           - Procesar pago
GET  /Seguro/ListarTiposSeguro - Obtener tipos de seguro
POST /Seguro/guardar         - Crear seguro
```

#### Ejemplo de integración en React Native:
```javascript
// services/AutosRentAPI.js
const API_BASE_URL = 'https://www.nrc2257.somee.com';

export const AutosRentAPI = {
  // Obtener vehículos disponibles
  async getVehiculos() {
    const response = await fetch(`${API_BASE_URL}/Vehiculo/listar`);
    return response.json();
  },

  // Crear reserva
  async createReserva(reservaData) {
    const formData = new FormData();
    Object.keys(reservaData).forEach(key => {
      formData.append(key, reservaData[key]);
    });

    const response = await fetch(`${API_BASE_URL}/Reserva/guardar`, {
      method: 'POST',
      body: formData
    });
    return response.text();
  },

  // Procesar pago
  async procesarPago(pagoData) {
    const formData = new FormData();
    Object.keys(pagoData).forEach(key => {
      formData.append(key, pagoData[key]);
    });

    const response = await fetch(`${API_BASE_URL}/Pago/guardar`, {
      method: 'POST',
      body: formData
    });
    return response.text();
  }
};
```

### Opción 3: App Híbrida con Cordova

#### Paso 1: Instalar Cordova
```bash
npm install -g cordova
cordova create AutosRentApp com.autosrent.app AutosRent
cd AutosRentApp
```

#### Paso 2: Configurar config.xml
```xml
<widget id="com.autosrent.app" version="1.0.0">
    <name>AutosRent</name>
    <description>Sistema de alquiler de vehículos</description>
    
    <content src="https://www.nrc2257.somee.com" />
    
    <allow-navigation href="https://www.nrc2257.somee.com/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="mailto:*" />
</widget>
```

---

## 🛠️ Funcionalidades Disponibles

### Para Usuarios (Clientes):
- 🔐 **Autenticación**: Login con Google/Facebook
- 🚗 **Catálogo de Vehículos**: Browse de autos disponibles
- 📅 **Reservas**: Selección de fechas y vehículos
- 🛡️ **Seguros**: Selección de tipos de seguro
- 💳 **Pagos**: Procesamiento de pagos con tarjeta
- 📱 **Soporte**: Chat de soporte integrado

### Para Administradores:
- 📊 **Dashboard**: Métricas y KPIs del negocio
- 👥 **Gestión de Clientes**: CRUD completo
- 🚗 **Gestión de Vehículos**: Administración del inventario
- 📋 **Gestión de Reservas**: Estado y seguimiento
- 💰 **Gestión de Pagos**: Control financiero
- 🛡️ **Gestión de Seguros**: Administración de pólizas
- 👨‍💼 **Gestión de Empleados**: Staff management

---

## 📋 Flujo de Uso para Clientes

### 1. Registro/Login
```
Usuario → Botón Google/Facebook → Autenticación → Home
```

### 2. Proceso de Reserva
```
Seleccionar Vehículo → Elegir Fechas → Seleccionar Seguro → Pagar → Confirmación
```

### 3. Seguimiento
```
Login → Ver Reservas → Estado Actual → Acciones Disponibles
```

---

## 🔧 Personalización para Apps

### Temas y Estilos
El sistema incluye soporte para modo claro/oscuro:
```css
/* Variables CSS para personalización */
:root {
  --accent-color: #007bff;
  --nav-bg: #ffffff;
  --body-bg: #f8f9fa;
  --text-color: #212529;
  --card-bg: #ffffff;
  --border-color: #dee2e6;
}
```

### Notificaciones
Sistema de notificaciones con Toastr:
```javascript
// Configuración de notificaciones
toastr.options = {
  "positionClass": "toast-bottom-left",
  "timeOut": "5000",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};
```

---

## 📱 Consideraciones para Móviles

### Responsividad
- ✅ Bootstrap responsive design
- ✅ Menú hamburguesa para móviles
- ✅ Formularios optimizados para touch
- ✅ Botones de tamaño adecuado

### Performance
- ✅ AG Grid para tablas optimizadas
- ✅ Lazy loading de imágenes
- ✅ Compresión de assets
- ✅ CDN para librerías externas

### UX Móvil
- ✅ Chat de soporte flotante
- ✅ Navegación intuitiva
- ✅ Feedback visual (SweetAlert2)
- ✅ Validaciones en tiempo real

---

## 🚀 Despliegue

### Web App (Actual)
```
Producción: https://www.nrc2257.somee.com/
Hosting: Somee.com
Backend: ASP.NET Core MVC
Base de Datos: SQL Server
```

### App Stores
Para publicar como app nativa:

1. **Google Play Store**:
   - Usar Cordova/PhoneGap
   - Generar APK
   - Cumplir policies de Google

2. **Apple App Store**:
   - Usar Cordova con iOS platform
   - Generar IPA
   - Cumplir guidelines de Apple

---

## 🔐 Seguridad

### Autenticación
- OAuth2 con Google/Facebook
- Sesiones seguras
- Validación del lado servidor

### Datos
- HTTPS obligatorio
- Validación de formularios
- Sanitización de inputs
- SQL Server con procedimientos almacenados

---

## 📞 Soporte y Contacto

### Chat Integrado
El sistema incluye un chat de soporte que puede ser usado en cualquier implementación:
```javascript
// Activación del chat
document.querySelector('#chat-button').addEventListener('click', function() {
  document.querySelector('#chatbot').classList.remove('hidden');
});
```

### Integración con APIs Externas
- Google Maps para ubicaciones
- PayPal/Stripe para pagos
- Twilio para SMS
- SendGrid para emails

---

## ✨ Próximos Pasos Recomendados

1. **Implementar PWA** para mejor experiencia móvil
2. **Agregar notificaciones push** para recordatorios
3. **Integrar geolocalización** para ubicar vehículos
4. **Implementar API REST completa** para apps nativas
5. **Agregar autenticación biométrica** en apps móviles
6. **Implementar sistema de calificaciones** y reviews

---

Este sistema está diseñado para ser flexible y adaptable a diferentes tipos de aplicaciones. ¡Elige la opción que mejor se adapte a tus necesidades! 🚀