using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class ClienteBL
    {
        ClienteDAL clienteDAL = new ClienteDAL();

        public List<ClienteCLS> Get()
        {
            return clienteDAL.Get();
        }
    }
}
