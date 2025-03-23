1. O nosso projeto utiliza a biblioteca React para a construção de uma aplicação web. O gerenciamento de estado global é feito por meio de Context API, que permite que dados sejam compartilhados em diversos componentes da árvore de componentes sem a necessidade de prop drilling. No projeto, existem dois contextos principais: PostContext e AuthContext.

2. Estrutura da Pasta context
   Dentro da pasta context, existem os arquivos responsáveis pelo gerenciamento do estado global do projeto. Abaixo estão descrições detalhadas dos dois contextos principais:

3. PostContext (postContext.tsx)
   Objetivo:
   Gerenciar o estado relacionado aos posts. Esse contexto fornece funcionalidades para armazenar, acessar e atualizar os dados dos posts.
   Neste arquivo, temos as seguintes informações:

Post (Interface): Define a estrutura dos dados de um post, com os campos title, content, author, e opcionalmente \_id.

PostState (Interface): Define o estado do contexto, que é um array de objetos Post.

PostAction (Tipo de Ação): Define as ações que podem ser despachadas para o reducer. No momento, só existe a ação SET_POSTS, que define os posts no estado.

Reducer (Função): A função postReducer gerencia as ações e altera o estado com base na ação disparada.

PostContext: Um contexto React que mantém o estado dos posts e fornece a função setPosts para atualizar esse estado.

PostProvider: Um componente que envolve os filhos do componente, providenciando o estado de posts e a função setPosts através do contexto.

usePostContext: Um hook customizado que facilita o consumo do contexto de posts em qualquer componente filho.

4. AuthContext (authContext.tsx)
   Objetivo:
   Gerenciar o estado de autenticação do usuário. Esse contexto permite armazenar e recuperar o estado de login do usuário, além de oferecer métodos para realizar o login e logout.

AuthContextType (Tipo de Contexto): Define a estrutura do contexto de autenticação, que inclui a variável user (o usuário autenticado), e as funções login e logout.

AuthContext: Cria um contexto para gerenciar o estado de autenticação.

useAuth: Um hook customizado para acessar facilmente o contexto de autenticação em qualquer componente.

AuthProvider: Um componente que envolve os filhos do componente, fornecendo o estado de autenticação (user) e as funções de login e logout através do contexto. Além disso, ele armazena o estado de autenticação no localStorage para persistir a sessão entre as atualizações da página.

5. Pasta Pages:
   Contém todas as páginas da aplicação.
   O componente Login é o responsável pela página de login, determinante para a exclusão e editção de posts;

O componente HomePage é o responsável pelo cadastro e listagem de todos os posts da aplicação, assim como a deleção de algum post;

O componente PostDetail que é responsável pelo detalhe de cada post;

O componente ProtectedRoute, que é basicamente um authguard da nossa aplicação, responsável por verificar, a cada rota requisitada (no front-end) pelo usuário se ele está logado ou não. Você poderá verificar o funcionamento dele no componente App.tsx.

E o componente EditPost, responsável pela edição de um post.

6. Pasta services
   Responsável pelos serviços da aplicação, neste caso possuímos apenas o api.ts.
   Este arquivo é responsável por todos os métodos destinados as requisições no back-end.

7. Pasta Types
   Responsável pela interface de Post da nossa aplicação, ou seja, o contrato de envio de informação e de recebimento de respostas, previne erros de tipagem.

Para setup inicial, basta clonar o projeto e rodar o npm install, após isso, rodar o comando npm run dev para rodar a aplicação.

Para consumo do back-end e utilização da aplicação por completo, você deverá baixar o nosso back-end (clonar o repositório), abrir o docker Desktop e rodar o comando docker compose up.

A primeira página da aplicação é composta pela lista de posts e pelo cadastro de um novo post, caso você deseje.
Poderá também filtrar os posts pelo título e autor.
Ao clicar em Ler mais, você poderá ver as informações completas do post, lembre-se, para editar ou excluir qualquer post, você deverá estar logado na aplicação.

A edição você conseguirá realizar dentro e um post, já a exclusão, a própria listagem terá o botão (caso você estiver logado). Vale ressaltar que implementamos o toast da biblioteca react-toastify para trazer uma mensagem mais amigável ao usuário quando houver algum tipo de problema.
