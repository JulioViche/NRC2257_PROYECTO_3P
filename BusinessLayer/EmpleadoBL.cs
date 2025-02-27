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

        public static List<EmpleadoCLS> Filtrar(string nombre)
        {
            return EmpleadoDAL.Filtrar(nombre);

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
