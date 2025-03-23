import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostDetail from './pages/PostDetail';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import { AuthProvider } from './context/authContext';
import EditPostPage from './pages/EditPost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/edit/:id" element={<EditPostPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
