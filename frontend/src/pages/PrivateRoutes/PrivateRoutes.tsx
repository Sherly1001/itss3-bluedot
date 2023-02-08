import { ConstanthPathEnum } from '../../constanth/constanth.path';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
  const isAdmin = localStorage.getItem('isAdmin');

  return isAdmin ? <Outlet /> : <Navigate to={ConstanthPathEnum.HOME_PAGE} />;
}

export default PrivateRoutes;
