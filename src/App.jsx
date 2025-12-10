import React, { useState, useEffect } from 'react';

const SalesBubbles = () => {
  const prospects = [
    { 
      id: 1, 
      name: "Pinellas County School District", 
      contact: "Sean Jowell",
      email: "jowells@pcsb.org",
      contacted: true,
      notes: "Will be attending Utilities Unite",
      color: "from-blue-400 to-blue-600" 
    },
    { 
      id: 2, 
      name: "City of St. Petersburg", 
      contact: "Sarah Johnson",
      email: "sjohnson@stpete.org",
      contacted: false,
      notes: "Left voicemail on 12/5. Awaiting callback.",
      color: "from-purple-400 to-purple-600" 
    },
    { 
      id: 3, 
      name: "City of Dunedin", 
      contact: "Mike Williams",
      email: "mwilliams@dunedinfl.gov",
      contacted: true,
      notes: "Meeting scheduled for 12/15 at 2pm.",
      color: "from-teal-400 to-teal-600" 
    }
  ];

  const [bubbles, setBubbles] = useState([]);
  const [hoveredBubble, setHoveredBubble] = useState(null);

  useEffect(() => {
    const initialBubbles = prospects.map((prospect, index) => ({
      ...prospect,
      x: 25 + (index * 25),
      y: 50,
      size: 150
    }));
    setBubbles(initialBubbles);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hi
