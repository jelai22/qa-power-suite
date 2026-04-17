'use client';

import { useState } from 'react';
import { Bug, Copy, Loader2, Send } from 'lucide-react';

interface BugTicket {
  bugTitle: string;
  description: string;
  testSteps: string[];
  actualResult: string;
  expectedResult: string;
}

export default function BugTicketFormatter() {
  const [issueDescription, setIssueDescription] = useState('');
  const [generatedBugTicket, setGeneratedBugTicket] = useState<BugTicket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateBugTicket = async () => {
    if (!issueDescription) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-bugticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueDescription,
        }),
      });
      
      const data = await response.json();
      setGeneratedBugTicket(data.bugTicket);
      
      // Save to localStorage
      const history = JSON.parse(localStorage.getItem('bugticket-history') || '[]');
      history.unshift({ ...data.bugTicket, type: 'bugticket', timestamp: new Date().toISOString() });
      localStorage.setItem('bugticket-history', JSON.stringify(history.slice(0, 5)));
    } catch (error) {
      console.error('Error generating bug ticket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatBugTicketForCopy = (bugTicket: BugTicket) => {
    return `Bug Title: ${bugTicket.bugTitle}

Description:
${bugTicket.description}

Test Steps:
${bugTicket.testSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

Actual Result:
${bugTicket.actualResult}

Expected Result:
${bugTicket.expectedResult}`;
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Issue Description
          </label>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={8}
            placeholder="Describe what went wrong in detail..."
          />
        </div>

        <button
          onClick={generateBugTicket}
          disabled={!issueDescription || isLoading}
          className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Generate Bug Ticket</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Bug Ticket Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">
          Generated Bug Ticket
        </h3>

        {generatedBugTicket ? (
          <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => copyToClipboard(formatBugTicketForCopy(generatedBugTicket))}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
              >
                {copied ? (
                  <>
                    <Copy size={16} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Bug Title</h4>
                <p className="text-white">{generatedBugTicket.bugTitle}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
                <p className="text-gray-300 whitespace-pre-line">{generatedBugTicket.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Test Steps</h4>
                <ol className="list-decimal list-inside space-y-1">
                  {generatedBugTicket.testSteps.map((step, index) => (
                    <li key={index} className="text-gray-300">{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Actual Result</h4>
                <p className="text-gray-300">{generatedBugTicket.actualResult}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Expected Result</h4>
                <p className="text-gray-300">{generatedBugTicket.expectedResult}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bug size={40} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Your generated bug ticket will appear here
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Fill in issue details and click "Generate Bug Ticket" to create professional bug reports.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
