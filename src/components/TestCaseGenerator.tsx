'use client';

import { useState } from 'react';
import { FileText, Copy, Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  description: string;
  testSteps: string[];
  expectedResult: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export default function TestCaseGenerator() {
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateTestCases = async () => {
    if (!featureTitle || !featureDescription) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-testcase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featureTitle,
          featureDescription,
        }),
      });
      
      const data = await response.json();
      setGeneratedTestCases(data.testCases);
      
      // Save to localStorage
      const history = JSON.parse(localStorage.getItem('testcase-history') || '[]');
      history.unshift({ 
        title: featureTitle, 
        description: featureDescription, 
        testCases: data.testCases, 
        type: 'testcase', 
        timestamp: new Date().toISOString() 
      });
      localStorage.setItem('testcase-history', JSON.stringify(history.slice(0, 5)));
    } catch (error) {
      console.error('Error generating test cases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id?: string) => {
    await navigator.clipboard.writeText(text);
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const formatTestCaseForCopy = (testCase: TestCase) => {
    return `Test Case ID: ${testCase.id}
Title: ${testCase.title}
Priority: ${testCase.priority.toUpperCase()}
Category: ${testCase.category}

Description:
${testCase.description}

Test Steps:
${testCase.testSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

Expected Result:
${testCase.expectedResult}`;
  };

  const copyAllTestCases = () => {
    const allTestCases = generatedTestCases.map(tc => formatTestCaseForCopy(tc)).join('\n\n---\n\n');
    copyToClipboard(allTestCases);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-800';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-800';
      default: return 'text-slate-400 bg-slate-900/20 border-slate-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Functional': 'text-blue-400 bg-blue-900/20 border-blue-800',
      'UI/UX': 'text-purple-400 bg-purple-900/20 border-purple-800',
      'Performance': 'text-orange-400 bg-orange-900/20 border-orange-800',
      'Security': 'text-red-400 bg-red-900/20 border-red-800',
      'Integration': 'text-teal-400 bg-teal-900/20 border-teal-800',
      'Edge Case': 'text-pink-400 bg-pink-900/20 border-pink-800',
      'Error Handling': 'text-amber-400 bg-amber-900/20 border-amber-800',
      'Accessibility': 'text-indigo-400 bg-indigo-900/20 border-indigo-800',
    };
    return colors[category] || 'text-slate-400 bg-slate-900/20 border-slate-800';
  };

  return (
    <div className="space-y-8">
      {/* Input Forms */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Feature Title
          </label>
          <textarea
            value={featureTitle}
            onChange={(e) => setFeatureTitle(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={2}
            placeholder="e.g., User Login Functionality"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Feature Description
          </label>
          <textarea
            value={featureDescription}
            onChange={(e) => setFeatureDescription(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={6}
            placeholder="Describe feature you want to create test cases for..."
          />
        </div>

        <button
          onClick={generateTestCases}
          disabled={!featureTitle || !featureDescription || isLoading}
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
              <span>Generate Test Cases</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Test Cases Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">
          Generated Test Cases ({generatedTestCases.length})
        </h3>

        {generatedTestCases.length > 0 ? (
          <div className="space-y-4">
            {/* Copy All Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={copyAllTestCases}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Copy size={16} />
                <span>Copy All</span>
              </button>
            </div>

            {/* Test Cases */}
            {generatedTestCases.map((testCase) => (
              <div key={testCase.id} className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xs font-mono text-gray-500">{testCase.id}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(testCase.priority)}`}>
                        {testCase.priority.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(testCase.category)}`}>
                        {testCase.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{testCase.title}</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(formatTestCaseForCopy(testCase), testCase.id)}
                    className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    {copiedId === testCase.id ? (
                      <>
                        <CheckCircle size={16} className="text-green-400" />
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
                    <h5 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      Description
                    </h5>
                    <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">{testCase.description}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-400 mb-2">Test Steps</h5>
                    <ol className="list-decimal list-inside space-y-1">
                      {testCase.testSteps.map((step, index) => (
                        <li key={index} className="text-gray-300 text-sm leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                      <CheckCircle size={14} className="mr-1" />
                      Expected Result
                    </h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{testCase.expectedResult}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={40} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Your generated test cases will appear here
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Fill in feature details and click "Generate Test Cases" to create professional test cases using ChatGPT.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
