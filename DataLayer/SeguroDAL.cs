﻿using System.Data.SqlClient;
using EntityLayer;

namespace DataLayer
{
    public class SeguroDAL
    {
        private static List<SeguroCLS> Leer(SqlDataReader reader)
        {
            List<SeguroCLS> lista = null;
            if (reader != null)
            {
                lista = new List<SeguroCLS>();
                SeguroCLS seguro;
                int IdOrdinal = reader.GetOrdinal("Id");
                int ReservaIdOrdinal = reader.GetOrdinal("ReservaId");
                int ClienteOrdinal = reader.GetOrdinal("Cliente");
                int VehiculoOrdinal = reader.GetOrdinal("Vehiculo");
                int FechaInicioOrdinal = reader.GetOrdinal("ReservaFechaInicio");
                int FechaFinOrdinal = reader.GetOrdinal("ReservaFechaFin");
                int TipoSeguroOrdinal = reader.GetOrdinal("TipoSeguro");
                int CostoOrdinal = reader.GetOrdinal("Costo");
                while (reader.Read())
                {
                    seguro = new SeguroCLS();
                    seguro.Id = reader.GetInt32(IdOrdinal);
                    seguro.ReservaId = reader.GetInt32(ReservaIdOrdinal);
                    seguro.Cliente = reader.GetString(ClienteOrdinal);
                    seguro.Vehiculo = reader.GetString(VehiculoOrdinal);
                    seguro.ReservaFechaInicio = reader.GetDateTime(FechaInicioOrdinal).ToString();
                    seguro.ReservaFechaFin = reader.GetDateTime(FechaFinOrdinal).ToString();
                    seguro.TipoSeguro = reader.GetString(TipoSeguroOrdinal);
                    seguro.Costo = (float)reader.GetDecimal(CostoOrdinal);
                    lista.Add(seguro);
                }
            }
            return lista;
        }

        public static List<SeguroCLS> Listar()
        {
            List<SeguroCLS> lista = null;
            DBConnection.ExecuteQuery("spListarSeguros", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                lista = Leer(cmd.ExecuteReader());
            });
            return lista;
        }

        public static SeguroCLS Recuperar(int id)
        {
            SeguroCLS seguro = null;
            DBConnection.ExecuteQuery("spRecuperarSeguro", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                seguro = Leer(cmd.ExecuteReader())[0];
            });
            return seguro;
        }

        public static int Guardar(SeguroCLS seguro)
        {
            int res = 0;
            DBConnection.ExecuteQuery("spGuardarSeguro", (cmd) =>
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", seguro.Id);
                cmd.Parameters.AddWithValue("@reservaid", seguro.ReservaId);
                cmd.Parameters.AddWithValue("@tiposeguro", seguro.TipoSeguro);
                cmd.Parameters.AddWithValue("@costo", seguro.Costo);
                res = cmd.ExecuteNonQuery();
            });
            return res;
        }


    }
}
