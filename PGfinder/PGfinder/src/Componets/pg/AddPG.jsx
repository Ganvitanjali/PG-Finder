import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddPG = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    try {
      const fetchedState = await axios.get("http://localhost:3000/state/getAllStates");
      setStates(fetchedState.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCityByState = async (id) => {
    try {
      const fetchedCities = await axios.get(`/city/getcitiesbystate/${id}`);
      setCities(fetchedCities.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (data) => {
    console.log(data);
  };

  // ✅ CSS in JSX (JS Object)
  const styles = {
    pageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundImage: "url('_1.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backdropFilter: "blur(5px)",
    },
    addPgContainer: {
      maxWidth: "550px",
      width: "100%",
      padding: "30px",
      background: "#f5e6ca",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
      borderRadius: "12px",
      textAlign: "center",
    },
    inputField: {
      width: "100%",
      padding: "12px",
      margin: "8px 0",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "16px",
      outline: "none",
    },
    checkboxContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "10px",
    },
    submitBtn: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "15px",
      width: "100%",
      transition: "0.3s",
    },
    submitBtnHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.addPgContainer}>
        <h2>🏠 Add PG</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            type="text"
            name="name"
            placeholder="PG Name"
            {...register("name")}
            style={styles.inputField}
          />

          <select name="type" {...register("type")} style={styles.inputField}>
            <option value="Girls">Girls</option>
            <option value="Boys">Boys</option>
            <option value="Co-ed">Co-ed</option>
          </select>

          <input
            type="number"
            name="rent"
            placeholder="Rent Per Month"
            {...register("rent")}
            style={styles.inputField}
          />

          <input
            type="number"
            name="rooms"
            placeholder="Rooms Available"
            {...register("rooms")}
            style={styles.inputField}
          />

          <div style={styles.checkboxContainer}>
            {["WiFi", "Food", "AC", "Laundry"].map((facility, index) => (
              <label key={index}>
                <input type="checkbox" value={facility} {...register("facilities")} />
                {facility}
              </label>
            ))}
          </div>

          <input type="file" name="image" {...register("image")} style={styles.inputField} />

          {/* State Dropdown */}
          <select style={styles.inputField} onChange={(event) => getCityByState(event.target.value)}>
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>

          {/* City Dropdown */}
          <select style={styles.inputField} id="city">
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            {...register("contact")}
            style={styles.inputField}
          />

          <button type="submit" style={styles.submitBtn}>Add PG</button>
        </form>
      </div>
    </div>
  );
};

export default AddPG;
