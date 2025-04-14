// src/pages/Agent/Dashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import AgentLayout from '../../components/AgentLayout';

const AgentDashboard = () => {
  const [pgCount, setPgCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0); // Placeholder

  const agentId = localStorage.getItem("agentId"); // ya tumhara auth method jo ho

  useEffect(() => {
    fetchPgCount();
    fetchBookingCount();
    // Message count abhi static rakha hai
    setMessageCount(0);
  }, []);

  const fetchPgCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/agent/pg/agent/${agentId}`);
      setPgCount(response.data.data.length);
    } catch (error) {
      console.error("Error fetching PG count:", error);
      toast.error("Failed to fetch PG count");
    }
  };

  const fetchBookingCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/abooking/bookings/agent/${agentId}`);
      setBookingCount(response.data.data.length);
    } catch (error) {
      console.error("Error fetching booking count:", error);
      toast.error("Failed to fetch booking count");
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* PG Count Card */}
      <Card className="shadow-md bg-white rounded-2xl">
        <CardContent className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Total PG</h2>
          <p className="text-3xl font-bold text-green-600">{pgCount}</p>
        </CardContent>
      </Card>

      {/* Booking Count Card */}
      <Card className="shadow-md bg-white rounded-2xl">
        <CardContent className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
          <p className="text-3xl font-bold text-blue-600">{bookingCount}</p>
        </CardContent>
      </Card>

      {/* Message Count Card */}
      <Card className="shadow-md bg-white rounded-2xl">
        <CardContent className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p className="text-3xl font-bold text-yellow-600">{messageCount}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
