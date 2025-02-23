using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class SeguroController : Controller
    {
        private SeguroBL seguroBL = new SeguroBL();

        public IActionResult Index()
        {
            return View();
        }

        public List<SeguroCLS> Get()
        {
            return seguroBL.Get();
        }
    }
}
