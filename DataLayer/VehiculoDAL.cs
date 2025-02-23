using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class VehiculoDAL
    {
        private DBConnection db = new DBConnection();

        public List<VehiculoCLS> Read(SqlDataReader reader)
        {
            List<VehiculoCLS> list = null;

            if (reader != null)
            {
                list = new List<VehiculoCLS>();
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
                    list.Add(vehiculo);
                }
            }

            return list;
        }

        public List<VehiculoCLS> Get()
        {
            List<VehiculoCLS> list = null;

            db.ExecuteQuery("spGetVehiculos", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                list = Read(cmd.ExecuteReader());
            });

            return list;
        }
    }
}
