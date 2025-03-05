﻿using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class SeguroBL
    {
        public static List<SeguroCLS> Listar()
        {
            return SeguroDAL.Listar();
        }

        public static List<string> ListarTiposSeguro()
        {
            return ["Responsabilidad Civil Básico", "Responsabilidad Civil", "Contra Robos", "Cobertura Total"];
        }

        public static float CalcularCostoSeguro(int reservaId, string tipo)
        {
            ReservaCLS reserva = ReservaDAL.Recuperar(reservaId);
            VehiculoCLS vehiculo = VehiculoDAL.Recuperar(reserva.VehiculoId);
            TimeSpan timeSpan = (DateTime.Parse(reserva.FechaFin) - DateTime.Parse(reserva.FechaInicio));
            float porcentaje = 0;

            switch (tipo)
            {
                case "Responsabilidad Civil Básico":
                    porcentaje = 0.033f;
                    break;
                case "Responsabilidad Civil":
                    porcentaje = 0.050f;
                    break;
                case "Contra Robos":
                    porcentaje = 0.075f;
                    break;
                case "Cobertura Total":
                    porcentaje = 0.125f;
                    break;
                default:
                    porcentaje = 0.001f;
                    break;
            }

            return vehiculo.Precio * timeSpan.Days * porcentaje;
        }
    }
}
