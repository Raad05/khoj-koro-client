import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";

const Header = () => {
  const { loggedUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar px-40">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link className="hover:text-yellow-400 text-xl">Home</Link>
            </li>
            <li>
              <Link className="hover:text-yellow-400 text-xl">About</Link>
            </li>
            <li>
              <Link className="hover:text-yellow-400 text-xl">Contact Us</Link>
            </li>
          </ul>
        </div>
        <Link to="/">
          <img className="w-40" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {loggedUser?.user?.categoryRole ? (
            <li>
              <Link
                to="/provider-dashboard"
                className="hover:text-yellow-400 text-xl"
              >
                Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/" className="hover:text-yellow-400 text-xl">
                Home
              </Link>
            </li>
          )}
          {loggedUser?.user?.categoryRole ? (
            <li>
              <Link
                to="/provider-history"
                className="hover:text-yellow-400 text-xl"
              >
                History
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/user-history"
                className="hover:text-yellow-400 text-xl"
              >
                History
              </Link>
            </li>
          )}
          {loggedUser?.user?.categoryRole ? (
            <li>
              <Link
                to="/provider-service"
                className="hover:text-yellow-400 text-xl"
              >
                In Progress
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/running-service"
                className="hover:text-yellow-400 text-xl"
              >
                In Progress
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {loggedUser.user ? (
          <button onClick={signOut}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
