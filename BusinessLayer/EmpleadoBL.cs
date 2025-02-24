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

        public List<EmpleadoCLS> Filter(string n)
        {
            EmpleadoDAL obj = new EmpleadoDAL();
            return obj.Filter(n);

        }
       
    }
}
