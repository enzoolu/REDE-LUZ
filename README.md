# REDE-LUZ — ⚡ Monitoramento Comunitário de Quedas de Energia

Sistema desenvolvido para as disciplinas de **C# Software Development** e **Mobile Development** do 3º ano de Engenharia de Software — FIAP.

## 🎯 Objetivo do Projeto

Desenvolver uma solução multiplataforma para registrar e monitorar episódios de falta de energia, promovendo comunicação entre cidadãos e instituições, mesmo em contextos críticos como desastres naturais ou apagões em larga escala.

## 📋 Requisitos Funcionais e Não Funcionais

### ✅ Funcionais

- Registro de falhas com data, local e descrição
- Cadastro e listagem de regiões atingidas
- Registro de tempo de interrupção
- Descrição dos prejuízos causados
- Exibição de recomendações de segurança
- Autenticação obrigatória no sistema (C#)

### ⚙️ Não Funcionais

- Backend com arquitetura em camadas
- Mobile com navegação fluida e dados persistidos localmente
- Armazenamento local via AsyncStorage
- Código organizado com boas práticas
- Tratamento de erros via try-catch

## 📱 Telas do App Mobile

Aplicativo desenvolvido em **React Native**, com as seguintes telas:

- 🏠 Panorama Geral: resumo das falhas registradas
- 📍 Localização Atingida: cadastro e listagem das regiões afetadas
- ⏱️ Tempo de Interrupção: registro da duração do apagão
- 💸 Prejuízos Causados: descrição dos danos
- 🛡️ Recomendações: orientações de segurança

Todos os dados são armazenados localmente com `AsyncStorage`.

## 🧑‍💻 Backend em C# (.NET)

API construída com **ASP.NET Core**, utilizando a seguinte organização:

- 📂 Controllers: pontos de entrada da API  
- 🧩 Models: entidades e DTOs  
- 🔧 Services: lógica de negócio  
- 🗄️ Migrations: controle de banco com EF Core  

### Funcionalidades implementadas:

- 🔐 Autenticação de usuários  
- 📝 Registro e listagem de ocorrências  
- 📊 Geração de logs  
- ❗ Tratamento de exceções  
- 🧱 Código organizado por responsabilidade  

## 🗂️ Estrutura do Projeto

REDE-LUZ/
├── back-end/
│   └── REDE-LUZ.API/
│       ├── Controllers/
│       ├── Models/
│       ├── Services/
│       ├── Program.cs
│       └── appsettings.json
├── mobile-app/
│   ├── components/
│   ├── screens/
│   ├── App.js
│   └── storage/
└── README.md


## 🧪 Instruções de Execução

### 🔧 Backend (C#)

1. Navegue até a pasta do backend:  
   `cd back-end/REDE-LUZ.API`

2. Restaure os pacotes:  
   `dotnet restore`

3. Atualize o banco de dados:  
   `dotnet ef database update`

4. Inicie a aplicação:  
   `dotnet run`

### 📲 Mobile App

1. Navegue até a pasta do app mobile:  
   `cd mobile-app`

2. Instale as dependências:  
   `npm install`

3. Execute o app:  
   `npx react-native run-android`

## 🛠️ Simulações de Erros

O backend utiliza blocos `try-catch` para validar e tratar:

- Campos obrigatórios vazios  
- Tipos de dados incorretos  
- Datas ou valores numéricos inválidos  

Mensagens claras são retornadas ao usuário quando houver erro.

## ✨ Boas Práticas de Código

- Classes coesas e bem separadas  
- Nomes significativos para métodos e variáveis  
- Reutilização de lógica  
- Comentários úteis  
- Código limpo e organizado  

## 👥 Integrantes

- Gustavo Bonfim — RMXXXXX  
- Enzo Luiz — RMXXXXX  
- Lucas Yuji — RMXXXXX

## 📌 Observações Finais

Este projeto atende aos critérios das disciplinas de **C# Software Development** e **Mobile Development**, incluindo:

- Backend modular e funcional  
- App React Native com 5 telas mínimas  
- Persistência de dados local  
- Tratamento de erros e autenticação  
- Estrutura limpa e bem documentada  

## 📜 Licença

Projeto acadêmico — Todos os direitos reservados.
