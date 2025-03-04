using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class EmpleadoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<EmpleadoCLS> Listar()
        {
            return EmpleadoBL.Listar();
        }
         
        public List<EmpleadoCLS> Filtrar(string filtro)
        {
            return EmpleadoBL.Filtrar(filtro);
        }

        public int Guardar(EmpleadoCLS empleado)
        {
            return EmpleadoBL.Guardar(empleado);
        }

        public EmpleadoCLS Recuperar(int id)
        {
            return EmpleadoBL.Recuperar(id);
        }

        public int Eliminar(int id)
        {
            return EmpleadoBL.Eliminar(id);
        }
    }
}
