// Owner Data Service - Manages real-time updates between Owner Dashboard and main pages
class OwnerDataService {
  constructor() {
    this.listeners = new Map();
    this.initializeData();
  }

  initializeData() {
    // Initialize with default data if not exists
    if (!localStorage.getItem('ownerProblems')) {
      const defaultProblems = [
        { 
          id: 1, 
          title: 'Two Sum', 
          difficulty: 'EASY', 
          category: 'Arrays', 
          status: 'ACTIVE', 
          submissions: 15,
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
          testCases: [
            { input: '[2,7,11,15], 9', expectedOutput: '[0,1]', isHidden: false },
            { input: '[3,2,4], 6', expectedOutput: '[1,2]', isHidden: false }
          ]
        },
        { 
          id: 2, 
          title: 'Add Two Numbers', 
          difficulty: 'MEDIUM', 
          category: 'Linked Lists', 
          status: 'ACTIVE', 
          submissions: 8,
          description: 'You are given two non-empty linked lists representing two non-negative integers.',
          testCases: [
            { input: '[2,4,3], [5,6,4]', expectedOutput: '[7,0,8]', isHidden: false }
          ]
        }
      ];
      localStorage.setItem('ownerProblems', JSON.stringify(defaultProblems));
    }

    if (!localStorage.getItem('ownerInterviewQuestions')) {
      const defaultQuestions = [
        {
          id: 1,
          title: 'What is Closure in JavaScript?',
          category: 'JavaScript',
          difficulty: 'MEDIUM',
          status: 'PUBLISHED',
          content: 'Explain the concept of closures in JavaScript with examples.',
          explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.',
          hinglishExplanation: 'Closure ek aisa function hai jo apne parent function ke variables ko access kar sakta hai, even jab parent function return ho chuka ho.',
          codeExamples: [
            {
              language: 'javascript',
              code: `function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // Output: 8`,
              output: '8',
              explanation: 'The inner function has access to the variable x from the outer function scope.'
            }
          ],
          multipleExamples: [
            {
              title: 'Counter Example',
              code: `function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
              explanation: 'Each call to counter() increments the private count variable.'
            }
          ],
          realWorldUseCases: [
            {
              title: 'Module Pattern',
              description: 'Creating private variables and methods in JavaScript modules.',
              example: `const myModule = (function() {
  let privateVar = 0;
  
  return {
    increment: () => ++privateVar,
    getCount: () => privateVar
  };
})();`
            }
          ],
          interviewTips: [
            {
              tip: 'Always explain with a practical example and mention lexical scoping.',
              importance: 'high'
            }
          ],
          diagramSteps: [
            {
              step: 'Function Creation',
              description: 'Outer function creates inner function'
            },
            {
              step: 'Variable Access',
              description: 'Inner function accesses outer variables'
            }
          ],
          keyPoints: [
            'Closures have access to outer function variables',
            'Variables are preserved even after outer function returns',
            'Commonly used in module patterns and callbacks'
          ]
        }
      ];
      localStorage.setItem('ownerInterviewQuestions', JSON.stringify(defaultQuestions));
    }
  }

  // Problems Management
  getProblems() {
    return JSON.parse(localStorage.getItem('ownerProblems') || '[]');
  }

  saveProblems(problems) {
    localStorage.setItem('ownerProblems', JSON.stringify(problems));
    this.notifyListeners('problems', problems);
  }

  addProblem(problem) {
    const problems = this.getProblems();
    const newProblem = {
      ...problem,
      id: Date.now(),
      submissions: 0
    };
    problems.push(newProblem);
    this.saveProblems(problems);
    return newProblem;
  }

  updateProblem(id, updatedProblem) {
    const problems = this.getProblems();
    const index = problems.findIndex(p => p.id === id);
    if (index !== -1) {
      problems[index] = { ...problems[index], ...updatedProblem };
      this.saveProblems(problems);
      return problems[index];
    }
    return null;
  }

  deleteProblem(id) {
    const problems = this.getProblems();
    const filteredProblems = problems.filter(p => p.id !== id);
    this.saveProblems(filteredProblems);
    return true;
  }

  // Interview Questions Management
  getInterviewQuestions() {
    return JSON.parse(localStorage.getItem('ownerInterviewQuestions') || '[]');
  }

  saveInterviewQuestions(questions) {
    localStorage.setItem('ownerInterviewQuestions', JSON.stringify(questions));
    this.notifyListeners('interviewQuestions', questions);
  }

  addInterviewQuestion(question) {
    const questions = this.getInterviewQuestions();
    const newQuestion = {
      ...question,
      id: Date.now()
    };
    questions.push(newQuestion);
    this.saveInterviewQuestions(questions);
    return newQuestion;
  }

  updateInterviewQuestion(id, updatedQuestion) {
    const questions = this.getInterviewQuestions();
    const index = questions.findIndex(q => q.id === id);
    if (index !== -1) {
      questions[index] = { ...questions[index], ...updatedQuestion };
      this.saveInterviewQuestions(questions);
      return questions[index];
    }
    return null;
  }

  deleteInterviewQuestion(id) {
    const questions = this.getInterviewQuestions();
    const filteredQuestions = questions.filter(q => q.id !== id);
    this.saveInterviewQuestions(filteredQuestions);
    return true;
  }

  // Users Management
  getUsers() {
    return JSON.parse(localStorage.getItem('ownerUsers') || '[]');
  }

  saveUsers(users) {
    localStorage.setItem('ownerUsers', JSON.stringify(users));
    this.notifyListeners('users', users);
  }

  addUser(user) {
    const users = this.getUsers();
    const newUser = {
      ...user,
      id: Date.now(),
      problemsSolved: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  updateUser(id, updatedUser) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      this.saveUsers(users);
      return users[index];
    }
    return null;
  }

  deleteUser(id) {
    const users = this.getUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    this.saveUsers(filteredUsers);
    return true;
  }

  // Real-time Updates
  subscribe(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type).add(callback);

    // Return unsubscribe function
    return () => {
      const typeListeners = this.listeners.get(type);
      if (typeListeners) {
        typeListeners.delete(callback);
      }
    };
  }

  notifyListeners(type, data) {
    const typeListeners = this.listeners.get(type);
    if (typeListeners) {
      typeListeners.forEach(callback => callback(data));
    }
  }

  // Export/Import Data
  exportData() {
    return {
      problems: this.getProblems(),
      interviewQuestions: this.getInterviewQuestions(),
      users: this.getUsers(),
      exportDate: new Date().toISOString()
    };
  }

  importData(data) {
    if (data.problems) {
      this.saveProblems(data.problems);
    }
    if (data.interviewQuestions) {
      this.saveInterviewQuestions(data.interviewQuestions);
    }
    if (data.users) {
      this.saveUsers(data.users);
    }
  }

  // Statistics
  getStatistics() {
    const problems = this.getProblems();
    const questions = this.getInterviewQuestions();
    const users = this.getUsers();

    return {
      totalProblems: problems.length,
      totalQuestions: questions.length,
      totalUsers: users.length,
      problemsByDifficulty: {
        EASY: problems.filter(p => p.difficulty === 'EASY').length,
        MEDIUM: problems.filter(p => p.difficulty === 'MEDIUM').length,
        HARD: problems.filter(p => p.difficulty === 'HARD').length
      },
      questionsByCategory: questions.reduce((acc, q) => {
        acc[q.category] = (acc[q.category] || 0) + 1;
        return acc;
      }, {}),
      publishedQuestions: questions.filter(q => q.status === 'PUBLISHED').length,
      activeProblems: problems.filter(p => p.status === 'ACTIVE').length
    };
  }
}

// Create singleton instance
const ownerDataService = new OwnerDataService();

export default ownerDataService;
