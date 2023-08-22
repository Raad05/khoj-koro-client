/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/Logo.png";
import { useContext, useState } from "react";
import axios from "../../../../Axios/Axios";
import { AuthContext } from "../../../../contexts/AuthContexts/UserContext";

const ProviderLogin = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(AuthContext);

  const handleInput = (e) => {
    const form = e.target;
    const field = form.name;
    const value = form.value;
    const newData = { ...data };
    newData[field] = value;

    setData(newData);
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/provider/providerLogin", data);
      const token = result.data.token;
      localStorage.setItem("jwt-token", token);
      setLoggedUser({ user: result.data.data, token: token });
      alert("Login successful");
      navigate("/provider-dashboard");
    } catch (err) {
      console.log(err);
      alert("Incorrect email or password.");
    }
  };

  return (
    <form
      onSubmit={signIn}
      className="provider-login w-1/5 mx-auto flex flex-col border border-gray-200 p-5 rounded shadow mt-60"
    >
      <img src={logo} alt="Logo" className="w-1/2 mx-auto" />
      <p className="my-2">Email Address:</p>
      <input
        onChange={handleInput}
        className="border border-gray-400 rounded px-2 py-1"
        type="email"
        name="email"
        placeholder="email address"
      />
      <p className="my-2">Password:</p>
      <input
        onChange={handleInput}
        className="border border-gray-400 rounded px-2 py-1"
        type="password"
        name="password"
        placeholder="password"
      />
      <Link to="/provider-registration" className="link text-center mt-2">
        Don't have an account?
      </Link>
      <div className="flex justify-center my-5">
        <button
          className="btn w-1/2 bg-black hover:bg-gray-800 text-white"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default ProviderLogin;
