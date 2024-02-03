import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

function AppLayout() {
  return (
    <div>
      <Header />
      <Toaster position="top-center" />
      <main className="site-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
