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
    }
}
