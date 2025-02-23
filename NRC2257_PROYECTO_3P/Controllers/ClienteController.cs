using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class ClienteController : Controller
    {
        ClienteBL clienteBL = new ClienteBL();

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ViewCreate()
        {
            return View();
        }

        public List<ClienteCLS> Get()
        {
            ClienteBL clienteBL = new ClienteBL();
            return clienteBL.Get();
        }
    }
}
