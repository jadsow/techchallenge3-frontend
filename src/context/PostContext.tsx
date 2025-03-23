import { Post } from '../types/Post';
import { createContext, useReducer, useContext, ReactNode } from 'react';

interface PostState {
  posts: Post[];
}

type PostAction = {
  type: 'SET_POSTS';
  payload: Post[];
};

interface PostContextType {
  state: PostState;
  setPosts: (posts: Post[]) => void;
}

const initialState: PostState = {
  posts: [],
};

const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const setPosts = (posts: Post[]) => {
    dispatch({ type: 'SET_POSTS', payload: posts });
  };

  return (
    <PostContext.Provider value={{ state, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('Não há contexto');
  }
  return context;
};
