import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const Service = ({ service }) => {
  const { _id, name, description, img } = service;
  const navigate = useNavigate();
  const [reading, setReading] = useState(false);

  const goToService = (id) => {
    navigate(`/service/${id}`);
  };

  const isRead = () => {
    setReading(!reading);
  };

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-lg mx-auto">
      <figure>
        <img src={img} alt="img" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        {!reading ? (
          <p>
            {description.slice(0, 100)}...{" "}
            <button className="text-xs" onClick={isRead}>
              Read More
            </button>
          </p>
        ) : (
          <p>{description}</p>
        )}
        <div className="card-actions justify-center">
          <button
            onClick={() => goToService(_id)}
            className="btn rounded bg-black text-white"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
