import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContexts/UserContext";
import axios from "../../../Axios/Axios";

const ProviderHistory = () => {
  const { loggedUser } = useContext(AuthContext);
  const name = loggedUser?.user?.username;
  const [providerHistories, setProviderHistories] = useState([]);

  const getHistories = async (user) => {
    const result = await axios.get(`/history/providerHistories/${user}`);
    setProviderHistories(result.data.data);
  };

  useEffect(() => {
    getHistories(name);
  }, [name]);

  let i = 1;

  return (
    <div className="provider-history h-screen container m-auto">
      <h3 className="text-3xl mb-10 text-center font-bold">Service Records</h3>
      <div className="overflow-x-auto rounded">
        <table className="table table-zebra">
          <thead className="bg-black text-white">
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Customer</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {providerHistories.map((service, idx) => (
              <tr key={idx}>
                <th>{i++}</th>
                <td>{service.service.name}</td>
                <td>{service.user}</td>
                <td>{service.service.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderHistory;
