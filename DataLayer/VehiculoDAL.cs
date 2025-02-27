using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class VehiculoDAL
    {
        private static List<VehiculoCLS> Leer(SqlDataReader reader)
        {
            List<VehiculoCLS> lista = null;
            if (reader != null)
            {
                lista = new List<VehiculoCLS>();
                VehiculoCLS vehiculo;
                int IdOrdinal = reader.GetOrdinal("Id");
                int MarcaOrdinal = reader.GetOrdinal("Marca");
                int ModeloOrdinal = reader.GetOrdinal("Modelo");
                int AñoOrdinal = reader.GetOrdinal("Año");
                int PrecioOrdinal = reader.GetOrdinal("Precio");
                int EstadoOrdinal = reader.GetOrdinal("Estado");
                while (reader.Read())
                {
                    vehiculo = new VehiculoCLS();
                    vehiculo.Id = reader.GetInt32(IdOrdinal);
                    vehiculo.Marca = reader.GetString(MarcaOrdinal);
                    vehiculo.Modelo = reader.GetString(ModeloOrdinal);
                    vehiculo.Año = reader.GetInt32(AñoOrdinal);
                    vehiculo.Precio = (float)reader.GetDecimal(PrecioOrdinal);
                    vehiculo.Estado = reader.GetString(EstadoOrdinal);
                    lista.Add(vehiculo);
                }
            }
            return lista;
        }

        public static List<VehiculoCLS> Listar()
        {
            List<VehiculoCLS> lista = null;
            DBConnection.ExecuteQuery("spListarVehiculos", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                lista = Leer(cmd.ExecuteReader());
            });
            return lista;
        }

        public static List<VehiculoCLS> Filtrar(string nombre)
        {
            List<VehiculoCLS> lista = null;
            DBConnection.ExecuteQuery("spFiltrarVehiculos", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@nombre", nombre);
                lista = Leer(cmd.ExecuteReader());
            });
            return lista;
        }

        public static VehiculoCLS Recuperar(int id)
        {
            VehiculoCLS vehiculo = null;
            DBConnection.ExecuteQuery("spRecuperarVehiculo", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                vehiculo = Leer(cmd.ExecuteReader())[0];
            });
            return vehiculo;
        }

        public static int Guardar(VehiculoCLS vehiculo)
        {
            int res = 0;
            DBConnection.ExecuteQuery("spGuardarVehiculo", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", vehiculo.Id);
                cmd.Parameters.AddWithValue("@marca", vehiculo.Marca);
                cmd.Parameters.AddWithValue("@modelo", vehiculo.Modelo);
                cmd.Parameters.AddWithValue("@año", vehiculo.Año);
                cmd.Parameters.AddWithValue("@precio", vehiculo.Precio);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }

        public static int Eliminar(int id)
        {
            int res = 0;
            DBConnection.ExecuteQuery("spEliminarVehiculo", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }
    }
}
