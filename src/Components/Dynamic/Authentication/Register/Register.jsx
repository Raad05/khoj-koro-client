/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/Logo.png";
import { useState } from "react";
import axios from "../../../../Axios/Axios";

const Register = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const form = e.target;
    const field = form.name;
    const value = form.value;
    const newData = { ...data };
    newData[field] = value;

    setData(newData);
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/createUser", data);
      alert("User registration successful.");
      navigate("/login");
    } catch (err) {
      alert("Failed to register new user: ", err);
    }
  };

  return (
    <form
      onSubmit={register}
      className="register w-1/5 mx-auto flex flex-col border border-gray-200 p-5 rounded shadow mt-48"
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
      <p className="my-2">Username:</p>
      <input
        onChange={handleInput}
        className="border border-gray-400 rounded px-2 py-1"
        type="text"
        name="username"
        placeholder="username"
      />
      <p className="my-2">Password:</p>
      <input
        onChange={handleInput}
        className="border border-gray-400 rounded px-2 py-1"
        type="password"
        name="password"
        placeholder="password"
      />
      <Link to="/login" className="link text-center mt-2">
        Already have an account?
      </Link>
      <div className="flex justify-center my-5">
        <button
          className="btn w-1/2 bg-black hover:bg-gray-800 text-white"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Register;
