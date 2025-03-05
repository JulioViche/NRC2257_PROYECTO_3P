namespace EntityLayer
{
    public class SeguroCLS
    {
        public int Id { get; set; }
        public int ReservaId { get; set; }
        public string Cliente { get; set; }
        public string Vehiculo { get; set; }
        public string ReservaFechaInicio { get; set; }
        public string ReservaFechaFin { get; set; }
        public string TipoSeguro { get; set; }
        public float Costo { get; set; }
    }
}
