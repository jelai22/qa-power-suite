'use client';

import { useState } from 'react';
import { FileText, Bug, History } from 'lucide-react';

interface SidebarProps {
  activeModule: 'testcase' | 'bugticket' | 'history';
  setActiveModule: (module: 'testcase' | 'bugticket' | 'history') => void;
}

export default function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">QA Power Suite</h1>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveModule('testcase')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeModule === 'testcase'
                ? 'bg-navy-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText size={20} />
            <span className="font-medium">Test Case Generator</span>
          </button>
          
          <button
            onClick={() => setActiveModule('bugticket')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeModule === 'bugticket'
                ? 'bg-navy-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Bug size={20} />
            <span className="font-medium">Bug Ticket Formatter</span>
          </button>
        </nav>
        
        <div className="mt-8 pt-8 border-t border-slate-700">
          <button
            onClick={() => setActiveModule('history')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeModule === 'history'
                ? 'bg-navy-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <History size={20} />
            <span className="font-medium">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
