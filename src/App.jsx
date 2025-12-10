import React, { useState, useEffect } from 'react';

const SalesProspectsList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);

  const prospectsK12 = [
    { id: 1, name: "Pinellas County School District", contact: "Sean Jowell", title: "Director Safety & Security", email: "jowells@pcsb.org", contacted: true, notes: "Attending Utilities Unite Event in Clearwater", vertical: "K-12" },
    { id: 20, name: "Sumter County Public Schools", contact: "Philip Martin", title: "Director of Safety & Security", email: "philip.martin@sumter.k12.fl.us", contacted: false, notes: "New prospect - need to make initial contact.", vertical: "K-12" }
  ];

  const prospectsCities = [
    { id: 2, name: "City of St. Petersburg", contact: "Sarah Johnson", title: "IT Manager", email: "sjohnson@stpete.org", contacted: false, notes: "Left voicemail on 12/5. Awaiting callback.", vertical: "Public Sector" },
    { id: 3, name: "City of Dunedin", contact: "Michael Nagy", title: "Director of IT", email: "mwilliams@dunedinfl.gov", contact2: "Ronbert Ignacio", title2: "IT Specialist", email2: "ronbert.ignacio@dunedin.gov", contacted: true, notes: "Reachout out through email, no response", vertical: "Public Sector" },
    { id: 5, name: "City of Gulfport", contact: "David Mather", title: "Director of IT", email: "dmather@mygulfport.us", contacted: true, notes: "Visited in person, followed up over email", vertical: "Public Sector" },
    { id: 6, name: "City of Treasure Island", contact: "Chris Pagan", title: "Director of IT", email: "cpagan@mytreasureisland.org", contacted: true, notes: "Visited in person, followed up over email", vertical: "Public Sector" },
    { id: 7, name: "Belleair Beach City", contact: "TBD", title: "TBD", email: "contact@belleairbeach.com", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector" },
    { id: 8, name: "Belleair Bluffs City", contact: "TBD", title: "TBD", email: "contact@belleairbluffs.org", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector" },
    { id: 9, name: "City of Belleair", contact: "TBD", title: "TBD", email: "contact@belleair.net", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector" },
    { id: 11, name: "City of Oldsmar", contact: "TBD", title: "TBD", email: "contact@oldsmar.com", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector" },
    { id: 12, name: "City of Seminole", contact: "Matthew Sabella", title: "Director of IT", email: "msabella@myseminole.com", contacted: true, notes: "reached out over email. Plan to stop by in person soon", vertical: "Public Sector" },
    { id: 13, name: "City of S. Pasadena", contact: "Alex Britton-Kant", title: "Director of IT", email: "abrittonkant@mysouthpasadena.com", contacted: true, notes: "Stopped by in person and reached out over email. no response", vertical: "Public Sector" },
    { id: 14, name: "City of St. Pete Beach", contact: "TBD", title: "TBD", email: "contact@stpetebeach.org", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Public Sector" },
    { id: 15, name: "City of Tarpon Springs", contact: "Suzanne Linton", title: "Director of IT", email: "slinton@ctsfl.us", contacted: true, notes: "Connected on linked in. Preparing email to send this week 12/9/25", vertical: "Public Sector" }
  ];

  const prospectsHigherEd = [
    { id: 16, name: "Eckerd College", contact: "Jessica Cinney", title: "Director of Campus Safety & Security", email: "cinneyj@eckerd.edu", contact2: "Walter Moore", title2: "Director of IT", email2: "moorewr@eckerd.edu", contact3: "Tonya Womack", title3: "Risk Management & Safety", email3: "womacktm@eckerd.edu", contacted: true, notes: "Old customer that has bad experience with Convergint", vertical: "Higher Education" },
    { id: 17, name: "St. Petersburg College", contact: "TBD", title: "TBD", email: "contact@spcollege.edu", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Higher Education" },
    { id: 18, name: "St. Pete Technical College", contact: "TBD", title: "TBD", email: "contact@sptech.edu", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Higher Education" },
    { id: 19, name: "Polk State College", contact: "Emmett Andrews", title: "Director of Safety & Security", email: "eandrews@polk.edu", contact2: "Martin Gang", title2: "Director of Technology and IT", email2: "mgang@polk.edu", contacted: true, notes: "Reached out over email", vertical: "Higher Education" }
  ];

  const customersCities = [
    { id: 102, name: "Town of Indian Shores", contact: "Jennifer Angelo", title: "Admin Assistant", email: "jangelo@myindianshores.com", startDate: "2024-06-10", notes: "Current customer", vertical: "Public Sector", bookingAmount: 0 },
    { id: 103, name: "City of Largo", contact: "Hansel Roush", title: "Director of IT", email: "hroush@largo.com", contact2: "Tim Clark", title2: "IT Admin", email2: "tclark@largo.com", startDate: "2024-03-20", notes: "Current customer", vertical: "Public Sector", bookingAmount: 0 }
  ];

  const customersTransit = [
    { id: 101, name: "PSTA - Pinellas Suncoast Transit Authority", contact: "Missy Nevitt", title: "Superintendant of Facilities", email: "mnevitt@psta.net", startDate: "12/20/2024", notes: "Current customer", vertical: "Transit", bookingAmount: 124560 }
  ];

  const [expandedProspect, setExpandedProspect] = useState(null);
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [dailyActivity, setDailyActivity] = useState(() => {
    const saved = localStorage.getItem('dailyActivity');
    return saved ? JSON.parse(saved) : { calls: 0, emails: 0, linkedin: 0 };
  });
  const [weeklyActivity, setWeeklyActivity] = useState(() => {
    const saved = localStorage.getItem('weeklyActivity');
    return saved ? JSON.parse(saved) : { calls: 0, emails: 0, linkedin: 0 };
  });
  const [monthlyActivity, setMonthlyActivity] = useState(() => {
    const saved = localStorage.getItem('monthlyActivity');
    return saved ? JSON.parse(saved) : { calls: 0, emails: 0, linkedin: 0 };
  });
  const [expandedActivity, setExpandedActivity] = useState({ daily: false, weekly: false, monthly: false });

  useEffect(() => {
    localStorage.setItem('dailyActivity', JSON.stringify(dailyActivity));
  }, [dailyActivity]);

  useEffect(() => {
    localStorage.setItem('weeklyActivity', JSON.stringify(weeklyActivity));
  }, [weeklyActivity]);

  useEffect(() => {
    localStorage.setItem('monthlyActivity', JSON.stringify(monthlyActivity));
  }, [monthlyActivity]);

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
    if (window.confirm('Are you sure you want to reset all activity counters to zero?')) {
      setDailyActivity({ calls: 0, emails: 0, linkedin: 0 });
      setWeeklyActivity({ calls: 0, emails: 0, linkedin: 0 });
      setMonthlyActivity({ calls: 0, emails: 0, linkedin: 0 });
      localStorage.removeItem('dailyActivity');
      localStorage.removeItem('weeklyActivity');
      localStorage.removeItem('monthlyActivity');
    }
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount);

  const handleActivityChange = (period, type, value) => {
    const numValue = parseInt(value) || 0;
    if (period === 'daily') setDailyActivity({ ...dailyActivity, [type]: numValue });
    else if (period === 'weekly') setWeeklyActivity({ ...weeklyActivity, [type]: numValue });
    else if (period === 'monthly') setMonthlyActivity({ ...monthlyActivity, [type]: numValue });
  };

  const toggleActivity = (period) => {
    setExpandedActivity({ ...expandedActivity, [period]: !expandedActivity[period] });
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

  const ActivityCard = ({ title, goals, activity, period, isExpanded }) => {
    const getPercentage = (current, goal) => Math.min((current / goal) * 100, 100);
    const totalCurrent = activity.calls + activity.emails + activity.linkedin;
    const totalGoal = goals.calls + goals.emails + goals.linkedin;
    
    return (
      <div className="bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-700/30 transition-all" onClick={() => toggleActivity(period)}>
          <div>
            <h3 className="text-sm font-semibold text-white">{title} Goals</h3>
            <p className="text-xs text-slate-400">{totalCurrent} / {totalGoal}</p>
          </div>
          <svg className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
        {isExpanded && (
          <div className="px-3 pb-3 border-t border-slate-700 pt-3 space-y-2">
            {['calls', 'emails', 'linkedin'].map((type, i) => (
              <div key={type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-300 text-xs">{type === 'linkedin' ? 'LinkedIn' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  <div className="flex items-center gap-1">
                    <input type="number" value={activity[type]} onChange={(e) => handleActivityChange(period, type, e.target.value)} className="w-12 px-1 py-0.5 bg-slate-700 border border-slate-600 rounded text-white text-xs text-center" onClick={(e) => e.stopPropagation()} />
                    <span className="text-slate-400 text-xs">/{goals[type]}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full transition-all ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-purple-500' : 'bg-cyan-500'}`} style={{ width: `${getPercentage(activity[type], goals[type])}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const totalProspects = prospectsK12.length + prospectsCities.length + prospectsHigherEd.length;
  const totalCustomers = customersCities.length + customersTransit.length;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Floating Orb with Electricity */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            {/* Main Orb */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-500 animate-pulse shadow-2xl shadow-blue-500/50 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-300 via-white to-cyan-200 animate-spin-slow shadow-inner"></div>
            </div>
            
            {/* Electric rings */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            
            {/* Lightning bolts */}
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-16 opacity-70 animate-pulse" viewBox="0 0 10 100">
              <path d="M5 0 L5 40 L8 40 L3 100 L7 60 L5 60 Z" fill="url(#electric-gradient)" />
              <defs>
                <linearGradient id="electric-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 0 }} />
                  <stop offset="50%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#60A5FA', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className={`flex flex-col items-center gap-4 ${shake ? 'animate-shake' : ''}`}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access code"
              className="px-6 py-3 bg-slate-800/50 border-2 border-blue-500/30 rounded-lg text-white text-center text-lg focus:outline-none focus:border-blue-400 transition-all backdrop-blur-sm"
              autoFocus
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
            >
              Enter
            </button>
          </form>
        </div>

        <style jsx>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  // Main Dashboard (after login)
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-start justify-between">
          <div><h1 className="text-3xl font-bold text-white mb-1">Sales Dashboard</h1><p className="text-slate-300 text-sm">Pipeline Overview</p></div>
          <button 
            onClick={handleReset}
            className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500 rounded-lg px-4 py-2 transition-all"
          >
            <div className="text-red-300 text-xs font-medium">Reset Activity</div>
            <div className="text-red-400 text-sm font-semibold">Clear Counters</div>
          </button>
          <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg px-4 py-2"><div className="text-amber-300 text-xs font-medium">2026 Sales Goal</div><div className="text-amber-400 text-xl font-bold">{formatCurrency(3000000)}</div></div>
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <ActivityCard title="Daily" goals={{ calls: 20, emails: 100, linkedin: 400 }} activity={dailyActivity} period="daily" isExpanded={expandedActivity.daily} />
          <ActivityCard title="Weekly" goals={{ calls: 100, emails: 500, linkedin: 2000 }} activity={weeklyActivity} period="weekly" isExpanded={expandedActivity.weekly} />
          <ActivityCard title="Monthly" goals={{ calls: 400, emails: 2000, linkedin: 8000 }} activity={monthlyActivity} period="monthly" isExpanded={expandedActivity.monthly} />
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
