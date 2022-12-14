import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/admin/isloggedin')
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'Logged in') {
          navigate('/admin/login');
        } else {
          navigate('/admin/home');
        }
      });
  });

  return <></>;
};

export default AdminRouter;
