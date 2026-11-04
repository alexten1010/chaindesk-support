import React, { useState } from 'react';
import {
  Headphones,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  Send,
  ShieldAlert,
  Terminal,
  Zap,
  UserCheck,
  Filter,
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
    txHash: '0x8f9c2...41a3',
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
    txHash: '0x3e21a...ff09',
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
          <div className="flex items