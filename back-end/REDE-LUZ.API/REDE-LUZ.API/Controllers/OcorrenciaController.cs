using Microsoft.AspNetCore.Mvc;
using REDE_LUZ_API.Models;
using REDE_LUZ_API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace REDE_LUZ_API.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class OcorrenciaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OcorrenciaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ocorrencia>>> GetOcorrencias()
        {
            return await _context.Ocorrencias.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ocorrencia>> GetOcorrencia(int id)
        {
            var ocorrencia = await _context.Ocorrencias.FindAsync(id);
            if (ocorrencia == null)
            {
                return NotFound();
            }
            return ocorrencia;
        }

        [HttpPost]
        public async Task<ActionResult<Ocorrencia>> PostOcorrencia(Ocorrencia ocorrencia)
        {
            _context.Ocorrencias.Add(ocorrencia);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOcorrencia), new { id = ocorrencia.Id }, ocorrencia);

        }
    }
}
