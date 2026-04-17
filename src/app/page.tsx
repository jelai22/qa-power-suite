'use client';

import { useState, useEffect } from 'react';
import TestCaseGenerator from '@/components/TestCaseGenerator';
import BugTicketFormatter from '@/components/BugTicketFormatter';
import History from '@/components/History';
import { History as HistoryIcon, FileText, Bug } from 'lucide-react';

export default function Home() {
  const [activeModule, setActiveModule] = useState<'testcase' | 'bugticket' | 'history'>('testcase');
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    const getHistoryCount = () => {
      const testCaseHistory = JSON.parse(localStorage.getItem('testcase-history') || '[]');
      const bugTicketHistory = JSON.parse(localStorage.getItem('bugticket-history') || '[]');
      return testCaseHistory.length + bugTicketHistory.length;
    };
    
    setHistoryCount(getHistoryCount());
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <FileText className="text-white" size={24} />
            <h1 className="text-2xl font-bold text-white">
              {activeModule === 'testcase' && 'Test Case Generator (Free)'}
              {activeModule === 'bugticket' && 'Bug Ticket Formatter (Free)'}
              {activeModule === 'history' && 'History'}
            </h1>
          </div>
          
          <button
            onClick={() => setActiveModule('history')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeModule === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <HistoryIcon size={18} />
            <span>History ({historyCount})</span>
          </button>
        </div>

        {/* Module Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveModule('testcase')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeModule === 'testcase'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <FileText size={18} className="inline mr-2" />
            Test Cases
          </button>
          <button
            onClick={() => setActiveModule('bugticket')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeModule === 'bugticket'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Bug size={18} className="inline mr-2" />
            Bug Tickets
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-xl p-8 min-h-[600px]">
          {activeModule === 'testcase' && <TestCaseGenerator />}
          {activeModule === 'bugticket' && <BugTicketFormatter />}
          {activeModule === 'history' && <History />}
        </div>
      </div>
    </main>
  );
}
