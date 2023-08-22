import { useContext, useEffect, useState } from "react";
import axios from "../../../../Axios/Axios";
import { AuthContext } from "../../../../contexts/AuthContexts/UserContext";

const ProviderDashboard = () => {
  const { loggedUser } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const searchesByCategory = loggedUser?.user?.categoryRole;

  const searchingForProviders = async (category) => {
    try {
      const result = await axios.get(`/cart/servicesOnSearch/${category}`);
      setServices(result.data.data);
    } catch (err) {
      console.log("Failed to load services on search.");
    }
  };

  useEffect(() => {
    searchingForProviders(searchesByCategory);
  }, [searchesByCategory]);

  const confirmOrder = async (provider, username, serviceInfo, serviceId) => {
    const data = {
      providerId: provider,
      userId: serviceInfo.userId,
      user: serviceInfo.username,
      provider: username,
      status: "In Progress",
      service: serviceInfo.service,
    };
    const updatedStatus = { status: "In Progress" };
    try {
      await axios.patch(
        `/cart/updateServiceStatus/${serviceId}`,
        updatedStatus
      );
      await axios.post("/ongoingService/createOngoingService", data);
      alert("Order confirmed!");
      window.location.reload();
    } catch (err) {
      alert("Failed to confirm order.");
      console.log("Failed to confirm order.");
    }
  };

  let i = 0;

  return (
    <div className="provider-dashboard">
      <h1 className="text-3xl font-bold text-center mt-5 mb-10">
        Pending Services
      </h1>
      <div className="overflow-x-auto container mx-auto rounded-lg h-screen">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-black text-white">
              <th>Serial</th>
              <th>Service Name</th>
              <th>Request By</th>
              <th>Category</th>
              <th>Status</th>
              <th>Confirmation</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, idx) => (
              <tr key={idx} className="text-lg">
                <th>{++i}</th>
                <td>{service.service.name}</td>
                <td>{service.username}</td>
                <td>{service.service.category.split("-").join(" ")}</td>
                <td>{service.status}</td>
                {service.status === "Searching" ? (
                  <td>
                    <button
                      onClick={() =>
                        confirmOrder(
                          loggedUser.user._id,
                          loggedUser.user.username,
                          service,
                          service._id
                        )
                      }
                      className="bg-green-400 hover:bg-green-600 p-2 rounded text-white"
                    >
                      Confirm
                    </button>
                  </td>
                ) : (
                  <td className="text-green-400 font-bold">Handled</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderDashboard;
