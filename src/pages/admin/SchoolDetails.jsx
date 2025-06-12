import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import FormRow from '../../components/FormRow';

const API_BASE = 'http://localhost:5000/api/schools';

export default function SchoolDetails() {
  const { schoolId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schoolId: '',
    name: ''
  });

  const [loading, setLoading] = useState(!!schoolId); 

  useEffect(() => {
    if (schoolId) {
      axios
        .get(`${API_BASE}/${schoolId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((res) => {
          console.log("Fetched data:", res.data);
          const { schoolId: id, name } = res.data;
          setFormData({ schoolId: id || '', name: name || '' });
        })
        .catch((err) => {
          console.error("Error fetching school data:", err.response || err.message);
          toast.error("Failed to fetch school data");
        })
        .finally(() => setLoading(false));
    }
  }, [schoolId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (schoolId) {
      
      axios
        .put(`${API_BASE}/${schoolId}`, { name: formData.name }, config)
        .then(() => {
          toast.success("School updated");
          navigate('/admin/school');
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to update school");
        });
    } else {
      
      axios
        .post(`${API_BASE}/add`, { name: formData.name }, config)
        .then(() => {
          toast.success("School created");
          navigate('/admin/school');
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to create school");
        });
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading school details...</div>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-slate-800 p-10 rounded-xl shadow-xl shadow-slate-400 text-white"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          {schoolId ? 'Update School' : 'Add New School'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schoolId && (
            <FormRow
              lblName="School ID"
              type="text"
              name="schoolId"
              value={formData.schoolId}
              readOnly={true}
            />
          )}

          <FormRow
            lblName="School Name"
            type="text"
            name="name"
            placeholder="Enter School Name"
            value={formData.name}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
          >
            {schoolId ? 'Update School' : 'Add School'}
          </button>
        </div>
      </form>
    </div>
  );
}
