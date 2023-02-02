using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class ViagensController: ControllerBase
    {
        [HttpPost("api/processar-arquivo")]
        public async Task<IActionResult> ProcessarArquivo([FromBody] IFormFile file)
        {
            return Ok();
        }
    }
}
