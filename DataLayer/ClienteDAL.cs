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

        public static List<ClienteCLS> Filtrar(string filtro)
        {
            List<ClienteCLS> lista = null;
            DBConnection.ExecuteQuery("spFiltrarClientes", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@filtro", filtro);
                lista = Leer(cmd.ExecuteReader());
            });
            return lista;
        }

        public static ClienteCLS Recuperar(int id)
        {
            ClienteCLS cliente = null;
            DBConnection.ExecuteQuery("spRecuperarCliente", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                cliente = Leer(cmd.ExecuteReader())[0];
            });
            return cliente;
        }

        public static int Guardar(ClienteCLS cliente)
        {
            int res = 0;
            DBConnection.ExecuteQuery("spGuardarCliente", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", cliente.Id);
                cmd.Parameters.AddWithValue("@nombre", cliente.Nombre);
                cmd.Parameters.AddWithValue("@apellido", cliente.Apellido);
                cmd.Parameters.AddWithValue("@telefono", cliente.Telefono);
                cmd.Parameters.AddWithValue("@email", cliente.Email);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }

        public static int Eliminar(int id)
        {
            int res = 0;
            DBConnection.ExecuteQuery("spEliminarCliente", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }
    }
}

