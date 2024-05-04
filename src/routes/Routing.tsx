import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Main from '../pages/Main/Main';

function Routing() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />

      {/* Here will be protected routes only for authorized users, such as user-profile, etc.
      <Route element={<ProtectedRoutes />}>
        <Route path="/user-profile" element={<UserProfile />} />
      </Route> */}
      <Route path="*" element={<div>Implement 404</div>} />
    </Routes>
  );
}

export default Routing;
