import React, { useState } from 'react';
import {
  Headphones,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  Send,
  Terminal,
  Zap,
  UserCheck,
  Check
} from 'lucide-react';

// Mock Ticket Data
const initialTickets = [
  {
    id: 'TICK-9042',
    user: '0x4F82...b91C',
    category: 'Stuck Transaction / Low Gas',
    urgency: 'High',
    status: 'Open',
    timestamp: '4 mins ago',
    details: 'Transaction submitted on Arbitrum is pending for 45 minutes. Nonce #42. Gas price is set to 0.1 Gwei.',
    txHash: '0x8f9c21a342e11892bc7114a3',
    network: 'Arbitrum One',
    errorLog: 'REPLACEMENT_UNDERPRICED: fee too low to replace pending tx',
  },
  {
    id: 'TICK-9041',
    user: '0x1A2B...3C4D',
    category: 'Incorrect Network / Chain Error',
    urgency: 'Medium',
    status: 'In Progress',
    timestamp: '18 mins ago',
    details: 'User trying to claim staking rewards on Base, but wallet is connected to Ethereum Mainnet.',
    txHash: 'N/A',
    network: 'Ethereum Mainnet (Expected: Base)',
    errorLog: 'CHAIN_MISMATCH: Expected chain ID 8453, received 1',
  },
  {
    id: 'TICK-9040',
    user: '0x99EE...8811',
    category: 'Token Not Showing in Wallet',
    urgency: 'Low',
    status: 'Resolved',
    timestamp: '1 hour ago',
    details: 'User successfully swapped ETH for custom governance token on Uniswap V3, but balance shows 0 in MetaMask.',
    txHash: '0x3e21aff098124b11923a',
    network: 'Ethereum Mainnet',
    errorLog: 'TOKEN_NOT_IMPORTED: Contract 0x6b175... not in local token registry',
  },
  {
    id: 'TICK-9039',
    user: '0x7C33...2A90',
    category: 'Wallet Signature Rejection',
    urgency: 'Medium',
    status: 'Open',
    timestamp: '2 hours ago',
    details: 'User gets "User Denied Signature" error every time they attempt to verify ownership via WalletConnect.',
    txHash: 'N/A',
    network: 'Polygon',
    errorLog: 'ACTION_REJECTED: User rejected the request in their hardware wallet.',
  }
];

// Response Macros
const supportMacros = [
  {
    title: 'Stuck Transaction / Gas Boost Fix',
    text: "Hello! I see your transaction is stuck due to low gas pricing. To resolve this, open your wallet (MetaMask/Rabby), go to the Activity tab, select the pending transaction, and click 'Speed Up' or 'Cancel' to resubmit with recommended current base fees."
  },
  {
    title: 'Network Mismatch Switch Guide',
    text: "Hi there! It looks like your wallet is on the wrong network. Please click the 1-click network switch prompt inside our DApp interface, or manually switch your wallet network to match the target chain before trying again."
  },
  {
    title: 'Import Custom Token Contract',
    text: "Greetings! Don't worry—your tokens are safe on-chain. Since this is a custom token contract, you just need to import the contract address manually in your wallet under 'Import Tokens' using the official verified contract address."
  }
];

export default function App() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState(initialTickets[0]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [agentReply, setAgentReply] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  // Filter logic
  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = filter === 'All' || ticket.status === filter;
    const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleResolveTicket = (id) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    if (selectedTicket.id === id) {
      setSelectedTicket({ ...selectedTicket, status: 'Resolved' });
    }
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!agentReply.trim()) return;
    setAgentReply('');
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Action successfully executed & logged!</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center space-x-2">
              <span>ChainDesk Support Suite</span>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">v1.2-PROD</span>
            </h1>
            <p className="text-xs text-slate-400">Web3 Tier-1/Tier-2 Technical Operations & Escalation Workspace</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300 font-medium">RPC Nodes: Optimal (18ms)</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300">Agent: Alex_DevSupport</span>
          </div>
        </div>
      </header>

      {/* Main App Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">

        {/* Left Column: Ticket Queue (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900/50 border-r border-slate-800 flex flex-col h-[calc(100vh-73px)]">

          {/* Search & Filters */}
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search ticket ID, wallet, or issue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex space-x-1 overflow-x-auto pb-1">
              {['All', 'Open', 'In Progress', 'Resolved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filter === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No tickets found matching your query.</div>
            ) : (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 cursor-pointer transition-all hover:bg-slate-800/50 ${selectedTicket?.id === ticket.id ? 'bg-indigo-950/30 border-l-4 border-indigo-500' : ''
                    }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-indigo-400">{ticket.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ticket.urgency === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      ticket.urgency === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                      {ticket.urgency}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">{ticket.category}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-slate-400">{ticket.user}</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{ticket.timestamp}</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Active Ticket Workspace & Inspector (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col h-[calc(100vh-73px)] overflow-y-auto bg-slate-950 p-6 space-y-6">

          {selectedTicket ? (
            <>
              {/* Ticket Header & Status Actions */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-mono text-sm font-bold text-indigo-400">{selectedTicket.id}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${selectedTicket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      selectedTicket.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}>
                      {selectedTicket.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{selectedTicket.category}</h2>
                </div>

                <div className="flex items-center space-x-3">
                  {selectedTicket.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolveTicket(selectedTicket.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 shadow-lg shadow-emerald-950/50"
                    >
                      <Check className="w-4 h-4" />
                      <span>Mark Resolved</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Customer Details & On-Chain Diagnostic Inspector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Context Card */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <span>Customer & Ticket Context</span>
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Connected Wallet Address</span>
                      <span className="font-mono bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-indigo-300 block select-all">
                        {selectedTicket.user}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Target Network / Chain</span>
                      <span className="text-slate-200 font-medium bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg block">
                        {selectedTicket.network}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">User Description</span>
                      <p className="text-slate-300 bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-xs leading-relaxed">
                        {selectedTicket.details}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated Block Explorer & Error Logs */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-rose-400" />
                    <span>On-Chain Inspector & Error Log</span>
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Transaction Hash (Click to Inspect)</span>
                      {selectedTicket.txHash !== 'N/A' ? (
                        <a
                          href={`https://arbiscan.io/tx/${selectedTicket.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-20 pointer-events-auto flex items-center justify-between font-mono bg-slate-950 border border-slate-800 hover:border-indigo-500 px-3 py-2 rounded-lg text-xs text-indigo-300 hover:text-indigo-200 transition-all group shadow-md cursor-pointer"
                        >
                          <span className="truncate underline underline-offset-2 decoration-indigo-500/40">{selectedTicket.txHash}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform ml-2 flex-shrink-0" />
                        </a>
                      ) : (
                        <span className="font-mono bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-xs text-slate-500 block">
                          N/A (Off-chain signature request)
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Raw Error Trace / Revert Reason</span>
                      <div className="font-mono bg-rose-950/20 border border-rose-900/30 px-3 py-2.5 rounded-xl text-xs text-rose-300 leading-relaxed overflow-x-auto">
                        {selectedTicket.errorLog}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Response Macros Toolbar */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Quick Response Knowledge Macros</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {supportMacros.map((macro, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAgentReply(macro.text)}
                      className="text-left bg-slate-900 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 p-3 rounded-xl transition-all group"
                    >
                      <h4 className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300 mb-1">{macro.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{macro.text}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Agent Reply Editor */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Send Response to User</h3>
                <form onSubmit={handleSendReply} className="space-y-3">
                  <textarea
                    rows="3"
                    value={agentReply}
                    onChange={(e) => setAgentReply(e.target.value)}
                    placeholder="Type or select a knowledge macro above to reply to customer..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shadow-lg shadow-indigo-950/50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Response</span>
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500">
              Select a ticket from the left queue to inspect diagnostics.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}