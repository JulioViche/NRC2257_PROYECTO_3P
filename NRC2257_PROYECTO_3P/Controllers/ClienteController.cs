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

        public List<ClienteCLS> Filtrar(string filtro)
        {
            return ClienteBL.Filtrar(filtro);
        }

        public ClienteCLS Recuperar(int id)
        {
            return ClienteBL.Recuperar(id);
        }

        public int RecuperarId(string email)
        {
            return ClienteBL.RecuperarId(email);
        }

        public int Guardar(ClienteCLS cliente)
        {
            return ClienteBL.Guardar(cliente);
        }

        public int Eliminar(int id)
        {
            return ClienteBL.Eliminar(id);
        }
    }
}
