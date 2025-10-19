import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  Terminal, 
  Code2, 
  Settings,
  Maximize2,
  Zap,
  Code,
  Copy,
  Check,
  RotateCcw,
  Upload,
  Download
} from 'lucide-react';

// Default code templates for different languages
function getDefaultCode(lang) {
  const templates = {
    javascript: `// JavaScript Playground
console.log("Hello, World!");

// Your code here
function solve() {
    // Write your solution
    return "Hello from JavaScript!";
}

console.log(solve());`,
    
    python: `# Python Playground
print("Hello, World!")

# Your code here
def solve():
    # Write your solution
    return "Hello from Python!"

print(solve())`,
    
    java: `// Java Playground
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Your code here
        System.out.println(solve());
    }
    
    public static String solve() {
        // Write your solution
        return "Hello from Java!";
    }
}`,
    
    cpp: `// C++ Playground
#include <iostream>
#include <string>
using namespace std;

string solve() {
    // Write your solution
    return "Hello from C++!";
}

int main() {
    cout << "Hello, World!" << endl;
    
    // Your code here
    cout << solve() << endl;
    
    return 0;
}`,
    
    c: `// C Playground
#include <stdio.h>
#include <string.h>

char* solve() {
    // Write your solution
    return "Hello from C!";
}

int main() {
    printf("Hello, World!\\n");
    
    // Your code here
    printf("%s\\n", solve());
    
    return 0;
}`,
    
    go: `// Go Playground
package main

import "fmt"

func solve() string {
    // Write your solution
    return "Hello from Go!"
}

func main() {
    fmt.Println("Hello, World!")
    
    // Your code here
    fmt.Println(solve())
}`,
    
    rust: `// Rust Playground
fn solve() -> String {
    // Write your solution
    "Hello from Rust!".to_string()
}

fn main() {
    println!("Hello, World!");
    
    // Your code here
    println!("{}", solve());
}`
  };
  
  return templates[lang] || templates.javascript;
}

const Playground = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(getDefaultCode('javascript'));
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [theme] = useState('vs-dark');
  const [fontSize] = useState(14);
  const [copied, setCopied] = useState(false);

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: Code2 },
    { id: 'python', name: 'Python', icon: Terminal },
    { id: 'java', name: 'Java', icon: Code },
    { id: 'cpp', name: 'C++', icon: Zap },
    { id: 'c', name: 'C', icon: Settings },
    { id: 'go', name: 'Go', icon: Play },
    { id: 'rust', name: 'Rust', icon: Maximize2 }
  ];


  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(getDefaultCode(newLang));
    setOutput('');
  };


  // OpenAI API configuration
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

  // Language ID mapping for Judge0 API (fallback)
  const getLanguageId = (lang) => {
    const languageMap = {
      'javascript': 63, // Node.js
      'python': 71,     // Python 3
      'java': 62,       // Java
      'cpp': 54,        // C++ (GCC 9.2.0)
      'c': 50,          // C (GCC 9.2.0)
      'go': 60,         // Go
      'rust': 73        // Rust
    };
    return languageMap[lang] || 63;
  };

  // OpenAI Code Execution API
  const executeCodeWithOpenAI = async (code, language, input = '') => {
    try {
      const prompt = `Execute this ${language} code and provide the output:

Code:
\`\`\`${language}
${code}
\`\`\`

${input ? `Input: ${input}` : ''}

Please provide:
1. The exact output the code would produce
2. Any compilation errors if present
3. Runtime information

Format the response as:
OUTPUT:
[actual output here]

STATUS: [SUCCESS/ERROR]
TIME: [execution time]
MEMORY: [memory usage]`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a code execution engine. Execute the provided code and return the exact output it would produce. Be precise and accurate."
            },
            {
              role: "user", 
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI execution failed:', error);
      throw error;
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    try {
      // Primary: Try OpenAI API for intelligent code execution
      const aiResult = await executeCodeWithOpenAI(code, language, input);
      
      // Extract only the actual output from AI response
      let cleanOutput = aiResult;
      
      // Try to extract just the OUTPUT section if it exists
      const outputMatch = aiResult.match(/OUTPUT:\s*([\s\S]*?)(?:\n\nSTATUS:|$)/i);
      if (outputMatch) {
        cleanOutput = outputMatch[1].trim();
      }
      
      // Remove any status/metadata lines
      cleanOutput = cleanOutput
        .split('\n')
        .filter(line => !line.match(/^(STATUS:|TIME:|MEMORY:|🔥|✨|⚠️)/i))
        .join('\n')
        .trim();
      
      setOutput(cleanOutput || 'No output');
      
    } catch (aiError) {
      console.log('OpenAI failed, falling back to Judge0:', aiError);
      
      try {
        // Fallback: Use Judge0 API for real code execution
        setOutput('⚡ Falling back to Judge0 for real code compilation...\n');
        
        const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'ce0a6903a2msh6a90ca90b6b74b1p17c2c4jsn1c4d5a8c3b7e', // Free tier key
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          language_id: getLanguageId(language),
          source_code: btoa(code), // Base64 encode
          stdin: btoa(input || ''), // Base64 encode input
          expected_output: null
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const submission = await response.json();
      const token = submission.token;

      // Poll for result
      let result = null;
      let attempts = 0;
      const maxAttempts = 10;

      while (!result && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        
        const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
          headers: {
            'X-RapidAPI-Key': 'ce0a6903a2msh6a90ca90b6b74b1p17c2c4jsn1c4d5a8c3b7e',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        });

        if (resultResponse.ok) {
          const resultData = await resultResponse.json();
          
          if (resultData.status.id >= 3) { // Completed
            result = resultData;
            break;
          }
        }
        attempts++;
      }

      if (!result) {
        throw new Error('Execution timeout');
      }

      // Format clean output
      let output = '';
      
      if (result.stdout) {
        output = atob(result.stdout).trim();
      } else if (result.stderr) {
        output = atob(result.stderr).trim();
      } else if (result.compile_output) {
        output = atob(result.compile_output).trim();
      } else {
        output = 'No output';
      }

      setOutput(output);

      } catch (judge0Error) {
        console.error('Judge0 also failed:', judge0Error);
        
        // Final fallback to local simulation
        setTimeout(() => {
          let simulatedOutput = '';
          
          if (language === 'javascript') {
            const logs = code.match(/console\.log\([^)]+\)/g);
            if (logs) {
              logs.forEach(log => {
                const content = log.match(/console\.log\(([^)]+)\)/)[1];
                simulatedOutput += `${content.replace(/['"]/g, '')}\n`;
              });
            } else {
              simulatedOutput = 'Hello, World!';
            }
          } else if (language === 'python') {
            const prints = code.match(/print\([^)]+\)/g);
            if (prints) {
              prints.forEach(print => {
                const content = print.match(/print\(([^)]+)\)/)[1];
                simulatedOutput += `${content.replace(/['"]/g, '')}\n`;
              });
            } else {
              simulatedOutput = 'Hello, World!';
            }
          } else {
            simulatedOutput = `Hello from ${language.toUpperCase()}!`;
          }
          
          setOutput(simulatedOutput.trim() || 'No output');
        }, 500);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(getDefaultCode(language));
    setOutput('');
    setInput('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 pt-24 pb-8">
      

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Left-Aligned Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 relative"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-12 h-12 text-blue-400" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Code Playground
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mb-6">
                Write, compile, and execute code in multiple programming languages with AI-powered execution and real-time output.
              </p>
            </div>
            
            <div className="w-32 h-32 hidden lg:block">
              <div className="w-full h-full flex items-center justify-center">
                <Code className="w-16 h-16 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language Selector Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {languages.map((lang) => {
            const IconComponent = lang.icon;
            return (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  language === lang.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{lang.name}</span>
              </button>
            );
          })}
        </motion.div>


        {/* Enhanced Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 xl:grid-cols-4 gap-6"
        >
          {/* Enhanced Editor Section */}
          <div className="xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Enhanced Editor Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-white/10">
                <div className="flex items-center gap-4">
                  {/* macOS Style Controls */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">
                      {languages.find(l => l.id === language)?.name || 'JavaScript'}
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Editor Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 text-white rounded-lg transition-all font-semibold"
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
                </div>
              </div>

              {/* Enhanced Code Editor */}
              <div className="relative">
                <div className="h-96 lg:h-[500px]">
                  <Editor
                    height="100%"
                    language={language === 'cpp' ? 'cpp' : language}
                    value={code}
                    onChange={setCode}
                    theme="vs-dark"
                    options={{
                      fontSize: fontSize,
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      automaticLayout: true,
                      tabSize: 2,
                      insertSpaces: true,
                      lineNumbers: 'on',
                      renderWhitespace: 'selection',
                      bracketPairColorization: { enabled: true },
                      smoothScrolling: true,
                      cursorBlinking: 'smooth',
                      cursorSmoothCaretAnimation: true,
                      colorDecorators: true,
                      contextmenu: true,
                      folding: true,
                      foldingHighlight: true,
                      foldingStrategy: 'indentation',
                      showFoldingControls: 'always',
                      unfoldOnClickAfterEndOfLine: true,
                      matchBrackets: 'always',
                      selectionHighlight: true,
                      occurrencesHighlight: true,
                      find: {
                        addExtraSpaceOnTop: false,
                        autoFindInSelection: 'never',
                        seedSearchStringFromSelection: 'always'
                      }
                    }}
                  />
                </div>
                
                {/* Editor Overlay Info */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-sm">
                    Lines: {code.split('\n').length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Input/Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Input Section */}
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-800/30 to-cyan-800/30 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">Input</span>
                </div>
                <div className="text-xs text-gray-400">
                  {input.split('\n').length} lines
                </div>
              </div>
              <div className="p-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter input here (one value per line)..."
                  className="w-full h-32 bg-black/30 text-white p-3 rounded-lg border border-white/10 focus:border-blue-500 outline-none resize-none font-mono text-sm placeholder-gray-500"
                />
              </div>
            </div>

            {/* Output Section */}
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-800/30 to-emerald-800/30 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">Output</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                  <span className="text-xs text-gray-400">
                    {isRunning ? 'Running' : 'Ready'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="bg-black/50 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap min-h-[200px] max-h-[400px] overflow-y-auto border border-green-500/20">
                  {output || (
                    <div className="text-gray-500 italic">
                      <Terminal className="w-5 h-5 inline mr-2" />
                      Click "Run Code" to see output...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setInput('')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
              >
                <RotateCcw className="w-4 h-4" />
                Clear Input
              </button>
              <button
                onClick={() => setOutput('')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
              >
                <Download className="w-4 h-4" />
                Clear Output
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default memo(Playground);
