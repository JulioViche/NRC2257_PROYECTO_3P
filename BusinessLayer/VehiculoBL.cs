using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class VehiculoBL
    {
        public static List<VehiculoCLS> Listar()
        {
            return VehiculoDAL.Listar();
        }

        public static List<VehiculoCLS> Filtrar(string filtro)
        {
            return VehiculoDAL.Filtrar(filtro);
        }

        public static VehiculoCLS Recuperar(int id)
        {
            return VehiculoDAL.Recuperar(id);
        }

        public static int Guardar(VehiculoCLS vehiculo)
        {
            return VehiculoDAL.Guardar(vehiculo);
        }

        public static int Eliminar(int id)
        {
            return VehiculoDAL.Eliminar(id);
        }
    }
}
