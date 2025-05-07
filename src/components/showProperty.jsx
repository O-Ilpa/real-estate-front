import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowProperty = () => {
  const [property, setProperty] = useState();
  const [mainImage, setMainImage] = useState();
  const [message, setMessage] = useState("");
  let BACKAPI;
  if (import.meta.env.MODE === "development") {
    BACKAPI = import.meta.env.VITE_DEVELOPMENT_API;
  } else {
    BACKAPI = import.meta.env.VITE_PRODUCTION_API;
  }

  const getPropertyWithId = async () => {
    try {
      const propertyId = window.location.pathname.split("/")[2];
      const res = await axios.get(
        `${BACKAPI}/api/properties/show/${propertyId}`);
      console.log(res)
      if (res.data.success) {
        setProperty(res.data.property);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.message)
    }
  };
  getPropertyWithId();
  {
    message.length !== 0 ? (
      <>
        <div className="flex flex-col gap-4">
          <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
            {mainImage ? (
              <img
                src={mainImage}
                alt="Main Property"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-gray-500">Main Image Placeholder</span>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <div
                key={index}
                className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center"
              >
                <img
                  onClick={(e) => setMainImage(e.target.src)}
                  src={image.url}
                  alt={`Property Image ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {property.price} EGP
            </h2>

            <div className="flex flex-col gap-2 text-gray-600">
              <p>النوع: {property.type}</p>
              <p>التصنيف: {property.category}</p>
              <p>المنطقة: {property.area}</p>
              <p>المساحة: {property.size} متر مربع</p>
              <p>
                الدور: {property.floor}{" "}
                {property.isLastFloor ? "(آخر دور)" : ""}
              </p>
              <p>
                الغرف: {property.rooms} | الحمامات: {property.bathrooms} |
                الريسيبشن: {property.reception}
              </p>
              <p>التشطيب: {property.finishing}</p>
              <p>عدادات: {property.meters}</p>
              <p>مصاعد: {property.elevators}</p>
            </div>
            <div className=" p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold text-gray-700 mb-2">ملاحظات</h3>
              <p className="text-gray-600">{property.notes}</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                الوكيل العقاري
              </h3>
              <p className="text-gray-600">{property.agent}</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                سنة البناء
              </h3>
              <p className="text-gray-600">{property.yearBuilt}</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => {}}
          className="p-3 mt-10 w-full text-center bg-[var(--bg-main)] hover:bg-[#375963] transition-all rounded-full text-white font-bold cursor-pointer"
        >
          الرجوع
        </div>
      </>
    ) : (
      <div>{message}</div>
    );
  }
};

export default ShowProperty;
