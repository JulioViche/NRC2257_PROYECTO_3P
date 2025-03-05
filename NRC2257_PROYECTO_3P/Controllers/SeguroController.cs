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

        public List<string> ListarTiposSeguro()
        {
            return SeguroBL.ListarTiposSeguro();
        }

        public List<SeguroCLS> Listar()
        {
            return SeguroBL.Listar();
        }

        public float CalcularCostoSeguro(int reservaId, string tipo)
        {
            return SeguroBL.CalcularCostoSeguro(reservaId, tipo);
        }
    }
}
