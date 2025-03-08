using BusinessLayer;
using EntityLayer;
using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class ReservaController : AdminController
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<ReservaCLS> Listar()
        {
            return ReservaBL.Listar();
        }

        public List<ReservaCLS> Filtrar(string filtro)
        {
            return ReservaBL.Filtrar(filtro);
        }

        public ReservaCLS Recuperar(int id)
        {
            return ReservaBL.Recuperar(id);
        }

        public int Guardar(ReservaCLS reserva)
        {
            return ReservaBL.Guardar(reserva);
        }
    }
}
