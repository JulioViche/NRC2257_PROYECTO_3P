using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class ClienteBL
    {
        public static List<ClienteCLS> Listar()
        {
            return ClienteDAL.Listar();
        }
    }
}
