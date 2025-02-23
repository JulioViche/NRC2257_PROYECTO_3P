using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class EmpleadoController : Controller
    {
        private EmpleadoBL empleadoBL = new EmpleadoBL();
        
        public IActionResult Index()
        {
            return View();
        }

        public List<EmpleadoCLS> Get()
        {
            return empleadoBL.Get();
        }
    }
}
