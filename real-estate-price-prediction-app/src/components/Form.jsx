import PropTypes from 'prop-types';
import { useState } from "react";

function PropertyForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        area: "",
        bedrooms: "",
        bathrooms: "",
        location: "",
        age: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 shadow-xl rounded-2xl border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">🏡 Enter Property Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-600 font-semibold mb-1">📏 Area (sq ft)</label>
                    <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required placeholder="Enter property area" />
                </div>
                <div>
                    <label className="block text-gray-600 font-semibold mb-1">🛏 Bedrooms</label>
                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required placeholder="Enter number of bedrooms" />
                </div>
                <div>
                    <label className="block text-gray-600 font-semibold mb-1">🚿 Bathrooms</label>
                    <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required placeholder="Enter number of bathrooms" />
                </div>
                <div>
                    <label className="block text-gray-600 font-semibold mb-1">📍 Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required placeholder="Enter property location" />
                </div>
                <div>
                    <label className="block text-gray-600 font-semibold mb-1">🏗 Age of Property (years)</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required placeholder="Enter age of property" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition duration-300">
                    🚀 Predict Price
                </button>
            </form>
        </div>
    );
}

PropertyForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default PropertyForm;
