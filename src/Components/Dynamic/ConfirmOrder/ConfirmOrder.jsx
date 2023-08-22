/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContexts/UserContext";
import axios from "../../../Axios/Axios";

const ConfirmOrder = () => {
  const { loggedUser } = useContext(AuthContext);
  const serviceDetails = useLoaderData();
  const navigate = useNavigate();
  const {
    name,
    description,
    features,
    payment,
    warranty,
    pricing,
    order,
    img,
  } = serviceDetails.data.data;
  const username = loggedUser.user.username;

  const confirmOrder = async (id, serviceInfo) => {
    const data = {
      userId: id,
      username: username,
      status: "Searching",
      service: serviceInfo,
    };
    try {
      await axios.post("/cart/createCart", data);
      alert("Your order has been placed.");
      navigate("/running-service");
    } catch (err) {
      console.log(err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="confirm-order container mx-auto">
      <div className="flex justify-between items-center mb-20">
        <img className="w-1/2 mx-5" src={img} alt="img" />
        <div className="w-1/2 mx-5">
          <p className="text-5xl font-bold my-5">{name}</p>
          <p className="text-3xl">{description}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/4 px-10 mx-auto">
          <h3 className="text-2xl font-bold my-3">Service Features:</h3>
          <ul>
            {features.map((feature, idx) => (
              <li className="list-disc text-lg" key={idx}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/4 px-10 mx-auto">
          <h3 className="text-2xl font-bold my-3">Payment:</h3>
          <ul>
            <li className="list-disc text-lg">{payment}</li>
          </ul>
        </div>
        <div className="w-1/4 px-10 mx-auto">
          <h3 className="text-2xl font-bold my-3">Pricing Terms:</h3>
          <ul>
            {pricing.map((price, idx) => (
              <li className="list-disc text-lg" key={idx}>
                {price}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/4 px-10 mx-auto">
          <h3 className="text-2xl font-bold my-3">Pricing Terms:</h3>
          <ul>
            {pricing.map((price, idx) => (
              <li className="list-disc text-lg" key={idx}>
                {price}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-20">
        {loggedUser.user && (
          <button
            onClick={() =>
              confirmOrder(loggedUser.user._id, serviceDetails.data.data)
            }
            className="btn text-3xl bg-black text-white"
          >
            Order
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrder;
