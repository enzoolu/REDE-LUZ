using Microsoft.AspNetCore.Mvc;
using REDE_LUZ_API.Models;
using REDE_LUZ_API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using REDE_LUZ_API.DTOs;
using System.Text.RegularExpressions;

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

        [HttpPost]
        public async Task<ActionResult> PostOcorrencia(OcorrenciaRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Cep) || !Regex.IsMatch(request.Cep!, @"^\d{5}-?\d{3}$"))
                    return BadRequest("CEP inválido. Formato esperado: 00000-000");

                if (string.IsNullOrWhiteSpace(request.Numero))
                    return BadRequest("Número é obrigatório.");

                if (request.DuracaoMinutos <= 0)
                    return BadRequest("Duração deve ser maior que zero.");

                if (request.Inicio > DateTime.Now.AddMinutes(1))
                    return BadRequest("Data de início não pode ser mais de 1 minuto no futuro.");

                var usuarioExiste = await _context.Usuarios.AnyAsync(u => u.Id == request.UsuarioId);
                if (!usuarioExiste)
                    return BadRequest("Usuário não encontrado.");

                var ocorrencia = new Ocorrencia
                {
                    Cep = request.Cep,
                    Numero = request.Numero,
                    Bairro = request.Bairro,
                    Cidade = request.Cidade,
                    Inicio = request.Inicio,
                    DuracaoMinutos = request.DuracaoMinutos,
                    Prejuizos = request.Prejuizos,
                    UsuarioId = request.UsuarioId
                };

                _context.Ocorrencias.Add(ocorrencia);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetOcorrencia), new { id = ocorrencia.Id }, ocorrencia);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        [HttpGet("usuario/{usuarioId}")]
        public async Task<ActionResult<IEnumerable<Ocorrencia>>> GetOcorrenciasPorUsuario(int usuarioId)
        {
            var ocorrencias = await _context.Ocorrencias
                .Where(o => o.UsuarioId == usuarioId)
                .Include(o => o.Usuario)
                .ToListAsync();

            if (!ocorrencias.Any())
                return NotFound("Nenhuma ocorrência encontrada para este usuário.");

            return ocorrencias;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ocorrencia>> GetOcorrencia(int id)
        {
            var ocorrencia = await _context.Ocorrencias
                .Include(o => o.Usuario)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (ocorrencia == null)
                return NotFound();

            return ocorrencia;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ocorrencia>>> GetTodasOcorrencias()
        {
            var ocorrencias = await _context.Ocorrencias
                .Include(o => o.Usuario)
                .ToListAsync();

            return Ok(ocorrencias);
        }
    }
}
