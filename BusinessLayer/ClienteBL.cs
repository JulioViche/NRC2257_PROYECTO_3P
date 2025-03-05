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

        public static List<ClienteCLS> Filtrar(string filtro)
        {
            return ClienteDAL.Filtrar(filtro);
        }

        public static ClienteCLS Recuperar(int id)
        {
            return ClienteDAL.Recuperar(id);
        }

        public static int RecuperarId(string email)
        {
            return ClienteDAL.RecuperarId(email);
        }

        public static int Guardar(ClienteCLS cliente)
        {
            return ClienteDAL.Guardar(cliente);
        }

        public static int Eliminar(int id)
        {
            return ClienteDAL.Eliminar(id);
        }
    }
}
