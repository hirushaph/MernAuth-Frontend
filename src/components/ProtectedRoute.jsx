import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(
    function () {
      if (!user) navigate("/login");
    },
    [user, navigate]
  );

  if (user) return children;
}
export default ProtectedRoute;
