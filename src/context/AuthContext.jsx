import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "account/login":
      return { user: action.payload };
    case "account/logout":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) return;

    const { username } = JSON.parse(user);

    if (username) {
      dispatch({ type: "account/login", payload: username });
    }
  }, []);

  console.log("auth state", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
