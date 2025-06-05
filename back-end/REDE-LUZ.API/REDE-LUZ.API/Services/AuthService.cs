using Microsoft.EntityFrameworkCore;
using REDE_LUZ_API.Data;
using REDE_LUZ_API.DTOs;
using REDE_LUZ_API.Models;
using System.Security.Cryptography;
using System.Text;

namespace REDE_LUZ_API.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario> Registrar(UsuarioRegisterDto request)
        {
            CriarSenhaHash(request.Senha, out byte[] senhaHash, out byte[] senhaSalt);

            var usuario = new Usuario
            {
                Email = request.Email,
                SenhaHash = senhaHash,
                SenhaSalt = senhaSalt
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return usuario;
        }

        public async Task<Usuario?> Login(LoginDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Senha))
                return null;

            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (usuario == null || usuario.SenhaHash == null || usuario.SenhaSalt == null)
                return null;

            return VerificarSenhaHash(request.Senha, usuario.SenhaHash, usuario.SenhaSalt) ? usuario : null;
        }

        private void CriarSenhaHash(string senha, out byte[] senhaHash, out byte[] senhaSalt)
        {
            using var hmac = new HMACSHA512();
            senhaSalt = hmac.Key;
            senhaHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(senha));
        }

        private bool VerificarSenhaHash(string senha, byte[] senhaHash, byte[] senhaSalt)
        {
            using var hmac = new HMACSHA512(senhaSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(senha));
            return computedHash.SequenceEqual(senhaHash);
        }
    }
}
