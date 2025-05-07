import React, { useEffect, useState } from "react";
import Header from "./header";
import Landing from "./landing";
import Filter from "./filter";
import axios from "axios";
import PropertyCard from "./propertyCard";
import ShowProperty from "./showProperty";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState({});
  let BACKAPI;
  if (import.meta.env.MODE === "development") {
    BACKAPI = import.meta.env.VITE_DEVELOPMENT_API;
  } else {
    BACKAPI = import.meta.env.VITE_PRODUCTION_API;
  }
  console.log(import.meta.env.MODE)
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${BACKAPI}/api/properties/get`);
      if (res.data.success) {
        setProperties(res.data.properties);
        console.log(res);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Landing />
        <Filter />
      </main>

      <div className="flex flex-wrap w-full justify-center gap-4 p-5">
        {properties?.length ? (
          selectedProperty && Object.keys(selectedProperty).length > 0 ? (
            <div className="w-full z-40 absolute top-0 right-0  p-5 bg-white">
              <ShowProperty
                property={selectedProperty}
                setSelectedProperty={setSelectedProperty}
              />
            </div>
          ) : (
            properties.map((property, i) => (
              <div key={property.creatorId + i} className="w-{320px} ml-2">
                <PropertyCard
                  onPropertyClick={() => setSelectedProperty(property)}
                  property={property}
                />
              </div>
            ))
          )
        ) : null}
      </div>
    </>
  );
};

export default Home;
