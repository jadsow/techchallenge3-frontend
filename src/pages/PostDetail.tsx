import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types/Post';
import styled from 'styled-components';
import { getPostById } from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgb(48, 45, 45);
  min-height: 100vh;
`;

const PostCard = styled.div`
  background-color: rgb(175, 175, 175);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
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

const Author = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const BackButton = styled.button`
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

const EditButton = styled.button`
  padding: 12px 25px;
  font-size: 1rem;
  background-color: rgb(167, 144, 40);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: block;
  text-align: center;
  margin-bottom: 10px;

  &:hover {
    background-color: rgb(243, 229, 26);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
`;

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }

    const postDetail = async () => {
      try {
        const post = await getPostById(id);
        setPost(post as Post);
      } catch (error) {
        console.log('error', error);
      }
    };
    postDetail();
  }, [id]);

  if (!post) {
    return <p>Post não encontrado!</p>;
  }

  const handleBackClick = () => {
    navigate('/');
  };

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <Container>
      <PostCard>
        <Title>{post.title}</Title>
        <Author>
          <strong>Autor:</strong> {post.author}
        </Author>
        <Content>
          <h3>Conteúdo:</h3>
          <p>{post.content}</p>
        </Content>
        <EditButton onClick={handleEditClick}>Editar Post</EditButton>
        <BackButton onClick={handleBackClick}>Voltar</BackButton>
      </PostCard>
    </Container>
  );
};

export default PostDetail;
