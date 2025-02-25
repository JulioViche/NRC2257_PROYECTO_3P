using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class ReservaBL
    {
        public static List<ReservaCLS> Listar()
        {
            return ReservaDAL.Listar();
        }
    }
}
