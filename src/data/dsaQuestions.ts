export interface Question {
  title: string;
  leetcode: string;
  gfg: string;
}

export interface TopicData {
  name: string;
  icon: string;
  description: string;
  easy: Question[];
  medium: Question[];
  hard: Question[];
}

export const dsaTopics: TopicData[] = [
  {
    name: "Arrays",
    icon: "📊",
    description: "Master array manipulation and algorithms",
    easy: [
      {
        title: "Two Sum",
        leetcode: "https://leetcode.com/problems/two-sum",
        gfg: "https://practice.geeksforgeeks.org/problems/key-pair5616/1",
      },
      {
        title: "Best Time to Buy and Sell Stock",
        leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
        gfg: "https://practice.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1",
      },
      {
        title: "Plus One",
        leetcode: "https://leetcode.com/problems/plus-one",
        gfg: "https://practice.geeksforgeeks.org/problems/plus-one/1",
      },
      {
        title: "Move Zeroes",
        leetcode: "https://leetcode.com/problems/move-zeroes",
        gfg: "https://practice.geeksforgeeks.org/problems/move-all-zeroes-to-end-of-array/0",
      },
      {
        title: "Running Sum of 1d Array",
        leetcode: "https://leetcode.com/problems/running-sum-of-1d-array",
        gfg: "https://practice.geeksforgeeks.org/problems/running-sum-of-1d-array/1",
      }
    ],
    medium: [
      {
        title: "Container With Most Water",
        leetcode: "https://leetcode.com/problems/container-with-most-water",
        gfg: "https://practice.geeksforgeeks.org/problems/container-with-most-water0535/1",
      },
      {
        title: "3Sum",
        leetcode: "https://leetcode.com/problems/3sum",
        gfg: "https://practice.geeksforgeeks.org/problems/triplet-sum-in-array-1587115621/1",
      },
      {
        title: "Rotate Array",
        leetcode: "https://leetcode.com/problems/rotate-array",
        gfg: "https://practice.geeksforgeeks.org/problems/rotate-array-by-n-elements-1587115621/1",
      },
      {
        title: "Next Permutation",
        leetcode: "https://leetcode.com/problems/next-permutation",
        gfg: "https://practice.geeksforgeeks.org/problems/next-permutation5226/1",
      },
      {
        title: "Jump Game",
        leetcode: "https://leetcode.com/problems/jump-game",
        gfg: "https://practice.geeksforgeeks.org/problems/jump-game/1",
      }
    ],
    hard: [
      {
        title: "First Missing Positive",
        leetcode: "https://leetcode.com/problems/first-missing-positive",
        gfg: "https://practice.geeksforgeeks.org/problems/smallest-positive-missing-number-1587115621/1",
      },
      {
        title: "Trapping Rain Water",
        leetcode: "https://leetcode.com/problems/trapping-rain-water",
        gfg: "https://practice.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1",
      },
      {
        title: "Median of Two Sorted Arrays",
        leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays",
        gfg: "https://practice.geeksforgeeks.org/problems/median-of-2-sorted-arrays-of-different-sizes/1",
      }
    ]
  },
  {
    name: "Strings",
    icon: "🔤",
    description: "Learn string manipulation techniques",
    easy: [
      {
        title: "Valid Palindrome",
        leetcode: "https://leetcode.com/problems/valid-palindrome",
        gfg: "https://practice.geeksforgeeks.org/problems/palindrome-string0817/1",
      },
      {
        title: "Valid Anagram",
        leetcode: "https://leetcode.com/problems/valid-anagram",
        gfg: "https://practice.geeksforgeeks.org/problems/anagram-1587115620/1",
      },
      {
        title: "Reverse String",
        leetcode: "https://leetcode.com/problems/reverse-string",
        gfg: "https://practice.geeksforgeeks.org/problems/reverse-a-string/1",
      },
      {
        title: "First Unique Character",
        leetcode: "https://leetcode.com/problems/first-unique-character-in-a-string",
        gfg: "https://practice.geeksforgeeks.org/problems/non-repeating-character-1587115620/1",
      }
    ],
    medium: [
      {
        title: "Longest Palindromic Substring",
        leetcode: "https://leetcode.com/problems/longest-palindromic-substring",
        gfg: "https://practice.geeksforgeeks.org/problems/longest-palindrome-in-a-string3411/1",
      },
      {
        title: "Generate Parentheses",
        leetcode: "https://leetcode.com/problems/generate-parentheses",
        gfg: "https://practice.geeksforgeeks.org/problems/generate-all-possible-parentheses/1",
      },
      {
        title: "Longest Substring Without Repeating Characters",
        leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters",
        gfg: "https://practice.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1",
      },
      {
        title: "String to Integer (atoi)",
        leetcode: "https://leetcode.com/problems/string-to-integer-atoi",
        gfg: "https://practice.geeksforgeeks.org/problems/implement-atoi/1",
      }
    ],
    hard: [
      {
        title: "Regular Expression Matching",
        leetcode: "https://leetcode.com/problems/regular-expression-matching",
        gfg: "https://practice.geeksforgeeks.org/problems/regular-expression-matching/1",
      },
      {
        title: "Minimum Window Substring",
        leetcode: "https://leetcode.com/problems/minimum-window-substring",
        gfg: "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1",
      }
    ]
  },
  {
    name: "Linked Lists",
    icon: "⛓️",
    description: "Master linked list operations and algorithms",
    easy: [
      {
        title: "Reverse Linked List",
        leetcode: "https://leetcode.com/problems/reverse-linked-list",
        gfg: "https://practice.geeksforgeeks.org/problems/reverse-a-linked-list/1",
      },
      {
        title: "Middle of the Linked List",
        leetcode: "https://leetcode.com/problems/middle-of-the-linked-list",
        gfg: "https://practice.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1",
      },
      {
        title: "Delete Node in a Linked List",
        leetcode: "https://leetcode.com/problems/delete-node-in-a-linked-list",
        gfg: "https://practice.geeksforgeeks.org/problems/delete-a-node-in-single-linked-list/1",
      },
      {
        title: "Linked List Cycle",
        leetcode: "https://leetcode.com/problems/linked-list-cycle",
        gfg: "https://practice.geeksforgeeks.org/problems/detect-loop-in-linked-list/1",
      }
    ],
    medium: [
      {
        title: "Add Two Numbers",
        leetcode: "https://leetcode.com/problems/add-two-numbers",
        gfg: "https://practice.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1",
      },
      {
        title: "Remove Nth Node From End",
        leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list",
        gfg: "https://practice.geeksforgeeks.org/problems/remove-nth-node-from-end-of-list/1",
      },
      {
        title: "Rotate List",
        leetcode: "https://leetcode.com/problems/rotate-list",
        gfg: "https://practice.geeksforgeeks.org/problems/rotate-a-linked-list/1",
      },
      {
        title: "Sort List",
        leetcode: "https://leetcode.com/problems/sort-list",
        gfg: "https://practice.geeksforgeeks.org/problems/sort-a-linked-list/1",
      }
    ],
    hard: [
      {
        title: "Merge k Sorted Lists",
        leetcode: "https://leetcode.com/problems/merge-k-sorted-lists",
        gfg: "https://practice.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1",
      },
      {
        title: "Reverse Nodes in k-Group",
        leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group",
        gfg: "https://practice.geeksforgeeks.org/problems/reverse-a-linked-list-in-groups-of-given-size/1",
      }
    ]
  },
  {
    name: "Trees",
    icon: "🌳",
    description: "Learn tree traversal and manipulation",
    easy: [
      {
        title: "Maximum Depth of Binary Tree",
        leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree",
        gfg: "https://practice.geeksforgeeks.org/problems/height-of-binary-tree/1",
      },
      {
        title: "Invert Binary Tree",
        leetcode: "https://leetcode.com/problems/invert-binary-tree",
        gfg: "https://practice.geeksforgeeks.org/problems/mirror-tree/1",
      },
      {
        title: "Same Tree",
        leetcode: "https://leetcode.com/problems/same-tree",
        gfg: "https://practice.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1",
      },
      {
        title: "Symmetric Tree",
        leetcode: "https://leetcode.com/problems/symmetric-tree",
        gfg: "https://practice.geeksforgeeks.org/problems/symmetric-tree/1",
      }
    ],
    medium: [
      {
        title: "Binary Tree Level Order Traversal",
        leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal",
        gfg: "https://practice.geeksforgeeks.org/problems/level-order-traversal/1",
      },
      {
        title: "Validate Binary Search Tree",
        leetcode: "https://leetcode.com/problems/validate-binary-search-tree",
        gfg: "https://practice.geeksforgeeks.org/problems/check-for-bst/1",
      },
      {
        title: "Construct Binary Tree from Preorder and Inorder",
        leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal",
        gfg: "https://practice.geeksforgeeks.org/problems/construct-tree-1/1",
      },
      {
        title: "Binary Tree Zigzag Level Order Traversal",
        leetcode: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal",
        gfg: "https://practice.geeksforgeeks.org/problems/zigzag-tree-traversal/1",
      }
    ],
    hard: [
      {
        title: "Binary Tree Maximum Path Sum",
        leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum",
        gfg: "https://practice.geeksforgeeks.org/problems/maximum-path-sum-from-any-node/1",
      },
      {
        title: "Serialize and Deserialize Binary Tree",
        leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree",
        gfg: "https://practice.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1",
      }
    ]
  },
  {
    name: "Graphs",
    icon: "🕸️",
    description: "Master graph algorithms and traversal",
    easy: [
      {
        title: "Find the Town Judge",
        leetcode: "https://leetcode.com/problems/find-the-town-judge",
        gfg: "https://practice.geeksforgeeks.org/problems/find-the-town-judge/1",
      },
      {
        title: "Flood Fill",
        leetcode: "https://leetcode.com/problems/flood-fill",
        gfg: "https://practice.geeksforgeeks.org/problems/flood-fill-algorithm1856/1",
      },
      {
        title: "Number of Provinces",
        leetcode: "https://leetcode.com/problems/number-of-provinces",
        gfg: "https://practice.geeksforgeeks.org/problems/number-of-provinces/1",
      }
    ],
    medium: [
      {
        title: "Course Schedule",
        leetcode: "https://leetcode.com/problems/course-schedule",
        gfg: "https://practice.geeksforgeeks.org/problems/course-schedule/1",
      },
      {
        title: "Number of Islands",
        leetcode: "https://leetcode.com/problems/number-of-islands",
        gfg: "https://practice.geeksforgeeks.org/problems/find-the-number-of-islands/1",
      },
      {
        title: "Clone Graph",
        leetcode: "https://leetcode.com/problems/clone-graph",
        gfg: "https://practice.geeksforgeeks.org/problems/clone-graph/1",
      },
      {
        title: "Pacific Atlantic Water Flow",
        leetcode: "https://leetcode.com/problems/pacific-atlantic-water-flow",
        gfg: "https://practice.geeksforgeeks.org/problems/water-flow/1",
      }
    ],
    hard: [
      {
        title: "Word Ladder",
        leetcode: "https://leetcode.com/problems/word-ladder",
        gfg: "https://practice.geeksforgeeks.org/problems/word-ladder/1",
      },
      {
        title: "Alien Dictionary",
        leetcode: "https://leetcode.com/problems/alien-dictionary",
        gfg: "https://practice.geeksforgeeks.org/problems/alien-dictionary/1",
      }
    ]
  },
  {
    name: "Dynamic Programming",
    icon: "🎯",
    description: "Learn optimal substructure problems",
    easy: [
      {
        title: "Climbing Stairs",
        leetcode: "https://leetcode.com/problems/climbing-stairs",
        gfg: "https://practice.geeksforgeeks.org/problems/count-ways-to-reach-the-nth-stair-1587115620/1",
      },
      {
        title: "Maximum Subarray",
        leetcode: "https://leetcode.com/problems/maximum-subarray",
        gfg: "https://practice.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1",
      },
      {
        title: "House Robber",
        leetcode: "https://leetcode.com/problems/house-robber",
        gfg: "https://practice.geeksforgeeks.org/problems/stickler-theif-1587115621/1",
      },
      {
        title: "Pascal's Triangle",
        leetcode: "https://leetcode.com/problems/pascals-triangle",
        gfg: "https://practice.geeksforgeeks.org/problems/pascal-triangle0652/1",
      }
    ],
    medium: [
      {
        title: "Coin Change",
        leetcode: "https://leetcode.com/problems/coin-change",
        gfg: "https://practice.geeksforgeeks.org/problems/coin-change2448/1",
      },
      {
        title: "Longest Increasing Subsequence",
        leetcode: "https://leetcode.com/problems/longest-increasing-subsequence",
        gfg: "https://practice.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1",
      },
      {
        title: "Unique Paths",
        leetcode: "https://leetcode.com/problems/unique-paths",
        gfg: "https://practice.geeksforgeeks.org/problems/number-of-unique-paths5339/1",
      },
      {
        title: "Word Break",
        leetcode: "https://leetcode.com/problems/word-break",
        gfg: "https://practice.geeksforgeeks.org/problems/word-break1352/1",
      }
    ],
    hard: [
      {
        title: "Edit Distance",
        leetcode: "https://leetcode.com/problems/edit-distance",
        gfg: "https://practice.geeksforgeeks.org/problems/edit-distance3702/1",
      },
      {
        title: "Regular Expression Matching",
        leetcode: "https://leetcode.com/problems/regular-expression-matching",
        gfg: "https://practice.geeksforgeeks.org/problems/regular-expression-matching/1",
      },
      {
        title: "Burst Balloons",
        leetcode: "https://leetcode.com/problems/burst-balloons",
        gfg: "https://practice.geeksforgeeks.org/problems/burst-balloons/1",
      }
    ]
  },
  {
    name: "Backtracking",
    icon: "🔄",
    description: "Master recursive problem-solving",
    easy: [
      {
        title: "Letter Case Permutation",
        leetcode: "https://leetcode.com/problems/letter-case-permutation",
        gfg: "https://practice.geeksforgeeks.org/problems/permutation-with-spaces3627/1",
      },
      {
        title: "Binary Watch",
        leetcode: "https://leetcode.com/problems/binary-watch",
        gfg: "https://practice.geeksforgeeks.org/problems/binary-watch/1",
      }
    ],
    medium: [
      {
        title: "Subsets",
        leetcode: "https://leetcode.com/problems/subsets",
        gfg: "https://practice.geeksforgeeks.org/problems/subsets-1613027340/1",
      },
      {
        title: "Permutations",
        leetcode: "https://leetcode.com/problems/permutations",
        gfg: "https://practice.geeksforgeeks.org/problems/permutations-of-a-given-string-1587115620/1",
      },
      {
        title: "Combination Sum",
        leetcode: "https://leetcode.com/problems/combination-sum",
        gfg: "https://practice.geeksforgeeks.org/problems/combination-sum-1587115620/1",
      },
      {
        title: "Word Search",
        leetcode: "https://leetcode.com/problems/word-search",
        gfg: "https://practice.geeksforgeeks.org/problems/word-search/1",
      }
    ],
    hard: [
      {
        title: "N-Queens",
        leetcode: "https://leetcode.com/problems/n-queens",
        gfg: "https://practice.geeksforgeeks.org/problems/n-queen-problem0315/1",
      },
      {
        title: "Sudoku Solver",
        leetcode: "https://leetcode.com/problems/sudoku-solver",
        gfg: "https://practice.geeksforgeeks.org/problems/solve-the-sudoku-1587115621/1",
      }
    ]
  },
  {
    name: "Heap",
    icon: "📚",
    description: "Learn priority queue implementations",
    easy: [
      {
        title: "Kth Largest Element in a Stream",
        leetcode: "https://leetcode.com/problems/kth-largest-element-in-a-stream",
        gfg: "https://practice.geeksforgeeks.org/problems/kth-largest-element-in-a-stream2220/1",
      },
      {
        title: "Last Stone Weight",
        leetcode: "https://leetcode.com/problems/last-stone-weight",
        gfg: "https://practice.geeksforgeeks.org/problems/last-stone-weight/1",
      }
    ],
    medium: [
      {
        title: "Top K Frequent Elements",
        leetcode: "https://leetcode.com/problems/top-k-frequent-elements",
        gfg: "https://practice.geeksforgeeks.org/problems/top-k-frequent-elements-in-array/1",
      },
      {
        title: "Find K Pairs with Smallest Sums",
        leetcode: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums",
        gfg: "https://practice.geeksforgeeks.org/problems/find-k-pairs-with-smallest-sums/1",
      },
      {
        title: "K Closest Points to Origin",
        leetcode: "https://leetcode.com/problems/k-closest-points-to-origin",
        gfg: "https://practice.geeksforgeeks.org/problems/k-closest-points-to-origin/1",
      }
    ],
    hard: [
      {
        title: "Find Median from Data Stream",
        leetcode: "https://leetcode.com/problems/find-median-from-data-stream",
        gfg: "https://practice.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1",
      },
      {
        title: "Merge k Sorted Lists",
        leetcode: "https://leetcode.com/problems/merge-k-sorted-lists",
        gfg: "https://practice.geeksforgeeks.org/problems/merge-k-sorted-arrays/1",
      }
    ]
  },
  {
    name: "Binary Search",
    icon: "🔍",
    description: "Master efficient searching algorithms",
    easy: [
      {
        title: "Binary Search",
        leetcode: "https://leetcode.com/problems/binary-search",
        gfg: "https://practice.geeksforgeeks.org/problems/binary-search/1",
      },
      {
        title: "First Bad Version",
        leetcode: "https://leetcode.com/problems/first-bad-version",
        gfg: "https://practice.geeksforgeeks.org/problems/first-bad-version/1",
      },
      {
        title: "Search Insert Position",
        leetcode: "https://leetcode.com/problems/search-insert-position",
        gfg: "https://practice.geeksforgeeks.org/problems/search-insert-position-of-k-in-a-sorted-array/1",
      }
    ],
    medium: [
      {
        title: "Find First and Last Position",
        leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array",
        gfg: "https://practice.geeksforgeeks.org/problems/first-and-last-occurrences-of-x3116/1",
      },
      {
        title: "Search in Rotated Sorted Array",
        leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array",
        gfg: "https://practice.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1",
      },
      {
        title: "Find Minimum in Rotated Sorted Array",
        leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array",
        gfg: "https://practice.geeksforgeeks.org/problems/minimum-element-in-a-sorted-and-rotated-array3611/1",
      }
    ],
    hard: [
      {
        title: "Median of Two Sorted Arrays",
        leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays",
        gfg: "https://practice.geeksforgeeks.org/problems/median-of-2-sorted-arrays-of-different-sizes/1",
      },
      {
        title: "Split Array Largest Sum",
        leetcode: "https://leetcode.com/problems/split-array-largest-sum",
        gfg: "https://practice.geeksforgeeks.org/problems/split-array-largest-sum/1",
      }
    ]
  },
  {
    name: "Sliding Window",
    icon: "🪟",
    description: "Learn efficient window-based algorithms",
    easy: [
      {
        title: "Best Time to Buy and Sell Stock",
        leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
        gfg: "https://practice.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1",
      },
      {
        title: "Maximum Subarray",
        leetcode: "https://leetcode.com/problems/maximum-subarray",
        gfg: "https://practice.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1",
      }
    ],
    medium: [
      {
        title: "Longest Substring Without Repeating Characters",
        leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters",
        gfg: "https://practice.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1",
      },
      {
        title: "Minimum Window Substring",
        leetcode: "https://leetcode.com/problems/minimum-window-substring",
        gfg: "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1",
      },
      {
        title: "Longest Repeating Character Replacement",
        leetcode: "https://leetcode.com/problems/longest-repeating-character-replacement",
        gfg: "https://practice.geeksforgeeks.org/problems/longest-repeating-character-replacement/1",
      }
    ],
    hard: [
      {
        title: "Sliding Window Maximum",
        leetcode: "https://leetcode.com/problems/sliding-window-maximum",
        gfg: "https://practice.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1",
      },
      {
        title: "Minimum Window Subsequence",
        leetcode: "https://leetcode.com/problems/minimum-window-subsequence",
        gfg: "https://practice.geeksforgeeks.org/problems/minimum-window-subsequence/1",
      }
    ]
  },
  {
    name: "Two Pointers",
    icon: "👆",
    description: "Master pointer-based algorithms",
    easy: [
      {
        title: "Two Sum",
        leetcode: "https://leetcode.com/problems/two-sum",
        gfg: "https://practice.geeksforgeeks.org/problems/key-pair5616/1",
      },
      {
        title: "Valid Palindrome",
        leetcode: "https://leetcode.com/problems/valid-palindrome",
        gfg: "https://practice.geeksforgeeks.org/problems/palindrome-string0817/1",
      }
    ],
    medium: [
      {
        title: "3Sum",
        leetcode: "https://leetcode.com/problems/3sum",
        gfg: "https://practice.geeksforgeeks.org/problems/triplet-sum-in-array-1587115621/1",
      },
      {
        title: "Container With Most Water",
        leetcode: "https://leetcode.com/problems/container-with-most-water",
        gfg: "https://practice.geeksforgeeks.org/problems/container-with-most-water0535/1",
      },
      {
        title: "Trapping Rain Water",
        leetcode: "https://leetcode.com/problems/trapping-rain-water",
        gfg: "https://practice.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1",
      }
    ],
    hard: [
      {
        title: "4Sum",
        leetcode: "https://leetcode.com/problems/4sum",
        gfg: "https://practice.geeksforgeeks.org/problems/find-all-four-sum-numbers1732/1",
      },
      {
        title: "Minimum Window Substring",
        leetcode: "https://leetcode.com/problems/minimum-window-substring",
        gfg: "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1",
      }
    ]
  },
  {
    name: "Bit Manipulation",
    icon: "🔢",
    description: "Learn bit-level operations",
    easy: [
      {
        title: "Number of 1 Bits",
        leetcode: "https://leetcode.com/problems/number-of-1-bits",
        gfg: "https://practice.geeksforgeeks.org/problems/set-bits0143/1",
      },
      {
        title: "Reverse Bits",
        leetcode: "https://leetcode.com/problems/reverse-bits",
        gfg: "https://practice.geeksforgeeks.org/problems/reverse-bits3556/1",
      }
    ],
    medium: [
      {
        title: "Single Number",
        leetcode: "https://leetcode.com/problems/single-number",
        gfg: "https://practice.geeksforgeeks.org/problems/single-number1014/1",
      },
      {
        title: "Sum of Two Integers",
        leetcode: "https://leetcode.com/problems/sum-of-two-integers",
        gfg: "https://practice.geeksforgeeks.org/problems/sum-of-two-numbers-without-using-arithmetic-operators/1",
      },
      {
        title: "Counting Bits",
        leetcode: "https://leetcode.com/problems/counting-bits",
        gfg: "https://practice.geeksforgeeks.org/problems/count-total-set-bits-1587115620/1",
      }
    ],
    hard: [
      {
        title: "Maximum XOR of Two Numbers",
        leetcode: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array",
        gfg: "https://practice.geeksforgeeks.org/problems/maximum-xor-of-two-numbers-in-an-array/1",
      },
      {
        title: "Divide Two Integers",
        leetcode: "https://leetcode.com/problems/divide-two-integers",
        gfg: "https://practice.geeksforgeeks.org/problems/division-without-using-multiplication-division-and-mod-operator/1",
      }
    ]
  },
  {
    name: "Stack & Queue",
    icon: "📚",
    description: "Master stack and queue operations",
    easy: [
      {
        title: "Valid Parentheses",
        leetcode: "https://leetcode.com/problems/valid-parentheses",
        gfg: "https://practice.geeksforgeeks.org/problems/parenthesis-checker2744/1",
      },
      {
        title: "Implement Queue using Stacks",
        leetcode: "https://leetcode.com/problems/implement-queue-using-stacks",
        gfg: "https://practice.geeksforgeeks.org/problems/queue-using-two-stacks/1",
      }
    ],
    medium: [
      {
        title: "Min Stack",
        leetcode: "https://leetcode.com/problems/min-stack",
        gfg: "https://practice.geeksforgeeks.org/problems/get-minimum-element-from-stack/1",
      },
      {
        title: "Evaluate Reverse Polish Notation",
        leetcode: "https://leetcode.com/problems/evaluate-reverse-polish-notation",
        gfg: "https://practice.geeksforgeeks.org/problems/evaluate-the-expression/1",
      },
      {
        title: "Daily Temperatures",
        leetcode: "https://leetcode.com/problems/daily-temperatures",
        gfg: "https://practice.geeksforgeeks.org/problems/next-greater-element/1",
      }
    ],
    hard: [
      {
        title: "Largest Rectangle in Histogram",
        leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram",
        gfg: "https://practice.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1",
      },
      {
        title: "Sliding Window Maximum",
        leetcode: "https://leetcode.com/problems/sliding-window-maximum",
        gfg: "https://practice.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1",
      }
    ]
  },
  {
    name: "Hash Table",
    icon: "🗃️",
    description: "Learn hash-based data structures",
    easy: [
      {
        title: "Two Sum",
        leetcode: "https://leetcode.com/problems/two-sum",
        gfg: "https://practice.geeksforgeeks.org/problems/key-pair5616/1",
      },
      {
        title: "Valid Anagram",
        leetcode: "https://leetcode.com/problems/valid-anagram",
        gfg: "https://practice.geeksforgeeks.org/problems/anagram-1587115620/1",
      }
    ],
    medium: [
      {
        title: "Group Anagrams",
        leetcode: "https://leetcode.com/problems/group-anagrams",
        gfg: "https://practice.geeksforgeeks.org/problems/print-anagrams-together/1",
      },
      {
        title: "Longest Substring Without Repeating Characters",
        leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters",
        gfg: "https://practice.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1",
      },
      {
        title: "Subarray Sum Equals K",
        leetcode: "https://leetcode.com/problems/subarray-sum-equals-k",
        gfg: "https://practice.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1",
      }
    ],
    hard: [
      {
        title: "Minimum Window Substring",
        leetcode: "https://leetcode.com/problems/minimum-window-substring",
        gfg: "https://practice.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1",
      },
      {
        title: "Substring with Concatenation of All Words",
        leetcode: "https://leetcode.com/problems/substring-with-concatenation-of-all-words",
        gfg: "https://practice.geeksforgeeks.org/problems/substring-with-concatenation-of-all-words/1",
      }
    ]
  },
  {
    name: "Greedy Algorithms",
    icon: "🎯",
    description: "Learn greedy problem-solving techniques",
    easy: [
      {
        title: "Best Time to Buy and Sell Stock II",
        leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii",
        gfg: "https://practice.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1",
      },
      {
        title: "Assign Cookies",
        leetcode: "https://leetcode.com/problems/assign-cookies",
        gfg: "https://practice.geeksforgeeks.org/problems/assign-cookies/1",
      }
    ],
    medium: [
      {
        title: "Jump Game",
        leetcode: "https://leetcode.com/problems/jump-game",
        gfg: "https://practice.geeksforgeeks.org/problems/jump-game/1",
      },
      {
        title: "Gas Station",
        leetcode: "https://leetcode.com/problems/gas-station",
        gfg: "https://practice.geeksforgeeks.org/problems/circular-tour/1",
      },
      {
        title: "Minimum Number of Arrows",
        leetcode: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons",
        gfg: "https://practice.geeksforgeeks.org/problems/minimum-number-of-arrows-to-burst-balloons/1",
      }
    ],
    hard: [
      {
        title: "Candy",
        leetcode: "https://leetcode.com/problems/candy",
        gfg: "https://practice.geeksforgeeks.org/problems/candy/1",
      },
      {
        title: "Create Maximum Number",
        leetcode: "https://leetcode.com/problems/create-maximum-number",
        gfg: "https://practice.geeksforgeeks.org/problems/create-maximum-number/1",
      }
    ]
  },
  {
    name: "Sorting & Searching",
    icon: "🔍",
    description: "Master sorting and searching algorithms",
    easy: [
      {
        title: "Merge Sorted Array",
        leetcode: "https://leetcode.com/problems/merge-sorted-array",
        gfg: "https://practice.geeksforgeeks.org/problems/merge-two-sorted-arrays5135/1",
      },
      {
        title: "First Bad Version",
        leetcode: "https://leetcode.com/problems/first-bad-version",
        gfg: "https://practice.geeksforgeeks.org/problems/first-bad-version/1",
      }
    ],
    medium: [
      {
        title: "Search in Rotated Sorted Array",
        leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array",
        gfg: "https://practice.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1",
      },
      {
        title: "Find Peak Element",
        leetcode: "https://leetcode.com/problems/find-peak-element",
        gfg: "https://practice.geeksforgeeks.org/problems/peak-element/1",
      },
      {
        title: "Kth Largest Element",
        leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array",
        gfg: "https://practice.geeksforgeeks.org/problems/kth-smallest-element5635/1",
      }
    ],
    hard: [
      {
        title: "Median of Two Sorted Arrays",
        leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays",
        gfg: "https://practice.geeksforgeeks.org/problems/median-of-2-sorted-arrays-of-different-sizes/1",
      },
      {
        title: "Find Minimum in Rotated Sorted Array II",
        leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii",
        gfg: "https://practice.geeksforgeeks.org/problems/minimum-element-in-a-sorted-and-rotated-array3611/1",
      }
    ]
  }
];