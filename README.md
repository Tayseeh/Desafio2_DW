# Garagê — Sistema de Gestão de Estacionamento

Projeto desenvolvido para o **Desafio 2 – Desenvolvimento Web**, utilizando React e os conceitos estudados no material da disciplina.

## Tecnologias

- React
- JavaScript
- HTML
- CSS
- React Router DOM (navegação entre páginas)
- Hooks do React (`useState`)
- LocalStorage (persistência local no navegador)
- Node.js e npm (ambiente para executar o projeto)
- Create React App (`react-scripts`) para configuração e execução do projeto

Não utiliza backend nem banco de dados. As reservas são armazenadas localmente no navegador.

## Como executar

**Pré-requisito:** Node.js instalado.

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto no VS Code.
3. Abra o terminal na pasta do projeto.
4. Instale as dependências:

   ```bash
   npm install
   ```

5. Inicie a aplicação:

   ```bash
   npm start
   ```

6. O navegador abrirá (ou mostrará no terminal o endereço) em `http://localhost:3000`.

Para gerar os arquivos de produção:

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta `build`.

## Funcionalidades

### Início
- Resumo do estacionamento: total de vagas, vagas livres, ocupadas e taxa de ocupação.
- Visualização das 20 vagas.
- Seleção de uma vaga livre para abrir o cadastro com a vaga preenchida.

### Reservar
- Cadastro de placa, proprietário, apartamento, bloco, modelo, cor e vaga.
- Seleção apenas de vagas disponíveis.
- Validações de campos obrigatórios, formato de placa, duplicidade e disponibilidade.
- Confirmação de cadastro e registro dos dados no console do navegador.

### Vagas Livres
- Lista as vagas disponíveis.
- Permite iniciar o cadastro com uma vaga previamente selecionada.

### Vagas Ocupadas
- Lista as reservas registradas.
- Permite remover uma reserva com confirmação.

## Estrutura

```text
src/
├── components/       # Componentes reutilizáveis
├── data/             # Dados auxiliares
├── pages/            # Telas da aplicação
├── styles/            # Estilos CSS
├── App.jsx            # Rotas e estado principal
├── index.js           # Entrada da aplicação React
└── services.js        # Operações de armazenamento e vagas
public/
├── index.html         # Documento HTML principal
└── logo-garage.svg    # Identidade visual
```
