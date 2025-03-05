namespace EntityLayer
{
    public class PagoCLS
    {
        public int Id { get; set; }
        public int ReservaId { get; set; }
        public string Cliente { get; set; }
        public string Vehiculo { get; set; }
        public string ReservaFechaInicio { get; set; }
        public string ReservaFechaFin { get; set; }
        public float Monto { get; set; }
        public string MetodoPago { get; set; }
        public string FechaPago { get; set; }
    }
}
