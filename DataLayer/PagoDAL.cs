using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class PagoDAL
    {
        private DBConnection db = new DBConnection();

        public List<PagoCLS> Read(SqlDataReader reader)
        {
            List<PagoCLS> list = null;

            if (reader != null)
            {
                list = new List<PagoCLS>();
                PagoCLS pago;

                int IdOrdinal = reader.GetOrdinal("Id");
                int ReservaIdOrdinal = reader.GetOrdinal("ReservaId");
                int ClienteOrdinal = reader.GetOrdinal("Cliente");
                int VehiculoOrdinal = reader.GetOrdinal("Vehiculo");
                int FechaInicioOrdinal = reader.GetOrdinal("FechaInicio");
                int FechaFinOrdinal = reader.GetOrdinal("FechaFin");
                int FechaPagoOrdinal = reader.GetOrdinal("FechaPago");
                int MontoOrdinal = reader.GetOrdinal("Monto");
                int MetodoPagoOrdinal = reader.GetOrdinal("MetodoPago");

                while (reader.Read())
                {
                    pago = new PagoCLS();

                    pago.Id = reader.GetInt32(IdOrdinal);
                    pago.ReservaId = reader.GetInt32(ReservaIdOrdinal);
                    pago.Cliente = reader.GetString(ClienteOrdinal);
                    pago.Vehiculo = reader.GetString(VehiculoOrdinal);
                    pago.FechaInicio = reader.GetDateTime(FechaInicioOrdinal).ToString();
                    pago.FechaFin = reader.GetDateTime(FechaFinOrdinal).ToString();
                    pago.FechaPago = reader.GetDateTime(FechaPagoOrdinal).ToString();
                    pago.Monto = (float)reader.GetDecimal(MontoOrdinal);
                    pago.MetodoPago = reader.GetString(MetodoPagoOrdinal);
                    list.Add(pago);
                }
            }

            return list;
        }

        public List<PagoCLS> Get()
        {
            List<PagoCLS> list = null;

            db.ExecuteQuery("spGetPagos", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                list = Read(cmd.ExecuteReader());
            });

            return list;
        }
    }
}
