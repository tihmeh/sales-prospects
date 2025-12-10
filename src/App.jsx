import React, { useState } from 'react';

const SalesProspectsList = () => {
  const prospectsK12 = [
    { 
      id: 1, 
      name: "Pinellas County School District", 
      contact: "Sean Jowell",
      title: "Director Safety & Security",
      email: "jowells@pcsb.org",
      contacted: true,
      notes: "Attending Utilities Unite Event in Clearwater",
      vertical: "K-12"
    }
  ];

  const prospectsCities = [
    { 
      id: 2, 
      name: "City of St. Petersburg", 
      contact: "Sarah Johnson",
      title: "IT Manager",
      email: "sjohnson@stpete.org",
      contacted: false,
      notes: "Left voicemail on 12/5. Awaiting callback.",
      vertical: "Public Sector"
    },
    { 
      id: 3, 
      name: "City of Dunedin", 
      contact: "Michael Nagy",
      title: "Director of IT",
      email: "mwilliams@dunedinfl.gov",
      contact2: "Ronbert Ignacio",
      title2: "IT Specialist",
      email2: "ronbert.ignacio@dunedin.gov",
      contacted: true,
      notes: "Reachout out through email, no response",
      vertical: "Public Sector"
    },
    { 
      id: 5, 
      name: "City of Gulfport", 
      contact: "David Mather",
      title: "Director of IT",
      email: "dmather@mygulfport.us",
      contacted: true,
      notes: "Visited in person, followed up over email",
      vertical: "Public Sector"
    },
    { 
      id: 6, 
      name: "City of Treasure Island", 
      contact: "Chris Pagan",
      title: "Director of IT",
      email: "cpagan@mytreasureisland.org",
      contacted: true,
      notes: "Visited in person, followed up over email",
      vertical: "Public Sector"
    },
    { 
      id: 7, 
      name: "Belleair Beach City", 
      contact: "TBD",
      title: "TBD",
      email: "contact@belleairbeach.com",
      contacted: false,
      notes: "New prospect - need to identify contact.",
      vertical: "Public Sector"
    },
    { 
      id: 8, 
      name: "Belleair Bluffs City", 
      contact: "TBD",
      title: "TBD",
      email: "contact@belleairbluffs.org",
      contacted: false,
      notes: "New prospect - need to identify contact.",
      vertical: "Public Sector"
    },
    { 
      id: 9, 
      name: "City of Belleair", 
      contact: "TBD",
      title: "TBD",
      email: "contact@belleair.net",
      contacted: false,
      notes: "New prospect - need to identify contact.",
      vertical: "Public Sector"
    },
    { 
      id: 11, 
      name: "City of Oldsmar", 
      contact: "TBD",
      title: "TBD",
      email: "contact@oldsmar.com",
      contacted: false,
      notes: "New prospect - need to identify contact.",
      vertical: "Public Sector"
    },
    { 
      id: 12, 
      name: "City of Seminole", 
      contact: "Matthew Sabella",
      title: "Director of IT",
      email: "msabella@myseminole.com",
      contacted: true,
      notes: "reached out over email. Plan to stop by in person soon",
      vertical: "Public Sector"
    },
    { 
      id: 13, 
      name: "City of S. Pasadena", 
      contact: "Alex Britton-Kant",
      title: "Director of IT",
      email: "abrittonkant@mysouthpasadena.com",
      contacted: true,
      notes: "Stopped by in person and reached out over email. no response",
      vertical: "Public Sector"
    },
    { 
      id: 14, 
      name: "City of St. Pete Beach", 
      contact: "TBD",
      title: "TBD",
      email: "contact@stpetebeach.org",
      contacted: false,
      notes: "New prospect - need to identify contact.",
      vertical: "Public Sector"
    },
    { 
      id: 15, 
      name: "City of Tarpon Springs", 
      contact: "Suzanne Linton",
      title: "Director of IT",
      email: "slinton@ctsfl.us",
      contacted: true,
      notes: "Connected on linked in. Preparing email to send this week 12/9/25",
      vertical: "Public Sector"
    }
  ];

  const prospectsHigherEd = [
    { 
      id: 16, 
      name: "Eckerd College", 
      contact: "Jessica Cinney",
      title: "Director of Campus Safety & Security",
      email: "cinneyj@eckerd.edu",
      contact2: "Walter Moore",
      title2: "Director of IT",
      email2: "moorewr@eckerd.edu",
      contact3: "Tonya Womack",
      title3: "Risk Management & Safety",
      email3: "womacktm@eckerd.edu",
      contacted: true,
      notes: "Old customer that has bad experience with Convergint",
      vertical: "Higher Education"
    },
    { 
      id: 17, 
      name: "St. Petersburg College", 
      contact: "TBD",
      title: "TBD",
      email: "contact@spcollege.edu",
      contacted: false,
      notes: "New prospect - need to identify contact.",
      vertical: "Higher Education"
    },
    { 
      id: 18, 
      name: "St. Pete Technical College", 
      contact: "TBD",
      title: "TBD",
      email: "contact@sptech.edu",
      contacted: false,
      notes: "New prospect - need to identify contact.",
      vertical: "Higher Education"
    },
    { 
      id: 19, 
      name: "Polk State College", 
      contact: "Emmett Andrews",
      title: "Director of Safety & Security",
      email: "eandrews@polk.edu",
      contact2: "Martin Gang",
      title2: "Director of Technology and IT",
      email2: "mgang@polk.edu",
      contacted: true,
      notes: "Reached out over email",
      vertical: "Higher Education"
    }
  ];

  const customersCities = [
    {
      id: 102,
      name: "Town of Indian Shores",
      contact: "Jennifer Angelo",
      title: "Admin Assistant",
      email: "jangelo@myindianshores.com",
      startDate: "2024-06-10",
      notes: "Current customer",
      vertical: "Public Sector"
    },
    {
      id: 103,
      name: "City of Largo",
      contact: "Hansel Roush",
      title: "Director of IT",
      email: "hroush@largo.com",
      contact2: "Tim Clark",
      title2: "IT Admin",
      email2: "tclark@largo.com",
      startDate: "2024-03-20",
      notes: "Current customer",
      vertical: "Public Sector"
    }
  ];

  const customersTransit = [
    {
      id: 101,
      name: "PSTA - Pinellas Suncoast Transit Authority",
      contact: "Missy Nevitt",
      title: "Superintendant of Facilities",
      email: "mnevitt@psta.net",
      startDate: "12/20/2024",
      notes: "Current customer",
      vertical: "Transit"
    }
  ];

  const [expandedProspect, setExpandedProspect] = useState(null);
  const [expandedCustomer, setExpandedCustomer] = useState(null);

  const toggleProspect = (id) => {
    setExpandedProspect(expandedProspect === id ? null : id);
  };

  const toggleCustomer = (id) => {
    setExpandedCustomer(expandedCustomer === id ? null : id);
  };

  const ProspectCard = ({ prospect, index }) => (
    <div
      key={prospect.id}
      className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
      onClick={() => toggleProspect(prospect.id)}
    >
      <div className="p-4 flex items-center gap-4">
        <div className="flex-shrink-0 w-8 text-center">
          <span className="text-slate-400 font-semibold">{index + 1}</span>
        </div>
        
        <div className="flex-shrink-0">
          <div className={`w-4 h-4 rounded-full ${prospect.contacted ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base truncate">{prospect.name}</h3>
          <p className="text-slate-400 text-sm truncate">{prospect.contact} • {prospect.title}</p>
        </div>

        <div className="flex-shrink-0">
          <span className="text-xs font-medium text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">
            {prospect.vertical}
          </span>
        </div>

        <div className="flex-shrink-0 text-slate-400">
          <svg 
            className={`w-5 h-5 transition-transform ${expandedProspect === prospect.id ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {expandedProspect === prospect.id && (
        <div className="px-4 pb-4 border-t border-slate-700 pt-4 space-y-2">
          <div className="text-slate-300">
            <span className="text-slate-500 text-sm">Contact:</span>
            <span className="ml-2">{prospect.contact}</span>
          </div>
          <div className="text-slate-300">
            <span className="text-slate-500 text-sm">Title:</span>
            <span className="ml-2">{prospect.title}</span>
          </div>
          <div className="text-slate-300">
            <span className="text-slate-500 text-sm">Email:</span>
            <span className="ml-2">{prospect.email}</span>
          </div>
          {prospect.contact2 && (
            <>
              <div className="text-slate-300 mt-3 pt-2 border-t border-slate-700/50">
                <span className="text-slate-500 text-sm">Contact 2:</span>
                <span className="ml-2">{prospect.contact2}</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 text-sm">Title:</span>
                <span className="ml-2">{prospect.title2}</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 text-sm">Email:</span>
                <span className="ml-2">{prospect.email2}</span>
              </div>
            </>
          )}
          {prospect.contact3 && (
            <>
              <div className="text-slate-300 mt-3 pt-2 border-t border-slate-700/50">
                <span className="text-slate-500 text-sm">Contact 3:</span>
                <span className="ml-2">{prospect.contact3}</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 text-sm">Title:</span>
                <span className="ml-2">{prospect.title3}</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 text-sm">Email:</span>
                <span className="ml-2">{prospect.email3}</span>
              </div>
            </>
          )}
          <div className="text-slate-300 mt-3 pt-2 border-t border-slate-700/50">
            <span className="text-slate-500 text-sm">Vertical:</span>
            <span className="ml-2">{prospect.vertical}</span>
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
  );

  const CustomerCard = ({ customer, index }) => (
    <div
      key={customer.id}
      className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
      onClick={() => toggleCustomer(customer.id)}
    >
      <div className="p-4 flex items-center gap-4">
        <div className="flex-shrink-0 w-8 text-center">
          <span className="text-slate-400 font-semibold">{index + 1}</span>
        </div>
        
        <div className="flex-shrink-0">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base truncate">{customer.name}</h3>
          <p className="text-slate-400 text-sm truncate">{customer.contact} • {customer.title}</p>
        </div>

        <div className="flex-shrink-0">
          <span className="text-xs font-medium text-green-400 bg-green-900/30 px-3 py-1 rounded-full">
            {customer.vertical}
          </span>
        </div>

        <div className="flex-shrink-0 text-slate-400">
          <svg 
            className={`w-5 h-5 transition-transform ${expandedCustomer === customer.id ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {expandedCustomer === customer.id && (
        <div className="px-4 pb-4 border-t border-slate-700 pt-4 space-y-2">
          <div className="text-slate-300">
            <span className="text-slate-500 text-sm">Contact:</span>
            <span className="ml-2">{customer.contact}</span>
          </div>
          <div className="text-slate-300">
            <span className="text-slate-500 text-sm">Title:</span>
            <span className="ml-2">{customer.title}</span>
          </div>
          <div className="text-slate-300">
            <span className="text-slate-500 text-sm">Email:</span>
            <span className="ml-2">{customer.email}</span>
          </div>
          {customer.contact2 && (
            <>
              <div className="text-slate-300 mt-3 pt-2 border-t border-slate-700/50">
                <span className="text-slate-500 text-sm">Contact 2:</span>
                <span className="ml-2">{customer.contact2}</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 text-sm">Title:</span>
                <span className="ml-2">{customer.title2}</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 text-sm">Email:</span>
                <span className="ml-2">{customer.email2}</span>
              </div>
            </>
          )}
          <div className="text-slate-300 mt-3 pt-2 border-t border-slate-700/50">
            <span className="text-slate-500 text-sm">Vertical:</span>
            <span className="ml-2">{customer.vertical}</span>
          </div>
          <div className="text-slate-300">
            <span className="text-slate-500 text-sm">Customer Since:</span>
            <span className="ml-2 text-green-400">{customer.startDate}</span>
          </div>
          <div className="text-slate-300">
            <span className="text-slate-500 text-sm">Notes:</span>
            <p className="ml-2 mt-1 text-slate-400 italic">{customer.notes}</p>
          </div>
        </div>
      )}
    </div>
  );

  const totalProspects = prospectsK12.length + prospectsCities.length + prospectsHigherEd.length;
  const totalCustomers = customersCities.length + customersTransit.length;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sales Dashboard</h1>
          <p className="text-slate-300">Pipeline Overview</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PROSPECTS COLUMN */}
          <div>
            <div className="mb-4 bg-blue-900/30 rounded-lg p-4 border border-blue-700/50">
              <h2 className="text-2xl font-bold text-white mb-1">Current Prospects</h2>
              <p className="text-blue-300">{totalProspects} active prospects</p>
            </div>

            <div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
              {/* PUBLIC SECTOR MAIN SECTION */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 px-2 border-b border-slate-600 pb-2">Public Sector</h3>
                
                {/* K-12 SUBSECTION */}
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-slate-300 mb-3 px-2 pl-4">K-12 Education</h4>
                  <div className="space-y-3">
                    {prospectsK12.map((prospect, index) => (
                      <ProspectCard key={prospect.id} prospect={prospect} index={index} />
                    ))}
                  </div>
                </div>

                {/* CITIES/MUNICIPALITIES SUBSECTION */}
                <div>
                  <h4 className="text-md font-semibold text-slate-300 mb-3 px-2 pl-4">Cities & Municipalities</h4>
                  <div className="space-y-3">
                    {prospectsCities.map((prospect, index) => (
                      <ProspectCard key={prospect.id} prospect={prospect} index={index} />
                    ))}
                  </div>
                </div>
              </div>

              {/* HIGHER EDUCATION SECTION */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 px-2 border-b border-slate-600 pb-2">Higher Education</h3>
                <div className="space-y-3">
                  {prospectsHigherEd.map((prospect, index) => (
                    <ProspectCard key={prospect.id} prospect={prospect} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CUSTOMERS COLUMN */}
          <div>
            <div className="mb-4 bg-green-900/30 rounded-lg p-4 border border-green-700/50">
              <h2 className="text-2xl font-bold text-white mb-1">Current Customers</h2>
              <p className="text-green-300">{totalCustomers} active customers</p>
            </div>

            <div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
              {/* PUBLIC SECTOR MAIN SECTION */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 px-2 border-b border-slate-600 pb-2">Public Sector</h3>
                
                {/* CITIES/MUNICIPALITIES SUBSECTION */}
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-slate-300 mb-3 px-2 pl-4">Cities & Municipalities</h4>
                  <div className="space-y-3">
                    {customersCities.map((customer, index) => (
                      <CustomerCard key={customer.id} customer={customer} index={index} />
                    ))}
                  </div>
                </div>

                {/* TRANSIT SUBSECTION */}
                <div>
                  <h4 className="text-md font-semibold text-slate-300 mb-3 px-2 pl-4">Transit</h4>
                  <div className="space-y-3">
                    {customersTransit.map((customer, index) => (
                      <CustomerCard key={customer.id} customer={customer} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesProspectsList;
