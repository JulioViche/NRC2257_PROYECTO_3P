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
                    pago.ReservaFechaInicio = reader.GetDateTime(FechaInicioOrdinal).ToString();
                    pago.ReservaFechaFin = reader.GetDateTime(FechaFinOrdinal).ToString();
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

        public static List<PagoCLS> Filtrar(string filtro)
        {
            List<PagoCLS> lista = new();
            DBConnection.ExecuteQuery("spFiltrarPagos", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@filtro", filtro);
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
            DBConnection.ExecuteQuery("spGuardarPago", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", pago.Id);
                cmd.Parameters.AddWithValue("@reservaid", pago.ReservaId);
                cmd.Parameters.AddWithValue("@metodopago", pago.MetodoPago);
                cmd.Parameters.AddWithValue("@monto", pago.Monto);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }

        public static int Eliminar(int id)
        {
            int res = 0;
            DBConnection.ExecuteQuery("spEliminarPago", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }

        public static int Actualizar(PagoCLS pago)
        {
            int res = 0;
            DBConnection.ExecuteQuery("spGuardarPago", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", pago.Id);
                cmd.Parameters.AddWithValue("@reservaid", pago.ReservaId);
                cmd.Parameters.AddWithValue("@metodopago", pago.MetodoPago);
                cmd.Parameters.AddWithValue("@monto", pago.Monto);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }



    }
}
