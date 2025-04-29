# Tech Challenge - Frontend

Este projeto é uma aplicação web desenvolvida em **React**, com gerenciamento de estado global usando **Context API**. A aplicação permite o cadastro, listagem, edição e exclusão de posts, além de autenticação de usuários.

> **Nota**: A Context API facilita o compartilhamento de dados entre múltiplos componentes da árvore, sem a necessidade de prop drilling. No projeto, utilizamos dois contextos principais: **PostContext** e **AuthContext**.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
  - [Context](#context)
    - [PostContext](#postcontext)
    - [AuthContext](#authcontext)
  - [Pages](#pages)
  - [Services](#services)
  - [Types](#types)
- [Setup do Projeto](#setup-do-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)

---

## Tecnologias Utilizadas

- React
- Context API
- Typescript
- React Router Dom
- React Toastify
- Docker (para backend)
- Axios

---

## Estrutura do Projeto

### Context

Na pasta src/context, estão os arquivos responsáveis pelo gerenciamento global do projeto, que é organizado em dois principais contextos:

#### PostContext (`postContext.tsx`)

Responsável pelo gerenciamento de posts.

- **Post (Interface)**: Define a estrutura de um post (`title`, `content`, `author` e opcionalmente `_id`).
- **PostState (Interface)**: Representa o estado que é um array de posts.
- **PostAction**: Define ações do reducer (atualmente apenas `SET_POSTS`).
- **Reducer**: `postReducer` gerencia as ações e atualiza o estado conforme necessário.
- **PostContext**: Contexto que armazena o estado e a função `setPosts`.
- **PostProvider**: Componente que provê o estado de posts para os componentes filhos.
- **usePostContext**: Hook customizado para consumir o contexto de posts facilmente.

#### AuthContext (`authContext.tsx`)

Responsável pelo gerenciamento de autenticação de usuários.

- **AuthContextType**: Define o formato do contexto (`user`, `login`, `logout`).
- **AuthContext**: Contexto de autenticação.
- **useAuth**: Hook customizado para consumo do contexto de autenticação.
- **AuthProvider**: Componente que provê autenticação aos componentes filhos. Usa `localStorage` para persistência de sessão.

> **Nota**: O AuthProvider é responsável por fornecer o estado de autenticação (user) e as funções de login e logout através do contexto. Além disso, ele armazena o estado de autenticação no `localStorage` para persistir a sessão entre as atualizações da página.

---

### Pages

Contém todos os componentes de página da aplicação:

- **Login**: Página de autenticação do usuário, necessária para edição e exclusão de posts.
- **HomePage**: Cadastro, listagem e deleção de posts.
- **PostDetail**: Visualização detalhada de um post específico.
- **EditPost**: Edição de posts.
- **ProtectedRoute**: Guardião de rotas privadas (`authGuard`), checando se o usuário está autenticado antes de acessar certas páginas (é possível ver a implementação e o funcionamento em `App.tsx`).

---

### Services

- **api.ts**: Arquivo responsável pelas requisições HTTP ao backend (GET, POST, PUT, DELETE).

---

### Types

- Definições de interfaces utilizadas em toda a aplicação, principalmente a interface de `Post`, estabelecendo o contrato de envio e garantindo segurança de tipagem nas comunicações com o backend, evitando erros.

---

## Setup do Projeto

### Inicialização

1. Clone o repositório:
   ```bash
   git clone https://github.com/jadsow/techchallenge3-frontend.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o projeto:
   ```bash
   npm run dev
   ```

### Backend

Para utilização completa (incluindo persistência de dados e autenticação):

1. Clone o repositório do backend:
   ```bash
   git clone https://github.com/jadsow/techchallenge2-backend.git
   ```
2. Abra o projeto na sua IDE de preferência.
3. Incie o Docker Desktop em sua máquina.
4. Rode o backend:
   ```bash
   docker-compose up --build
   ```

## Funcionalidades Principais

- Listagem de posts na página inicial.
- Cadastro de novos posts.
- Filtro de posts por título ou autor.
- Visualização detalhada de posts ("Ler mais").
- Edição e exclusão de posts (somente usuários autenticados).
- Persistência de autenticação com `localStorage`.
- Feedbacks visuais utilizando **react-toastify** para sucesso e erros.

> **Nota**: Para editar ou excluir posts, é necessário estar logado.

---

## Link do Backend

- [Repositório Backend](https://github.com/jadsow/techchallenge2-backend.git)
