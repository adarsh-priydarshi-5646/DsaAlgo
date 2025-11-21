import axios from 'axios';

const LEETCODE_API = 'https://leetcode.com/graphql';

export async function fetchAllProblems(limit = 50, skip = 0) {
  const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        total: totalNum
        questions: data {
          acRate
          difficulty
          freqBar
          frontendQuestionId: questionFrontendId
          isFavor
          paidOnly: isPaidOnly
          status
          title
          titleSlug
          topicTags {
            name
            id
            slug
          }
          hasSolution
          hasVideoSolution
        }
      }
    }
  `;

  try {
    const response = await axios.post(LEETCODE_API, {
      query,
      variables: {
        categorySlug: '',
        skip,
        limit,
        filters: {}
      }
    });

    return response.data.data.problemsetQuestionList;
  } catch (error) {
    console.error('Error fetching LeetCode problems:', error.message);
    throw new Error('Failed to fetch problems from LeetCode');
  }
}

export async function fetchProblemDetails(titleSlug) {
  const query = `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        questionFrontendId
        title
        titleSlug
        content
        difficulty
        likes
        dislikes
        similarQuestions
        topicTags {
          name
          slug
        }
        codeSnippets {
          lang
          langSlug
          code
        }
        stats
        hints
        solution {
          id
          canSeeDetail
          paidOnly
          hasVideoSolution
        }
        companyTagStats
        exampleTestcases
        sampleTestCase
        metaData
      }
    }
  `;

  try {
    const response = await axios.post(LEETCODE_API, {
      query,
      variables: { titleSlug }
    });

    return response.data.data.question;
  } catch (error) {
    console.error('Error fetching problem details:', error.message);
    throw new Error('Failed to fetch problem details');
  }
}

export async function fetchDailyProblem() {
  const query = `
    query questionOfToday {
      activeDailyCodingChallengeQuestion {
        date
        userStatus
        link
        question {
          acRate
          difficulty
          freqBar
          frontendQuestionId: questionFrontendId
          isFavor
          paidOnly: isPaidOnly
          status
          title
          titleSlug
          hasVideoSolution
          hasSolution
          topicTags {
            name
            id
            slug
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(LEETCODE_API, { query });
    return response.data.data.activeDailyCodingChallengeQuestion;
  } catch (error) {
    console.error('Error fetching daily problem:', error.message);
    return null;
  }
}

export function parseProblemContent(problem) {
  const metadata = problem.metaData ? JSON.parse(problem.metaData) : {};
  
  const examples = [];
  if (problem.exampleTestcases) {
    const testCases = problem.exampleTestcases.split('\n');
    for (let i = 0; i < testCases.length; i += 2) {
      if (testCases[i] && testCases[i + 1]) {
        examples.push({
          input: testCases[i],
          output: testCases[i + 1],
          explanation: ''
        });
      }
    }
  }

  return {
    id: problem.questionFrontendId,
    title: problem.title,
    slug: problem.titleSlug,
    difficulty: problem.difficulty,
    description: stripHtml(problem.content),
    content: problem.content,
    examples,
    hints: problem.hints || [],
    constraints: extractConstraints(problem.content),
    topicTags: problem.topicTags?.map(tag => tag.name) || [],
    codeSnippets: problem.codeSnippets || [],
    testCases: problem.exampleTestcases,
    likes: problem.likes,
    dislikes: problem.dislikes,
    acceptanceRate: problem.acRate || 0,
    metadata
  };
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractConstraints(content) {
  if (!content) return '';
  
  const constraintsMatch = content.match(/<p><strong>Constraints:<\/strong><\/p>(.*?)(?=<p><strong>|$)/s);
  if (constraintsMatch) {
    return stripHtml(constraintsMatch[1]);
  }
  
  return '';
}

export default {
  fetchAllProblems,
  fetchProblemDetails,
  fetchDailyProblem,
  parseProblemContent
};
