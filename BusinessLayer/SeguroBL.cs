using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class SeguroBL
    {
        public static List<SeguroCLS> Listar()
        {
            return SeguroDAL.Listar();
        }
    }
}
