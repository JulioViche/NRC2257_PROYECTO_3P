using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class ReservaController : Controller
    {
        private ReservaBL reservaBL = new ReservaBL();

        public IActionResult Index()
        {
            return View();
        }

        public List<ReservaCLS> Get()
        {
            return reservaBL.Get();
        }
    }
}
