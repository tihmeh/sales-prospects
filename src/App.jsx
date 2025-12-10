import React, { useState } from 'react';

const SalesProspectsList = () => {
  const prospects = [
    { 
      id: 1, 
      name: "Pinellas County School District", 
      contact: "John Smith",
      email: "jsmith@pcsb.org",
      contacted: true,
      notes: "Interested in Q1 demo. Follow up next week."
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
    },
    { 
      id: 4, 
      name: "City of Largo", 
      contact: "TBD",
      email: "contact@largo.com",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 5, 
      name: "City of Gulfport", 
      contact: "TBD",
      email: "contact@gulfport.us",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 6, 
      name: "City of Treasure Island", 
      contact: "TBD",
      email: "contact@treasureislandfl.gov",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 7, 
      name: "Belleair Beach City", 
      contact: "TBD",
      email: "contact@belleairbeach.com",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 8, 
      name: "Belleair Bluffs City", 
      contact: "TBD",
      email: "contact@belleairbluffs.org",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 9, 
      name: "City of Belleair", 
      contact: "TBD",
      email: "contact@belleair.net",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 10, 
      name: "Town of Indian Shores", 
      contact: "TBD",
      email: "contact@myindianshores.com",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 11, 
      name: "City of Oldsmar", 
      contact: "TBD",
      email: "contact@oldsmar.com",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 12, 
      name: "City of Seminole", 
      contact: "TBD",
      email: "contact@seminoleflorida.com",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 13, 
      name: "City of S. Pasadena", 
      contact: "TBD",
      email: "contact@spasadena.com",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 14, 
      name: "City of St. Pete Beach", 
      contact: "TBD",
      email: "contact@stpetebeach.org",
      contacted: false,
      notes: "New prospect - need to identify contact."
    },
    { 
      id: 15, 
      name: "City of Tarpon Springs", 
      contact: "TBD",
      email: "contact@tarponsprings.gov",
      contacted: false,
      notes: "New prospect - need to identify contact."
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
          <p className="text-slate-300">Active Pipeline - {prospects.length} prospects</p>
        </div>

        <div className="space-y-3">
          {prospects.map((prospect, index) => (
            <div
              key={prospect.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
              onClick={() => toggleExpand(prospect.id)}
            >
              <div className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0 w-8 text-center">
                  <span className="text-slate-400 font-semibold">{index + 1}</span>
                </div>
                
                <div className="flex-shrink-0">
                  <div className={`w-4 h-4 rounded-full ${prospect.contacted ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{prospect.name}</h3>
                  <p className="text-slate-400 text-sm">{prospect.contact}</p>
                </div>

                <div className="flex-shrink-0 text-slate-400">
                  <svg 
                    className={`w-5 h-5 transition-transform ${expandedId === prospect.id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expandedId === prospect.id && (
                <div className="px-4 pb-4 border-t border-slate-700 pt-4 space-y-2">
                  <div className="text-slate-300">
                    <span className="text-slate-500 text-sm">Email:</span>
                    <span className="ml-2">{prospect.email}</span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500 text-sm">Status:</span>
                    <span className={`ml-2 font-semibold ${prospect.contacted ? 'text-green-400' : 'text-red-400'}`}>
                      {prospect.contacted ? 'Contacted' : 'Not Contacted'}
                    </span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500 text-sm">Notes:</span>
                    <p className="ml-2 mt-1 text-slate-400 italic">{prospect.notes}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesProspectsList;
