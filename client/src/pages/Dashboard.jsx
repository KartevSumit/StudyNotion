import { Outlet } from 'react-router-dom';
import SidePanel from '../components/core/Dashboard/SidePanel';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

function Dashboard() {
  const { loading: authloading } = useSelector((state) => state.auth);
  const { loading: profileloading } = useSelector((state) => state.profile);
  const { loading: courseloading } = useSelector((state) => state.course);

  return (
    <div className="w-full h-[93vh] flex relative lg:flex-row flex-col">
      <SidePanel className="hidden lg:block" />
      <div className="relative flex-1 overflow-y-scroll">
        {(authloading || profileloading || courseloading) && (
          <div className="w-screen h-screen fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
            <Spinner />
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
