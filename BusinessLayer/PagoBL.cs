using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class PagoBL
    {
        public static List<PagoCLS> Listar()
        {
            return PagoDAL.Listar();
        }
    }
}
