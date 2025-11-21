import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, Send, RotateCcw, CheckCircle, XCircle, Code2, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProblemSolver = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const languages = [
    { id: 'javascript', name: 'JavaScript', template: 'function solve(input) {\n  \n  return null;\n}' },
    { id: 'python', name: 'Python', template: 'def solve(input):\n    \n    return None' },
    { id: 'java', name: 'Java', template: 'class Solution {\n    public Object solve(Object input) {\n        \n        return null;\n    }\n}' }
  ];

  useEffect(() => {
    fetchProblem();
  }, [slug]);

  useEffect(() => {
    const template = languages.find(l => l.id === language)?.template || '';
    setCode(template);
  }, [language]);

  const fetchProblem = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/problems/${slug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProblem(response.data.problem);
    } catch (error) {
      console.error('Failed to fetch problem:', error);
      toast.error('Failed to load problem');
      navigate('/problems');
    }
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first');
      return;
    }

    setIsRunning(true);
    setOutput('Running test cases...');
    setTestResults([]);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/submissions`,
        {
          problemId: problem.id,
          code,
          language
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { submission } = response.data;
      setTestResults(submission.testResults || []);
      
      const passedCount = submission.testsPassed || 0;
      const totalCount = submission.totalTests || 0;

      if (submission.status === 'ACCEPTED') {
        setOutput(`✅ All test cases passed! (${passedCount}/${totalCount})`);
        toast.success('All test cases passed!');
      } else {
        setOutput(`❌ ${passedCount}/${totalCount} test cases passed`);
        toast.error(`Only ${passedCount} out of ${totalCount} tests passed`);
      }
    } catch (error) {
      console.error('Code execution error:', error);
      setOutput(`Error: ${error.response?.data?.error || error.message}`);
      toast.error('Failed to run code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/submissions`,
        {
          problemId: problem.id,
          code,
          language
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { submission } = response.data;
      
      if (submission.status === 'ACCEPTED') {
        toast.success('Submission accepted! 🎉');
        setTimeout(() => navigate('/problems'), 2000);
      } else {
        toast.error('Submission failed. Try again! 💪');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to submit solution');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-white">Loading problem...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 overflow-y-auto">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate('/problems')}
                className="text-white/60 hover:text-white"
              >
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                problem.difficulty === 'EASY' ? 'bg-green-500/20 text-green-400' :
                problem.difficulty === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {problem.difficulty}
              </span>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'description' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'}`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'submissions' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'}`}
              >
                Test Results
              </button>
            </div>

            {activeTab === 'description' && (
              <div className="text-white space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Problem Description</h3>
                  <p className="text-white/80">{problem.description}</p>
                </div>

                {problem.examples && problem.examples.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Examples</h3>
                    {problem.examples.map((example, idx) => (
                      <div key={idx} className="bg-black/30 p-4 rounded-lg mb-2">
                        <div className="mb-2">
                          <span className="text-white/60">Input:</span>
                          <code className="block bg-black/40 p-2 rounded mt-1">{example.input}</code>
                        </div>
                        <div className="mb-2">
                          <span className="text-white/60">Output:</span>
                          <code className="block bg-black/40 p-2 rounded mt-1">{example.output}</code>
                        </div>
                        {example.explanation && (
                          <div className="text-white/60 text-sm">{example.explanation}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {problem.constraints && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Constraints</h3>
                    <p className="text-white/80">{problem.constraints}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-2">
                {testResults.length === 0 ? (
                  <div className="text-white/60 text-center py-8">
                    Run your code to see test results
                  </div>
                ) : (
                  testResults.map((result, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border ${
                      result.passed ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {result.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span className="text-white font-medium">Test Case {idx + 1}</span>
                        {result.status && (
                          <span className={`ml-auto text-xs px-2 py-1 rounded ${
                            result.status === 'Accepted' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {result.status}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="text-white/60">
                          Input: <code className="text-white bg-black/30 px-2 py-1 rounded">{result.input}</code>
                        </div>
                        <div className="text-white/60">
                          Expected: <code className="text-white bg-black/30 px-2 py-1 rounded">{result.expectedOutput}</code>
                        </div>
                        <div className="text-white/60">
                          Actual: <code className={`${result.passed ? 'text-green-400' : 'text-red-400'} bg-black/30 px-2 py-1 rounded`}>
                            {result.actualOutput || 'null'}
                          </code>
                        </div>
                        
                        {result.compilationError && (
                          <div className="mt-2 p-2 bg-red-900/30 rounded">
                            <div className="text-red-400 font-semibold mb-1 flex items-center gap-1">
                              <XCircle className="w-4 h-4" />
                              Compilation Error:
                            </div>
                            <pre className="text-red-300 text-xs whitespace-pre-wrap overflow-x-auto">{result.compilationError}</pre>
                          </div>
                        )}
                        
                        {result.stderr && !result.compilationError && (
                          <div className="mt-2 p-2 bg-orange-900/30 rounded">
                            <div className="text-orange-400 font-semibold mb-1 flex items-center gap-1">
                              <XCircle className="w-4 h-4" />
                              Runtime Error:
                            </div>
                            <pre className="text-orange-300 text-xs whitespace-pre-wrap overflow-x-auto">{result.stderr}</pre>
                          </div>
                        )}
                        
                        {result.error && !result.compilationError && !result.stderr && (
                          <div className="mt-2 p-2 bg-red-900/30 rounded">
                            <div className="text-red-400 font-semibold mb-1">Error:</div>
                            <pre className="text-red-300 text-xs whitespace-pre-wrap">{result.error}</pre>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 mt-2 text-xs">
                          {result.executionTime !== null && result.executionTime !== undefined && (
                            <div className="text-white/60">
                              ⚡ <span className="text-blue-400">{result.executionTime}ms</span>
                            </div>
                          )}
                          
                          {result.memory && (
                            <div className="text-white/60">
                              💾 <span className="text-purple-400">{(result.memory / 1024).toFixed(2)}MB</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 border border-white/20 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">Code Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20"
                >
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => setCode(languages.find(l => l.id === language)?.template || '')}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                  title="Reset code"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 mb-4 border border-white/20 rounded-lg overflow-hidden">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={setCode}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false
                }}
              />
            </div>

            <div className="bg-black/40 p-4 rounded-lg mb-4 min-h-[100px] max-h-[150px] overflow-y-auto">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm font-medium">Output</span>
              </div>
              <pre className="text-green-400 text-sm whitespace-pre-wrap">{output || 'Click "Run Code" to see output'}</pre>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold"
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Code
                  </>
                )}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
