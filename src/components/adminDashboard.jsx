import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash } from "lucide-react";
import AddForm from "./addForm.jsx";
import Header from "./header.jsx";
import PropertyCard from "./propertyCard.jsx";
import { useAuth } from "./contextApi.jsx";
import axios from "axios";
import ShowProperty from "./showProperty.jsx";
export default function AdminDashboard() {
  const { user } = useAuth();
  const [formOpen, openForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState({});
  const [editedProperty, setEditedProperty] = useState({});
  const navigator = useNavigate();
  const token = localStorage.getItem("token");
  let BACKAPI;
  if (import.meta.env.MODE === "development") {
    BACKAPI = import.meta.env.VITE_DEVELOPMENT_API;
  } else {
    BACKAPI = import.meta.env.VITE_PRODUCTION_API;
  }
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${BACKAPI}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.data.success) {
          navigator("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, []);
  const fetchProperties = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BACKAPI}/api/properties/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProperties(res.data.properties);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);
  const handleDelete = async (property) => {
    console.log(property.images);
    try {
      const res = await axios.delete(
        `${BACKAPI}/api/properties/del/${property._id}`,
        {
          data: {
            deletedImages: property.images
              ? property.images.map((img) => img.public_id)
              : [],
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        fetchProperties();
      } else {
        console.log(
          "error deleting this property " + property._id + res.data.message
        );
      }
    } catch (err) {
      console.log("error deleting" + err);
    }
  };
  const handleEdit = (property) => {
    setEditedProperty(property);
    openForm(true);
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6 font-arabic text-right">
        <header className="text-2xl font-semibold mb-6">
          {user ? <h2>مرحباً, {user} 👋</h2> : null}
        </header>

        <div className="flex flex-wrap justify-evenly mt-5 transition-opacity duration-1000 ease-in">
          {properties?.length ? (
            selectedProperty && Object.keys(selectedProperty).length > 0 ? (
              <div className="w-full z-10 absolute top-0 right-0  p-5 bg-white">
                <ShowProperty
                  property={selectedProperty}
                  setSelectedProperty={setSelectedProperty}
                />
              </div>
            ) : (
              properties.map((property, i) => (
                <div key={property.creatorId + i} className="w-{320px} ml-2">
                  <div className="absolute flex w-20 justify-evenly mr-2 mt-15">
                    <div
                      onClick={() => {
                        handleDelete(property);
                      }}
                      className="h-9 grid place-content-center bg-red-700 hover:bg-red-500 transition-all w-9 rounded-full cursor-pointer"
                    >
                      <Trash className="text-white  " />
                    </div>
                    <div
                      onClick={() => {
                        handleEdit(property);
                      }}
                      className="h-9 grid place-content-center bg-yellow-400 hover:bg-yellow-300 transition-all mr-1 w-9 rounded-full cursor-pointer"
                    >
                      <Pencil className="text-white  " />
                    </div>
                  </div>
                  <PropertyCard property={property} />
                </div>
              ))
            )
          ) : null}
        </div>

        {formOpen && (
          <AddForm
            fetchProperties={fetchProperties}
            openForm={openForm}
            editedProperty={editedProperty}
          />
        )}

        <button
          onClick={() => {
            openForm(!formOpen);
            setEditedProperty({});
          }}
          className="fixed bottom-6 left-6 bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all text-white p-4 rounded-full shadow-2xl hover:shadow-lg shadow-gray-900"
          aria-label="إضافة عقار جديد"
        >
          <Plus size={24} />
        </button>
      </div>
    </>
  );
}
