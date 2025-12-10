import React, { useState, useEffect, useRef } from 'react';

const SalesProspectsList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [pitchVersion, setPitchVersion] = useState(0);
  const [editingProspect, setEditingProspect] = useState(null);
  const [showAddProspect, setShowAddProspect] = useState(false);
  const [newProspect, setNewProspect] = useState({
    name: '',
    contact: '',
    title: '',
    email: '',
    contact2: '',
    title2: '',
    email2: '',
    contact3: '',
    title3: '',
    email3: '',
    vertical: 'Public Sector',
    contacted: false,
    notes: ''
  });

  const [prospectsK12, setProspectsK12] = useState(() => {
    const saved = localStorage.getItem('prospectsK12');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Pinellas County School District", contact: "Sean Jowell", title: "Director Safety & Security", email: "jowells@pcsb.org", contacted: true, notes: "Attending Utilities Unite Event in Clearwater", vertical: "K-12" },
      { id: 20, name: "Sumter County Public Schools", contact: "Philip Martin", title: "Director of Safety & Security", email: "philip.martin@sumter.k12.fl.us", contacted: false, notes: "New prospect - need to make initial contact.", vertical: "K-12" }
    ];
  });

  const [prospectsCities, setProspectsCities] = useState(() => {
    const saved = localStorage.getItem('prospectsCities');
    return saved ? JSON.parse(saved) : [
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
  });

  const [prospectsHigherEd, setProspectsHigherEd] = useState(() => {
    const saved = localStorage.getItem('prospectsHigherEd');
    return saved ? JSON.parse(saved) : [
      { id: 16, name: "Eckerd College", contact: "Jessica Cinney", title: "Director of Campus Safety & Security", email: "cinneyj@eckerd.edu", contact2: "Walter Moore", title2: "Director of IT", email2: "moorewr@eckerd.edu", contact3: "Tonya Womack", title3: "Risk Management & Safety", email3: "womacktm@eckerd.edu", contacted: true, notes: "Old customer that has bad experience with Convergint", vertical: "Higher Education" },
      { id: 17, name: "St. Petersburg College", contact: "TBD", title: "TBD", email: "contact@spcollege.edu", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Higher Education" },
      { id: 18, name: "St. Pete Technical College", contact: "TBD", title: "TBD", email: "contact@sptech.edu", contacted: false, notes: "New prospect - need to identify contact.", vertical: "Higher Education" },
      { id: 19, name: "Polk State College", contact: "Emmett Andrews", title: "Director of Safety & Security", email: "eandrews@polk.edu", contact2: "Martin Gang", title2: "Director of Technology and IT", email2: "mgang@polk.edu", contacted: true, notes: "Reached out over email", vertical: "Higher Education" }
    ];
  });

  const customersCities = [
    { id: 102, name: "Town of Indian Shores", contact: "Jennifer Angelo", title: "Admin Assistant", email: "jangelo@myindianshores.com", startDate: "2024-06-10", notes: "Current customer", vertical: "Public Sector", bookingAmount: 0 },
    { id: 103, name: "City of Largo", contact: "Hansel Roush", title: "Director of IT", email: "hroush@largo.com", contact2: "Tim Clark", title2: "IT Admin", email2: "tclark@largo.com", startDate: "2024-03-20", notes: "Current customer", vertical: "Public Sector", bookingAmount: 0 }
  ];

  const customersTransit = [
    { id: 101, name: "PSTA - Pinellas Suncoast Transit Authority", contact: "Missy Nevitt", title: "Superintendant of Facilities", email: "mnevitt@psta.net", startDate: "12/20/2024", notes: "Current customer", vertical: "Transit", bookingAmount: 124560 }
  ];

  const [expandedProspect, setExpandedProspect] = useState(null);
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [weeklyContacts, setWeeklyContacts] = useState(() => {
    const saved = localStorage.getItem('weeklyContacts');
    return saved ? parseInt(saved) : 0;
  });
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [manualContacts, setManualContacts] = useState(() => {
    const saved = localStorage.getItem('manualContacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    org: '',
    email: ''
  });

  // Refs for edit form
  const nameRef = useRef(null);
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const emailRef = useRef(null);
  const contact2Ref = useRef(null);
  const title2Ref = useRef(null);
  const email2Ref = useRef(null);
  const contact3Ref = useRef(null);
  const title3Ref = useRef(null);
  const email3Ref = useRef(null);
  const contactedRef = useRef(null);
  const notesRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('weeklyContacts', weeklyContacts.toString());
  }, [weeklyContacts]);

  useEffect(() => {
    localStorage.setItem('manualContacts', JSON.stringify(manualContacts));
  }, [manualContacts]);

  useEffect(() => {
    localStorage.setItem('prospectsK12', JSON.stringify(prospectsK12));
  }, [prospectsK12]);

  useEffect(() => {
    localStorage.setItem('prospectsCities', JSON.stringify(prospectsCities));
  }, [prospectsCities]);

  useEffect(() => {
    localStorage.setItem('prospectsHigherEd', JSON.stringify(prospectsHigherEd));
  }, [prospectsHigherEd]);

  const updateProspect = (id, vertical, updatedData) => {
    if (vertical === 'K-12') {
      setProspectsK12(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    } else if (vertical === 'Higher Education') {
      setProspectsHigherEd(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    } else if (vertical === 'Public Sector') {
      setProspectsCities(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    }
  };

  const addProspect = (prospectData) => {
    const newProspectWithId = {
      ...prospectData,
      id: Date.now()
    };

    if (prospectData.vertical === 'K-12') {
      setProspectsK12(prev => [...prev, newProspectWithId]);
    } else if (prospectData.vertical === 'Higher Education') {
      setProspectsHigherEd(prev => [...prev, newProspectWithId]);
    } else {
      setProspectsCities(prev => [...prev, newProspectWithId]);
    }
  };

  const deleteProspect = (id, vertical) => {
    if (window.confirm('Are you sure you want to delete this prospect?')) {
      if (vertical === 'K-12') {
        setProspectsK12(prev => prev.filter(p => p.id !== id));
      } else if (vertical === 'Higher Education') {
        setProspectsHigherEd(prev => prev.filter(p => p.id !== id));
      } else if (vertical === 'Public Sector') {
        setProspectsCities(prev => prev.filter(p => p.id !== id));
      }
      setEditingProspect(null);
      setExpandedProspect(null);
    }
  };

  const handleAddProspect = () => {
    if (newProspect.name && newProspect.contact && newProspect.email) {
      addProspect(newProspect);
      setNewProspect({
        name: '',
        contact: '',
        title: '',
        email: '',
        contact2: '',
        title2: '',
        email2: '',
        contact3: '',
        title3: '',
        email3: '',
        vertical: 'Public Sector',
        contacted: false,
        notes: ''
      });
      setShowAddProspect(false);
    } else {
      alert('Please fill in at least Organization Name, Contact Name, and Email');
    }
  };

  const startEdit = (prospect) => {
    setEditingProspect(prospect.id);
    setExpandedProspect(null);
    
    setTimeout(() => {
      if (nameRef.current) nameRef.current.value = prospect.name || '';
      if (contactRef.current) contactRef.current.value = prospect.contact || '';
      if (titleRef.current) titleRef.current.value = prospect.title || '';
      if (emailRef.current) emailRef.current.value = prospect.email || '';
      if (contact2Ref.current) contact2Ref.current.value = prospect.contact2 || '';
      if (title2Ref.current) title2Ref.current.value = prospect.title2 || '';
      if (email2Ref.current) email2Ref.current.value = prospect.email2 || '';
      if (contact3Ref.current) contact3Ref.current.value = prospect.contact3 || '';
      if (title3Ref.current) title3Ref.current.value = prospect.title3 || '';
      if (email3Ref.current) email3Ref.current.value = prospect.email3 || '';
      if (contactedRef.current) contactedRef.current.value = prospect.contacted ? 'true' : 'false';
      if (notesRef.current) notesRef.current.value = prospect.notes || '';
    }, 0);
  };

  const cancelEdit = () => {
    setEditingProspect(null);
  };

  const saveEdit = (item) => {
    const updatedData = {
      name: nameRef.current?.value || '',
      contact: contactRef.current?.value || '',
      title: titleRef.current?.value || '',
      email: emailRef.current?.value || '',
      contact2: contact2Ref.current?.value || '',
      title2: title2Ref.current?.value || '',
      email2: email2Ref.current?.value || '',
      contact3: contact3Ref.current?.value || '',
      title3: title3Ref.current?.value || '',
      email3: email3Ref.current?.value || '',
      contacted: contactedRef.current?.value === 'true',
      notes: notesRef.current?.value || ''
    };
    
    updateProspect(item.id, item.vertical, updatedData);
    setEditingProspect(null);
  };

  const generateElevatorPitch = (prospect, version) => {
    if (!prospect) return "";
    const vertical = prospect.vertical;
    const contactName = prospect.contact;
    const orgName = prospect.name;
    
    const pitches = {
      "K-12": [
        `${contactName}, are you finding that ${orgName} needs to improve student safety response times while meeting compliance requirements? Top-performing districts are reducing incident response by 40% through integrated monitoring - is this important to you right now?`,
        `${contactName}, I'm curious - is ${orgName} facing pressure to enhance campus security while staying within budget constraints? Leading school districts are achieving both by modernizing their safety infrastructure - does this resonate with your current priorities?`,
        `${contactName}, many directors like yourself are discovering that traditional security approaches no longer meet today's compliance standards. Top districts are improving emergency response effectiveness by 40% - is enhancing ${orgName}'s safety posture something you're focused on?`,
        `${contactName}, are incident response times and comprehensive security visibility challenges that ${orgName} is working to address? The highest-performing districts are cutting response times nearly in half through strategic technology deployment - is this relevant to your team?`,
        `${contactName}, I've noticed that many school safety leaders are under increasing pressure to demonstrate measurable improvements in both response capability and compliance. Is strengthening ${orgName}'s competitive position in student safety important to you right now?`
      ],
      "Public Sector": [
        `${contactName}, are IT operational costs and aging infrastructure limiting ${orgName}'s ability to deliver critical services to residents? Leading municipalities are reducing cycle time by 35% through modernization - is improving service delivery important to your team right now?`,
        `${contactName}, I'm reaching out because many IT Directors are facing pressure to do more with less while maintaining service quality. Top-performing cities are enhancing operational efficiency by over a third - does improving ${orgName}'s competitive position matter to you?`,
        `${contactName}, are you finding that legacy systems are creating bottlenecks in ${orgName}'s ability to serve residents effectively? Leading municipalities are cutting operational cycle time by 35% through strategic infrastructure upgrades - is this a priority for your team?`,
        `${contactName}, many directors like yourself are discovering that infrastructure limitations directly impact service delivery quality. The most competitive cities are achieving dramatic improvements in first-time quality - is strengthening ${orgName}'s operational excellence important to you right now?`,
        `${contactName}, I'm curious - is ${orgName} under pressure to reduce costs while simultaneously improving service reliability for residents? Top-performing municipalities are achieving both through modernization strategies - does this align with your current objectives?`
      ],
      "Higher Education": [
        `${contactName}, is ${orgName} looking to improve campus safety response while meeting compliance requirements? Leading institutions are achieving 24/7 visibility with 50% better incident management - does this align with your priorities?`,
        `${contactName}, I'm curious - are you facing pressure to enhance campus security without significantly increasing operational overhead? Top colleges are leveraging integrated solutions to improve both safety outcomes and cost efficiency - is this relevant to your situation?`,
        `${contactName}, many campus safety directors are discovering that traditional approaches no longer satisfy today's regulatory requirements. Leading institutions are improving incident response by 50% - is strengthening ${orgName}'s safety posture important to you right now?`,
        `${contactName}, are comprehensive security visibility and faster emergency response challenges that ${orgName} is working to address? The most competitive institutions are achieving round-the-clock monitoring with dramatically better outcomes - does this matter to your team?`,
        `${contactName}, I've noticed that campus safety leaders are under increasing pressure to demonstrate measurable improvements while managing tight budgets. Is enhancing ${orgName}'s competitive position in student protection a priority for you?`
      ],
      "Transit": [
        `${contactName}, is ${orgName} finding that operational efficiency and rider safety are becoming harder to balance with existing systems? Top transit authorities are improving service reliability by 40% through smart infrastructure - is this a priority for your team?`,
        `${contactName}, I'm reaching out because many facility superintendents are facing pressure to reduce maintenance costs while improving system uptime. Leading transit agencies are achieving both objectives simultaneously - does strengthening ${orgName}'s operational performance matter to you?`,
        `${contactName}, are you discovering that aging infrastructure is limiting ${orgName}'s ability to maintain consistent service levels? Top-performing authorities are enhancing reliability by 40% through strategic upgrades - is this important to your team right now?`,
        `${contactName}, many superintendents like yourself are finding that traditional approaches create conflicts between cost control and service quality. The most competitive transit systems are resolving this through smart technology deployment - is this relevant to your situation?`,
        `${contactName}, I'm curious - is ${orgName} under pressure to improve both rider experience and operational efficiency with existing budget constraints? Leading authorities are achieving dramatic improvements through infrastructure modernization - does this align with your priorities?`
      ],
      "Manual": [
        `${contactName}, I'm reaching out because many organizations like ${orgName} are discovering that their current approaches no longer meet today's competitive requirements. Leading companies are achieving significant improvements through strategic initiatives - is this something you're focused on right now?`,
        `${contactName}, are you finding that ${orgName} faces pressure to improve efficiency while maintaining quality? Top-performing organizations are achieving both objectives through smart solutions - does this resonate with your current priorities?`,
        `${contactName}, I'm curious - is ${orgName} looking to strengthen its competitive position in the market? Leading companies are achieving measurable improvements that drive real business value - is this relevant to your team?`
      ]
    };
    
    const verticalPitches = pitches[vertical] || pitches["Manual"];
    return verticalPitches[version % verticalPitches.length];
  };

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
      if (prospect.email2) emails.push({ email: prospect.email2, name: prospect.contact2, org: prospect.name });
      if (prospect.email3) emails.push({ email: prospect.email3, name: prospect.contact3, org: prospect.name });
    });
    manualContacts.forEach(contact => {
      emails.push({ email: contact.email, name: contact.name, org: contact.org });
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
    navigator.clipboard.writeText(selectedEmails.join('; '));
    alert('Email addresses copied to clipboard!');
  };

  const handleCopyPitch = (pitch) => {
    navigator.clipboard.writeText(pitch);
    alert('Elevator pitch copied to clipboard!');
  };

  const handleEnhancePitch = () => {
    setPitchVersion(pitchVersion + 1);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      const newContactWithDefaults = {
        ...newContact,
        id: Date.now(),
        contact: newContact.name,
        name: newContact.org || 'Manual Contact',
        title: 'Manual Entry',
        vertical: 'Manual',
        contacted: false,
        notes: 'Manually added contact'
      };
      setManualContacts([...manualContacts, newContactWithDefaults]);
      setNewContact({ name: '', org: '', email: '' });
      setShowAddContact(false);
    } else {
      alert('Please fill in at least name and email fields');
    }
  };

  const handleDeleteManualContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setManualContacts(manualContacts.filter(c => c.id !== id));
      setSelectedEmails(selectedEmails.filter(email => {
        const contact = manualContacts.find(c => c.id === id);
        return email !== contact?.email;
      }));
    }
  };

  const Card = ({ item, index, isCustomer, expanded, toggle }) => {
    const isEditing = editingProspect === item.id;

    if (isEditing && !isCustomer) {
      return (
        <div className="bg-slate-800/50 rounded-lg border-2 border-blue-500 p-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Organization Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  defaultValue={item.name}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Contact Name</label>
                <input
                  ref={contactRef}
                  type="text"
                  defaultValue={item.contact}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Title</label>
                <input
                  ref={titleRef}
                  type="text"
                  defaultValue={item.title}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Email</label>
                <input
                  ref={emailRef}
                  type="email"
                  defaultValue={item.email}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Contact 2 Name</label>
                <input
                  ref={contact2Ref}
                  type="text"
                  defaultValue={item.contact2 || ''}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Title 2</label>
                <input
                  ref={title2Ref}
                  type="text"
                  defaultValue={item.title2 || ''}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label className="text-slate-400 text-xs mb-1 block">Email 2</label>
                <input
                  ref={email2Ref}
                  type="email"
                  defaultValue={item.email2 || ''}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Contact 3 Name</label>
                <input
                  ref={contact3Ref}
                  type="text"
                  defaultValue={item.contact3 || ''}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Title 3</label>
                <input
                  ref={title3Ref}
                  type="text"
                  defaultValue={item.title3 || ''}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label className="text-slate-400 text-xs mb-1 block">Email 3</label>
                <input
                  ref={email3Ref}
                  type="email"
                  defaultValue={item.email3 || ''}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Contacted Status</label>
              <select
                ref={contactedRef}
                defaultValue={item.contacted ? 'true' : 'false'}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="false">Not Contacted</option>
                <option value="true">Contacted</option>
              </select>
            </div>
            
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Notes</label>
              <textarea
                ref={notesRef}
                defaultValue={item.notes}
                rows={3}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => saveEdit(item)}
                className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all"
              >
                Save Changes
              </button>
              <button
                onClick={cancelEdit}
                className="flex-1 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProspect(item.id, item.vertical)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-all">
        <div className="p-3 flex items-center gap-3">
          <span className="text-slate-400 font-semibold text-sm w-6">{index + 1}</span>
          <div className={`w-3 h-3 rounded-full ${isCustomer ? 'bg-green-500' : (item.contacted ? 'bg-green-500' : 'bg-red-500')}`}></div>
          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggle(item.id)}>
            <h3 className="text-white font-semibold text-sm truncate">{item.name}</h3>
            <p className="text-slate-400 text-xs truncate">{item.contact} • {item.title}</p>
          </div>
          <span className={`text-xs font-medium ${isCustomer ? 'text-green-400 bg-green-900/30' : 'text-blue-400 bg-blue-900/30'} px-2 py-1 rounded-full`}>{item.vertical}</span>
          {isCustomer && <span className="text-xs font-semibold text-emerald-400">{formatCurrency(item.bookingAmount)}</span>}
          {!isCustomer && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                startEdit(item);
              }}
              className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded text-blue-400 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          <svg 
            className={`w-4 h-4 text-slate-400 transition-transform cursor-pointer ${expanded === item.id ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            onClick={() => toggle(item.id)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
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
  };

  const totalProspects = prospectsK12.length + prospectsCities.length + prospectsHigherEd.length + manualContacts.length;
  const totalCustomers = customersCities.length + customersTransit.length;
  const allEmails = getAllEmails();
  const allProspects = [...prospectsK12, ...prospectsCities, ...prospectsHigherEd, ...manualContacts];

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <form onSubmit={handleLogin} className={`flex flex-col items-center gap-4 bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 ${shake ? 'animate-shake' : ''}`}>
          <h1 className="text-3xl font-bold text-white mb-4">Tim's Prospecting Model</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter access code" className="px-6 py-3 bg-slate-900/50 border-2 border-blue-500/30 rounded-lg text-white text-center text-lg focus:outline-none focus:border-blue-400 transition-all w-64" autoFocus />
          <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50 w-64">Enter</button>
        </form>
        <style jsx>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } } .animate-shake { animation: shake 0.3s ease-in-out; }`}</style>
      </div>
    );
  }

  if (currentView === 'joe') {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div><h1 className="text-3xl font-bold text-white mb-1">Joe Morone's Smart Sales Method</h1><p className="text-slate-300 text-sm">SEL Model: Survival → Emotion → Logic</p></div>
            <button onClick={() => { setCurrentView('dashboard'); setSelectedProspect(null); setPitchVersion(0); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all">Back to Dashboard</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 mb-4">
                <h2 className="text-xl font-bold text-white mb-3">Select a Prospect</h2>
                <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                  {allProspects.map((prospect) => (
                    <div key={prospect.id} onClick={() => { setSelectedProspect(prospect); setPitchVersion(0); }} className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedProspect?.id === prospect.id ? 'bg-orange-900/30 border-orange-500' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full ${prospect.contacted ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{prospect.name}</div>
                          <div className="text-slate-400 text-xs">{prospect.contact} • {prospect.title}</div>
                          <div className="text-blue-400 text-xs">{prospect.vertical}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 sticky top-6">
                <h2 className="text-xl font-bold text-white mb-4">Smart Sales Pitch</h2>
                {selectedProspect ? (
                  <div className="space-y-4">
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                      <div className="text-slate-400 text-xs mb-1">Selected Contact</div>
                      <div className="text-white font-semibold">{selectedProspect.contact}</div>
                      <div className="text-slate-300 text-sm">{selectedProspect.title}</div>
                      <div className="text-blue-400 text-xs mt-1">{selectedProspect.name}</div>
                    </div>
                    <div className="bg-orange-900/20 border border-orange-500/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                          <span className="text-orange-400 font-semibold text-sm">Elevator Pitch</span>
                        </div>
                        <span className="text-orange-300 text-xs">v{pitchVersion + 1}</span>
                      </div>
                      <p className="text-white text-sm leading-relaxed">{generateElevatorPitch(selectedProspect, pitchVersion)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleEnhancePitch} className="py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Enhance
                      </button>
                      <button onClick={() => handleCopyPitch(generateElevatorPitch(selectedProspect, pitchVersion))} className="py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                      </button>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                      <div className="text-slate-400 text-xs mb-2">Smart Sales Method (SEL)</div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2"><span className="text-blue-400 font-bold">S:</span><span className="text-slate-300">Survival - Address business competitiveness</span></div>
                        <div className="flex items-start gap-2"><span className="text-purple-400 font-bold">E:</span><span className="text-slate-300">Emotion - Ask "Why? Why now?"</span></div>
                        <div className="flex items-start gap-2"><span className="text-green-400 font-bold">L:</span><span className="text-slate-300">Logic - Propose feasibility assessment</span></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-8">
                    <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <p className="text-sm">Select a prospect to generate a customized elevator pitch</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'email') {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div><h1 className="text-3xl font-bold text-white mb-1">Email Blast</h1><p className="text-slate-300 text-sm">Select and copy prospect email addresses</p></div>
            <button onClick={() => setCurrentView('dashboard')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all">Back to Dashboard</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Select Recipients ({selectedEmails.length} selected)</h2>
                  <button onClick={handleSelectAll} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all">{selectedEmails.length === allEmails.length ? 'Deselect All' : 'Select All'}</button>
                </div>
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {allEmails.map((item, index) => {
                    const isManual = manualContacts.some(c => c.email === item.email);
                    return (
                      <div key={index} className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedEmails.includes(item.email) ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'}`}>
                        <div className="flex items-center gap-3" onClick={() => handleEmailSelection(item.email)}>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedEmails.includes(item.email) ? 'bg-blue-600 border-blue-600' : 'border-slate-600'}`}>
                            {selectedEmails.includes(item.email) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="text-white font-semibold text-sm">{item.name}</div>
                              {isManual && <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/50">Manual</span>}
                            </div>
                            <div className="text-slate-400 text-xs">{item.org}</div>
                            <div className="text-blue-400 text-xs">{item.email}</div>
                          </div>
                          {isManual && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const contact = manualContacts.find(c => c.email === item.email);
                                if (contact) handleDeleteManualContact(contact.id);
                              }}
                              className="p-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded text-red-400 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 mb-4 sticky top-6">
                <h2 className="text-xl font-bold text-white mb-4">Actions</h2>
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                    <div className="text-slate-400 text-sm mb-1">Total Recipients</div>
                    <div className="text-white text-2xl font-bold">{selectedEmails.length}</div>
                  </div>
                  <button onClick={handleCopyEmails} disabled={selectedEmails.length === 0} className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${selectedEmails.length > 0 ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Copy Email List
                  </button>
                  <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                    <div className="text-slate-400 text-xs mb-2">Email Preview:</div>
                    <div className="text-white text-xs font-mono bg-slate-900/50 p-2 rounded max-h-64 overflow-y-auto break-all">{selectedEmails.length > 0 ? selectedEmails.join('; ') : 'No emails selected'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-white">Manual Contacts</h2>
                  <span className="text-xs text-slate-400">{manualContacts.length} added</span>
                </div>
                
                {!showAddContact ? (
                  <button
                    onClick={() => setShowAddContact(true)}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Contact
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Name *</label>
                      <input
                        type="text"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Organization</label>
                      <input
                        type="text"
                        value={newContact.org}
                        onChange={(e) => setNewContact({ ...newContact, org: e.target.value })}
                        placeholder="Company Name"
                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Email *</label>
                      <input
                        type="email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        placeholder="john.doe@example.com"
                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddContact}
                        className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setShowAddContact(false);
                          setNewContact({ name: '', org: '', email: '' });
                        }}
                        className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-start justify-between">
          <div><h1 className="text-3xl font-bold text-white mb-1">Tim's Prospecting Model</h1><p className="text-slate-300 text-sm">Pipeline Overview</p></div>
          <div className="flex gap-3 items-start">
            <button onClick={() => setCurrentView('joe')} className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              Joe Morone
            </button>
            <button onClick={() => setCurrentView('email')} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email Blast
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
        <div className="mb-4 bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <div><h3 className="text-lg font-semibold text-white">Weekly Contacts</h3><p className="text-sm text-slate-400">Track your outreach progress</p></div>
            <div className="flex items-center gap-3">
              <button onClick={() => setWeeklyContacts(Math.max(0, weeklyContacts - 1))} className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded text-red-400 font-bold">-</button>
              <div className="text-center"><div className="text-3xl font-bold text-white">{weeklyContacts}</div><div className="text-xs text-slate-400">/ 100 goal</div></div>
              <button onClick={() => setWeeklyContacts(weeklyContacts + 1)} className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded text-green-400 font-bold">+</button>
              <button onClick={handleReset} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded text-slate-300 text-sm font-medium">Reset</button>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4"><div className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500" style={{ width: `${Math.min((weeklyContacts / 100) * 100, 100)}%` }}></div></div>
          <div className="mt-2 text-center text-sm"><span className={`font-semibold ${weeklyContacts >= 100 ? 'text-green-400' : weeklyContacts >= 50 ? 'text-yellow-400' : 'text-blue-400'}`}>{Math.round((weeklyContacts / 100) * 100)}% Complete</span></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="mb-3 bg-blue-900/30 rounded-lg p-3 border border-blue-700/50 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Current Prospects</h2>
                <p className="text-blue-300 text-sm">{totalProspects} active</p>
              </div>
              <button
                onClick={() => setShowAddProspect(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Prospect
              </button>
            </div>

            {showAddProspect && (
              <div className="mb-4 bg-slate-800/50 rounded-lg border-2 border-green-500 p-4">
                <h3 className="text-lg font-bold text-white mb-3">Add New Prospect</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Organization Name *</label>
                      <input
                        type="text"
                        value={newProspect.name}
                        onChange={(e) => setNewProspect({ ...newProspect, name: e.target.value })}
                        placeholder="Company/Organization"
                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Contact Name *</label>
                      <input
                        type="text"
                        value={newProspect.contact}
                        onChange={(e) => setNewProspect({ ...newProspect, contact: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Title</label>
                      <input
                        type="text"
                        value={newProspect.title}
                        onChange={(e) => setNewProspect({ ...newProspect, title: e.target.value })}
                        placeholder="Director of IT"
                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Email *</label>
                      <input
                        type="email"
                        value={newProspect.email}
                        onChange={(e) => setNewProspect({ ...newProspect, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">Vertical</label>
                    <select
                      value={newProspect.vertical}
                      onChange={(e) => setNewProspect({ ...newProspect, vertical: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="Public Sector">Public Sector</option>
                      <option value="K-12">K-12 Education</option>
                      <option value="Higher Education">Higher Education</option>
                      <option value="Transit">Transit</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">Notes</label>
                    <textarea
                      value={newProspect.notes}
                      onChange={(e) => setNewProspect({ ...newProspect, notes: e.target.value })}
                      rows={2}
                      placeholder="Additional notes..."
                      className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddProspect}
                      className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all"
                    >
                      Add Prospect
                    </button>
                    <button
                      onClick={() => {
                        setShowAddProspect(false);
                        setNewProspect({
                          name: '',
                          contact: '',
                          title: '',
                          email: '',
                          contact2: '',
                          title2: '',
                          email2: '',
                          contact3: '',
                          title3: '',
                          email3: '',
                          vertical: 'Public Sector',
                          contacted: false,
                          notes: ''
                        });
                      }}
                      className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 max-h-[calc(100vh-420px)] overflow-y-auto pr-2">
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
              {manualContacts.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 px-2 border-b border-slate-600 pb-1">Manual Contacts</h3>
                  <div className="space-y-2">{manualContacts.map((p, i) => <Card key={p.id} item={p} index={i} isCustomer={false} expanded={expandedProspect} toggle={setExpandedProspect} />)}</div>
                </div>
              )}
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
