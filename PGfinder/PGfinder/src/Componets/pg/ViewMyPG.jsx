import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustLoder } from '../common/CustLoder';

const ViewMyPG = () => {
    const [screens, setscreens] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const getAllMyScreens = async () => {
        setisLoading(true);
        try {
            const res = await axios.get("/property/getallproperties/");
            setscreens(res.data.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
        setisLoading(false);
    };

    const deleteProperty = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                await axios.delete(`/property/deleteproperty/${id}`);
                setscreens(screens.filter(screen => screen._id !== id));
                alert("Property deleted successfully");
            } catch (error) {
                console.error("Error deleting property:", error);
                alert("Failed to delete property");
            }
        }
    };

    useEffect(() => {
        getAllMyScreens();
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            {isLoading && <CustLoder />}
            <h3 style={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>MY SCREENS</h3>
            <table style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden"
            }}>
                <thead>
                    <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Property Name</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Image</th>
                        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {screens?.map((sc) => (
                        <tr key={sc._id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "12px", color: "#333" }}>{sc.propertyName}</td>
                            <td style={{ padding: "12px" }}>
                                <img 
                                    style={{ height: "100px", width: "100px", borderRadius: "8px", objectFit: "cover" }} 
                                    src={sc?.image} 
                                    alt="Property" 
                                />
                            </td>
                            <td style={{ padding: "12px" }}>
                                <Link
                                    to={`/pglayout/updatepg/${sc._id}`}
                                    style={{
                                        textDecoration: "none",
                                        padding: "8px 12px",
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        borderRadius: "5px",
                                        marginRight: "8px",
                                        display: "inline-block"
                                    }}
                                >
                                    UPDATE
                                </Link>
                                <button
                                    style={{
                                        padding: "8px 12px",
                                        backgroundColor: "#dc3545",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => deleteProperty(sc._id)}
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewMyPG;
