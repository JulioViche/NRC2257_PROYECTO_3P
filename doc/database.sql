USE [master]
GO
/****** Object:  Database [AlquilerVehiculos]    Script Date: 04/03/2025 23:44:53 ******/
CREATE DATABASE [AlquilerVehiculos]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AlquilerVehiculos_Data', FILENAME = N'c:\dzsqls\AlquilerVehiculos.mdf' , SIZE = 8192KB , MAXSIZE = 30720KB , FILEGROWTH = 22528KB )
 LOG ON 
( NAME = N'AlquilerVehiculos_Logs', FILENAME = N'c:\dzsqls\AlquilerVehiculos.ldf' , SIZE = 8192KB , MAXSIZE = 30720KB , FILEGROWTH = 22528KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [AlquilerVehiculos] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AlquilerVehiculos].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AlquilerVehiculos] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET ARITHABORT OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AlquilerVehiculos] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AlquilerVehiculos] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET  ENABLE_BROKER 
GO
ALTER DATABASE [AlquilerVehiculos] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AlquilerVehiculos] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [AlquilerVehiculos] SET  MULTI_USER 
GO
ALTER DATABASE [AlquilerVehiculos] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AlquilerVehiculos] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AlquilerVehiculos] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AlquilerVehiculos] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AlquilerVehiculos] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AlquilerVehiculos] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [AlquilerVehiculos] SET QUERY_STORE = ON
GO
ALTER DATABASE [AlquilerVehiculos] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [AlquilerVehiculos]
GO
/****** Object:  User [jeviche_SQLLogin_1]    Script Date: 04/03/2025 23:44:55 ******/
CREATE USER [jeviche_SQLLogin_1] FOR LOGIN [jeviche_SQLLogin_1] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [jeviche_SQLLogin_1]
GO
/****** Object:  Schema [jeviche_SQLLogin_1]    Script Date: 04/03/2025 23:44:55 ******/
CREATE SCHEMA [jeviche_SQLLogin_1]
GO
/****** Object:  Table [dbo].[Empleados]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleados](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Apellido] [nvarchar](100) NOT NULL,
	[Cargo] [nvarchar](50) NOT NULL,
	[Telefono] [nvarchar](15) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VistaEmpleados]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VistaEmpleados]
AS
SELECT Id, Nombre, Apellido, Cargo, Telefono, Email FROM Empleados;
GO
/****** Object:  Table [dbo].[Clientes]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clientes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Apellido] [nvarchar](100) NOT NULL,
	[Telefono] [nvarchar](15) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VistaClientes]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VistaClientes]
AS
SELECT Id, Nombre, Apellido, Telefono, Email FROM Clientes;
GO
/****** Object:  Table [dbo].[Vehiculos]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehiculos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Marca] [nvarchar](50) NOT NULL,
	[Modelo] [nvarchar](50) NOT NULL,
	[Año] [int] NOT NULL,
	[Precio] [decimal](10, 2) NOT NULL,
	[Estado] [nvarchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VistaVehiculos]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VistaVehiculos]
AS
SELECT Id, Marca, Modelo, Año, Precio, Estado FROM Vehiculos;
GO
/****** Object:  Table [dbo].[Reservas]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reservas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClienteId] [int] NULL,
	[VehiculoId] [int] NULL,
	[FechaInicio] [date] NOT NULL,
	[FechaFin] [date] NOT NULL,
	[Estado] [nvarchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VistaReservas]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VistaReservas]
AS
SELECT
r.Id,
r.ClienteId,
r.VehiculoId,
v.Marca + ' ' + v.Modelo AS Vehiculo,
c.Nombre + ' ' + c.Apellido AS Cliente,
r.FechaInicio, r.FechaFin, r.Estado
FROM Reservas r
INNER JOIN Vehiculos v ON r.VehiculoId = v.Id
INNER JOIN Clientes c ON r.ClienteId = c.Id;
GO
/****** Object:  Table [dbo].[Pagos]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pagos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ReservaId] [int] NULL,
	[Monto] [decimal](10, 2) NOT NULL,
	[MetodoPago] [nvarchar](50) NOT NULL,
	[FechaPago] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VistaPagos]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VistaPagos]
AS
SELECT p.Id,
	p.ReservaId,
	r.ClienteId,
	r.VehiculoId,
	r.Cliente,
	r.Vehiculo,
	r.FechaInicio AS ReservaFechaInicio,
	r.FechaFin AS ReservaFechaFin,
	p.Monto,
	p.MetodoPago,
	p.FechaPago
	FROM Pagos p
	INNER JOIN VistaReservas r ON p.ReservaId = r.Id;
GO
/****** Object:  Table [dbo].[Seguros]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Seguros](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ReservaId] [int] NULL,
	[TipoSeguro] [nvarchar](50) NOT NULL,
	[Costo] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VistaSeguros]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[VistaSeguros]
AS
SELECT s.Id,
	s.ReservaId,
	r.Cliente,
	r.Vehiculo,
	r.FechaInicio AS ReservaFechaInicio,
	r.FechaFin AS ReservaFechaFin,
	s.TipoSeguro,
	s.Costo
	FROM Seguros s
	INNER JOIN VistaReservas r ON s.ReservaId = r.Id;
GO
ALTER TABLE [dbo].[Pagos]  WITH CHECK ADD FOREIGN KEY([ReservaId])
REFERENCES [dbo].[Reservas] ([Id])
GO
ALTER TABLE [dbo].[Reservas]  WITH CHECK ADD FOREIGN KEY([ClienteId])
REFERENCES [dbo].[Clientes] ([Id])
GO
ALTER TABLE [dbo].[Reservas]  WITH CHECK ADD FOREIGN KEY([VehiculoId])
REFERENCES [dbo].[Vehiculos] ([Id])
GO
ALTER TABLE [dbo].[Seguros]  WITH CHECK ADD FOREIGN KEY([ReservaId])
REFERENCES [dbo].[Reservas] ([Id])
GO
/****** Object:  StoredProcedure [dbo].[spActualizarPagos]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spActualizarPagos]
AS
BEGIN
	UPDATE Pagos
    SET Pagos.Monto = (DATEDIFF(DAY, Reservas.FechaInicio, Reservas.FechaFin) + 1) * Vehiculos.Precio / 500
    FROM Pagos
    INNER JOIN Reservas ON Pagos.ReservaId = Reservas.Id
    INNER JOIN Vehiculos ON Reservas.VehiculoId = Vehiculos.Id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spActualizarReservas]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spActualizarReservas]
AS
BEGIN
	UPDATE Reservas
	SET Estado = CASE
		WHEN GETDATE() < Reservas.FechaInicio THEN 'Confirmada'
        WHEN GETDATE() BETWEEN Reservas.FechaInicio AND Reservas.FechaFin THEN 'En curso'
        WHEN GETDATE() > Reservas.FechaFin AND Estado <> 'Finalizada' THEN 'Atrasada'
        ELSE Estado
    END;
END;
GO
/****** Object:  StoredProcedure [dbo].[spActualizarVehiculos]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spActualizarVehiculos]
AS
BEGIN
	UPDATE Vehiculos
	SET Estado = CASE
		WHEN EXISTS (
			SELECT 1
            FROM Reservas
            WHERE VehiculoId = Vehiculos.Id
            AND Estado IN ('Confirmada', 'En curso', 'Atrasada')
        ) THEN 'Alquilado'
        ELSE 'Disponible'
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[spEliminarCliente]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spEliminarCliente]
	@id INT
AS
BEGIN
	DELETE FROM Clientes WHERE Id = @id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spEliminarEmpleado]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spEliminarEmpleado]
	@id INT
AS
BEGIN
	DELETE FROM Empleados WHERE Id = @id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spEliminarVehiculo]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spEliminarVehiculo]
	@id INT
AS
BEGIN
	DELETE FROM Vehiculos WHERE Id = @id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spFiltrarClientes]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spFiltrarClientes]
    @filtro NVARCHAR(400)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * 
    FROM VistaClientes
    WHERE (
        @filtro = ''
        OR NOT EXISTS (
            SELECT 1 
            FROM STRING_SPLIT(@filtro, ' ') AS keywords
            WHERE keywords.value != ''
            AND NOT (
                Nombre LIKE '%' + keywords.value + '%'
                OR Apellido LIKE '%' + keywords.value + '%'
				OR Telefono LIKE '%' + keywords.value + '%'
				OR Email LIKE '%' + keywords.value + '%'
            )
        )
    );
END;
GO
/****** Object:  StoredProcedure [dbo].[spFiltrarEmpleados]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spFiltrarEmpleados]
    @filtro NVARCHAR(400)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * 
    FROM VistaEmpleados
    WHERE (
        @filtro = ''
        OR NOT EXISTS (
            SELECT 1 
            FROM STRING_SPLIT(@filtro, ' ') AS keywords
            WHERE keywords.value != ''
            AND NOT (
                Nombre LIKE '%' + keywords.value + '%'
                OR Apellido LIKE '%' + keywords.value + '%'
				OR Cargo LIKE '%' + keywords.value + '%'
				OR Telefono LIKE '%' + keywords.value + '%'
				OR Email LIKE '%' + keywords.value + '%'
            )
        )
    );
END;
GO
/****** Object:  StoredProcedure [dbo].[spFiltrarReservas]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spFiltrarReservas]
@filtro NVARCHAR(100)
AS
BEGIN
	SET NOCOUNT ON;
    SELECT * 
    FROM VistaReservas
    WHERE (
        @filtro = ''
        OR NOT EXISTS (
            SELECT 1 
            FROM STRING_SPLIT(@filtro, ' ') AS keywords
            WHERE keywords.value != ''
            AND NOT (
                Cliente LIKE '%' + keywords.value + '%'
                OR Vehiculo LIKE '%' + keywords.value + '%'
				OR FechaInicio LIKE '%' + keywords.value + '%'
				OR FechaFin LIKE '%' + keywords.value + '%'
				OR Estado LIKE '%' + keywords.value + '%'
            )
        )
    );
END;
GO
/****** Object:  StoredProcedure [dbo].[spFiltrarVehiculos]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spFiltrarVehiculos]
@filtro NVARCHAR(150)
AS
BEGIN
	SET NOCOUNT ON;
    SELECT * 
    FROM VistaVehiculos
    WHERE (
        @filtro = ''
        OR NOT EXISTS (
            SELECT 1 
            FROM STRING_SPLIT(@filtro, ' ') AS keywords
            WHERE keywords.value != ''
            AND NOT (
                Marca LIKE '%' + keywords.value + '%'
                OR Modelo LIKE '%' + keywords.value + '%'
				OR Año LIKE '%' + keywords.value + '%'
				OR Estado LIKE '%' + keywords.value + '%'
            )
        )
    );
END;
GO
/****** Object:  StoredProcedure [dbo].[spGuardarCliente]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGuardarCliente]
	@id INT,
	@nombre NVARCHAR(100),
	@apellido NVARCHAR(100),
	@telefono NVARCHAR(15),
	@email NVARCHAR(100)
AS
BEGIN
    IF @id = 0 BEGIN
        INSERT INTO Clientes(Nombre, Apellido, Telefono, Email)
        VALUES (@nombre, @apellido, @telefono, @email);
    END ELSE BEGIN
		IF EXISTS (SELECT 1 FROM Clientes WHERE Id = @id) BEGIN
            UPDATE Clientes
            SET Nombre = @nombre,
                Apellido = @apellido,
                Telefono = @telefono,
                Email = @email
            WHERE Id = @id;
        END
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[spGuardarEmpleado]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGuardarEmpleado]
	@id INT,
	@nombre NVARCHAR(100),
	@apellido NVARCHAR(100),
	@cargo NVARCHAR(50),
	@telefono NVARCHAR(15),
	@email NVARCHAR(100)
AS
BEGIN
    IF @id = 0 BEGIN
        INSERT INTO Empleados (Nombre, Apellido, Cargo, Telefono, Email)
        VALUES (@nombre, @apellido, @cargo, @telefono, @email);
    END ELSE BEGIN
		IF EXISTS (SELECT 1 FROM Empleados WHERE Id = @id) BEGIN
            UPDATE Empleados
            SET Nombre = @nombre,
                Apellido = @apellido,
                Cargo = @cargo,
                Telefono = @telefono,
                Email = @email
            WHERE Id = @id;
        END
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[spGuardarReserva]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGuardarReserva]
	@id INT,
	@clienteid INT,
	@vehiculoid INT,
	@fechainicio DATE,
	@fechafin DATE
AS
BEGIN
	SET NOCOUNT ON;
    IF @id = 0 BEGIN
        INSERT INTO Reservas(ClienteId, VehiculoId, FechaInicio, FechaFin, Estado)
        VALUES (@clienteid, @vehiculoid, @fechainicio, @fechafin, 'Disponible');
    END ELSE BEGIN
		IF EXISTS (SELECT 1 FROM Reservas WHERE Id = @id) BEGIN
            UPDATE Reservas
            SET ClienteId = @clienteid,
                VehiculoId = @vehiculoid,
                FechaInicio = @fechainicio,
                FechaFin = @fechafin
            WHERE Id = @id;
        END
    END
	SELECT SCOPE_IDENTITY();
END;
GO
/****** Object:  StoredProcedure [dbo].[spGuardarVehiculo]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGuardarVehiculo]
	@id INT,
	@marca NVARCHAR(50),
	@modelo NVARCHAR(50),
	@año INT,
	@precio DECIMAL(10,2)
AS
BEGIN
    IF @id = 0 BEGIN
        INSERT INTO Vehiculos (Marca, Modelo, Año, Precio, Estado)
        VALUES (@marca, @modelo, @año, @precio,'Disponible');
    END ELSE BEGIN
		IF EXISTS (SELECT 1 FROM Vehiculos WHERE Id = @id) BEGIN
            UPDATE Vehiculos
            SET Marca = @marca,
                Modelo = @modelo,
                Año = @año,
				Precio = @precio
            WHERE Id = @id;
        END
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarClientes]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarClientes]
AS
BEGIN
	SELECT * FROM Clientes;
END
GO
/****** Object:  StoredProcedure [dbo].[spListarEmpleados]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarEmpleados]
AS
BEGIN
	SELECT * FROM VistaEmpleados
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarPagos]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarPagos]
AS
BEGIN
	EXEC spActualizarPagos
	SELECT Pagos.Id,
	Pagos.ReservaId,
	Clientes.Nombre + ' ' + Clientes.Apellido AS Cliente,
	Vehiculos.Marca + ' ' + Vehiculos.Modelo AS Vehiculo,
	Reservas.FechaInicio, Reservas.FechaFin,
	Pagos.Monto,
	Pagos.MetodoPago,
	Pagos.FechaPago
	FROM Pagos
	INNER JOIN Reservas ON Pagos.ReservaId = Reservas.Id
	INNER JOIN Clientes ON Reservas.ClienteId = Clientes.Id
	INNER JOIN Vehiculos ON Reservas.VehiculoId = Vehiculos.Id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarReservas]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarReservas]
AS
BEGIN
	EXEC spActualizarReservas;
	SELECT * FROM VistaReservas;
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarSeguros]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarSeguros]
AS
BEGIN
	SELECT * FROM VistaSeguros
END;
GO
/****** Object:  StoredProcedure [dbo].[spListarVehiculos]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spListarVehiculos]
AS
BEGIN
	EXEC spActualizarVehiculos
	SELECT * FROM VistaVehiculos
END;
GO
/****** Object:  StoredProcedure [dbo].[spRecuperarCliente]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spRecuperarCliente]
	@id INT
AS
BEGIN
	SELECT * FROM VistaClientes WHERE Id = @id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spRecuperarEmpleado]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spRecuperarEmpleado]
	@id INT
AS
BEGIN
	SELECT * FROM VistaEmpleados WHERE Id = @id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spRecuperarIdClientePorEmail]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spRecuperarIdClientePorEmail]
	@email NVARCHAR(100)
AS
BEGIN
	SET NOCOUNT ON;
    SELECT Id FROM ClienteS WHERE Email = @email;
END;
GO
/****** Object:  StoredProcedure [dbo].[spRecuperarPago]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spRecuperarPago]
	@id INT
AS
BEGIN
	SELECT * FROM VistaPagos WHERE Id = @id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spRecuperarReserva]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spRecuperarReserva]
	@id INT
AS
BEGIN
	SELECT * FROM VistaReservas WHERE Id = @id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spRecuperarSeguro]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spRecuperarSeguro]
	@id INT
AS
BEGIN
	SELECT * FROM VistaSeguros WHERE Id = @id;
END;
GO
/****** Object:  StoredProcedure [dbo].[spRecuperarVehiculo]    Script Date: 04/03/2025 23:44:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spRecuperarVehiculo]
	@id INT
AS
BEGIN
	SELECT * FROM VistaVehiculos WHERE Id = @id;
END;
GO
USE [master]
GO
ALTER DATABASE [AlquilerVehiculos] SET  READ_WRITE 
GO
