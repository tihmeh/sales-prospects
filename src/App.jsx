import React, { useState, useEffect } from 'react';

const SalesProspectsList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'map', or 'email'

  const prospectsK12 = [
    { id: 1, name: "Pinellas County School District", contact: "Sean Jowell", title: "Director Safety & Security", email: "jowells@pcsb.org", contacted: true, notes: "Attending Utilities Unite Event in Clearwater", vertical: "K-12", address: "301 4th Street SW, Largo, FL 33770" },
    { id: 20, name: "Sumter County Public Schools", contact: "Philip Martin", title: "Director of Safety & Security", email: "philip.martin@sumter.k12.fl.us", contacted: false, notes: "New prospect - need to make initial contact.", vertical: "K-12", address: "2680 W County Rd 476, Bushnell, FL 33513" }
  ];

  const prospectsCities = [
    { id: 2, name: "City of St. Petersburg", contact: "Sarah Johnson", title: "IT Manager", email: "sjohnson@stpete.org", contacted: false, notes: "Left voicemail on 12/5. Awaiting callback.", vertical: "Public Sector", address: "175 5th St N, St. Petersburg, FL 33701" },
    { id: 3, name: "City of Dunedin", contact: "Michael Nagy", title: "Director of IT", email: "mwilliams@dunedinfl.gov", contact2: "Ronbert Ignacio", title2: "IT Specialist", email2: "ronbert.ignacio@dunedin.gov", contacted: true, notes: "Reachout out through email, no response", vertical: "Public Sector", address: "542 Main St, Dunedin, FL 34698" },
    { id: 5, name: "City of Gulfport", contact: "David Mather", title: "Director of IT", email: "dmather@mygulfport.us", contacted: true, notes: "Visited in person, followed up over email", vertical: "Public Sector", address: "2401 53rd St S, Gulfport, FL 33707" },
    { id: 6, name: "City of Treasure Island", contact: "Chris Pagan", title: "Director of IT", email: "cpagan@mytreasureisland.org", contacted: true, notes: "Visited in person, followed up over email", vertical: "Public Sector", address: "120 108th Ave, Treasure Island, FL 33706" },
    { id: 7, name: "Belleair Beach City", contact: "TBD", title: "TBD", email: "contact@belleairbeach.com", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector", address: "2747 Sunset Blvd, Belleair Beach, FL 33786" },
    { id: 8, name: "Belleair Bluffs City", contact: "TBD", title: "TBD", email: "contact@belleairbluffs.org", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector", address: "2747 Sunset Blvd, Belleair Bluffs, FL 33770" },
    { id: 9, name: "City of Belleair", contact: "TBD", title: "TBD", email: "contact@belleair.net", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector", address: "901 Ponce de Leon Blvd, Belleair, FL 33756" },
    { id: 11, name: "City of Oldsmar", contact: "TBD", title: "TBD", email: "contact@oldsmar.com", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector", address: "100 State St W, Oldsmar, FL 34677" },
    { id: 12, name: "City of Seminole", contact: "Matthew Sabella", title: "Director of IT", email: "msabella@myseminole.com", contacted: true, notes: "reached out over email. Plan to stop by in person soon", vertical: "Public Sector", address: "9199 113th St N, Seminole, FL 33772" },
    { id: 13, name: "City of S. Pasadena", contact: "Alex Britton-Kant", title: "Director of IT", email: "abrittonkant@mysouthpasadena.com", contacted: true, notes: "Stopped by in person and reached out over email. no response", vertical: "Public Sector", address: "7047 Sunset Dr S, South Pasadena, FL 33707" },
    { id: 14, name: "City of St. Pete Beach", contact: "TBD", title: "TBD", email: "contact@stpetebeach.org", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector", address: "155 Corey Ave, St. Pete Beach, FL 33706" },
    { id: 15, name: "City of Tarpon Springs", contact: "Suzanne Linton", title: "Director of IT", email: "slinton@ctsfl.us", contacted: true, notes: "Connected on linked in. Preparing email to send this week 12/9/25", vertical: "Public Sector", address: "324 E Pine St, Tarpon Springs, FL 34689" }
  ];

  const prospectsHigherEd = [
    { id: 16, name: "Eckerd College", contact: "Jessica Cinney", title: "Director of Campus Safety & Security", email: "cinneyj@eckerd.edu", contact2: "Walter Moore", title2: "Director of IT", email2: "moorewr@eckerd.edu", contact3: "Tonya Womack", title3: "Risk Management & Safety", email3: "womacktm@eckerd.edu", contacted: true, notes: "Old customer that has bad experience with Convergint", vertical: "Higher Education", address: "4200 54th Ave S, St. Petersburg, FL 33711" },
    { id: 17, name: "St. Petersburg College", contact: "TBD", title: "TBD", email: "contact@spcollege.edu", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Higher Education", address: "6605 5th Ave N, St. Petersburg, FL 33710" },
    { id: 18, name: "St. Pete Technical College", contact: "TBD", title: "TBD", email: "contact@sptech.edu", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Higher Education", address: "901 34th St S, St. Petersburg, FL 33711" },
    { id: 19, name: "Polk State College", contact: "Emmett Andrews", title: "Director of Safety & Security", email: "eandrews@polk.edu", contact2: "Martin Gang", title2: "Director of Technology and IT", email2: "mgang@polk.edu", contacted: true, notes: "Reached out over email", vertical: "Higher Education", address: "999 Ave H NE, Winter Haven, FL 33881" }
  ];

  const customersCities = [
    { id: 102, name: "Town of Indian Shores", contact: "Jennifer Angelo", title: "Admin Assistant", email: "jangelo@myindianshores.com", startDate: "2024-06-10", notes: "Current customer", vertical: "Public Sector", bookingAmount: 0, address: "19305 Gulf Blvd, Indian Shores, FL 33785" },
    { id: 103, name: "City of Largo", contact: "Hansel Roush", title: "Director of IT", email: "hroush@largo.com", contact2: "Tim Clark", title2: "IT Admin", email2: "tclark@largo.com", startDate: "2024-03-20", notes: "Current customer", vertical: "Public Sector", bookingAmount: 0, address: "201 Highland Ave, Largo, FL 33770" }
  ];

  const customersTransit = [
    { id: 101, name: "PSTA - Pinellas Suncoast Transit Authority", contact: "Missy Nevitt", title: "Superintendant of Facilities", email: "mnevitt@psta.net", startDate: "12/20/2024", notes: "Current customer", vertical: "Transit", bookingAmount: 124560, address: "14840 49th St N, Clearwater, FL 33762" }
  ];

  const [expandedProspect, setExpandedProspect] = useState(null);
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [weeklyContacts, setWeeklyContacts] = useState(() => {
    const saved = localStorage.getItem('weeklyContacts');
    return saved ? parseInt(saved) : 0;
  });
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    localStorage.setItem('weeklyContacts', weeklyContacts.toString());
  }, [weeklyContacts]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'sales') {
      setIsAuthenticated(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword('');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the weekly contact counter to zero?')) {
      setWeeklyContacts(0);
      localStorage.removeItem('weeklyContacts');
    }
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount);

  const getAllEmails = () => {
    const allProspects = [...prospectsK12, ...prospectsCities, ...prospectsHigherEd];
    const emails = [];
    
    allProspects.forEach(prospect => {
      if (prospect.email && !prospect.email.includes('contact@')) {
        emails.push({ email: prospect.email, name: prospect.contact, org: prospect.name });
      }
      if (prospect.email2) {
        emails.push({ email: prospect.email2, name: prospect.contact2, org: prospect.name });
      }
      if (prospect.email3) {
        emails.push({ email: prospect.email3, name: prospect.contact3, org: prospect.name });
      }
    });
    
    return emails;
  };

  const handleEmailSelection = (email) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(selectedEmails.filter(e => e !== email));
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }
  };

  const handleSelectAll = () => {
    const allEmails = getAllEmails();
    if (selectedEmails.length === allEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(allEmails.map(e => e.email));
    }
  };

  const handleCopyEmails = () => {
    const emailList = selectedEmails.join('; ');
    navigator.clipboard.writeText(emailList);
    alert('Email addresses copied to clipboard!');
  };

  const Card = ({ item, index, isCustomer, expanded, toggle }) => (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-all cursor-pointer" onClick={() => toggle(item.id)}>
      <div className="p-3 flex items-center gap-3">
        <span className="text-slate-400 font-semibold text-sm w-6">{index + 1}</span>
        <div className={`w-3 h-3 rounded-full ${isCustomer ? 'bg-green-500' : (item.contacted ? 'bg-green-500' : 'bg-red-500')}`}></div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{item.name}</h3>
          <p className="text-slate-400 text-xs truncate">{item.contact} • {item.title}</p>
        </div>
        <span className={`text-xs font-medium ${isCustomer ? 'text-green-400 bg-green-900/30' : 'text-blue-400 bg-blue-900/30'} px-2 py-1 rounded-full`}>{item.vertical}</span>
        {isCustomer && <span className="text-xs font-semibold text-emerald-400">{formatCurrency(item.bookingAmount)}</span>}
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${expanded === item.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
      {expanded === item.id && (
        <div className="px-3 pb-3 border-t border-slate-700 pt-3 space-y-1 text-xs">
          <div className="text-slate-300"><span className="text-slate-500">Contact:</span> {item.contact}</div>
          <div className="text-slate-300"><span className="text-slate-500">Title:</span> {item.title}</div>
          <div className="text-slate-300"><span className="text-slate-500">Email:</span> {item.email}</div>
          {item.contact2 && <><div className="text-slate-300 mt-2 pt-2 border-t border-slate-700/50"><span className="text-slate-500">Contact 2:</span> {item.contact2}</div><div className="text-slate-300"><span className="text-slate-500">Title:</span> {item.title2}</div><div className="text-slate-300"><span className="text-slate-500">Email:</span> {item.email2}</div></>}
          {item.contact3 && <><div className="text-slate-300 mt-2 pt-2 border-t border-slate-700/50"><span className="text-slate-500">Contact 3:</span> {item.contact3}</div><div className="text-slate-300"><span className="text-slate-500">Title:</span> {item.title3}</div><div className="text-slate-300"><span className="text-slate-500">Email:</span> {item.email3}</div></>}
          <div className="text-slate-300 mt-2 pt-2 border-t border-slate-700/50"><span className="text-slate-500">Vertical:</span> {item.vertical}</div>
          {!isCustomer ? <><div className="text-slate-300"><span className="text-slate-500">Status:</span> <span className={item.contacted ? 'text-green-400' : 'text-red-400'}>{item.contacted ? 'Contacted' : 'Not Contacted'}</span></div></> : <><div className="text-slate-300"><span className="text-slate-500">Booking:</span> <span className="text-emerald-400">{formatCurrency(item.bookingAmount)}</span></div><div className="text-slate-300"><span className="text-slate-500">Customer Since:</span> <span className="text-green-400">{item.startDate}</span></div></>}
          <div className="text-slate-300"><span className="text-slate-500">Notes:</span> <span className="text-slate-400 italic">{item.notes}</span></div>
        </div>
      )}
    </div>
  );

  const totalProspects = prospectsK12.length + prospectsCities.length + prospectsHigherEd.length;
  const totalCustomers = customersCities.length + customersTransit.length;
  const allProspects = [...prospectsK12, ...prospectsCities, ...prospectsHigherEd];
  const allLocations = [...allProspects, ...customersCities, ...customersTransit];
  const allEmails = getAllEmails();

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <form onSubmit={handleLogin} className={`flex flex-col items-center gap-4 bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 ${shake ? 'animate-shake' : ''}`}>
          <h1 className="text-3xl font-bold text-white mb-4">Sales Dashboard</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter access code"
            className="px-6 py-3 bg-slate-900/50 border-2 border-blue-500/30 rounded-lg text-white text-center text-lg focus:outline-none focus:border-blue-400 transition-all w-64"
            autoFocus
          />
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50 w-64"
          >
            Enter
          </button>
        </form>

        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  // Email Blast View
  if (currentView === 'email') {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Email Blast</h1>
              <p className="text-slate-300 text-sm">Select and copy prospect email addresses</p>
            </div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Email List */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Select Recipients ({selectedEmails.length} selected)</h2>
                  <button
                    onClick={handleSelectAll}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all"
                  >
                    {selectedEmails.length === allEmails.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {allEmails.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleEmailSelection(item.email)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedEmails.includes(item.email)
                          ? 'bg-blue-900/30 border-blue-500'
                          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedEmails.includes(item.email)
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-slate-600'
                        }`}>
                          {selectedEmails.includes(item.email) && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{item.name}</div>
                          <div className="text-slate-400 text-xs">{item.org}</div>
                          <div className="text-blue-400 text-xs">{item.email}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 sticky top-6">
                <h2 className="text-xl font-bold text-white mb-4">Actions</h2>
                
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                    <div className="text-slate-400 text-sm mb-1">Total Recipients</div>
                    <div className="text-white text-2xl font-bold">{selectedEmails.length}</div>
                  </div>

                  <button
                    onClick={handleCopyEmails}
                    disabled={selectedEmails.length === 0}
                    className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                      selectedEmails.length > 0
                        ? 'bg-green-600 hover:bg-green-500 text-white'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Email List
                  </button>

                  <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                    <div className="text-slate-400 text-xs mb-2">Email Preview:</div>
                    <div className="text-white text-xs font-mono bg-slate-900/50 p-2 rounded max-h-64 overflow-y-auto break-all">
                      {selectedEmails.length > 0 ? selectedEmails.join('; ') : 'No emails selected'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Map View
  if (currentView === 'map') {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Prospect Map</h1>
              <p className="text-slate-300 text-sm">Pinellas County, Florida</p>
            </div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all"
            >
              Back to Dashboard
            </button>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 mb-4">
            <h3 className="text-white font-semibold mb-3">All Locations ({allLocations.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              {allLocations.map((loc) => (
                <div key={loc.id} className="text-xs">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${loc.startDate ? 'bg-green-500' : loc.contacted ? 'bg-blue-500' : 'bg-red-500'}`}></span>
                  <span className="text-slate-300">{loc.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden" style={{ height: 'calc(100vh - 300px)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226669.5813558107!2d-82.83385243359375!3d27.86926400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2e663693aaa41%3A0x4cc4003bcd48bff!2sPinellas%20County%2C%20FL!5e0!3m2!1sen!2sus!4v1702405920000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Sales Dashboard</h1>
            <p className="text-slate-300 text-sm">Pipeline Overview</p>
          </div>
          <div className="flex gap-3 items-start">
            <button
              onClick={() => setCurrentView('email')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Blast
            </button>
            <button
              onClick={() => setCurrentView('map')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map View
            </button>
            <div className="flex flex-col gap-2">
              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg px-3 py-1 text-center">
                <p className="text-slate-400 text-xs italic">"This is a new skill that requires training,</p>
                <p className="text-slate-400 text-xs italic">practice and guidance." - Joe Morone</p>
              </div>
              <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg px-4 py-2">
                <div className="text-amber-300 text-xs font-medium">2026 Sales Goal</div>
                <div className="text-amber-400 text-xl font-bold">{formatCurrency(3000000)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Contacts Progress Bar */}
        <div className="mb-4 bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-white">Weekly Contacts</h3>
              <p className="text-sm text-slate-400">Track your outreach progress</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setWeeklyContacts(Math.max(0, weeklyContacts - 1))}
                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded text-red-400 font-bold"
              >
                -
              </button>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{weeklyContacts}</div>
                <div className="text-xs text-slate-400">/ 100 goal</div>
              </div>
              <button
                onClick={() => setWeeklyContacts(weeklyContacts + 1)}
                className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded text-green-400 font-bold"
              >
                +
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded text-slate-300 text-sm font-medium"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4">
            <div 
              className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
              style={{ width: `${Math.min((weeklyContacts / 100) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="mt-2 text-center text-sm">
            <span className={`font-semibold ${weeklyContacts >= 100 ? 'text-green-400' : weeklyContacts >= 50 ? 'text-yellow-400' : 'text-blue-400'}`}>
              {Math.round((weeklyContacts / 100) * 100)}% Complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="mb-3 bg-blue-900/30 rounded-lg p-3 border border-blue-700/50">
              <h2 className="text-xl font-bold text-white">Current Prospects</h2>
              <p className="text-blue-300 text-sm">{totalProspects} active</p>
            </div>
            <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 px-2 border-b border-slate-600 pb-1">Public Sector</h3>
                <h4 className="text-sm font-semibold text-slate-300 mb-2 px-2 pl-3">K-12 Education</h4>
                <div className="space-y-2">{prospectsK12.map((p, i) => <Card key={p.id} item={p} index={i} isCustomer={false} expanded={expandedProspect} toggle={setExpandedProspect} />)}</div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2 mt-3 px-2 pl-3">Cities & Municipalities</h4>
                <div className="space-y-2">{prospectsCities.map((p, i) => <Card key={p.id} item={p} index={i} isCustomer={false} expanded={expandedProspect} toggle={setExpandedProspect} />)}</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 px-2 border-b border-slate-600 pb-1">Higher Education</h3>
                <div className="space-y-2">{prospectsHigherEd.map((p, i) => <Card key={p.id} item={p} index={i} isCustomer={false} expanded={expandedProspect} toggle={setExpandedProspect} />)}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-3 bg-green-900/30 rounded-lg p-3 border border-green-700/50 flex items-center justify-between">
              <div><h2 className="text-xl font-bold text-white">Current Customers</h2><p className="text-green-300 text-sm">{totalCustomers} active</p></div>
              <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg px-3 py-1.5"><div className="text-emerald-300 text-xs">2025 Bookings</div><div className="text-emerald-400 text-lg font-bold">{formatCurrency(507775.82)}</div></div>
            </div>
            <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 px-2 border-b border-slate-600 pb-1">Public Sector</h3>
                <h4 className="text-sm font-semibold text-slate-300 mb-2 px-2 pl-3">Transit</h4>
                <div className="space-y-2">{customersTransit.map((c, i) => <Card key={c.id} item={c} index={i} isCustomer={true} expanded={expandedCustomer} toggle={setExpandedCustomer} />)}</div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2 mt-3 px-2 pl-3">Cities & Municipalities</h4>
                <div className="space-y-2">{customersCities.map((c, i) => <Card key={c.id} item={c} index={i} isCustomer={true} expanded={expandedCustomer} toggle={setExpandedCustomer} />)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesProspectsList;
