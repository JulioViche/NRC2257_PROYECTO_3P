using Microsoft.AspNetCore.Mvc;

namespace NRC2257_PROYECTO_3P.Controllers
{
    public class LoginController : AdminController
    {
        public IActionResult IndexLogin()
        {
            return View();
        }
    }
}
