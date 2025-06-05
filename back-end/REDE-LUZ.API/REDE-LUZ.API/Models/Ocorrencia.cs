namespace REDE_LUZ_API.Models;

public class Ocorrencia
{
    public int Id { get; set; }
    public string? Localizacao { get; set; }
    public DateTime Inicio { get; set; }
    public int DuracaoMinutos { get; set; }
    public string? Prejuizos { get; set; }
    public int UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }
}