// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AddPG2 = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm();

//   // State Variables
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch States from Backend
//   useEffect(() => {
//     const getAllStates = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/state/getallstates");
//         setStates(response.data.data || []);
//       } catch (error) {
//         console.error("Error fetching states:", error);
//       }
//     };
//     getAllStates();
//   }, []);

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/category/getallcategories");
//         setCategories(response.data.data || []);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     getCategories();
//   }, []);

//   // Fetch Cities based on Selected State
//   useEffect(() => {
//     if (selectedState) {
//       const getCityByState = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3000/city/getcitiesbystate/${selectedState}`);
//           setCities(response.data.data || []);
//         } catch (error) {
//           console.error("Error fetching cities:", error);
//         }
//       };
//       getCityByState();
//     }
//   }, [selectedState]);

//   // Fetch Areas based on Selected City
//   useEffect(() => {
//     if (selectedCity) {
//       const getAreaByCity = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3000/area/getareabycity/${selectedCity}`);
//           setAreas(response.data.data || []);
//         } catch (error) {
//           console.error("Error fetching areas:", error);
//         }
//       };
//       getAreaByCity();
//     }
//   }, [selectedCity]);

//   // Submit Handler
//   const submitHandler = async (data) => {
//     setLoading(true);
//     const userId = localStorage.getItem("id"); // Fetch userId from localStorage

//     if (!userId) {
//       toast.error("User not logged in. Please log in and try again.");
//       setLoading(false);
//       return;
//     }

//     data.userId = userId; // Add userId to form data

//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("propertyName", data.propertyName);
//       formData.append("categoryId", data.categoryId);
//       formData.append("address", data.address);
//       formData.append("stateId", data.stateId);
//       formData.append("cityId", data.cityId);
//       formData.append("areaId", data.areaId);
//       formData.append("zipcode", data.zipcode);
//       formData.append("userId", data.userId);
//       formData.append("description", data.description);
//       formData.append("basePrice", data.basePrice);
//       formData.append("otherPriceDescription", data.otherPriceDescription);
//       formData.append("bedrooms", data.bedrooms);
//       formData.append("bathrooms", data.bathrooms);
//       formData.append("furnishingStatus", data.furnishingStatus);
//       formData.append("yearBuilt", data.yearBuilt);
//       formData.append("status", data.status);
//       formData.append("image", data.image[0]);

//       const response = await axios.post("http://localhost:3000/property/addWithFile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Property added successfully!");
//       reset();
//     } catch (error) {
//       console.error("Error adding property:", error);
//       toast.error("Failed to add property");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Add Property</h2>
//       <form onSubmit={handleSubmit(submitHandler)}>
//         <input {...register("title", { required: true })} placeholder="Title" />
//         {errors.title && <p>Title is required</p>}

//         <input {...register("propertyName", { required: true })} placeholder="Property Name" />
//         {errors.propertyName && <p>Property Name is required</p>}

//         <select {...register("categoryId", { required: true })}>
//           <option value="">Select Category</option>
//           {categories.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//         {errors.categoryId && <p>Category is required</p>}

//         <input {...register("address", { required: true })} placeholder="Address" />
//         {errors.address && <p>Address is required</p>}

//         {/* State Dropdown */}
//         <select
//           {...register("stateId", { required: true })}
//           onChange={(e) => setSelectedState(e.target.value)}
//         >
//           <option value="">Select State</option>
//           {states.map((state) => (
//             <option key={state._id} value={state._id}>
//               {state.name}
//             </option>
//           ))}
//         </select>
//         {errors.state && <p>State is required</p>}

//         {/* City Dropdown */}
//         <select
//           {...register("cityId", { required: true })}
//           onChange={(e) => setSelectedCity(e.target.value)}
//           disabled={!selectedState}
//         >
//           <option value="">Select City</option>
//           {cities.map((city) => (
//             <option key={city._id} value={city._id}>
//               {city.name}
//             </option>
//           ))}
//         </select>
//         {errors.city && <p>City is required</p>}

//         {/* Area Dropdown */}
//         <select {...register("areaId", { required: true })} disabled={!selectedCity}>
//           <option value="">Select Area</option>
//           {areas.map((area) => (
//             <option key={area._id} value={area._id}>
//               {area.name}
//             </option>
//           ))}
//         </select>
//         {errors.area && <p>Area is required</p>}

//         <input {...register("zipcode", { required: true })} placeholder="Zipcode" />
//         {errors.zipcode && <p>Zipcode is required</p>}

//         <textarea {...register("description")} placeholder="Description"></textarea>

//         <input type="number" {...register("basePrice", { required: true })} placeholder="Base Price" />
//         {errors.basePrice && <p>Base Price is required</p>}

//         <input {...register("otherPriceDescription")} placeholder="Other Price Description" />

//         <input type="number" {...register("bedrooms", { required: true })} placeholder="Bedrooms" />
//         {errors.bedrooms && <p>Bedrooms are required</p>}

//         <input type="number" {...register("bathrooms", { required: true })} placeholder="Bathrooms" />
//         {errors.bathrooms && <p>Bathrooms are required</p>}

//         <select {...register("furnishingStatus", { required: true })}>
//           <option value="">Select Furnishing Status</option>
//           <option value="Furnished">Furnished</option>
//           <option value="Semi-Furnished">Semi-Furnished</option>
//           <option value="Unfurnished">Unfurnished</option>
//         </select>

//         <input type="number" {...register("yearBuilt")} placeholder="Year Built" />

//         <select {...register("status", { required: true })}>
//           <option value="">Select Status</option>
//           <option value="available">Available</option>
//           <option value="Sold">Sold</option>
//           <option value="Rented">Rented</option>
//         </select>

//         <input type="file" {...register("image", { required: true })} />
//         {errors.image && <p>Image is required</p>}

//         <button type="submit" disabled={loading}>
//           {loading ? "Adding..." : "Add Property"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPG2;


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const AddPG2 = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // State Variables
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch States from Backend
  useEffect(() => {
    const getAllStates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/state/getallstates");
        setStates(response.data.data || []);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    getAllStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/category/getallcategories");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  // Fetch Cities based on Selected State
  useEffect(() => {
    if (selectedState) {
      const getCityByState = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/city/getcitiesbystate/${selectedState}`);
          setCities(response.data.data || []);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      getCityByState();
    }
  }, [selectedState]);

  // Fetch Areas based on Selected City
  useEffect(() => {
    if (selectedCity) {
      const getAreaByCity = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/area/getareabycity/${selectedCity}`);
          setAreas(response.data.data || []);
        } catch (error) {
          console.error("Error fetching areas:", error);
        }
      };
      getAreaByCity();
    }
  }, [selectedCity]);

  // Submit Handler
  const submitHandler = async (data) => {
    setLoading(true);
    const userId = localStorage.getItem("id"); // Fetch userId from localStorage

    if (!userId) {
      toast.error("User not logged in. Please log in and try again.");
      setLoading(false);
      return;
    }

    data.userId = userId; // Add userId to form data

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("propertyName", data.propertyName);
      formData.append("categoryId", data.categoryId);
      formData.append("address", data.address);
      formData.append("stateId", data.stateId);
      formData.append("cityId", data.cityId);
      formData.append("areaId", data.areaId);
      formData.append("zipcode", data.zipcode);
      formData.append("userId", data.userId);
      formData.append("description", data.description);
      formData.append("basePrice", data.basePrice);
      formData.append("otherPriceDescription", data.otherPriceDescription);
      formData.append("bedrooms", data.bedrooms);
      formData.append("bathrooms", data.bathrooms);
      formData.append("furnishingStatus", data.furnishingStatus);
      formData.append("yearBuilt", data.yearBuilt);
      formData.append("status", data.status);
      formData.append("image", data.image[0]);

      const response = await axios.post("http://localhost:3000/property/addWithFile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Property added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  // Inline CSS styles
  const formStyles = {
    container: {
      width: "100%",
      maxWidth: "600px",
      margin: "auto",
      padding: "20px",
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    select: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
      height: "100px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    buttonDisabled: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#ccc",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "not-allowed",
      fontSize: "16px",
    },
    error: {
      color: "red",
      fontSize: "12px",
    },
  };

  return (
    <div style={formStyles.container}>
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          style={formStyles.input}
        />
        {errors.title && <p style={formStyles.error}>Title is required</p>}

        <input
          {...register("propertyName", { required: true })}
          placeholder="Property Name"
          style={formStyles.input}
        />
        {errors.propertyName && <p style={formStyles.error}>Property Name is required</p>}

        <select
          {...register("categoryId", { required: true })}
          style={formStyles.select}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p style={formStyles.error}>Category is required</p>}

        <input
          {...register("address", { required: true })}
          placeholder="Address"
          style={formStyles.input}
        />
        {errors.address && <p style={formStyles.error}>Address is required</p>}

        {/* State Dropdown */}
        <select
          {...register("stateId", { required: true })}
          onChange={(e) => setSelectedState(e.target.value)}
          style={formStyles.select}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state._id} value={state._id}>
              {state.name}
            </option>
          ))}
        </select>
        {errors.state && <p style={formStyles.error}>State is required</p>}

        {/* City Dropdown */}
        <select
          {...register("cityId", { required: true })}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          style={formStyles.select}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city._id} value={city._id}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.city && <p style={formStyles.error}>City is required</p>}

        {/* Area Dropdown */}
        <select
          {...register("areaId", { required: true })}
          disabled={!selectedCity}
          style={formStyles.select}
        >
          <option value="">Select Area</option>
          {areas.map((area) => (
            <option key={area._id} value={area._id}>
              {area.name}
            </option>
          ))}
        </select>
        {errors.area && <p style={formStyles.error}>Area is required</p>}

        <input
          {...register("zipcode", { required: true })}
          placeholder="Zipcode"
          style={formStyles.input}
        />
        {errors.zipcode && <p style={formStyles.error}>Zipcode is required</p>}

        <textarea
          {...register("description")}
          placeholder="Description"
          style={formStyles.textarea}
        ></textarea>

        <input
          type="number"
          {...register("basePrice", { required: true })}
          placeholder="Base Price"
          style={formStyles.input}
        />
        {errors.basePrice && <p style={formStyles.error}>Base Price is required</p>}

        <input
          {...register("otherPriceDescription")}
          placeholder="Other Price Description"
          style={formStyles.input}
        />

        <input
          type="number"
          {...register("bedrooms", { required: true })}
          placeholder="Bedrooms"
          style={formStyles.input}
        />
        {errors.bedrooms && <p style={formStyles.error}>Bedrooms are required</p>}

        <input
          type="number"
          {...register("bathrooms", { required: true })}
          placeholder="Bathrooms"
          style={formStyles.input}
        />
        {errors.bathrooms && <p style={formStyles.error}>Bathrooms are required</p>}

        <select
          {...register("furnishingStatus", { required: true })}
          style={formStyles.select}
        >
          <option value="">Select Furnishing Status</option>
          <option value="Furnished">Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>

        <input
          type="number"
          {...register("yearBuilt")}
          placeholder="Year Built"
          style={formStyles.input}
        />

        <select
          {...register("status", { required: true })}
          style={formStyles.select}
        >
          <option value="">Select Status</option>
          <option value="available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Rented">Rented</option>
        </select>

        <input
          type="file"
          {...register("image", { required: true })}
          style={formStyles.input}
        />
        {errors.image && <p style={formStyles.error}>Image is required</p>}

        <button
          type="submit"
          disabled={loading}
          style={loading ? formStyles.buttonDisabled : formStyles.button}
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddPG2;
