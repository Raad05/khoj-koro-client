import { useEffect, useState } from "react";
import axios from "../../../Axios/Axios";
import { Link, useLoaderData } from "react-router-dom";
import Service from "../Service/Service";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const services = useLoaderData().data.data;

  const getCategories = async () => {
    try {
      const result = await axios.get("/category/categories");
      setCategories(result.data.data);
    } catch (err) {
      console.log("Failed to retrieve categories.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="home container m-auto">
      <h3 className="text-3xl text-center my-3">Our Services</h3>
      <div className="flex my-10 justify-center">
        {categories.map((category, idx) => (
          <Link
            key={idx}
            to={`/services/${category.route}`}
            className="text-white bg-black px-5 py-3 mx-3 rounded"
          >
            {category.category}
          </Link>
        ))}
      </div>
      <h3 className="text-2xl font-bold my-5">
        Total Services: {services.length}
      </h3>
      <div className="grid grid-cols-3 gap-y-20">
        {services.map((service, idx) => (
          <Service key={idx} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Home;
