import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContexts/UserContext";
import axios from "../../Axios/Axios";
import inProgress from "../../assets/gif/in-progress.gif";
import searching from "../../assets/gif/searching.gif";

const OngoingService = () => {
  const { loggedUser } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = loggedUser?.user?._id;

  const getService = async (id) => {
    try {
      const result = await axios.get(`/ongoingService/getOngoingService/${id}`);
      setService(result.data.data);
      setLoading(false);
    } catch (err) {
      console.log("Failed to retrive service.");
      setLoading(false);
    }
  };

  const getCart = async (id) => {
    try {
      const result = await axios.get(`/cart/cart/${id}`);
      setCart(result.data.data);
      setLoading(false);
    } catch (err) {
      console.log("Failed to retrive service.");
      setLoading(false);
    }
  };

  console.log(cart);

  useEffect(() => {
    getService(userId);
    getCart(userId);
  }, [userId]);

  return (
    <div className="ongoing-service container m-auto mt-10 py-10 h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : service ? (
        <div className="flex justify-center">
          <div className="w-1/2">
            <img
              className="w-80 mx-auto"
              src={inProgress}
              alt="work-in-progress"
            />
          </div>
          <div className="w-1/2 text-xl border border-gray-300 rounded-lg p-10 shadow-md">
            <h3 className="font-bold text-3xl text-center my-5">
              {service.service.name}
            </h3>
            <p>
              <span className="font-bold">Service Category:</span>{" "}
              {service.service.category.split("-").join(" ")}
            </p>
            <p>
              <span className="font-bold">Service Provider:</span>{" "}
              {service.provider}
            </p>
            <p className="font-bold">
              {" "}
              Status:{" "}
              <span className="text-green-400 font">{service.status}</span>
            </p>
          </div>
        </div>
      ) : cart?.length ? (
        <div className="flex flex-col items-center">
          <img
            className="w-80 mx-auto"
            src={searching}
            alt="work-in-progress"
          />
          <p className="text-3xl font-bold text-center mt-10">
            Searching for service provider...
          </p>
        </div>
      ) : (
        <p className="text-3xl text-center">No ongoing service</p>
      )}
    </div>
  );
};

export default OngoingService;
