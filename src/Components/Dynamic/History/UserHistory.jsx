import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContexts/UserContext";
import axios from "../../../Axios/Axios";

const UserHistory = () => {
  const { loggedUser } = useContext(AuthContext);
  const name = loggedUser?.user?.username;
  const [userHistories, setUserHistories] = useState([]);

  const getHistories = async (user) => {
    const result = await axios.get(`/history/userHistories/${user}`);
    setUserHistories(result.data.data);
  };

  useEffect(() => {
    getHistories(name);
  }, [name]);

  let i = 1;

  return (
    <div className="user-history h-screen container m-auto">
      <h3 className="text-3xl mb-10 text-center font-bold">Service Records</h3>
      <div className="overflow-x-auto rounded">
        <table className="table table-zebra">
          <thead className="bg-black text-white">
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Provider</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {userHistories.map((service, idx) => (
              <tr key={idx}>
                <th>{i++}</th>
                <td>{service.service.name}</td>
                <td>{service.provider}</td>
                <td>{service.service.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHistory;
