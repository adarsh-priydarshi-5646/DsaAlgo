import axios from 'axios';

const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com/submissions';
const JUDGE0_KEY = process.env.JUDGE0_API_KEY || 'ce0a6903a2msh6a90ca90b6b74b1p17c2c4jsn1c4d5a8c3b7e';

const languageMap = {
  javascript: 93,
  python: 92,
  java: 91,
  cpp: 54,
  c: 50,
  go: 95,
  rust: 73
};

export async function executeCode(code, language, testCases) {
  const results = [];

  for (const testCase of testCases) {
    try {
      const testInput = JSON.parse(testCase.input);
      const expectedOutput = JSON.parse(testCase.output);

      let actualOutput;
      let passed = false;
      let error = null;
      let executionTime = null;
      let memory = null;

      if (language.toLowerCase() === 'javascript') {
        try {
          const safeCode = `
            ${code}
            
            const testInput = ${JSON.stringify(testInput)};
            let result;
            
            if (typeof solve === 'function') {
              result = solve(testInput);
            } else if (typeof twoSum === 'function') {
              result = twoSum(testInput.nums, testInput.target);
            } else {
              throw new Error('No solve or twoSum function found');
            }
            
            JSON.stringify(result);
          `;

          actualOutput = eval(safeCode);
          actualOutput = JSON.parse(actualOutput);
          passed = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
        } catch (e) {
          error = e.message;
          actualOutput = null;
        }
      } else {
        const languageId = languageMap[language.toLowerCase()] || 93;
        const wrappedCode = wrapCodeWithTestCase(code, language, testInput);

        try {
          const submissionResponse = await axios.post(
            `${JUDGE0_API}?base64_encoded=false&wait=true`,
            {
              source_code: wrappedCode,
              language_id: languageId,
              stdin: '',
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

          if (result.status.id === 3) {
            try {
              actualOutput = JSON.parse(result.stdout.trim());
              passed = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
            } catch (e) {
              actualOutput = result.stdout.trim();
              passed = false;
            }
            executionTime = result.time ? parseFloat(result.time) * 1000 : null;
            memory = result.memory ? parseInt(result.memory) : null;
          } else if (result.status.id === 6) {
            error = result.compile_output || 'Compilation error';
          } else if (result.status.id === 5) {
            error = 'Time limit exceeded';
          } else if (result.status.id === 11) {
            error = result.stderr || 'Runtime error';
          } else {
            error = result.stderr || result.message || 'Unknown error';
          }
        } catch (apiError) {
          error = 'API execution failed: ' + apiError.message;
        }
      }

      results.push({
        testCaseId: testCase.id,
        passed,
        input: testCase.input,
        expectedOutput: JSON.stringify(expectedOutput),
        actualOutput: actualOutput !== undefined && actualOutput !== null ? JSON.stringify(actualOutput) : null,
        error,
        executionTime,
        memory
      });

    } catch (err) {
      results.push({
        testCaseId: testCase.id,
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: null,
        error: err.message || 'Execution failed',
        executionTime: null,
        memory: null
      });
    }
  }

  return results;
}

function wrapCodeWithTestCase(code, language, testInput) {
  switch (language.toLowerCase()) {
    case 'javascript':
      return `
${code}

const testInput = ${JSON.stringify(testInput)};
const result = solve ? solve(testInput) : (twoSum ? twoSum(testInput.nums, testInput.target) : null);
console.log(JSON.stringify(result));
`;

    case 'python':
      return `
${code}

import json
test_input = ${JSON.stringify(testInput).replace(/"/g, "'")}
result = solve(test_input) if 'solve' in dir() else None
print(json.dumps(result))
`;

    case 'java':
      return `
import com.google.gson.Gson;

${code}

public class Runner {
    public static void main(String[] args) {
        Gson gson = new Gson();
        String input = "${JSON.stringify(testInput).replace(/"/g, '\\"')}";
        Object result = new Solution().solve(gson.fromJson(input, Object.class));
        System.out.println(gson.toJson(result));
    }
}
`;

    default:
      return code;
  }
}

export async function runCodeLocally(code, language, testCases) {
  const results = [];

  for (const testCase of testCases) {
    try {
      const testInput = JSON.parse(testCase.input);
      const expectedOutput = JSON.parse(testCase.output);

      let actualOutput;
      let passed = false;
      let error = null;

      if (language === 'javascript') {
        try {
          const safeCode = `
            ${code}
            
            const testInput = ${JSON.stringify(testInput)};
            let result;
            
            if (typeof solve === 'function') {
              result = solve(testInput);
            } else if (typeof twoSum === 'function') {
              result = twoSum(testInput.nums, testInput.target);
            } else {
              throw new Error('No solve or twoSum function found');
            }
            
            result;
          `;

          actualOutput = eval(safeCode);
          passed = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
        } catch (e) {
          error = e.message;
        }
      }

      results.push({
        testCaseId: testCase.id,
        passed,
        input: testCase.input,
        expectedOutput: JSON.stringify(expectedOutput),
        actualOutput: actualOutput !== undefined ? JSON.stringify(actualOutput) : null,
        error,
        executionTime: null,
        memory: null
      });

    } catch (err) {
      results.push({
        testCaseId: testCase.id,
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: null,
        error: err.message,
        executionTime: null,
        memory: null
      });
    }
  }

  return results;
}
