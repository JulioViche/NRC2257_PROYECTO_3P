namespace EntityLayer
{
    public class ReservaCLS
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public int VehiculoId { get; set; }
        public string Cliente { get; set; }
        public string Vehiculo { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public string Estado { get; set; }
    }
}
