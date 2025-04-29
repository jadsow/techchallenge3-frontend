import { env } from '../env';

import { Post } from '../types/Post';

const API_URL = env.VITE_API_URL;

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar os posts');
  }
  return response.json();
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await fetch(`${API_URL}${id}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar o post');
  }
  return response.json();
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar post');
  }
  return response.json();
};

export const deletePost = async (id: string | undefined): Promise<void> => {
  const response = await fetch(`${API_URL}delete/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir o post');
  }
};

export const updatePost = async (
  id: string | undefined,
  post: Post,
): Promise<void> => {
  const response = await fetch(`${API_URL}edit/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir o post');
  }
};
