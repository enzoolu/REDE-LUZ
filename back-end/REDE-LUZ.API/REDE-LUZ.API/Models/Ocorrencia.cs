namespace REDE_LUZ_API.Models
{
    public class Ocorrencia
    {
        public int Id { get; set; }
        public string? Cep { get; set; }
        public string? Numero { get; set; }
        public string? Bairro { get; set; }
        public string? Cidade { get; set; }
        public DateTime Inicio { get; set; }
        public int DuracaoMinutos { get; set; }
        public string? Prejuizos { get; set; }
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
        public string TempoInterrupcao => $"{DuracaoMinutos}";
        public string Descricao => string.IsNullOrWhiteSpace(Prejuizos) ? "Sem descrição" : Prejuizos!;
    }
}
