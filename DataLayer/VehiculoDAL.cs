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
    }
}
