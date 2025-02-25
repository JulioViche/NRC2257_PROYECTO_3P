using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class ClienteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ViewCreate()
        {
            return View();
        }

        public List<ClienteCLS> Listar()
        {
            return ClienteBL.Listar();
        }
    }
}
