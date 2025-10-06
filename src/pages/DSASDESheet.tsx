import React, { useState, useEffect } from 'react';
// import { LucideIcon } from 'lucide-react';

const DSASDESheet = () => {
  const [sections, setSections] = useState([
    {
      title: 'Arrays & Strings',
      completed: 0,
      total: 25,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 10,
          problems: [
            { title: 'Two Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/two-sum/' },
            { title: 'Valid Palindrome', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-palindrome/' },
            { title: 'Reverse String', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-string/' },
            { title: 'Remove Duplicates', difficulty: 'Easy', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
            { title: 'Valid Anagram', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-anagram/' },
            { title: 'First Unique Character', difficulty: 'Easy', link: 'https://leetcode.com/problems/first-unique-character-in-a-string/' },
            { title: 'String to Integer', difficulty: 'Easy', link: 'https://leetcode.com/problems/string-to-integer-atoi/' },
            { title: 'Implement strStr()', difficulty: 'Easy', link: 'https://leetcode.com/problems/implement-strstr/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 10,
          problems: [
            { title: '3Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/3sum/' },
            { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
            { title: 'Group Anagrams', difficulty: 'Medium', link: 'https://leetcode.com/problems/group-anagrams/' },
            { title: 'Longest Palindromic Substring', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-substring/' },
            { title: 'Container With Most Water', difficulty: 'Medium', link: 'https://leetcode.com/problems/container-with-most-water/' },
            { title: 'Next Permutation', difficulty: 'Medium', link: 'https://leetcode.com/problems/next-permutation/' },
            { title: 'Rotate Image', difficulty: 'Medium', link: 'https://leetcode.com/problems/rotate-image/' },
            { title: 'Spiral Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/spiral-matrix/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 5,
          problems: [
            { title: 'Trapping Rain Water', difficulty: 'Hard', link: 'https://leetcode.com/problems/trapping-rain-water/' },
            { title: 'Longest Valid Parentheses', difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-valid-parentheses/' },
            { title: 'Minimum Window Substring', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-substring/' },
            { title: 'Sliding Window Maximum', difficulty: 'Hard', link: 'https://leetcode.com/problems/sliding-window-maximum/' },
            { title: 'Longest Consecutive Sequence', difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' }
          ]
        }
      ]
    },
    {
      title: 'Linked Lists',
      completed: 0,
      total: 20,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 8,
          problems: [
            { title: 'Reverse Linked List', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-linked-list/' },
            { title: 'Merge Two Sorted Lists', difficulty: 'Easy', link: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
            { title: 'Linked List Cycle', difficulty: 'Easy', link: 'https://leetcode.com/problems/linked-list-cycle/' },
            { title: 'Remove Duplicates from Sorted List', difficulty: 'Easy', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/' },
            { title: 'Palindrome Linked List', difficulty: 'Easy', link: 'https://leetcode.com/problems/palindrome-linked-list/' },
            { title: 'Intersection of Two Linked Lists', difficulty: 'Easy', link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 8,
          problems: [
            { title: 'Add Two Numbers', difficulty: 'Medium', link: 'https://leetcode.com/problems/add-two-numbers/' },
            { title: 'Remove Nth Node From End', difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
            { title: 'Merge K Sorted Lists', difficulty: 'Medium', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
            { title: 'Sort List', difficulty: 'Medium', link: 'https://leetcode.com/problems/sort-list/' },
            { title: 'Reorder List', difficulty: 'Medium', link: 'https://leetcode.com/problems/reorder-list/' },
            { title: 'Rotate List', difficulty: 'Medium', link: 'https://leetcode.com/problems/rotate-list/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 4,
          problems: [
            { title: 'Reverse Nodes in K-Group', difficulty: 'Hard', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
            { title: 'LRU Cache', difficulty: 'Hard', link: 'https://leetcode.com/problems/lru-cache/' },
            { title: 'Copy List with Random Pointer', difficulty: 'Hard', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
            { title: 'Merge K Sorted Lists', difficulty: 'Hard', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' }
          ]
        }
      ]
    },
    {
      title: 'Trees & Graphs',
      completed: 0,
      total: 30,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 10,
          problems: [
            { title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
            { title: 'Symmetric Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/symmetric-tree/' },
            { title: 'Path Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/path-sum/' },
            { title: 'Binary Tree Level Order Traversal', difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
            { title: 'Convert Sorted Array to BST', difficulty: 'Easy', link: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/' },
            { title: 'Balanced Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/balanced-binary-tree/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 12,
          problems: [
            { title: 'Construct Binary Tree from Preorder and Inorder', difficulty: 'Medium', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
            { title: 'Validate Binary Search Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/validate-binary-search-tree/' },
            { title: 'Binary Tree Zigzag Level Order', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' },
            { title: 'Number of Islands', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-islands/' },
            { title: 'Course Schedule', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule/' },
            { title: 'Redundant Connection', difficulty: 'Medium', link: 'https://leetcode.com/problems/redundant-connection/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 8,
          problems: [
            { title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
            { title: 'Word Ladder', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-ladder/' },
            { title: 'Word Search II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-search-ii/' },
            { title: 'Alien Dictionary', difficulty: 'Hard', link: 'https://leetcode.com/problems/alien-dictionary/' },
            { title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' }
          ]
        }
      ]
    },
    {
      title: 'Dynamic Programming',
      completed: 0,
      total: 25,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 8,
          problems: [
            { title: 'Climbing Stairs', difficulty: 'Easy', link: 'https://leetcode.com/problems/climbing-stairs/' },
            { title: 'House Robber', difficulty: 'Easy', link: 'https://leetcode.com/problems/house-robber/' },
            { title: 'Maximum Subarray', difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-subarray/' },
            { title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
            { title: 'Min Cost Climbing Stairs', difficulty: 'Easy', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 10,
          problems: [
            { title: 'Longest Increasing Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
            { title: 'Coin Change', difficulty: 'Medium', link: 'https://leetcode.com/problems/coin-change/' },
            { title: 'Word Break', difficulty: 'Medium', link: 'https://leetcode.com/problems/word-break/' },
            { title: 'Unique Paths', difficulty: 'Medium', link: 'https://leetcode.com/problems/unique-paths/' },
            { title: 'Longest Palindromic Substring', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-substring/' },
            { title: 'Decode Ways', difficulty: 'Medium', link: 'https://leetcode.com/problems/decode-ways/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 7,
          problems: [
            { title: 'Edit Distance', difficulty: 'Hard', link: 'https://leetcode.com/problems/edit-distance/' },
            { title: 'Regular Expression Matching', difficulty: 'Hard', link: 'https://leetcode.com/problems/regular-expression-matching/' },
            { title: 'Wildcard Matching', difficulty: 'Hard', link: 'https://leetcode.com/problems/wildcard-matching/' },
            { title: 'Longest Valid Parentheses', difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-valid-parentheses/' },
            { title: 'Distinct Subsequences', difficulty: 'Hard', link: 'https://leetcode.com/problems/distinct-subsequences/' }
          ]
        }
      ]
    },
    {
      title: 'Heap & Priority Queue',
      completed: 0,
      total: 15,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 5,
          problems: [
            { title: 'Kth Largest Element', difficulty: 'Easy', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
            { title: 'Merge K Sorted Lists', difficulty: 'Easy', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
            { title: 'Top K Frequent Elements', difficulty: 'Easy', link: 'https://leetcode.com/problems/top-k-frequent-elements/' },
            { title: 'Find K Pairs with Smallest Sums', difficulty: 'Easy', link: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 7,
          problems: [
            { title: 'Find Median from Data Stream', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-median-from-data-stream/' },
            { title: 'Sliding Window Maximum', difficulty: 'Medium', link: 'https://leetcode.com/problems/sliding-window-maximum/' },
            { title: 'Task Scheduler', difficulty: 'Medium', link: 'https://leetcode.com/problems/task-scheduler/' },
            { title: 'Network Delay Time', difficulty: 'Medium', link: 'https://leetcode.com/problems/network-delay-time/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Merge K Sorted Lists', difficulty: 'Hard', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
            { title: 'The Skyline Problem', difficulty: 'Hard', link: 'https://leetcode.com/problems/the-skyline-problem/' },
            { title: 'Find Median from Data Stream', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-median-from-data-stream/' }
          ]
        }
      ]
    },
    {
      title: 'Backtracking',
      completed: 0,
      total: 20,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 6,
          problems: [
            { title: 'Subsets', difficulty: 'Easy', link: 'https://leetcode.com/problems/subsets/' },
            { title: 'Permutations', difficulty: 'Easy', link: 'https://leetcode.com/problems/permutations/' },
            { title: 'Combination Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/combination-sum/' },
            { title: 'Letter Combinations of a Phone Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 8,
          problems: [
            { title: 'Word Search', difficulty: 'Medium', link: 'https://leetcode.com/problems/word-search/' },
            { title: 'Generate Parentheses', difficulty: 'Medium', link: 'https://leetcode.com/problems/generate-parentheses/' },
            { title: 'Sudoku Solver', difficulty: 'Medium', link: 'https://leetcode.com/problems/sudoku-solver/' },
            { title: 'Combination Sum II', difficulty: 'Medium', link: 'https://leetcode.com/problems/combination-sum-ii/' },
            { title: 'Permutations II', difficulty: 'Medium', link: 'https://leetcode.com/problems/permutations-ii/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 6,
          problems: [
            { title: 'N-Queens', difficulty: 'Hard', link: 'https://leetcode.com/problems/n-queens/' },
            { title: 'Word Ladder II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-ladder-ii/' },
            { title: 'Palindrome Partitioning', difficulty: 'Hard', link: 'https://leetcode.com/problems/palindrome-partitioning/' },
            { title: 'Word Search II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-search-ii/' }
          ]
        }
      ]
    },
    {
      title: 'Greedy Algorithms',
      completed: 0,
      total: 15,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 5,
          problems: [
            { title: 'Jump Game', difficulty: 'Easy', link: 'https://leetcode.com/problems/jump-game/' },
            { title: 'Gas Station', difficulty: 'Easy', link: 'https://leetcode.com/problems/gas-station/' },
            { title: 'Lemonade Change', difficulty: 'Easy', link: 'https://leetcode.com/problems/lemonade-change/' },
            { title: 'Assign Cookies', difficulty: 'Easy', link: 'https://leetcode.com/problems/assign-cookies/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 7,
          problems: [
            { title: 'Jump Game II', difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game-ii/' },
            { title: 'Candy', difficulty: 'Medium', link: 'https://leetcode.com/problems/candy/' },
            { title: 'Minimum Number of Arrows', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/' },
            { title: 'Non-overlapping Intervals', difficulty: 'Medium', link: 'https://leetcode.com/problems/non-overlapping-intervals/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Minimum Window Substring', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-substring/' },
            { title: 'Longest Valid Parentheses', difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-valid-parentheses/' },
            { title: 'Candy', difficulty: 'Hard', link: 'https://leetcode.com/problems/candy/' }
          ]
        }
      ]
    },
    {
      title: 'Bit Manipulation',
      completed: 0,
      total: 12,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 4,
          problems: [
            { title: 'Single Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/single-number/' },
            { title: 'Number of 1 Bits', difficulty: 'Easy', link: 'https://leetcode.com/problems/number-of-1-bits/' },
            { title: 'Counting Bits', difficulty: 'Easy', link: 'https://leetcode.com/problems/counting-bits/' },
            { title: 'Power of Two', difficulty: 'Easy', link: 'https://leetcode.com/problems/power-of-two/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 5,
          problems: [
            { title: 'Sum of Two Integers', difficulty: 'Medium', link: 'https://leetcode.com/problems/sum-of-two-integers/' },
            { title: 'Bitwise AND of Numbers Range', difficulty: 'Medium', link: 'https://leetcode.com/problems/bitwise-and-of-numbers-range/' },
            { title: 'Power of Two', difficulty: 'Medium', link: 'https://leetcode.com/problems/power-of-two/' },
            { title: 'Single Number II', difficulty: 'Medium', link: 'https://leetcode.com/problems/single-number-ii/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Maximum XOR of Two Numbers', difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/' },
            { title: 'Repeated DNA Sequences', difficulty: 'Hard', link: 'https://leetcode.com/problems/repeated-dna-sequences/' },
            { title: 'Bitwise AND of Numbers Range', difficulty: 'Hard', link: 'https://leetcode.com/problems/bitwise-and-of-numbers-range/' }
          ]
        }
      ]
    },
    {
      title: 'Trie',
      completed: 0,
      total: 10,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Implement Trie', difficulty: 'Easy', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
            { title: 'Longest Common Prefix', difficulty: 'Easy', link: 'https://leetcode.com/problems/longest-common-prefix/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 4,
          problems: [
            { title: 'Word Search II', difficulty: 'Medium', link: 'https://leetcode.com/problems/word-search-ii/' },
            { title: 'Add and Search Word', difficulty: 'Medium', link: 'https://leetcode.com/problems/add-and-search-word-data-structure-design/' },
            { title: 'Map Sum Pairs', difficulty: 'Medium', link: 'https://leetcode.com/problems/map-sum-pairs/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Word Search II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-search-ii/' },
            { title: 'Concatenated Words', difficulty: 'Hard', link: 'https://leetcode.com/problems/concatenated-words/' }
          ]
        }
      ]
    },
    {
      title: 'Segment Tree',
      completed: 0,
      total: 8,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 2,
          problems: [
            { title: 'Range Sum Query', difficulty: 'Easy', link: 'https://leetcode.com/problems/range-sum-query-immutable/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 4,
          problems: [
            { title: 'Range Sum Query Mutable', difficulty: 'Medium', link: 'https://leetcode.com/problems/range-sum-query-mutable/' },
            { title: 'Count of Range Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/count-of-range-sum/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 2,
          problems: [
            { title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' }
          ]
        }
      ]
    },
    {
      title: 'Binary Search',
      completed: 0,
      total: 15,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 5,
          problems: [
            { title: 'Binary Search', difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-search/' },
            { title: 'First Bad Version', difficulty: 'Easy', link: 'https://leetcode.com/problems/first-bad-version/' },
            { title: 'Search Insert Position', difficulty: 'Easy', link: 'https://leetcode.com/problems/search-insert-position/' },
            { title: 'Sqrt(x)', difficulty: 'Easy', link: 'https://leetcode.com/problems/sqrtx/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 7,
          problems: [
            { title: 'Find First and Last Position', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/' },
            { title: 'Search in Rotated Sorted Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
            { title: 'Find Peak Element', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-peak-element/' },
            { title: 'Search a 2D Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-a-2d-matrix/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
            { title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' }
          ]
        }
      ]
    },
    {
      title: 'Sliding Window',
      completed: 0,
      total: 12,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 4,
          problems: [
            { title: 'Maximum Subarray', difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-subarray/' },
            { title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 5,
          problems: [
            { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
            { title: 'Minimum Window Substring', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-window-substring/' },
            { title: 'Longest Repeating Character Replacement', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Sliding Window Maximum', difficulty: 'Hard', link: 'https://leetcode.com/problems/sliding-window-maximum/' },
            { title: 'Minimum Window Substring', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-substring/' }
          ]
        }
      ]
    },
    {
      title: 'Two Pointers',
      completed: 0,
      total: 15,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 5,
          problems: [
            { title: 'Two Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/two-sum/' },
            { title: 'Valid Palindrome', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-palindrome/' },
            { title: 'Reverse String', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-string/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 7,
          problems: [
            { title: '3Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/3sum/' },
            { title: 'Container With Most Water', difficulty: 'Medium', link: 'https://leetcode.com/problems/container-with-most-water/' },
            { title: 'Remove Nth Node From End', difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Trapping Rain Water', difficulty: 'Hard', link: 'https://leetcode.com/problems/trapping-rain-water/' },
            { title: 'Longest Valid Parentheses', difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-valid-parentheses/' }
          ]
        }
      ]
    },
    {
      title: 'Union Find',
      completed: 0,
      total: 10,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Number of Islands', difficulty: 'Easy', link: 'https://leetcode.com/problems/number-of-islands/' },
            { title: 'Redundant Connection', difficulty: 'Easy', link: 'https://leetcode.com/problems/redundant-connection/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 4,
          problems: [
            { title: 'Graph Valid Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/graph-valid-tree/' },
            { title: 'Number of Connected Components', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 3,
          problems: [
            { title: 'Longest Consecutive Sequence', difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
            { title: 'Number of Islands II', difficulty: 'Hard', link: 'https://leetcode.com/problems/number-of-islands-ii/' }
          ]
        }
      ]
    },
    {
      title: 'Topological Sort',
      completed: 0,
      total: 8,
      subsections: [
        { 
          title: 'Easy Problems', 
          completed: 0, 
          total: 2,
          problems: [
            { title: 'Course Schedule', difficulty: 'Easy', link: 'https://leetcode.com/problems/course-schedule/' }
          ]
        },
        { 
          title: 'Medium Problems', 
          completed: 0, 
          total: 4,
          problems: [
            { title: 'Course Schedule II', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule-ii/' },
            { title: 'Alien Dictionary', difficulty: 'Medium', link: 'https://leetcode.com/problems/alien-dictionary/' }
          ]
        },
        { 
          title: 'Hard Problems', 
          completed: 0, 
          total: 2,
          problems: [
            { title: 'Sequence Reconstruction', difficulty: 'Hard', link: 'https://leetcode.com/problems/sequence-reconstruction/' }
          ]
        }
      ]
    }
  ]);

  const [activeSection, setActiveSection] = useState<number>(0);
  const [completedProblems, setCompletedProblems] = useState<{[key: string]: boolean}>({});

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const toggleProblemCompletion = (sectionIndex: number, subsectionIndex: number, problemIndex: number) => {
    const key = `${sectionIndex}-${subsectionIndex}-${problemIndex}`;
    setCompletedProblems(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      localStorage.setItem('completedProblems', JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const savedStates = JSON.parse(localStorage.getItem('dsaStates') || '{}');
    const savedCompletedProblems = JSON.parse(localStorage.getItem('completedProblems') || '{}');
    if (savedStates) {
      setSections(savedStates.sections || sections);
    }
    if (savedCompletedProblems) {
      setCompletedProblems(savedCompletedProblems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dsaStates', JSON.stringify({ sections }));
  }, [sections]);

  const calculateProgress = (sectionIndex: number) => {
    let total = 0;
    let completed = 0;
    sections[sectionIndex].subsections.forEach((subsection, subIndex) => {
      subsection.problems.forEach((_, probIndex) => {
        total++;
        const key = `${sectionIndex}-${subIndex}-${probIndex}`;
        if (completedProblems[key]) {
          completed++;
        }
      });
    });
    return { completed, total };
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          SDE Interview Preparation Sheet
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 bg-gray-50 rounded-lg p-4 shadow-lg sticky top-20">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Topics</h2>
            <ul className="space-y-2">
              {sections.map((section, index) => {
                const { completed, total } = calculateProgress(index);
                const progress = (completed / total) * 100;
                return (
                  <li key={index}>
                    <button
                      onClick={() => toggleSection(index)}
                      className={`w-full text-left p-2 rounded transition-all duration-200 ${
                        activeSection === index
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{section.title}</span>
                        <span className="text-sm">{completed}/{total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`mb-8 transition-all duration-300 ${
                  activeSection === index ? 'block' : 'hidden'
                }`}
              >
                <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {section.title}
                  </h2>
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="bg-white rounded-lg p-4 shadow">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                          {subsection.title}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left border-b border-gray-200">
                                <th className="pb-2 text-gray-800">Status</th>
                                <th className="pb-2 text-gray-800">Problem</th>
                                <th className="pb-2 text-gray-800">Difficulty</th>
                                <th className="pb-2 text-gray-800">Practice</th>
                                <th className="pb-2 text-gray-800">Note</th>
                                <th className="pb-2 text-gray-800">Revision</th>
                              </tr>
                            </thead>
                            <tbody>
                              {subsection.problems.map((problem, probIndex) => {
                                const key = `${index}-${subIndex}-${probIndex}`;
                                return (
                                  <tr
                                    key={probIndex}
                                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                                      completedProblems[key] ? 'bg-green-50' : ''
                                    }`}
                                  >
                                    <td className="py-2">
                                      <input
                                        type="checkbox"
                                        checked={completedProblems[key] || false}
                                        onChange={() => toggleProblemCompletion(index, subIndex, probIndex)}
                                        className="w-4 h-4 rounded border-gray-300 bg-white"
                                      />
                                    </td>
                                    <td className="py-2 text-gray-800">{problem.title}</td>
                                    <td className="py-2">
                                      <span
                                        className={`px-2 py-1 rounded text-sm ${
                                          problem.difficulty === 'Easy'
                                            ? 'bg-green-600 text-white'
                                            : problem.difficulty === 'Medium'
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-red-600 text-white'
                                        }`}
                                      >
                                        {problem.difficulty}
                                      </span>
                                    </td>
                                    <td className="py-2">
                                      <a
                                        href={problem.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800"
                                      >
                                        🔗
                                      </a>
                                    </td>
                                    <td className="py-2">
                                      <button className="text-purple-600 hover:text-purple-800">
                                        ➕
                                      </button>
                                    </td>
                                    <td className="py-2">
                                      <button className="text-yellow-600 hover:text-yellow-800">
                                        ⭐
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSASDESheet;