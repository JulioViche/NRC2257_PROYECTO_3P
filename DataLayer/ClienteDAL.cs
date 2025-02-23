using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class ClienteDAL
    {
        private DBConnection db = new DBConnection();

        public List<ClienteCLS> Read(SqlDataReader reader)
        {
            List<ClienteCLS> list = null;

            if (reader != null)
            {
                list = new List<ClienteCLS>();
                ClienteCLS cliente;

                int IdOrdinal = reader.GetOrdinal("Id");
                int NombreOrdinal = reader.GetOrdinal("Nombre");
                int ApellidoOrdinal = reader.GetOrdinal("Apellido");
                int TelefonoOrdinal = reader.GetOrdinal("Telefono");
                int EmailOrdinal = reader.GetOrdinal("Email");

                while (reader.Read())
                {
                    cliente = new ClienteCLS();
                    cliente.Id = reader.GetInt32(IdOrdinal);
                    cliente.Nombre = reader.GetString(NombreOrdinal);
                    cliente.Apellido = reader.GetString(ApellidoOrdinal);
                    cliente.Telefono = reader.GetString(TelefonoOrdinal);
                    cliente.Email = reader.GetString(EmailOrdinal);
                    list.Add(cliente);
                }
            }

            return list;
        }

        public List<ClienteCLS> Get()
        {
            List<ClienteCLS> list = null;

            db.ExecuteQuery("spGetClientes", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                list = Read(cmd.ExecuteReader());
            });

            return list;
        }
    }
}

