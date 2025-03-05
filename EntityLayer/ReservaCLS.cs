namespace EntityLayer
{
    public class ReservaCLS
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public int VehiculoId { get; set; }
        public string Cliente { get; set; }
        public string Vehiculo { get; set; }
        public DateOnly FechaInicio { get; set; }
        public DateOnly FechaFin { get; set; }
        public string Estado { get; set; }
    }
}
