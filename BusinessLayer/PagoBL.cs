using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class PagoBL
    {
        private PagoDAL pagoDAL = new PagoDAL();

        public List<PagoCLS> Get()
        {
            return pagoDAL.Get();
        }
    }
}
