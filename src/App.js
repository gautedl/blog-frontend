import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import Login from './components/admin/Login';
import AdminHome from './components/admin/AdminHome';
import AdminRouter from './components/admin/AdminRouter';
import GetUserAdmin from './components/admin/GetUserAdmin';
import SignUp from './components/admin/SignUp';

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
        <Route path="/admin/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
