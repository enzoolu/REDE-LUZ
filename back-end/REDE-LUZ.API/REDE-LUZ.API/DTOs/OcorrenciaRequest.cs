namespace REDE_LUZ_API.DTOs
{
    public class OcorrenciaRequest
    {
        public string? Cep { get; set; }
        public string? Numero { get; set; }
        public DateTime Inicio { get; set; }
        public int DuracaoMinutos { get; set; }
        public string? Prejuizos { get; set; }
        public int UsuarioId { get; set; }
    }
}
