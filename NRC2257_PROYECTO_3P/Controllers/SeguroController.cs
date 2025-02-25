using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class SeguroController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<SeguroCLS> Listar()
        {
            return SeguroBL.Listar();
        }
    }
}
