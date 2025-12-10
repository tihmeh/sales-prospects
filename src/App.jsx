import React, { useState } from 'react';

const SalesProspectsList = () => {
  const prospects = [
    { 
      id: 1, 
      name: "Pinellas County School District", 
      contact: "Sean Jowell",
      email: "jowells@pcsb.org",
      contacted: true,
      notes: "Attending Utilities Unite Event"
    },
    { 
      id: 2, 
      name: "City of St. Petersburg", 
      contact: "Sarah Johnson",
      email: "sjohnson@stpete.org",
      contacted: false,
      notes: "Left voicemail on 12/5. Awaiting callback."
    },
    { 
      id: 3, 
      name: "City of Dunedin", 
      contact: "Mike Williams",
      email: "mwilliams@dunedinfl.gov",
      contacted: true,
      notes: "Meeting scheduled for 12/15 at 2pm."
    }
  ];

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sales Prospects</h1>
          <p className="text-slate-300">Active Pipelin
