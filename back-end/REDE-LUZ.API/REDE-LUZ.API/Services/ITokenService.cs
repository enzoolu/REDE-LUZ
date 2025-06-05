using REDE_LUZ_API.Models;

namespace REDE_LUZ_API.Services;

public interface ITokenService
{
    string GerarToken(Usuario usuario);
}