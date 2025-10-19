import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Plus, 
  Code, 
  BookOpen, 
  Users,
  AlertTriangle,
  CheckCircle,
  FileText,
  Hash,
  Target,
  Zap,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { ownerAPI } from '../services/api';
import ownerDataService from '../services/ownerDataService';
import toast from 'react-hot-toast';

const OwnerModals = ({ 
  showModal, 
  modalType, 
  editingItem, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    if (showModal) {
      if (editingItem) {
        setFormData(editingItem);
        if (modalType === 'problem' && editingItem.testCases) {
          setTestCases(editingItem.testCases);
        }
      } else {
        // Reset form for new items
        if (modalType === 'problem') {
          setFormData({
            title: '',
            description: '',
            difficulty: 'EASY',
            category: 'Arrays',
            tags: [],
            constraints: '',
            examples: []
          });
          setTestCases([{ input: '', expectedOutput: '', isHidden: false }]);
        } else if (modalType === 'question') {
          setFormData({
            title: '',
            content: '',
            category: 'JavaScript',
            difficulty: 'EASY',
            status: 'DRAFT',
            explanation: '',
            hinglishExplanation: '',
            codeExamples: [{ language: 'javascript', code: '', output: '', explanation: '' }],
            multipleExamples: [{ title: '', code: '', explanation: '' }],
            realWorldUseCases: [{ title: '', description: '', example: '' }],
            interviewTips: [{ tip: '', importance: 'medium' }],
            diagramSteps: [{ step: '', description: '' }],
            relatedTopics: [],
            keyPoints: []
          });
        } else if (modalType === 'user') {
          setFormData({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            role: 'USER',
            isVerified: false
          });
        }
      }
    }
  }, [showModal, editingItem, modalType]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTestCase = () => {
    setTestCases(prev => [...prev, { input: '', expectedOutput: '', isHidden: false }]);
  };

  const updateTestCase = (index, field, value) => {
    setTestCases(prev => prev.map((tc, i) => 
      i === index ? { ...tc, [field]: value } : tc
    ));
  };

  const removeTestCase = (index) => {
    setTestCases(prev => prev.filter((_, i) => i !== index));
  };

  // Helper functions for dynamic arrays
  const addArrayItem = (arrayName, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), defaultItem]
    }));
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      let result;
      const dataToSave = { ...formData };
      
      if (modalType === 'problem') {
        dataToSave.testCases = testCases;
        if (editingItem) {
          // Try API first, fallback to local storage
          try {
            result = await ownerAPI.updateProblem(editingItem.id, dataToSave);
          } catch (error) {
            result = { data: ownerDataService.updateProblem(editingItem.id, dataToSave) };
          }
        } else {
          try {
            result = await ownerAPI.createProblem(dataToSave);
          } catch (error) {
            result = { data: ownerDataService.addProblem(dataToSave) };
          }
        }
      } else if (modalType === 'question') {
        if (editingItem) {
          result = { data: ownerDataService.updateInterviewQuestion(editingItem.id, dataToSave) };
        } else {
          result = { data: ownerDataService.addInterviewQuestion(dataToSave) };
        }
      } else if (modalType === 'user') {
        if (editingItem) {
          try {
            result = await ownerAPI.updateUser(editingItem.id, dataToSave);
          } catch (error) {
            result = { data: ownerDataService.updateUser(editingItem.id, dataToSave) };
          }
        } else {
          result = { data: ownerDataService.addUser(dataToSave) };
        }
      }

      toast.success(`${modalType} ${editingItem ? 'updated' : 'created'} successfully!`);
      onSave(result.data);
      onClose();
    } catch (error) {
      toast.error(`Failed to ${editingItem ? 'update' : 'create'} ${modalType}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              {modalType === 'problem' && <Code className="w-6 h-6 text-blue-400" />}
              {modalType === 'question' && <BookOpen className="w-6 h-6 text-purple-400" />}
              {modalType === 'user' && <Users className="w-6 h-6 text-green-400" />}
              <h2 className="text-2xl font-bold text-white">
                {editingItem ? 'Edit' : 'Add'} {modalType === 'question' ? 'Interview Question' : modalType}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {modalType === 'problem' && (
              <>
                {/* Problem Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Problem Title
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter problem title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty || 'EASY'}
                      onChange={(e) => handleInputChange('difficulty', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category || 'Arrays'}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Arrays">Arrays</option>
                      <option value="Strings">Strings</option>
                      <option value="Trees">Trees</option>
                      <option value="Graphs">Graphs</option>
                      <option value="Dynamic Programming">Dynamic Programming</option>
                      <option value="Sorting">Sorting</option>
                      <option value="Linked Lists">Linked Lists</option>
                      <option value="Stack & Queue">Stack & Queue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status || 'ACTIVE'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="DRAFT">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Problem Description
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter detailed problem description..."
                  />
                </div>

                {/* Test Cases */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Test Cases
                    </label>
                    <button
                      onClick={addTestCase}
                      className="flex items-center gap-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Test Case
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {testCases.map((testCase, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-white">Test Case {index + 1}</h4>
                          <button
                            onClick={() => removeTestCase(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Input</label>
                            <textarea
                              value={testCase.input}
                              onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Enter test input..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Expected Output</label>
                            <textarea
                              value={testCase.expectedOutput}
                              onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Enter expected output..."
                            />
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <label className="flex items-center gap-2 text-sm text-gray-300">
                            <input
                              type="checkbox"
                              checked={testCase.isHidden}
                              onChange={(e) => updateTestCase(index, 'isHidden', e.target.checked)}
                              className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                            />
                            Hidden Test Case
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {modalType === 'question' && (
              <>
                {/* Interview Question Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Question Title
                    </label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter question title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category || 'JavaScript'}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="JavaScript">JavaScript</option>
                      <option value="React">React</option>
                      <option value="Node.js">Node.js</option>
                      <option value="CSS">CSS</option>
                      <option value="HTML">HTML</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="Express">Express</option>
                      <option value="Full Stack">Full Stack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty || 'EASY'}
                      onChange={(e) => handleInputChange('difficulty', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status || 'DRAFT'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="PUBLISHED">Published</option>
                      <option value="DRAFT">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Question Content
                  </label>
                  <textarea
                    value={formData.content || ''}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter the interview question content..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    English Explanation
                  </label>
                  <textarea
                    value={formData.explanation || ''}
                    onChange={(e) => handleInputChange('explanation', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter detailed explanation in English..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hinglish Explanation
                  </label>
                  <textarea
                    value={formData.hinglishExplanation || ''}
                    onChange={(e) => handleInputChange('hinglishExplanation', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter explanation in Hinglish for better understanding..."
                  />
                </div>

                {/* Code Examples */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Code Examples
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('codeExamples', { language: 'javascript', code: '', output: '', explanation: '' })}
                      className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Example
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {(formData.codeExamples || []).map((example, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-white">Example {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeArrayItem('codeExamples', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Language</label>
                            <select
                              value={example.language}
                              onChange={(e) => updateArrayItem('codeExamples', index, 'language', e.target.value)}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                            >
                              <option value="javascript">JavaScript</option>
                              <option value="react">React</option>
                              <option value="html">HTML</option>
                              <option value="css">CSS</option>
                              <option value="nodejs">Node.js</option>
                              <option value="sql">SQL</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Code</label>
                            <textarea
                              value={example.code}
                              onChange={(e) => updateArrayItem('codeExamples', index, 'code', e.target.value)}
                              rows={6}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm font-mono"
                              placeholder="Enter code example..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Expected Output</label>
                            <textarea
                              value={example.output}
                              onChange={(e) => updateArrayItem('codeExamples', index, 'output', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm font-mono"
                              placeholder="Enter expected output..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Explanation</label>
                            <textarea
                              value={example.explanation}
                              onChange={(e) => updateArrayItem('codeExamples', index, 'explanation', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Explain this example..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Multiple Examples */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Multiple Examples
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('multipleExamples', { title: '', code: '', explanation: '' })}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Example
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {(formData.multipleExamples || []).map((example, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-white">Example {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeArrayItem('multipleExamples', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Title</label>
                            <input
                              type="text"
                              value={example.title}
                              onChange={(e) => updateArrayItem('multipleExamples', index, 'title', e.target.value)}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Example title..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Code</label>
                            <textarea
                              value={example.code}
                              onChange={(e) => updateArrayItem('multipleExamples', index, 'code', e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm font-mono"
                              placeholder="Enter code..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Explanation</label>
                            <textarea
                              value={example.explanation}
                              onChange={(e) => updateArrayItem('multipleExamples', index, 'explanation', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Explain this example..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real World Use Cases */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Real World Use Cases
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('realWorldUseCases', { title: '', description: '', example: '' })}
                      className="flex items-center gap-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Use Case
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {(formData.realWorldUseCases || []).map((useCase, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-white">Use Case {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeArrayItem('realWorldUseCases', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Title</label>
                            <input
                              type="text"
                              value={useCase.title}
                              onChange={(e) => updateArrayItem('realWorldUseCases', index, 'title', e.target.value)}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Use case title..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Description</label>
                            <textarea
                              value={useCase.description}
                              onChange={(e) => updateArrayItem('realWorldUseCases', index, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Describe the use case..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Example</label>
                            <textarea
                              value={useCase.example}
                              onChange={(e) => updateArrayItem('realWorldUseCases', index, 'example', e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm font-mono"
                              placeholder="Provide a practical example..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interview Tips */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Interview Tips
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('interviewTips', { tip: '', importance: 'medium' })}
                      className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Tip
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {(formData.interviewTips || []).map((tip, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-white">Tip {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeArrayItem('interviewTips', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="md:col-span-2">
                            <label className="block text-xs text-gray-400 mb-1">Interview Tip</label>
                            <textarea
                              value={tip.tip}
                              onChange={(e) => updateArrayItem('interviewTips', index, 'tip', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Enter interview tip..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Importance</label>
                            <select
                              value={tip.importance}
                              onChange={(e) => updateArrayItem('interviewTips', index, 'importance', e.target.value)}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagram Steps */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Diagram Steps
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('diagramSteps', { step: '', description: '' })}
                      className="flex items-center gap-2 px-3 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Step
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {(formData.diagramSteps || []).map((step, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-white">Step {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeArrayItem('diagramSteps', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Step Title</label>
                            <input
                              type="text"
                              value={step.step}
                              onChange={(e) => updateArrayItem('diagramSteps', index, 'step', e.target.value)}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Step title..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Description</label>
                            <textarea
                              value={step.description}
                              onChange={(e) => updateArrayItem('diagramSteps', index, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                              placeholder="Step description..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Points */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Key Points
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const newPoints = [...(formData.keyPoints || []), ''];
                        handleInputChange('keyPoints', newPoints);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-pink-500/20 text-pink-400 rounded-lg hover:bg-pink-500/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Point
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {(formData.keyPoints || []).map((point, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => {
                            const newPoints = [...formData.keyPoints];
                            newPoints[index] = e.target.value;
                            handleInputChange('keyPoints', newPoints);
                          }}
                          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white text-sm"
                          placeholder="Enter key point..."
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newPoints = formData.keyPoints.filter((_, i) => i !== index);
                            handleInputChange('keyPoints', newPoints);
                          }}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {modalType === 'user' && (
              <>
                {/* User Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username || ''}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter username"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName || ''}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName || ''}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Role
                    </label>
                    <select
                      value={formData.role || 'USER'}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                      <option value="OWNER">Owner</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-3 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={formData.isVerified || false}
                        onChange={(e) => handleInputChange('isVerified', e.target.checked)}
                        className="rounded border-white/20 bg-white/5 text-green-500 focus:ring-green-500"
                      />
                      Verified User
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OwnerModals;
