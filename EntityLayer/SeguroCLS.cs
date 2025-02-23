namespace EntityLayer
{
    public class SeguroCLS
    {
        public int Id { get; set; }
        public int ReservaId { get; set; }
        public string Cliente { get; set; }
        public string Vehiculo { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public string TipoSeguro { get; set; }
        public float Costo { get; set; }
    }
}
