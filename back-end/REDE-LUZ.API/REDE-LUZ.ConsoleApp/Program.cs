using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace REDE_LUZ.ConsoleApp
{
    class Program
    {
        private static readonly HttpClient client = new HttpClient();
        private static string? jwtToken = null;
        private const string TokenFilePath = "token.txt";

        static async Task Main(string[] args)
        {
            LoadToken();
            bool sair = false;

            while (!sair)
            {
                Console.Clear();
                Console.WriteLine("==== REDE LUZ - MENU ====");
                Console.WriteLine("1. Login");
                Console.WriteLine("2. Registrar Usuário");
                Console.WriteLine("3. Ver Ocorrências por Usuário");
                Console.WriteLine("4. Criar Ocorrência");
                Console.WriteLine("0. Sair");
                Console.Write("Escolha uma opção: ");

                var opcao = Console.ReadLine();

                switch (opcao)
                {
                    case "1": await Login(); break;
                    case "2": await Registrar(); break;
                    case "3": await VerOcorrencias(); break;
                    case "4": await CriarOcorrencia(); break;
                    case "0": sair = true; break;
                    default: Console.WriteLine("Opção inválida"); break;
                }

                Console.WriteLine("\nPressione Enter para continuar...");
                Console.ReadLine();
            }
        }

        private static void SaveToken(string token)
        {
            jwtToken = token;
            File.WriteAllText(TokenFilePath, token);
        }

        private static void LoadToken()
        {
            if (File.Exists(TokenFilePath))
            {
                jwtToken = File.ReadAllText(TokenFilePath);
            }
        }

        private static async Task Login()
        {
            Console.Write("Email: ");
            string email = Console.ReadLine()!.Trim();
            Console.Write("Senha: ");
            string senha = Console.ReadLine()!.Trim();

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(senha))
            {
                Console.WriteLine("Email e senha são obrigatórios.");
                return;
            }

            try
            {
                var json = JsonSerializer.Serialize(new { email, senha });
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await client.PostAsync("http://localhost:5239/api/auth/login", content);

                var body = await response.Content.ReadAsStringAsync();
                var contentType = response.Content.Headers.ContentType?.MediaType;

                if (response.IsSuccessStatusCode && contentType == "application/json")
                {
                    using var document = JsonDocument.Parse(body);
                    if (document.RootElement.TryGetProperty("token", out JsonElement tokenElement))
                    {
                        SaveToken(tokenElement.GetString()!);
                        Console.WriteLine("Login realizado com sucesso!");
                    }
                    else
                    {
                        Console.WriteLine("Erro: resposta inesperada do servidor (token ausente).");
                    }
                }
                else
                {
                    Console.WriteLine("Erro ao fazer login: " + response.StatusCode);
                    Console.WriteLine("Mensagem da API: " + body);
                }
            }
            catch (JsonException jex)
            {
                Console.WriteLine("Erro ao processar JSON de resposta: " + jex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro inesperado: " + ex.Message);
            }
        }

        private static async Task Registrar()
        {
            Console.Write("Email: ");
            string email = Console.ReadLine()!.Trim();
            Console.Write("Senha: ");
            string senha = Console.ReadLine()!.Trim();

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(senha))
            {
                Console.WriteLine("Email e senha são obrigatórios.");
                return;
            }

            try
            {
                var content = new StringContent(JsonSerializer.Serialize(new { email, senha }), Encoding.UTF8, "application/json");
                var response = await client.PostAsync("http://localhost:5239/api/auth/register", content);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Usuário registrado com sucesso!");
                }
                else
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Erro ao registrar usuário: {response.StatusCode}\n{error}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro inesperado: " + ex.Message);
            }
        }

        private static async Task VerOcorrencias()
        {
            if (jwtToken == null)
            {
                Console.WriteLine("Você precisa fazer login primeiro.");
                return;
            }

            Console.Write("ID do usuário: ");
            string usuarioId = Console.ReadLine()!;

            try
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwtToken);
                var response = await client.GetAsync($"http://localhost:5239/api/ocorrencia/usuario/{usuarioId}");

                if (response.IsSuccessStatusCode)
                {
                    var body = await response.Content.ReadAsStringAsync();
                    using var document = JsonDocument.Parse(body);

                    var ocorrencias = document.RootElement;
                    if (ocorrencias.GetArrayLength() == 0)
                    {
                        Console.WriteLine("Nenhuma ocorrência encontrada.");
                    }
                    else
                    {
                        foreach (var o in ocorrencias.EnumerateArray())
                        {
                            Console.WriteLine("-------------------------");
                            Console.WriteLine("ID: " + o.GetProperty("id"));
                            Console.WriteLine("CEP: " + o.GetProperty("cep"));
                            Console.WriteLine("Número: " + o.GetProperty("numero"));
                            Console.WriteLine("Início: " + o.GetProperty("inicio"));
                            Console.WriteLine("Duração: " + o.GetProperty("duracaoMinutos") + " minutos");
                            Console.WriteLine("Prejuízos: " + o.GetProperty("prejuizos"));
                        }
                    }
                }
                else
                {
                    Console.WriteLine("Erro ao obter ocorrências: " + response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro inesperado: " + ex.Message);
            }
        }

        private static async Task CriarOcorrencia()
        {
            if (jwtToken == null)
            {
                Console.WriteLine("Você precisa fazer login primeiro.");
                return;
            }

            Console.Write("CEP: ");
            string cep = Console.ReadLine()!;
            Console.Write("Número: ");
            string numero = Console.ReadLine()!;
            Console.Write("Início (yyyy-MM-ddTHH:mm:ss): ");
            string inicio = Console.ReadLine()!;
            Console.Write("Duração em minutos: ");
            int duracao = int.Parse(Console.ReadLine()!);
            Console.Write("Prejuízos: ");
            string prejuizos = Console.ReadLine()!;
            Console.Write("ID do usuário: ");
            int usuarioId = int.Parse(Console.ReadLine()!);

            var json = JsonSerializer.Serialize(new { cep, numero, inicio, duracaoMinutos = duracao, prejuizos, usuarioId });

            try
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwtToken);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await client.PostAsync("http://localhost:5239/api/ocorrencia", content);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("Ocorrência registrada com sucesso!");
                }
                else
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Erro ao criar ocorrência: " + response.StatusCode + "\n" + error);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro inesperado: " + ex.Message);
            }
        }
    }
}
