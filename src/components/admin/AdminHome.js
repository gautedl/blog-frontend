import AdminNav from './AdminNav';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = JSON.parse(localStorage.getItem('user')).admin;
    if (!isAdmin) navigate('/admin/getadmin');
  }, [navigate]);

  return (
    <>
      <AdminNav />
    </>
  );
};

export default AdminHome;
