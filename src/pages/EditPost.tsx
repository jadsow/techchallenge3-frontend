import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPostById, updatePost } from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgb(48, 45, 45);
  min-height: 100vh;
`;

const PostCard = styled.div`
  align-items: center;
  background-color: rgba(92, 96, 148, 0.79);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  margin-bottom: 20px;
  padding: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  text-align: center;
`;

const Input = styled.input`
  font-size: 1rem;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  font-size: 1rem;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 200px;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: block;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;
  margin-top: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }

    const postDetail = async () => {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
      } catch (error) {
        console.log('error', error);
      }
    };
    postDetail();
  }, [id]);

  const handleSave = async () => {
    try {
      const updatedPost = { title, content, author };
      await updatePost(id, updatedPost);
      navigate(`/posts/${id}`);
    } catch (error) {
      console.log('Error updating post:', error);
    }
  };

  return (
    <Container>
      <PostCard>
        <Title>Editar Post</Title>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Conteúdo"
        />
        <Input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Autor"
        />
        <Button onClick={handleSave}>Salvar alterações</Button>
        <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
      </PostCard>
    </Container>
  );
};

export default EditPostPage;
