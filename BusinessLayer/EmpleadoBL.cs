using DataLayer;
using EntityLayer;

namespace BusinessLayer
{
    public class EmpleadoBL
    {
        public static List<EmpleadoCLS> Listar()
        {
            return EmpleadoDAL.Listar();
        }

        public static List<EmpleadoCLS> Filtrar(string filtro)
        {
            return EmpleadoDAL.Filtrar(filtro);

        }

        public static EmpleadoCLS Recuperar(int id)
        {
            return EmpleadoDAL.Recuperar(id);
        }

        public static int Guardar(EmpleadoCLS empleado)
        {
            return EmpleadoDAL.Guardar(empleado);
        }

        public static int Eliminar(int id)
        {
            return EmpleadoDAL.Eliminar(id);
        }
    }
}
