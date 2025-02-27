using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class EmpleadoDAL
    {
        private static List<EmpleadoCLS> Leer(SqlDataReader reader)
        {
            List<EmpleadoCLS> lista = null;

            if (reader != null)
            {
                lista = new List<EmpleadoCLS>();
                EmpleadoCLS empleado;
                int IdOrdinal = reader.GetOrdinal("Id");
                int NombreOrdinal = reader.GetOrdinal("Nombre");
                int ApellidoOrdinal = reader.GetOrdinal("Apellido");
                int CargoOrdinal = reader.GetOrdinal("Cargo");
                int TelefonoOrdinal = reader.GetOrdinal("Telefono");
                int EmailOrdinal = reader.GetOrdinal("Email");
                while (reader.Read())
                {
                    empleado = new EmpleadoCLS();
                    empleado.Id = reader.GetInt32(IdOrdinal);
                    empleado.Nombre = reader.GetString(NombreOrdinal);
                    empleado.Apellido = reader.GetString(ApellidoOrdinal);
                    empleado.Cargo = reader.GetString(CargoOrdinal);
                    empleado.Telefono = reader.GetString(TelefonoOrdinal);
                    empleado.Email = reader.GetString(EmailOrdinal);
                    lista.Add(empleado);
                }
            }
            return lista;
        }

        public static List<EmpleadoCLS> Listar()
        {
            List<EmpleadoCLS> lista = null;
            DBConnection.ExecuteQuery("spListarEmpleados", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                lista = Leer(cmd.ExecuteReader());
            });
            return lista;
        }

        public static List<EmpleadoCLS> Filtrar(string nombre)
        {
            List<EmpleadoCLS> lista = new();
            DBConnection.ExecuteQuery("spFiltrarEmpleados", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre", nombre); 
                lista = Leer(cmd.ExecuteReader());
            });
            return lista;
        }

        public static EmpleadoCLS Recuperar(int id)
        {
            EmpleadoCLS empleado = null;
            DBConnection.ExecuteQuery("spRecuperarEmpleado", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                empleado = Leer(cmd.ExecuteReader())[0];
            });
            return empleado;
        }

        public static int Guardar(EmpleadoCLS empleado)
        {
            int res = 0;
            DBConnection.ExecuteQuery("spGuardarEmpleado", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", empleado.Id);
                cmd.Parameters.AddWithValue("@nombre", empleado.Nombre);
                cmd.Parameters.AddWithValue("@apellido", empleado.Apellido);
                cmd.Parameters.AddWithValue("@cargo", empleado.Cargo);
                cmd.Parameters.AddWithValue("@telefono", empleado.Telefono);
                cmd.Parameters.AddWithValue("@email", empleado.Email);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }

        public static int Eliminar(int id)
        {
            int res = 0;
            DBConnection.ExecuteQuery("spEliminarEmpleado", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }
    }
}
