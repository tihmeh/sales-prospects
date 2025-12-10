import React, { useState } from 'react';

const SalesProspectsList = () => {
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
  const [dailyActivity, setDailyActivity] = useState({ calls: 0, emails: 0, linkedin: 0 });
  const [weeklyActivity, setWeeklyActivity] = useState({ calls: 0, emails: 0, linkedin: 0 });
  const [monthlyActivity, setMonthlyActivity] = useState({ calls: 0, emails: 0, linkedin: 0 });

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount);

  const handleActivityChange = (period, type, value) => {
    const numValue = parseInt(value) || 0;
    if (period === 'daily') setDailyActivity({ ...dailyActivity, [type]: numValue });
    else if (period === 'weekly') setWeeklyActivity({ ...weeklyActivity, [type]: numValue });
    else if (period === 'monthly') setMonthlyActivity({ ...monthlyActivity, [type]: numValue });
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

  const ActivityCard = ({ title, goals, activity, period }) => {
    const getPercentage = (current, goal) => Math.min((current / goal) * 100, 100);
    return (
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3">
        <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
        <div className="space-y-2">
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
      </div>
    );
  };

  const totalProspects = prospectsK12.length + prospectsCities.length + prospectsHigherEd.length;
  const totalCustomers = customersCities.length + customersTransit.length;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-start justify-between">
          <div><h1 className="text-3xl font-bold text-white mb-1">Sales Dashboard</h1><p className="text-slate-300 text-sm">Pipeline Overview</p></div>
          <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg px-4 py-2"><div className="text-amber-300 text-xs font-medium">2026 Sales Goal</div><div className="text-amber-400 text-xl font-bold">{formatCurrency(3000000)}</div></div>
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <ActivityCard title="Daily" goals={{ calls: 20, emails: 100, linkedin: 400 }} activity={dailyActivity} period="daily" />
          <ActivityCard title="Weekly" goals={{ calls: 100, emails: 500, linkedin: 2000 }} activity={weeklyActivity} period="weekly" />
          <ActivityCard title="Monthly" goals={{ calls: 400, emails: 2000, linkedin: 8000 }} activity={monthlyActivity} period="monthly" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="mb-3 bg-blue-900/30 rounded-lg p-3 border border-blue-700/50">
              <h2 className="text-xl font-bold text-white">Current Prospects</h2>
              <p className="text-blue-300 text-sm">{totalProspects} active</p>
            </div>
            <div className="space-y-4 max-h-[calc(100vh-380px)] overflow-y-auto pr-2">
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
            <div className="space-y-4 max-h-[calc(100vh-380px)] overflow-y-auto pr-2">
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
