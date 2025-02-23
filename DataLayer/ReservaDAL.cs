using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class ReservaDAL
    {
        private DBConnection db = new DBConnection();

        public List<ReservaCLS> Read(SqlDataReader reader)
        {
            List<ReservaCLS> list = null;

            if(reader != null)
            {
                list = new List<ReservaCLS>();
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
                    list.Add(reserva);
                }
            }

            return list;
        }

        public List<ReservaCLS> Get()
        {
            List<ReservaCLS> list = null;

            db.ExecuteQuery("spGetReservas", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                list = Read(cmd.ExecuteReader());
            });

            return list;
        }
    }
}
