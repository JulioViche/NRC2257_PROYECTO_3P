using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class ReservaDAL
    {
        private static List<ReservaCLS> Leer(SqlDataReader reader)
        {
            List<ReservaCLS> lista = null;
            if (reader != null)
            {
                lista = new List<ReservaCLS>();
                ReservaCLS reserva;
                int IdOrdinal = reader.GetOrdinal("Id");
                int ClienteIdOrdinal = reader.GetOrdinal("ClienteId");
                int VehiculoIdOrdinal = reader.GetOrdinal("VehiculoId");
                int ClienteOrdinal = reader.GetOrdinal("Cliente");
                int VehiculoOrdinal = reader.GetOrdinal("Vehiculo");
                int FechaInicioOrdinal = reader.GetOrdinal("FechaInicio");
                int FechaFinOrdinal = reader.GetOrdinal("FechaFin");
                int EstadoOrdinal = reader.GetOrdinal("Estado");
                while (reader.Read())
                {
                    reserva = new ReservaCLS();
                    reserva.Id = reader.GetInt32(IdOrdinal);
                    reserva.ClienteId = reader.GetInt32(ClienteIdOrdinal);
                    reserva.VehiculoId = reader.GetInt32(VehiculoIdOrdinal);
                    reserva.Cliente = reader.GetString(ClienteOrdinal);
                    reserva.Vehiculo = reader.GetString(VehiculoOrdinal);
                    reserva.FechaInicio = reader.GetDateTime(FechaInicioOrdinal).ToString();
                    reserva.FechaFin = reader.GetDateTime(FechaFinOrdinal).ToString();
                    reserva.Estado = reader.GetString(EstadoOrdinal);
                    lista.Add(reserva);
                }
            }
            return lista;
        }

        public static List<ReservaCLS> Listar()
        {
            List<ReservaCLS> lista = null;
            DBConnection.ExecuteQuery("spListarReservas", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                lista = Leer(cmd.ExecuteReader());
            });
            return lista;
        }

        public static ReservaCLS Recuperar(int id)
        {
            ReservaCLS reserva = null;
            DBConnection.ExecuteQuery("spRecuperarReserva", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                reserva = Leer(cmd.ExecuteReader())[0];
            });
            return reserva;
        }
    }
}
