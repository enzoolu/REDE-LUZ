using Microsoft.AspNetCore.Mvc;
using REDE_LUZ_API.Models;
using REDE_LUZ_API.DTOs;
using REDE_LUZ_API.Services;

namespace REDE_LUZ_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly TokenService _tokenService;

        public AuthController(AuthService authService, TokenService tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Usuario>> Register(UsuarioRegisterDto request)
        {
            var usuario = await _authService.Registrar(request);
            return Ok(usuario);
        }

        [HttpPost("login")]
        public async Task<ActionResult<object>> Login(LoginDto request)
        {
            try
            {
                if (request == null)
                    return BadRequest("Requisição inválida.");

                var usuario = await _authService.Login(request);
                if (usuario == null)
                    return Unauthorized();

                var token = _tokenService.GerarToken(usuario);

                return Ok(new
                {
                    token,
                    usuario = new
                    {
                        usuario.Id,
                        usuario.Email
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
    }
}
