import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgAddR } from 'react-icons/cg';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function SchoolPage() {
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  const fetchSchools = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/schools`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSchools(res.data);
    } catch (err) {
      console.error("Failed to fetch schools:", err);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/schools/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchSchools();
    } catch (err) {
      console.error("Failed to delete school:", err);
    }
  };

  return (

        <div className="w-full h-full overflow-x-auto p-4">
              <form className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-xl shadow-lg text-white ">
        <h2 className="text-2xl font-semibold mb-6 text-center">School Info</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <div>
            <label htmlFor="sid" className="block mb-2 text-sm font-medium">School ID</label>
            <input
              type="text"
              id="schoolId"
              className="w-full px-4 py-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter schoolId"
            />
          </div>

          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Name"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
          >
            Submit
          </button>
        </div>
      </form>

    <div className="w-full h-full overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">Schools</h2>

      <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">School ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {schools.map((school) => (
            <tr key={school.schoolId}>
              <td className="px-4 py-2">{school.schoolId}</td>
              <td className="px-4 py-2">{school.name}</td>
              <td className="px-4 py-2 flex space-x-4">
                <button
                  onClick={() => navigate(`/admin/school/${school.schoolId}`)}
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  <MdModeEdit />
                </button>

                <button
                  onClick={() => handleDelete(school.schoolId)}
                  className="text-red-600 hover:text-red-800 text-xl"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => navigate("/admin/school/add")}
          className="text-white text-5xl hover:text-red-700"
        >
          <CgAddR />
        </button>
      </div>
    </div>
    </div>
  );
} 
