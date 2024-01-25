import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div>
      <Header />
      <main className="site-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
