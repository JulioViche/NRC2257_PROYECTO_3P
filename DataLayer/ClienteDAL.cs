using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class ClienteDAL
    {
        private static List<ClienteCLS> Leer(SqlDataReader reader)
        {
            List<ClienteCLS> lista = null;
            if (reader != null)
            {
                lista = new List<ClienteCLS>();
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
                    lista.Add(cliente);
                }
            }
            return lista;
        }

        public static List<ClienteCLS> Listar()
        {
            List<ClienteCLS> lista = null;
            DBConnection.ExecuteQuery("spListarClientes", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                lista = Leer(cmd.ExecuteReader());
            });
            return lista;
        }
    }
}

