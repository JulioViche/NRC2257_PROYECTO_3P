using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class EmpleadoDAL
    {
        private DBConnection db = new DBConnection();

        public List<EmpleadoCLS> Read(SqlDataReader reader)
        {
            List<EmpleadoCLS> list = null;

            if (reader != null)
            {
                list = new List<EmpleadoCLS>();
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
                    list.Add(empleado);
                }
            }

            return list;
        }

        public List<EmpleadoCLS> Get()
        {
            List<EmpleadoCLS> list = null;

            db.ExecuteQuery("spGetEmpleados", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                list = Read(cmd.ExecuteReader());
            });

            return list;
        }
    }
}
