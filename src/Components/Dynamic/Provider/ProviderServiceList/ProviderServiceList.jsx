import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContexts/UserContext";
import axios from "../../../../Axios/Axios";
import inProgress from "../../../../assets/gif/in-progress.gif";

const ProviderServiceList = () => {
  const { loggedUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [ongoingService, setOngoingService] = useState({});
  const provider = loggedUser?.user?._id;

  const getProviderServices = async (id) => {
    try {
      const result = await axios.get(
        `/ongoingService/getProviderServices/${id}`
      );
      setOngoingService(result.data.data);
      setLoading(false);
    } catch (err) {
      console.log("Failed to retrive provider services.");
      setLoading(false);
    }
  };

  const completeOrder = async (id, service) => {
    // const updatedStatus = { status: "Completed" };
    try {
      //   await axios.patch(`/ongoingService/updateStatus/${id}`, updatedStatus);
      await axios.post("/history/createHistory", service);
      await axios.delete(`/ongoingService/deleteService/${id}`);
      alert("Order completed!");
      window.location.reload();
    } catch (err) {
      console.log("Failed to complete order.");
      alert("Failed to complete order.");
    }
  };

  useEffect(() => {
    getProviderServices(provider);
  }, [provider]);

  return (
    <div className="ongoing-service container m-auto mt-10 py-10 h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : ongoingService ? (
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
              {ongoingService.service.name}
            </h3>
            <p>
              <span className="font-bold">Request By:</span>{" "}
              {ongoingService.user}
            </p>
            <p>
              <span className="font-bold">Service Category:</span>{" "}
              {ongoingService.service.category.split("-").join(" ")}
            </p>
            <p className="font-bold">
              {" "}
              Status:{" "}
              <span className="text-green-400 font">
                {ongoingService.status}
              </span>
            </p>
            <div className="flex justify-center mt-10">
              <button
                onClick={() =>
                  completeOrder(ongoingService._id, ongoingService)
                }
                className="bg-black text-white p-2 rounded"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-3xl text-center">No orders in progress..</p>
      )}
    </div>
  );
};

export default ProviderServiceList;
