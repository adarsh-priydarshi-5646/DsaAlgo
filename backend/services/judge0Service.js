import axios from 'axios';

const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_KEY = process.env.JUDGE0_API_KEY || 'ce0a6903a2msh6a90ca90b6b74b1p17c2c4jsn1c4d5a8c3b7e';

const languageIds = {
  javascript: 93,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
  csharp: 51,
  ruby: 72,
  go: 95,
  kotlin: 78,
  swift: 83,
  rust: 73,
  typescript: 74
};

export async function executeCodeWithJudge0(code, language, stdin = '') {
  const languageId = languageIds[language.toLowerCase()];
  
  if (!languageId) {
    throw new Error(`Unsupported language: ${language}`);
  }

  try {
    const submissionResponse = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: languageId,
        stdin: stdin,
        cpu_time_limit: 2,
        memory_limit: 128000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': JUDGE0_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    const result = submissionResponse.data;
    return formatJudge0Response(result);

  } catch (error) {
    console.error('Judge0 execution error:', error.response?.data || error.message);
    throw new Error('Code execution failed: ' + (error.response?.data?.error || error.message));
  }
}

export async function executeCodeWithTestCases(code, language, testCases) {
  const results = [];

  for (const testCase of testCases) {
    try {
      const testInput = typeof testCase.input === 'string' 
        ? testCase.input 
        : JSON.stringify(testCase.input);
      
      const expectedOutput = typeof testCase.output === 'string'
        ? testCase.output
        : JSON.stringify(testCase.output);

      const wrappedCode = wrapCodeForExecution(code, language, testInput);
      const executionResult = await executeCodeWithJudge0(wrappedCode, language, testInput);

      const actualOutput = executionResult.stdout?.trim() || '';
      const passed = actualOutput === expectedOutput.trim();

      results.push({
        testCaseId: testCase.id,
        passed,
        input: testInput,
        expectedOutput,
        actualOutput,
        error: executionResult.error,
        stderr: executionResult.stderr,
        compilationError: executionResult.compile_output,
        executionTime: executionResult.time,
        memory: executionResult.memory,
        status: executionResult.status
      });

    } catch (error) {
      results.push({
        testCaseId: testCase.id,
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: null,
        error: error.message,
        stderr: null,
        compilationError: null,
        executionTime: null,
        memory: null
      });
    }
  }

  return results;
}

function wrapCodeForExecution(code, language, input) {
  switch (language.toLowerCase()) {
    case 'javascript':
      return code;
    
    case 'python':
      return code;
    
    case 'java':
      if (!code.includes('class Main')) {
        return `
public class Main {
    ${code}
    
    public static void main(String[] args) {
        // Test execution
    }
}
`;
      }
      return code;
    
    case 'cpp':
    case 'c':
      return code;
    
    default:
      return code;
  }
}

function formatJudge0Response(result) {
  const status = getStatusDescription(result.status?.id);
  
  return {
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    compile_output: result.compile_output || '',
    message: result.message || '',
    time: result.time ? parseFloat(result.time) * 1000 : null, // Convert to ms
    memory: result.memory ? parseInt(result.memory) : null, // In KB
    status: status,
    statusId: result.status?.id,
    error: result.status?.id !== 3 ? (result.stderr || result.compile_output || result.message) : null
  };
}

function getStatusDescription(statusId) {
  const statuses = {
    1: 'In Queue',
    2: 'Processing',
    3: 'Accepted',
    4: 'Wrong Answer',
    5: 'Time Limit Exceeded',
    6: 'Compilation Error',
    7: 'Runtime Error (SIGSEGV)',
    8: 'Runtime Error (SIGXFSZ)',
    9: 'Runtime Error (SIGFPE)',
    10: 'Runtime Error (SIGABRT)',
    11: 'Runtime Error (NZEC)',
    12: 'Runtime Error (Other)',
    13: 'Internal Error',
    14: 'Exec Format Error'
  };
  
  return statuses[statusId] || 'Unknown';
}

export async function getSupportedLanguages() {
  try {
    const response = await axios.get(`${JUDGE0_API}/languages`, {
      headers: {
        'X-RapidAPI-Key': JUDGE0_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching languages:', error.message);
    return [];
  }
}

export default {
  executeCodeWithJudge0,
  executeCodeWithTestCases,
  getSupportedLanguages,
  languageIds
};
