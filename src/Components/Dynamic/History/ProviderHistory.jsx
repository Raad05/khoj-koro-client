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

  return (
    <div className="provider-history h-screen container m-auto">
      {providerHistories.length}
    </div>
  );
};

export default ProviderHistory;
