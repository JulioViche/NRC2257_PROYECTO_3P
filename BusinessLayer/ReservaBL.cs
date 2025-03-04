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

        public static List<ReservaCLS> Filtrar(string filtro)
        {
            return ReservaDAL.Filtrar(filtro);
        }

        public static ReservaCLS Recuperar(int id)
        {
            return ReservaDAL.Recuperar(id);
        }
    }
}
