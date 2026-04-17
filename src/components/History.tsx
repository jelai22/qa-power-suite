'use client';

import { useState, useEffect } from 'react';
import { Clock, FileText, Bug, Trash2 } from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  description: string;
  testSteps: string[];
  expectedResult: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface BugTicket {
  bugTitle: string;
  description: string;
  testSteps: string[];
  actualResult: string;
  expectedResult: string;
}

interface HistoryItem {
  type: 'testcase' | 'bugticket';
  timestamp: string;
  title?: string;
  description?: string;
  testCases?: TestCase[];
  bugTitle?: string;
  testSteps?: string[];
  expectedResult?: string;
  actualResult?: string;
}

export default function History() {
  const [testCases, setTestCases] = useState<HistoryItem[]>([]);
  const [bugTickets, setBugTickets] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const testCaseHistory = JSON.parse(localStorage.getItem('testcase-history') || '[]');
      const bugTicketHistory = JSON.parse(localStorage.getItem('bugticket-history') || '[]');
      setTestCases(testCaseHistory);
      setBugTickets(bugTicketHistory);
    };

    loadHistory();
  }, []);

  const clearHistory = (type: 'testcase' | 'bugticket') => {
    if (type === 'testcase') {
      localStorage.removeItem('testcase-history');
      setTestCases([]);
    } else {
      localStorage.removeItem('bugticket-history');
      setBugTickets([]);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">History</h2>
        <p className="text-gray-400">View your recently generated test cases and bug tickets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <FileText size={24} />
              <span>Test Cases</span>
            </h3>
            {testCases.length > 0 && (
              <button
                onClick={() => clearHistory('testcase')}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={16} />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {testCases.length === 0 ? (
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-8 text-center">
                <FileText size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">No test case history yet</p>
              </div>
            ) : (
              testCases.map((item, index) => (
                <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">
                        {item.testCases?.length || 0} test cases generated
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{formatDate(item.timestamp)}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2 mb-3">{item.description}</p>
                  {item.testCases && item.testCases.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {Array.from(new Set(item.testCases.map(tc => tc.category))).slice(0, 3).map((category, catIndex) => (
                        <span key={catIndex} className="px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded">
                          {category}
                        </span>
                      ))}
                      {item.testCases.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded">
                          +{item.testCases.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Bug size={24} />
              <span>Bug Tickets</span>
            </h3>
            {bugTickets.length > 0 && (
              <button
                onClick={() => clearHistory('bugticket')}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={16} />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {bugTickets.length === 0 ? (
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-8 text-center">
                <Bug size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">No bug ticket history yet</p>
              </div>
            ) : (
              bugTickets.map((item, index) => (
                <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white">{item.bugTitle}</h4>
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{formatDate(item.timestamp)}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
