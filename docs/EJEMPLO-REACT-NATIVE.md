# 📱 Ejemplo Completo: React Native con AutosRent API

Este ejemplo muestra cómo integrar una aplicación React Native con el sistema AutosRent.

## 🚀 Configuración Inicial

### 1. Instalar dependencias
```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install axios react-native-vector-icons
```

### 2. Estructura de archivos
```
src/
  ├── services/
  │   └── AutosRentAPI.js
  ├── components/
  │   ├── VehiculoCard.js
  │   └── ReservaForm.js
  ├── screens/
  │   ├── HomeScreen.js
  │   ├── VehiculosScreen.js
  │   └── ReservaScreen.js
  └── App.js
```

## 🔌 Servicio API (services/AutosRentAPI.js)

```javascript
import axios from 'axios';

const API_BASE_URL = 'https://www.nrc2257.somee.com';

// Configurar axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
  }
});

export class AutosRentAPI {
  // Obtener lista de vehículos
  static async getVehiculos() {
    try {
      const response = await api.get('/Vehiculo/listar');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo vehículos:', error);
      throw new Error('No se pudieron cargar los vehículos');
    }
  }

  // Crear cliente
  static async createCliente(clienteData) {
    try {
      const formData = new FormData();
      formData.append('Id', '0');
      formData.append('Nombre', clienteData.nombre);
      formData.append('Apellido', clienteData.apellido);
      formData.append('Telefono', clienteData.telefono);
      formData.append('Email', clienteData.email);

      const response = await api.post('/Cliente/guardar', formData);
      return parseInt(response.data);
    } catch (error) {
      console.error('Error creando cliente:', error);
      throw new Error('No se pudo crear el cliente');
    }
  }

  // Crear reserva
  static async createReserva(reservaData) {
    try {
      const formData = new FormData();
      formData.append('Id', '0');
      formData.append('ClienteId', reservaData.clienteId.toString());
      formData.append('VehiculoId', reservaData.vehiculoId.toString());
      formData.append('FechaInicio', reservaData.fechaInicio);
      formData.append('FechaFin', reservaData.fechaFin);

      const response = await api.post('/Reserva/guardar', formData);
      return parseInt(response.data);
    } catch (error) {
      console.error('Error creando reserva:', error);
      throw new Error('No se pudo crear la reserva');
    }
  }

  // Crear seguro
  static async createSeguro(seguroData) {
    try {
      const formData = new FormData();
      formData.append('Id', '0');
      formData.append('ReservaId', seguroData.reservaId.toString());
      formData.append('TipoSeguro', seguroData.tipoSeguro);
      formData.append('Costo', seguroData.costo.toString());

      const response = await api.post('/Seguro/guardar', formData);
      return parseInt(response.data);
    } catch (error) {
      console.error('Error creando seguro:', error);
      throw new Error('No se pudo crear el seguro');
    }
  }

  // Procesar pago
  static async procesarPago(pagoData) {
    try {
      const formData = new FormData();
      formData.append('Id', '0');
      formData.append('ReservaId', pagoData.reservaId.toString());
      formData.append('Monto', pagoData.monto.toString());
      formData.append('MetodoPago', pagoData.metodoPago);

      const response = await api.post('/Pago/guardar', formData);
      return parseInt(response.data);
    } catch (error) {
      console.error('Error procesando pago:', error);
      throw new Error('No se pudo procesar el pago');
    }
  }

  // Obtener tipos de seguro
  static async getTiposSeguro() {
    try {
      const response = await api.get('/Seguro/ListarTiposSeguro');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de seguro:', error);
      throw new Error('No se pudieron cargar los tipos de seguro');
    }
  }

  // Obtener lista de reservas
  static async getReservas() {
    try {
      const response = await api.get('/Reserva/listar');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo reservas:', error);
      throw new Error('No se pudieron cargar las reservas');
    }
  }
}
```

## 🚗 Componente Vehículo (components/VehiculoCard.js)

```javascript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const VehiculoCard = ({ vehiculo, onSelect }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onSelect(vehiculo)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.marca}>{vehiculo.marca}</Text>
        <Text style={styles.precio}>${vehiculo.precioPorDia}/día</Text>
      </View>
      
      <Text style={styles.modelo}>{vehiculo.modelo} {vehiculo.año}</Text>
      
      <View style={styles.estadoContainer}>
        <View style={[
          styles.estadoIndicator, 
          { backgroundColor: vehiculo.estado === 'Disponible' ? '#28a745' : '#dc3545' }
        ]} />
        <Text style={styles.estado}>{vehiculo.estado}</Text>
      </View>
      
      <TouchableOpacity style={styles.reservarButton}>
        <Text style={styles.reservarText}>Reservar Ahora</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  marca: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  precio: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
  },
  modelo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  estadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  estadoIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  estado: {
    fontSize: 12,
    color: '#666',
  },
  reservarButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reservarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default VehiculoCard;
```

## 📋 Pantalla de Vehículos (screens/VehiculosScreen.js)

```javascript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import { AutosRentAPI } from '../services/AutosRentAPI';
import VehiculoCard from '../components/VehiculoCard';

const VehiculosScreen = ({ navigation }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadVehiculos = async () => {
    try {
      setLoading(true);
      const data = await AutosRentAPI.getVehiculos();
      setVehiculos(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVehiculos();
    setRefreshing(false);
  };

  const handleSelectVehiculo = (vehiculo) => {
    if (vehiculo.estado === 'Disponible') {
      navigation.navigate('Reserva', { vehiculo });
    } else {
      Alert.alert('No disponible', 'Este vehículo no está disponible para reserva.');
    }
  };

  useEffect(() => {
    loadVehiculos();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Cargando vehículos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículos Disponibles</Text>
      
      <FlatList
        data={vehiculos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VehiculoCard 
            vehiculo={item} 
            onSelect={handleSelectVehiculo}
          />
        )}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#007bff']}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default VehiculosScreen;
```

## 📅 Formulario de Reserva (screens/ReservaScreen.js)

```javascript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { AutosRentAPI } from '../services/AutosRentAPI';

const ReservaScreen = ({ route, navigation }) => {
  const { vehiculo } = route.params;
  const [loading, setLoading] = useState(false);
  
  const [clienteData, setClienteData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: ''
  });
  
  const [reservaData, setReservaData] = useState({
    fechaInicio: '',
    fechaFin: ''
  });

  const handleReserva = async () => {
    // Validaciones
    if (!clienteData.nombre || !clienteData.apellido || 
        !clienteData.telefono || !clienteData.email ||
        !reservaData.fechaInicio || !reservaData.fechaFin) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);

      // 1. Crear cliente
      const clienteId = await AutosRentAPI.createCliente(clienteData);
      
      // 2. Crear reserva
      const reservaId = await AutosRentAPI.createReserva({
        clienteId,
        vehiculoId: vehiculo.id,
        fechaInicio: reservaData.fechaInicio,
        fechaFin: reservaData.fechaFin
      });

      Alert.alert(
        'Éxito',
        'Reserva creada correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nueva Reserva</Text>
      
      {/* Información del vehículo */}
      <View style={styles.vehiculoInfo}>
        <Text style={styles.vehiculoTitle}>
          {vehiculo.marca} {vehiculo.modelo} {vehiculo.año}
        </Text>
        <Text style={styles.vehiculoPrecio}>
          ${vehiculo.precioPorDia}/día
        </Text>
      </View>

      {/* Datos del cliente */}
      <Text style={styles.sectionTitle}>Datos del Cliente</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={clienteData.nombre}
        onChangeText={(text) => setClienteData({...clienteData, nombre: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={clienteData.apellido}
        onChangeText={(text) => setClienteData({...clienteData, apellido: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={clienteData.telefono}
        onChangeText={(text) => setClienteData({...clienteData, telefono: text})}
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={clienteData.email}
        onChangeText={(text) => setClienteData({...clienteData, email: text})}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Fechas de reserva */}
      <Text style={styles.sectionTitle}>Fechas de Reserva</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Fecha Inicio (YYYY-MM-DD)"
        value={reservaData.fechaInicio}
        onChangeText={(text) => setReservaData({...reservaData, fechaInicio: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Fecha Fin (YYYY-MM-DD)"
        value={reservaData.fechaFin}
        onChangeText={(text) => setReservaData({...reservaData, fechaFin: text})}
      />

      {/* Botón de reservar */}
      <TouchableOpacity 
        style={[styles.reservarButton, loading && styles.disabledButton]}
        onPress={handleReserva}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.reservarText}>Confirmar Reserva</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  vehiculoInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  vehiculoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vehiculoPrecio: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  reservarButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  reservarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservaScreen;
```

## 🏠 App Principal (App.js)

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VehiculosScreen from './src/screens/VehiculosScreen';
import ReservaScreen from './src/screens/ReservaScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Vehiculos"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Vehiculos" 
          component={VehiculosScreen}
          options={{ title: 'AutosRent - Vehículos' }}
        />
        <Stack.Screen 
          name="Reserva" 
          component={ReservaScreen}
          options={{ title: 'Nueva Reserva' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

## 🎨 Características Implementadas

### ✅ Funcionalidades Principales:
- **Listado de vehículos** con refresh
- **Creación de clientes** automática
- **Proceso de reserva** completo
- **Validaciones** de formularios
- **Loading states** y feedback visual
- **Manejo de errores** robusto

### 📱 Optimizaciones Móviles:
- **Interfaz responsiva** adaptada a móviles
- **Componentes reutilizables**
- **Navegación fluida**
- **Estados de carga** claros
- **Validaciones en tiempo real**

### 🔧 Próximas Mejoras:
- Integración con calendario nativo
- Notificaciones push
- Caché offline con AsyncStorage
- Integración con mapas
- Sistema de pagos móvil
- Autenticación biométrica

Este ejemplo muestra cómo crear una aplicación móvil completa que consume la API de AutosRent, proporcionando una experiencia nativa optimizada para dispositivos móviles. 🚀