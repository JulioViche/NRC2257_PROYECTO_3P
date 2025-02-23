using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class EmpleadoBL
    {
        private EmpleadoDAL empleadoDAL = new EmpleadoDAL();

        public List<EmpleadoCLS> Get()
        {
            return empleadoDAL.Get();
        }
    }
}
