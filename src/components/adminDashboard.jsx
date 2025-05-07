import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash, Download  } from "lucide-react";
import * as XLSX from "xlsx"; // 👈 Add this

import AddForm from "./addForm.jsx";
import Header from "./header.jsx";
import PropertyCard from "./propertyCard.jsx";
import { useAuth } from "./contextApi.jsx";
import axios from "axios";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [formOpen, openForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [editedProperty, setEditedProperty] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let BACKAPI;
  if (import.meta.env.MODE === "development") {
    BACKAPI = import.meta.env.VITE_DEVELOPMENT_API;
  } else {
    BACKAPI = import.meta.env.VITE_PRODUCTION_API;
  }

  // ✅ Excel download logic
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(properties);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Properties");
    XLSX.writeFile(workbook, "properties.xlsx");
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${BACKAPI}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.data.success) {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, []);

  const fetchProperties = async () => {
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
    try {
      const res = await axios.delete(
        `${BACKAPI}/api/properties/del/${property._id}`,
        {
          data: {
            deletedImages: property.images?.map((img) => img.public_id) || [],
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        fetchProperties();
      } else {
        console.log("error deleting this property " + res.data.message);
      }
    } catch (err) {
      console.log("error deleting: " + err);
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

        {/* ✅ Download Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
          >
            <Download className="w-5 h-5" />
            تحميل كملف Excel
          </button>
        </div>

        <div className="flex flex-wrap justify-evenly mt-5 transition-opacity duration-1000 ease-in">
          {properties.map((property) => (
            <div
              key={property.propertyId + property.area}
              className="w-[320px] ml-2 relative"
            >
              <div className="absolute flex w-20 justify-evenly right-2 top-2 z-10">
                <div
                  onClick={() => handleDelete(property)}
                  className="h-9 grid place-content-center bg-red-700 hover:bg-red-500 transition-all w-9 rounded-full cursor-pointer"
                >
                  <Trash className="text-white" />
                </div>
                <div
                  onClick={() => handleEdit(property)}
                  className="h-9 grid place-content-center bg-yellow-400 hover:bg-yellow-300 transition-all w-9 rounded-full cursor-pointer"
                >
                  <Pencil className="text-white" />
                </div>
              </div>
              <PropertyCard property={property} />
            </div>
          ))}
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
