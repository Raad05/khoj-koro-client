import { createContext, useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken,
    };
  });

  const logout = () => {
    setLoggedUser({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loggedUser.user));
    localStorage.setItem("token", loggedUser.token);
  }, [loggedUser]);

  const authInfo = { loggedUser, setLoggedUser, logout };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
