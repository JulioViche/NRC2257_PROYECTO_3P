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

        public static List<ClienteCLS> Filtrar(string nombre)
        {
            return ClienteDAL.Filtrar(nombre);
        }

        public static ClienteCLS Recuperar(int id)
        {
            return ClienteDAL.Recuperar(id);
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
