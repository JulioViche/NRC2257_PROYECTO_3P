using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class PagoDAL
    {
        private static List<PagoCLS> Leer(SqlDataReader reader)
        {
            List<PagoCLS> lista = null;
            if (reader != null)
            {
                lista = new List<PagoCLS>();
                PagoCLS pago;
                int IdOrdinal = reader.GetOrdinal("Id");
                int ReservaIdOrdinal = reader.GetOrdinal("ReservaId");
                int ClienteOrdinal = reader.GetOrdinal("Cliente");
                int VehiculoOrdinal = reader.GetOrdinal("Vehiculo");
                int FechaInicioOrdinal = reader.GetOrdinal("ReservaFechaInicio");
                int FechaFinOrdinal = reader.GetOrdinal("ReservaFechaFin");
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
                    lista.Add(pago);
                }
            }
            return lista;
        }

        public static List<PagoCLS> Listar()
        {
            List<PagoCLS> lista = null;
            DBConnection.ExecuteQuery("spListarPagos", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                lista = Leer(cmd.ExecuteReader());
            });
            return lista;
        }

        public static PagoCLS Recuperar(int id)
        {
            PagoCLS pago = null;
            DBConnection.ExecuteQuery("spRecuperarPago", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                pago = Leer(cmd.ExecuteReader())[0];
            });
            return pago;
        }

        public static int Guardar(PagoCLS pago)
        {
            int res = 0;
            DBConnection.ExecuteQuery("uspGuardarPago", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ReservaId", pago.ReservaId);
                cmd.Parameters.AddWithValue("@MetodoPago", pago.MetodoPago);
                cmd.Parameters.AddWithValue("@Monto", pago.Monto);
                cmd.Parameters.AddWithValue("@FechaPago", pago.FechaPago);
                res = Convert.ToInt32(cmd.ExecuteScalar());
            });
            return res;
        }


    }
}
