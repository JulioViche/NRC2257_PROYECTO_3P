using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class VehiculoBL
    {
        public static List<VehiculoCLS> Listar()
        {
            return VehiculoDAL.Listar();
        }
    }
}
