using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class SeguroDAL
    {
        private DBConnection db = new DBConnection();

        public List<SeguroCLS> Read(SqlDataReader reader)
        {
            List<SeguroCLS> list = null;

            if (reader != null)
            {
                list = new List<SeguroCLS>();
                SeguroCLS seguro;

                int IdOrdinal = reader.GetOrdinal("Id");
                int ReservaIdOrdinal = reader.GetOrdinal("ReservaId");
                int ClienteOrdinal = reader.GetOrdinal("Cliente");
                int VehiculoOrdinal = reader.GetOrdinal("Vehiculo");
                int FechaInicioOrdinal = reader.GetOrdinal("FechaInicio");
                int FechaFinOrdinal = reader.GetOrdinal("FechaFin");
                int TipoSeguroOrdinal = reader.GetOrdinal("TipoSeguro");
                int CostoOrdinal = reader.GetOrdinal("Costo");

                while (reader.Read())
                {
                    seguro = new SeguroCLS();
                    seguro.Id = reader.GetInt32(IdOrdinal);
                    seguro.ReservaId = reader.GetInt32(ReservaIdOrdinal);
                    seguro.Cliente = reader.GetString(ClienteOrdinal);
                    seguro.Vehiculo = reader.GetString(VehiculoOrdinal);
                    seguro.FechaInicio = reader.GetDateTime(FechaInicioOrdinal).ToString();
                    seguro.FechaFin = reader.GetDateTime(FechaFinOrdinal).ToString();
                    seguro.TipoSeguro = reader.GetString(TipoSeguroOrdinal);
                    seguro.Costo = (float)reader.GetDecimal(CostoOrdinal);
                    list.Add(seguro);
                }
            }

            return list;
        }

        public List<SeguroCLS> Get()
        {
            List<SeguroCLS> list = null;

            db.ExecuteQuery("spGetSeguros", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                list = Read(cmd.ExecuteReader());
            });

            return list;
        }
    }
}
