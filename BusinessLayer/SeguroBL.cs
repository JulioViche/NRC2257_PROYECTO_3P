using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class SeguroBL
    {
        private SeguroDAL seguroDAL = new SeguroDAL();

        public List<SeguroCLS> Get()
        {
            return seguroDAL.Get();
        }
    }
}
