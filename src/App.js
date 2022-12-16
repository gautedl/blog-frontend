import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import Login from './components/admin/Login';
import AdminHome from './components/admin/AdminHome';
import AdminRouter from './components/admin/AdminRouter';
import GetUserAdmin from './components/admin/GetUserAdmin';
import SignUp from './components/admin/SignUp';
import EditPost from './components/admin/EditPost';
import CreatePost from './components/admin/CreatePost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/admin" element={<AdminRouter />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/getadmin" element={<GetUserAdmin />} />
        <Route path="/admin/sign_up" element={<SignUp />} />
        <Route path="/admin/post/:id" element={<EditPost />} />
        <Route path="/admin/create_post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
