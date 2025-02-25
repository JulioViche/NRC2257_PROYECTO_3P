using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class PagoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<PagoCLS> Listar()
        {
            return PagoBL.Listar();
        }
    }
}
