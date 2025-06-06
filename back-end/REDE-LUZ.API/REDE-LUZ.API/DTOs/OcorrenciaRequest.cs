using System.ComponentModel.DataAnnotations;

namespace REDE_LUZ_API.DTOs
{
    public class OcorrenciaRequest
    {
        [Required(ErrorMessage = "O CEP é obrigatório.")]
        [RegularExpression(@"^\d{5}-?\d{3}$", ErrorMessage = "CEP inválido. Formato esperado: 00000-000")]
        public string? Cep { get; set; }

        [Required(ErrorMessage = "O número é obrigatório.")]
        public string? Numero { get; set; }

        [Required(ErrorMessage = "O bairro é obrigatório.")]
        public string? Bairro { get; set; }

        [Required(ErrorMessage = "A cidade é obrigatória.")]
        public string? Cidade { get; set; }

        [Required(ErrorMessage = "A data de início é obrigatória.")]
        public DateTime Inicio { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "A duração deve ser maior que zero.")]
        public int DuracaoMinutos { get; set; }

        public string? Prejuizos { get; set; }

        [Required(ErrorMessage = "O ID do usuário é obrigatório.")]
        public int UsuarioId { get; set; }
    }
}
