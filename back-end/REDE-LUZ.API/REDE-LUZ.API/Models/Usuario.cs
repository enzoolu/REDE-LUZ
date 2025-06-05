using System.ComponentModel.DataAnnotations;

namespace REDE_LUZ_API.Models;

public class Usuario
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string? Email { get; set; }
    public byte[]? SenhaHash { get; set; }
    public byte[]? SenhaSalt { get; set; }
    public List<Ocorrencia> Ocorrencias { get; set; } = new();
}