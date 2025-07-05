# 🔌 API Endpoints - AutosRent Sistema de Alquiler de Vehículos

Esta documentación describe los endpoints disponibles para integrar el sistema AutosRent con aplicaciones móviles o servicios externos.

## 🏠 URL Base
```
Producción: https://www.nrc2257.somee.com
Desarrollo: http://localhost:5000
```

## 🔐 Autenticación

### Login de Administrador
- **Endpoint**: `/Login/IndexLogin`
- **Método**: `POST`
- **Credenciales por defecto**:
  - Email: `admin@autosrent.com`
  - Password: `admin123`

### Login de Usuario
- **Método**: OAuth2 con Google/Facebook
- **Implementación**: JavaScript en el frontend

## 👥 Gestión de Clientes

### Listar Clientes
```http
GET /Cliente/listar
```
**Respuesta**: JSON array con lista de clientes
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "telefono": "+52 555 123 4567",
    "email": "juan@example.com"
  }
]
```

### Crear/Actualizar Cliente
```http
POST /Cliente/guardar
Content-Type: multipart/form-data
```
**Parámetros**:
- `Id`: int (0 para nuevo cliente)
- `Nombre`: string
- `Apellido`: string
- `Telefono`: string
- `Email`: string

**Respuesta**: ID del cliente (string)

### Obtener Cliente por ID
```http
GET /Cliente/obtener/{id}
```

### Eliminar Cliente
```http
POST /Cliente/eliminar
Content-Type: multipart/form-data
```
**Parámetros**:
- `Id`: int

## 🚗 Gestión de Vehículos

### Listar Vehículos
```http
GET /Vehiculo/listar
```
**Respuesta**: JSON array con vehículos
```json
[
  {
    "id": 1,
    "marca": "Toyota",
    "modelo": "Corolla",
    "año": 2022,
    "precioPorDia": 70.00,
    "estado": "Disponible"
  }
]
```

### Crear/Actualizar Vehículo
```http
POST /Vehiculo/guardar
Content-Type: multipart/form-data
```
**Parámetros**:
- `Id`: int (0 para nuevo vehículo)
- `Marca`: string
- `Modelo`: string
- `Año`: int
- `PrecioPorDia`: decimal
- `Estado`: string

### Obtener Vehículo por ID
```http
GET /Vehiculo/obtener/{id}
```

### Eliminar Vehículo
```http
POST /Vehiculo/eliminar
```

## 📅 Gestión de Reservas

### Listar Reservas
```http
GET /Reserva/listar
```
**Respuesta**: JSON array con reservas
```json
[
  {
    "id": 1,
    "clienteId": 1,
    "vehiculoId": 1,
    "fechaInicio": "2025-01-15",
    "fechaFin": "2025-01-20",
    "estado": "Confirmada",
    "cliente": "Juan Pérez",
    "vehiculo": "Toyota Corolla 2022"
  }
]
```

### Crear Reserva
```http
POST /Reserva/guardar
Content-Type: multipart/form-data
```
**Parámetros**:
- `Id`: int (0 para nueva reserva)
- `ClienteId`: int
- `VehiculoId`: int
- `FechaInicio`: string (formato: YYYY-MM-DD)
- `FechaFin`: string (formato: YYYY-MM-DD)

**Respuesta**: ID de la reserva (string)

### Finalizar Reserva
```http
POST /Reserva/finalizar
Content-Type: multipart/form-data
```
**Parámetros**:
- `Id`: int

### Obtener Reserva por ID
```http
GET /Reserva/obtener/{id}
```

## 💰 Gestión de Pagos

### Listar Pagos
```http
GET /Pago/listar
```
**Respuesta**: JSON array con pagos
```json
[
  {
    "id": 1,
    "reservaId": 1,
    "cliente": "Juan Pérez",
    "vehiculo": "Toyota Corolla 2022",
    "reservaFechaInicio": "2025-01-15",
    "reservaFechaFin": "2025-01-20",
    "monto": 350.00,
    "metodoPago": "Tarjeta de Crédito"
  }
]
```

### Procesar Pago
```http
POST /Pago/guardar
Content-Type: multipart/form-data
```
**Parámetros**:
- `Id`: int (0 para nuevo pago)
- `ReservaId`: int
- `Monto`: decimal
- `MetodoPago`: string

**Respuesta**: ID del pago (string)

### Obtener Pago por ID
```http
GET /Pago/obtener/{id}
```

## 🛡️ Gestión de Seguros

### Listar Tipos de Seguro
```http
GET /Seguro/ListarTiposSeguro
```
**Respuesta**: JSON array con tipos de seguro
```json
[
  "Básico",
  "Completo",
  "Premium",
  "Todo Riesgo"
]
```

### Listar Seguros
```http
GET /Seguro/listar
```
**Respuesta**: JSON array con seguros contratados
```json
[
  {
    "id": 1,
    "reservaId": 1,
    "tipoSeguro": "Completo",
    "costo": 50.00
  }
]
```

### Crear Seguro
```http
POST /Seguro/guardar
Content-Type: multipart/form-data
```
**Parámetros**:
- `Id`: int (0 para nuevo seguro)
- `ReservaId`: int
- `TipoSeguro`: string
- `Costo`: decimal

### Obtener Seguro por ID
```http
GET /Seguro/obtener/{id}
```

## 👨‍💼 Gestión de Empleados

### Listar Empleados
```http
GET /Empleado/listar
```

### Crear/Actualizar Empleado
```http
POST /Empleado/guardar
Content-Type: multipart/form-data
```
**Parámetros**:
- `Id`: int (0 para nuevo empleado)
- `Nombre`: string
- `Apellido`: string
- `Cargo`: string
- `Telefono`: string
- `Email`: string

## 🔧 Ejemplos de Integración

### JavaScript/Fetch API
```javascript
// Obtener lista de vehículos
async function getVehiculos() {
  try {
    const response = await fetch('https://www.nrc2257.somee.com/Vehiculo/listar');
    const vehiculos = await response.json();
    return vehiculos;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Crear una reserva
async function createReserva(reservaData) {
  try {
    const formData = new FormData();
    formData.append('Id', 0);
    formData.append('ClienteId', reservaData.clienteId);
    formData.append('VehiculoId', reservaData.vehiculoId);
    formData.append('FechaInicio', reservaData.fechaInicio);
    formData.append('FechaFin', reservaData.fechaFin);

    const response = await fetch('https://www.nrc2257.somee.com/Reserva/guardar', {
      method: 'POST',
      body: formData
    });
    
    const reservaId = await response.text();
    return parseInt(reservaId);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### React Native
```javascript
import { AutosRentAPI } from './services/AutosRentAPI';

// Componente para mostrar vehículos
const VehiculosList = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    AutosRentAPI.getVehiculos()
      .then(setVehiculos)
      .catch(console.error);
  }, []);

  return (
    <FlatList
      data={vehiculos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <VehiculoCard vehiculo={item} />
      )}
    />
  );
};
```

### Flutter/Dart
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class AutosRentAPI {
  static const String baseUrl = 'https://www.nrc2257.somee.com';

  static Future<List<dynamic>> getVehiculos() async {
    final response = await http.get(Uri.parse('$baseUrl/Vehiculo/listar'));
    
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load vehiculos');
    }
  }

  static Future<int> createReserva(Map<String, dynamic> reservaData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/Reserva/guardar'),
      body: reservaData,
    );
    
    if (response.statusCode == 200) {
      return int.parse(response.body);
    } else {
      throw Exception('Failed to create reserva');
    }
  }
}
```

## 📱 Consideraciones para Apps Móviles

### Headers Recomendados
```http
Content-Type: multipart/form-data
Accept: application/json
User-Agent: AutosRentMobileApp/1.0
```

### Manejo de Errores
- **200**: Éxito
- **400**: Bad Request - Parámetros inválidos
- **401**: Unauthorized - Autenticación requerida
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error del servidor

### Rate Limiting
- Límite: 100 requests por minuto por IP
- Header de respuesta: `X-RateLimit-Remaining`

### Versionado
- Versión actual: v1
- URL con versión: `/api/v1/endpoint` (en desarrollo)

## 🔐 Seguridad

### CORS
El servidor está configurado para aceptar requests desde:
- `https://www.nrc2257.somee.com`
- `http://localhost:*` (desarrollo)

### Validación
- Todos los inputs son validados en el servidor
- Sanitización automática de datos
- Protección contra SQL Injection mediante procedimientos almacenados

### Autenticación
Para endpoints protegidos, incluir el token de sesión:
```http
Cookie: .AspNetCore.Session=...
```

## 📚 Recursos Adicionales

- [Documentación completa del sistema](../docs/COMO-USAR-EN-APP.md)
- [Guía de PWA](../README.md)
- [Ejemplos de código](../wwwroot/js/)

---

¿Necesitas ayuda con la integración? ¡Contáctanos a través del chat de soporte en la aplicación! 🚀