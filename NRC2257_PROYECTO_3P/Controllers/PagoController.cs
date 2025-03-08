using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class PagoController : AdminController
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<PagoCLS> Listar()
        {
            return PagoBL.Listar();
        }

        public int Guardar(PagoCLS pago)
        {
            return PagoBL.Guardar(pago);
        }
    }
}
