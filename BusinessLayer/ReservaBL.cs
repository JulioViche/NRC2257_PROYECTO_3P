using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class ReservaBL
    {
        private ReservaDAL reservaDAL = new ReservaDAL();

        public List<ReservaCLS> Get()
        {
            return reservaDAL.Get();
        }
    }
}
