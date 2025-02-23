using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class VehiculoBL
    {
        private VehiculoDAL vehiculoDAL = new VehiculoDAL();
        
        public List<VehiculoCLS> Get()
        {
            return vehiculoDAL.Get();
        }
    }
}
