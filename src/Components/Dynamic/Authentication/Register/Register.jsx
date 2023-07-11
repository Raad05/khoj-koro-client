import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({});

  const register = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const handleInput = (e) => {
    const form = e.target;
    const field = form.name;
    const value = form.value;
    const newData = { ...data };
    newData[field] = value;

    setData(newData);
  };

  return (
    <form
      onSubmit={register}
      className="Register flex flex-col w-1/5 mx-auto mt-40"
    >
      <h3 className="text-xl text-center my-5">Registration Form</h3>
      <p className="text-md">Email Address</p>
      <input
        onBlur={handleInput}
        className="border border-gray-400 my-2 p-2 rounded"
        type="email"
        name="email"
        placeholder="Email Address"
      />
      <p className="text-md">Password</p>
      <input
        onBlur={handleInput}
        className="border border-gray-400 my-2 p-2 rounded"
        type="password"
        name="password"
        placeholder="Password"
      />
      {/* <p className="text-md">User Role</p>
      <select className="border border-gray-400 my-2 p-2 rounded" name="role">
        <option value="">Select Role</option>
        <option value="Customer">Customer</option>
        <option value="Admin">Admin</option>
        <option value="Delivery man">Delivery man</option>
      </select> */}
      <Link to="/login">
        <p className="text-center">Already have an account?</p>
      </Link>
      <button
        className="bg-blue-400 hover:bg-blue-500 text-white rounded-full my-2 py-2"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
