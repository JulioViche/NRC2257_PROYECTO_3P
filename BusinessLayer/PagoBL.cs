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


        public static int Guardar(PagoCLS pago)
        {
            return PagoDAL.Guardar(pago);
        }

        public static PagoCLS Recuperar(int id)
        {
            return PagoDAL.Recuperar(id);
        }

        public static int Eliminar(int id)
        {
            return PagoDAL.Eliminar(id);
        }

        public static int Actualizar(PagoCLS pago)
        {
            return PagoDAL.Actualizar(pago);
        }

    }
}