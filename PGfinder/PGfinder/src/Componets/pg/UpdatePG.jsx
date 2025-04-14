import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePG = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        propertyName: "",
        description: "",
        imageUrl: "",
        location: "",
        price: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    // Function to Fetch Property Details
    const getPropertyDetails = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/property/getproperty/${id}`);
            console.log("API Response:", res.data); // Debugging API Response

            if (res.data.data) {
                console.log("Fetched Data:", res.data.data); // Check received data

                const { propertyName, description, imageUrl, location, price } = res.data.data;
                
                setProperty({
                    propertyName: propertyName || "",
                    description: description || "",
                    imageUrl: imageUrl || "",
                    location: location || "",
                    price: price || "",
                });

            } else {
                console.error("Error: No Data Found");
            }
        } catch (error) {
            console.error("Error fetching property:", error);
            alert("Failed to load property details.");
        }
        setIsLoading(false);
    };

    // Function to Handle Input Change
    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    // Function to Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.put(`http://localhost:3000/property/updateproperty/${id}`, property);
            alert("Property updated successfully!");
            navigate("/pglayout/viewmypg"); // Redirect after update
        } catch (error) {
            console.error("Error updating property:", error);
            alert("Failed to update property.");
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getPropertyDetails();
    }, []);

    return (
        <div className="container">
            <h2 className="text-center my-4">Update PG Details</h2>

            {isLoading && <p>Loading...</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Property Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="propertyName"
                        value={property.propertyName}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea 
                        type="text" 
                        className="form-control"
                        name="description"
                        value={property.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input 
                        type="number"
                        className="form-control"
                        name="price"
                        value={property.basePrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="location"
                        value={property.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="imageUrl"
                        value={property.imageUrl}
                        onChange={handleChange}
                        required
                    />
                    {property.image && (
                        <div className="mt-2">
                            <img src={property.image} alt="Property" className="img-thumbnail" style={{ width: "200px", height: "150px" }} />
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Update PG
                </button>
            </form>
        </div>
    );
};

export default UpdatePG;
