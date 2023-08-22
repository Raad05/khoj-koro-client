import { createBrowserRouter } from "react-router-dom";
import axios from "../Axios/Axios";
import Main from "../layouts/Main/Main";
import Home from "../Components/Dynamic/Home/Home";
import Login from "../Components/Dynamic/Authentication/Login/Login";
import Register from "../Components/Dynamic/Authentication/Register/Register";
import ConfirmOrder from "../Components/Dynamic/ConfirmOrder/ConfirmOrder";
import Error from "../Components/Static/Error/Error";
import OngoingService from "../Components/OngoingService/OngoingService";
import ProviderRegister from "../Components/Dynamic/Authentication/ProviderRegister/ProviderRegister";
import ProviderLogin from "../Components/Dynamic/Authentication/ProviderLogin/ProviderLogin";
import ProviderDashboard from "../Components/Dynamic/Provider/ProviderDashboard/ProviderDashboard";
import ProviderServiceList from "../Components/Dynamic/Provider/ProviderServiceList/ProviderServiceList";
import UserHistory from "../Components/Dynamic/History/UserHistory";
import ProviderHistory from "../Components/Dynamic/History/ProviderHistory";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Error></Error>,
  },
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => axios.get("service/services"),
      },
      {
        path: "/services/all-services",
        element: <Home></Home>,
        loader: () => axios.get("service/services"),
      },
      {
        path: "/services/:category",
        element: <Home></Home>,
        loader: ({ params }) =>
          axios.get(`/service/services/category/${params.category}`),
      },
      {
        path: "/service/:id",
        element: <ConfirmOrder></ConfirmOrder>,
        loader: ({ params }) =>
          axios.get(`/service/order-service/${params.id}`),
      },
      {
        path: "/running-service",
        element: <OngoingService></OngoingService>,
      },
      {
        path: "/provider-dashboard",
        element: <ProviderDashboard></ProviderDashboard>,
      },
      {
        path: "/provider-service",
        element: <ProviderServiceList></ProviderServiceList>,
      },
      {
        path: "/user-history",
        element: <UserHistory></UserHistory>,
      },
      {
        path: "/provider-history",
        element: <ProviderHistory></ProviderHistory>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/provider-login",
    element: <ProviderLogin></ProviderLogin>,
  },
  {
    path: "/provider-registration",
    element: <ProviderRegister></ProviderRegister>,
  },
]);
