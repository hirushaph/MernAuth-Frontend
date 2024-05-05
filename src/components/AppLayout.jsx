import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
import './AppLayout.css';

function AppLayout() {
  return (
    <div>
      <Toaster position='top-center' />
      <Header />

      <main className='site-main'>
        <div className='container'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
