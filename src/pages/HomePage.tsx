import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostContext } from '../context/PostContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts, createPost, deletePost } from '../services/api';
import { useAuth } from '../context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: rgb(48, 45, 45);
  min-height: 100vh;
  color: #fff;
  position: relative;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
  color: rgb(18, 223, 154);
  text-align: center;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
`;

const PostCard = styled.div`
  background-color: rgba(143, 143, 143, 0.79);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 70%;
  margin-bottom: 20px;
  padding: 5px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const PostTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
  color: #fff;
`;

const PostAuthor = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
  color: #f1faee;
`;

const PostDetail = styled.p`
  font-size: 12px;
  margin-bottom: 15px;
  text-align: center;
  color: #f1faee;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
  }
`;

const ReadMoreLink = styled(Link)`
  font-size: 14px;
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-weight: bold;
  border: 2px solid rgb(0, 255, 98);
  padding: 10px 20px;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: rgba(0, 255, 64, 0.51);
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 16px;
  }
`;

const LogoutButton = styled.button`
  padding: 6px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  top: 20px;
  right: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e63946;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 20px;
  }
`;

const LoginButton = styled.button`
  padding: 8px 16px;
  background-color: rgb(25, 0, 255);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  top: 20px;
  right: 20px;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: rgb(57, 146, 230);
    transform: scale(1.05); /* Efeito de aumento ao passar o mouse */
  }

  &:focus {
    outline: none; /* Remove o contorno do botão ao ser clicado */
    box-shadow: 0 0 0 3px rgba(0, 38, 255, 0.5); /* Adiciona uma sombra ao foco */
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
    position: static; /* Faz o botão se ajustar à tela em resoluções menores */
    margin-top: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
`;

const Input = styled.input`
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  background-color: rgb(175, 76, 76);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(255, 0, 0);
  }
`;

const PostCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  max-width: 600px;
`;

const HomePage = () => {
  const { state, setPosts } = usePostContext();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
  };

  const filteredPosts = state.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPost = { title, content, author };

      await createPost(newPost);

      fetchPosts();

      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Erro ao criar o post:', error);
      toast.error('Ocorreu um erro ao criar o post.');
    }
  };

  const handleDeletePost = async (id: string | undefined) => {
    try {
      await deletePost(id);
    } catch (error) {
      console.error('Erro ao excluir o post:', error);
      toast.error('Ocorreu um erro ao deletar o post.');
    }

    fetchPosts();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <ToastContainer />
      {user ? (
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      ) : (
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      )}{' '}
      <Title>Lista de Posts</Title>
      <Form onSubmit={handleCreatePost}>
        <Input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Título do post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Conteúdo do post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <SubmitButton type="submit">Criar Post</SubmitButton>
      </Form>
      <SearchInput
        type="text"
        placeholder="Buscar por título ou autor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredPosts.map((post) => (
        <PostCard key={post._id}>
          <PostTitle>Título: {post.title}</PostTitle>
          <PostAuthor>Autor: {post.author}</PostAuthor>
          <PostDetail>{post.content}</PostDetail>
          <PostCardFooter>
            <ReadMoreLink to={`/posts/${post._id}`}>Ler mais</ReadMoreLink>
            {user && (
              <DeleteButton onClick={() => handleDeletePost(post._id)}>
                Excluir
              </DeleteButton>
            )}
          </PostCardFooter>
        </PostCard>
      ))}
    </Container>
  );
};

export default HomePage;
