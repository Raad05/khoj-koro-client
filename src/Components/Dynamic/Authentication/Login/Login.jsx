import { Link } from "react-router-dom";

const Login = () => {
  return (
    <form className="Login flex flex-col w-1/5 mx-auto mt-40">
      <h3 className="text-xl text-center my-5">Login Form</h3>
      <p className="text-md">Email Address</p>
      <input
        className="border border-gray-400 my-2 p-2 rounded"
        type="email"
        name="email"
        placeholder="Email Address"
      />
      <p className="text-md">Password</p>
      <input
        className="border border-gray-400 my-2 p-2 rounded"
        type="password"
        name="password"
        placeholder="Password"
      />
      <Link to="/register">
        <p className="text-center">No account?</p>
      </Link>
      <button
        className="bg-blue-400 hover:bg-blue-500 text-white rounded-full my-2 py-2"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
