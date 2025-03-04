using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class VehiculoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<VehiculoCLS> Listar()
        {
            return VehiculoBL.Listar();
        }

        public List<VehiculoCLS> Filtrar(string filtro)
        {
            return VehiculoBL.Filtrar(filtro);
        }

        public VehiculoCLS Recuperar(int id)
        {
            return VehiculoBL.Recuperar(id);
        }

        public int Guardar(VehiculoCLS vehiculo)
        {
            return VehiculoBL.Guardar(vehiculo);
        }

        public int Eliminar(int id)
        {
            return VehiculoBL.Eliminar(id);
        }
    }
}
