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

    public static int Guardar(PagoCLS pago)
        {
            return PagoDAL.Guardar(pago);
        }

    }
