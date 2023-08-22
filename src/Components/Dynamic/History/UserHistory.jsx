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

  return (
    <div className="user-history h-screen container m-auto">
      {userHistories.length}
    </div>
  );
};

export default UserHistory;
