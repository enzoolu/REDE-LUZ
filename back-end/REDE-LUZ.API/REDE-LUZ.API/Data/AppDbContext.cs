using Microsoft.EntityFrameworkCore;
using REDE_LUZ_API.Models;

namespace REDE_LUZ_API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Ocorrencia> Ocorrencias { get; set; }
}