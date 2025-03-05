# Sistema de Alquiler de Vehículos

Este proyecto es una aplicación web desarrollada en **ASP.NET Core MVC** para gestionar el alquiler de vehículos. Permite administrar clientes, empleados, reservas y pagos, siguiendo una arquitectura por capas.

El sistema se encuentra desplegado en Sommee.com: https://www.nrc2257.somee.com/

## 📋 Herramientas Utilizadas

Este proyecto fue realizado con las siguientes herramientas:

- 🖥 [Visual Studio 2022](https://visualstudio.microsoft.com/es/) con [.NET Core](https://dotnet.microsoft.com/en-us/download)
- 🗄 [SQL Server](https://www.microsoft.com/es-es/sql-server/sql-server-downloads?msockid=21b775cbdea664c60c25605adfbc6581) y [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/ssms/download-sql-server-management-studio-ssms)
- 🎨 [Bootstrap](https://getbootstrap.com/), [AG Grid](https://www.ag-grid.com/), [SweetAlert2](https://sweetalert2.github.io/) y [Toastr](https://codeseven.github.io/toastr/)
- 📜 JavaScript

## 🏗 Estructura del Proyecto

El sistema está organizado en las siguientes capas:

1. **Entidad**: Clases que representan las entidades de la base de datos.
2. **Datos**: Acceso a la base de datos mediante procedimientos almacenados.
3. **Negocio**: Lógica de negocio del sistema.
4. **Presentación**: Controladores y vistas para la interacción con el usuario.

## 📌 Base de Datos

El proyecto usa **SQL Server** con las siguientes tablas principales:

- Vehículos 🚗
- Clientes 👤
- Empleados 👨‍💼
- Reservas 📅
- Pagos 💰
- Seguros 🛡

### 📜 Creación y Estructura de la Base de Datos

- [Código SQL inicial](doc/database.md#código-sql-inicial)
- [Modelo endidad relación](doc/database.md#modelo-entidad-relación)
- También puedes acceder al [.bak](doc/AlquilerVehiculos_autobackup_625945_2025-03-03T10-17-00.BAK)
- O acceder al [.sql](doc/database.sql)

## 🎨 Interfaz
La interfaz está desarrollada con Bootstrap para mejorar la experiencia del usuario. Se han implementado modos claro y oscuro.

## 🚀 Despliegue en la Nube (Somee.com)
El sistema se encuentra desplegado en Sommee.com: https://www.nrc2257.somee.com/

## ✨ Autores
*Proyecto desarrollado por Julio Viche & Gabriel Murillo* 🎓

📌 Para más información, consulta la documentación completa aquí: .