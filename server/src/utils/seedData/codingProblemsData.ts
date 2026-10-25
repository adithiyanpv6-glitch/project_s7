export interface RawCodingProblem {
  title: string;
  slug: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  category: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<string, string>;
  testCases: { input: string; expectedOutput: string; isHidden?: boolean }[];
  hints: string[];
  editorial: string;
  companyTags: string[];
}

export const codingProblemsData: RawCodingProblem[] = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "EASY",
    category: "Arrays & Hashing",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "nums[1] + nums[2] == 6, so we return [1, 2]." },
      { input: "nums = [3,3], target = 6", output: "[0,1]" }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // Write your code here\n  \n}",
      python: "def twoSum(nums, target):\n    # Write your code here\n    pass",
      cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n}",
      java: "public int[] twoSum(int[] nums, int target) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]", isHidden: false },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]", isHidden: false },
      { input: "[3,3], 6", expectedOutput: "[0,1]", isHidden: false },
      { input: "[1,5,8,12,19], 20", expectedOutput: "[0,4]", isHidden: true },
      { input: "[-3,4,3,90], 0", expectedOutput: "[0,2]", isHidden: true }
    ],
    hints: [
      "A brute force approach checks all pairs in O(N^2) time.",
      "Can we use a Hash Map to look up the complement (target - nums[i]) in O(1) time?",
      "Iterate through the array once while storing the index of each visited number."
    ],
    editorial: "### Solution Overview\n\nWe iterate through the array while maintaining a hash map from number value to its index.\nFor each element `num` at index `i`, we check if `target - num` already exists in our map.\nIf it does, we return `[map[target - num], i]`.\nOtherwise, we record `map[num] = i`.\n\n- **Time Complexity:** O(N) because lookup and insertion in a hash table are O(1) on average.\n- **Space Complexity:** O(N) to store up to N elements in the map.",
    companyTags: ["Amazon", "TCS", "Microsoft", "Infosys"]
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "EASY",
    category: "Stacks",
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    starterCode: {
      javascript: "function isValid(s) {\n  // Write your code here\n  \n}",
      python: "def isValid(s: str) -> bool:\n    # Write your code here\n    pass",
      cpp: "bool isValid(string s) {\n    // Write your code here\n}",
      java: "public boolean isValid(String s) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: '"()"', expectedOutput: "true", isHidden: false },
      { input: '"()[]{}"', expectedOutput: "true", isHidden: false },
      { input: '"(]"', expectedOutput: "false", isHidden: false },
      { input: '"([{}])"', expectedOutput: "true", isHidden: true },
      { input: '"((("', expectedOutput: "false", isHidden: true }
    ],
    hints: [
      "Use a LIFO Stack data structure.",
      "When encountering an opening bracket, push it onto the stack.",
      "When encountering a closing bracket, check if the stack top matches."
    ],
    editorial: "### Solution Overview\n\nPush open brackets to a stack. When a closing bracket is seen, pop from the stack and verify that it matches. At the end, verify the stack is empty.\n\n- **Time Complexity:** O(N) single pass.\n- **Space Complexity:** O(N) for stack storage.",
    companyTags: ["Amazon", "Microsoft", "Zoho", "Accenture"]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "EASY",
    category: "Arrays & Two Pointers",
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "In this case, no transactions are done and max profit = 0." }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    starterCode: {
      javascript: "function maxProfit(prices) {\n  // Write your code here\n  \n}",
      python: "def maxProfit(prices: list[int]) -> int:\n    # Write your code here\n    pass",
      cpp: "int maxProfit(vector<int>& prices) {\n    // Write your code here\n}",
      java: "public int maxProfit(int[] prices) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5", isHidden: false },
      { input: "[7,6,4,3,1]", expectedOutput: "0", isHidden: false },
      { input: "[2,4,1]", expectedOutput: "2", isHidden: true },
      { input: "[3,2,6,5,0,3]", expectedOutput: "4", isHidden: true }
    ],
    hints: [
      "Keep track of the minimum price observed so far as you traverse the array.",
      "Calculate potential profit at each day: `price - minPrice`."
    ],
    editorial: "### Solution Overview\n\nMaintain `minPrice = Infinity` and `maxProfit = 0`. For each day's price, update `minPrice = min(minPrice, price)` and `maxProfit = max(maxProfit, price - minPrice)`.\n\n- **Time Complexity:** O(N)\n- **Space Complexity:** O(1)",
    companyTags: ["Amazon", "TCS", "Cognizant", "Microsoft"]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "MEDIUM",
    category: "Sliding Window",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with length of 1.' },
      { input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with length of 3.' }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    starterCode: {
      javascript: "function lengthOfLongestSubstring(s) {\n  // Write your code here\n  \n}",
      python: "def lengthOfLongestSubstring(s: str) -> int:\n    # Write your code here\n    pass",
      cpp: "int lengthOfLongestSubstring(string s) {\n    // Write your code here\n}",
      java: "public int lengthOfLongestSubstring(String s) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3", isHidden: false },
      { input: '"bbbbb"', expectedOutput: "1", isHidden: false },
      { input: '"pwwkew"', expectedOutput: "3", isHidden: false },
      { input: '""', expectedOutput: "0", isHidden: true },
      { input: '"tmmzuxt"', expectedOutput: "5", isHidden: true }
    ],
    hints: [
      "Use the sliding window technique with two pointers `left` and `right`.",
      "Store the most recent index of each character in a hash map."
    ],
    editorial: "### Solution Overview\n\nUse a sliding window `[left, right]`. Store the last seen index of each character in a map.\nWhen a duplicate character is seen at `right`, advance `left` to `max(left, map[char] + 1)`.\n\n- **Time Complexity:** O(N)\n- **Space Complexity:** O(min(N, charset size))",
    companyTags: ["Amazon", "Microsoft", "Freshworks", "Zoho"]
  },
  {
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "EASY",
    category: "Linked Lists",
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    starterCode: {
      javascript: "function reverseList(head) {\n  // ListNode: { val, next }\n  let prev = null, curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}",
      python: "def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev",
      cpp: "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}",
      java: "public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}"
    },
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]", isHidden: false },
      { input: "[1,2]", expectedOutput: "[2,1]", isHidden: false },
      { input: "[]", expectedOutput: "[]", isHidden: false }
    ],
    hints: [
      "Maintain three pointers: prev, curr, and next.",
      "Before changing curr.next, remember to store next = curr.next."
    ],
    editorial: "### Solution Overview\n\nIteratively redirect `curr.next` to `prev`, then advance `prev` and `curr`.\n\n- **Time Complexity:** O(N)\n- **Space Complexity:** O(1)",
    companyTags: ["Microsoft", "Amazon", "Infosys", "TCS"]
  },
  {
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "MEDIUM",
    category: "Two Pointers",
    description: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The vertical lines are [1,8,6,2,5,4,8,3,7]. In this case, max area is (8 - 1) * min(8, 7) = 7 * 7 = 49." },
      { input: "height = [1,1]", output: "1" }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    starterCode: {
      javascript: "function maxArea(height) {\n  // Write your code here\n  \n}",
      python: "def maxArea(height: list[int]) -> int:\n    # Write your code here\n    pass",
      cpp: "int maxArea(vector<int>& height) {\n    // Write your code here\n}",
      java: "public int maxArea(int[] height) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49", isHidden: false },
      { input: "[1,1]", expectedOutput: "1", isHidden: false },
      { input: "[4,3,2,1,4]", expectedOutput: "16", isHidden: true }
    ],
    hints: [
      "Start with the widest container using two pointers at index 0 and index N - 1.",
      "The height of the container is bounded by the shorter line.",
      "Move the pointer corresponding to the shorter height inward to potentially find a taller line."
    ],
    editorial: "### Solution Overview\n\nInitialize `left = 0` and `right = n - 1`. The area is `(right - left) * min(height[left], height[right])`. Move whichever pointer is shorter, because keeping the shorter line cannot yield a larger area as the width shrinks.\n\n- **Time Complexity:** O(N)\n- **Space Complexity:** O(1)",
    companyTags: ["Amazon", "Microsoft", "Zoho"]
  },
  {
    title: "Maximum Subarray (Kadane's Algorithm)",
    slug: "maximum-subarray",
    difficulty: "MEDIUM",
    category: "Dynamic Programming",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    starterCode: {
      javascript: "function maxSubArray(nums) {\n  // Write your code here\n  \n}",
      python: "def maxSubArray(nums: list[int]) -> int:\n    # Write your code here\n    pass",
      cpp: "int maxSubArray(vector<int>& nums) {\n    // Write your code here\n}",
      java: "public int maxSubArray(int[] nums) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isHidden: false },
      { input: "[1]", expectedOutput: "1", isHidden: false },
      { input: "[5,4,-1,7,8]", expectedOutput: "23", isHidden: false },
      { input: "[-1]", expectedOutput: "-1", isHidden: true }
    ],
    hints: [
      "If the current running sum becomes negative, resetting it to 0 is better than carrying it forward.",
      "Kadane's algorithm: `currSum = max(num, currSum + num)`."
    ],
    editorial: "### Solution Overview\n\nKadane's Algorithm tracks the maximum sum ending at the current position. If `currSum` dips below zero, start fresh from the current number.\n\n- **Time Complexity:** O(N)\n- **Space Complexity:** O(1)",
    companyTags: ["TCS", "Amazon", "Infosys", "Wipro"]
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "EASY",
    category: "Dynamic Programming",
    description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "There are two ways: (1 step + 1 step) or (2 steps)." },
      { input: "n = 3", output: "3", explanation: "There are three ways: (1+1+1), (1+2), or (2+1)." }
    ],
    constraints: [
      "1 <= n <= 45"
    ],
    starterCode: {
      javascript: "function climbStairs(n) {\n  // Write your code here\n  \n}",
      python: "def climbStairs(n: int) -> int:\n    # Write your code here\n    pass",
      cpp: "int climbStairs(int n) {\n    // Write your code here\n}",
      java: "public int climbStairs(int n) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: "2", expectedOutput: "2", isHidden: false },
      { input: "3", expectedOutput: "3", isHidden: false },
      { input: "4", expectedOutput: "5", isHidden: false },
      { input: "5", expectedOutput: "8", isHidden: true }
    ],
    hints: [
      "To reach step n, you can arrive from step (n - 1) or step (n - 2).",
      "Notice that `ways(n) = ways(n - 1) + ways(n - 2)`, which is the Fibonacci sequence."
    ],
    editorial: "### Solution Overview\n\nBase cases: `ways(1) = 1`, `ways(2) = 2`. For `i = 3` to `n`, update `curr = prev1 + prev2`.\n\n- **Time Complexity:** O(N)\n- **Space Complexity:** O(1)",
    companyTags: ["Accenture", "TCS", "Cognizant", "Deloitte"]
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "EASY",
    category: "Binary Search",
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4." },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1." }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    starterCode: {
      javascript: "function search(nums, target) {\n  // Write your code here\n  \n}",
      python: "def search(nums: list[int], target: int) -> int:\n    # Write your code here\n    pass",
      cpp: "int search(vector<int>& nums, int target) {\n    // Write your code here\n}",
      java: "public int search(int[] nums, int target) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", expectedOutput: "4", isHidden: false },
      { input: "[-1,0,3,5,9,12], 2", expectedOutput: "-1", isHidden: false },
      { input: "[5], 5", expectedOutput: "0", isHidden: true }
    ],
    hints: [
      "Calculate mid using `mid = Math.floor(left + (right - left) / 2)` to avoid integer overflow.",
      "Compare `nums[mid]` to `target`."
    ],
    editorial: "### Solution Overview\n\nStandard binary search over a sorted array. If `target == nums[mid]`, return `mid`. If `target < nums[mid]`, search left half (`right = mid - 1`), else search right half (`left = mid + 1`).\n\n- **Time Complexity:** O(log N)\n- **Space Complexity:** O(1)",
    companyTags: ["Infosys", "TCS", "Cognizant", "Wipro"]
  },
  {
    title: "Invert Binary Tree",
    slug: "invert-binary-tree",
    difficulty: "EASY",
    category: "Trees",
    description: "Given the `root` of a binary tree, invert the tree, and return its root.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
      { input: "root = []", output: "[]" }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    starterCode: {
      javascript: "function invertTree(root) {\n  if (!root) return null;\n  let temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}",
      python: "def invertTree(root):\n    if not root:\n        return None\n    root.left, root.right = invertTree(root.right), invertTree(root.left)\n    return root",
      cpp: "TreeNode* invertTree(TreeNode* root) {\n    if (!root) return nullptr;\n    TreeNode* temp = root->left;\n    root->left = invertTree(root->right);\n    root->right = invertTree(temp);\n    return root;\n}",
      java: "public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    TreeNode temp = root.left;\n    root.left = invertTree(root.right);\n    root.right = invertTree(temp);\n    return root;\n}"
    },
    testCases: [
      { input: "[4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]", isHidden: false },
      { input: "[2,1,3]", expectedOutput: "[2,3,1]", isHidden: false },
      { input: "[]", expectedOutput: "[]", isHidden: false }
    ],
    hints: [
      "Swap the left and right children of every node in the tree.",
      "Can be solved recursively with pre-order or post-order traversal."
    ],
    editorial: "### Solution Overview\n\nRecursively invert left and right subtrees and swap their pointers.\n\n- **Time Complexity:** O(N) visiting each node once.\n- **Space Complexity:** O(H) where H is tree height.",
    companyTags: ["Microsoft", "Amazon", "Zoho"]
  },
  {
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "MEDIUM",
    category: "Dynamic Programming",
    description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
      { input: "coins = [2], amount = 3", output: "-1" },
      { input: "coins = [1], amount = 0", output: "0" }
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    starterCode: {
      javascript: "function coinChange(coins, amount) {\n  // Write your code here\n  \n}",
      python: "def coinChange(coins: list[int], amount: int) -> int:\n    # Write your code here\n    pass",
      cpp: "int coinChange(vector<int>& coins, int amount) {\n    // Write your code here\n}",
      java: "public int coinChange(int[] coins, int amount) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: "[1,2,5], 11", expectedOutput: "3", isHidden: false },
      { input: "[2], 3", expectedOutput: "-1", isHidden: false },
      { input: "[1], 0", expectedOutput: "0", isHidden: false },
      { input: "[186,419,83,408], 6249", expectedOutput: "20", isHidden: true }
    ],
    hints: [
      "Define `dp[i]` as the minimum coins needed to make amount `i`.",
      "Initialize `dp` array with `amount + 1` (representing infinity), with `dp[0] = 0`.",
      "For each coin and each amount from coin to amount: `dp[i] = min(dp[i], dp[i - coin] + 1)`."
    ],
    editorial: "### Solution Overview\n\nBottom-up 1D DP: for each sub-amount `a` from 1 to `amount`, test every available `coin`. If `a >= coin`, transition is `dp[a] = min(dp[a], dp[a - coin] + 1)`.\n\n- **Time Complexity:** O(amount * len(coins))\n- **Space Complexity:** O(amount)",
    companyTags: ["Amazon", "Microsoft", "Freshworks"]
  },
  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "MEDIUM",
    category: "Arrays & Sorting",
    description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]." },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", explanation: "Intervals [1,4] and [4,5] are considered overlapping." }
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start_i <= end_i <= 10^4"
    ],
    starterCode: {
      javascript: "function merge(intervals) {\n  // Write your code here\n  \n}",
      python: "def merge(intervals: list[list[int]]) -> list[list[int]]:\n    # Write your code here\n    pass",
      cpp: "vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    // Write your code here\n}",
      java: "public int[][] merge(int[][] intervals) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]", isHidden: false },
      { input: "[[1,4],[4,5]]", expectedOutput: "[[1,5]]", isHidden: false },
      { input: "[[1,4],[2,3]]", expectedOutput: "[[1,4]]", isHidden: true }
    ],
    hints: [
      "Sort intervals by their starting times.",
      "Iterate through sorted intervals: if current interval overlaps with the last merged interval, extend the last interval's end."
    ],
    editorial: "### Solution Overview\n\nSort by start time. Iterate: if `curr[0] <= last[1]`, merge by `last[1] = max(last[1], curr[1])`. Otherwise, append `curr` to result.\n\n- **Time Complexity:** O(N log N) due to sorting.\n- **Space Complexity:** O(N) to store merged intervals.",
    companyTags: ["Amazon", "Microsoft", "Zoho"]
  },
  {
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "EASY",
    category: "Two Pointers",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: "false", explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: "true" }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    starterCode: {
      javascript: "function isPalindrome(s) {\n  // Write your code here\n  \n}",
      python: "def isPalindrome(s: str) -> bool:\n    # Write your code here\n    pass",
      cpp: "bool isPalindrome(string s) {\n    // Write your code here\n}",
      java: "public boolean isPalindrome(String s) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: "true", isHidden: false },
      { input: '"race a car"', expectedOutput: "false", isHidden: false },
      { input: '" "', expectedOutput: "true", isHidden: false },
      { input: '"0P"', expectedOutput: "false", isHidden: true }
    ],
    hints: [
      "Use two pointers, one at the beginning and one at the end.",
      "Skip non-alphanumeric characters using regex or character code checks."
    ],
    editorial: "### Solution Overview\n\nTwo pointers converge inward. Advance pointers while skipping non-alphanumeric symbols. Compare lowercased characters; if any differ, return `false`.\n\n- **Time Complexity:** O(N)\n- **Space Complexity:** O(1)",
    companyTags: ["TCS", "Accenture", "Cognizant", "Infosys"]
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "MEDIUM",
    category: "Arrays & Hashing",
    description: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' }
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    starterCode: {
      javascript: "function groupAnagrams(strs) {\n  // Write your code here\n  \n}",
      python: "def groupAnagrams(strs: list[str]) -> list[list[str]]:\n    # Write your code here\n    pass",
      cpp: "vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    // Write your code here\n}",
      java: "public List<List<String>> groupAnagrams(String[] strs) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]', isHidden: false },
      { input: '[""]', expectedOutput: '[[""]]', isHidden: false },
      { input: '["a"]', expectedOutput: '[["a"]]', isHidden: false }
    ],
    hints: [
      "Two words are anagrams if sorting their letters yields the identical string.",
      "Use the sorted string or character frequency array as the hash map key."
    ],
    editorial: "### Solution Overview\n\nFor each word, sort its letters to generate a canonical key (e.g. `'eat'` -> `'aet'`). Insert the word into a map keyed by this canonical representation.\n\n- **Time Complexity:** O(N * K log K) where K is max word length.\n- **Space Complexity:** O(N * K)",
    companyTags: ["Amazon", "Microsoft", "Freshworks"]
  },
  {
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "MEDIUM",
    category: "Binary Search",
    description: "There is an integer array `nums` sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (1 <= k < nums.length).\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
      { input: "nums = [1], target = 0", output: "-1" }
    ],
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated.",
      "-10^4 <= target <= 10^4"
    ],
    starterCode: {
      javascript: "function search(nums, target) {\n  // Write your code here\n  \n}",
      python: "def search(nums: list[int], target: int) -> int:\n    # Write your code here\n    pass",
      cpp: "int search(vector<int>& nums, int target) {\n    // Write your code here\n}",
      java: "public int search(int[] nums, int target) {\n    // Write your code here\n}"
    },
    testCases: [
      { input: "[4,5,6,7,0,1,2], 0", expectedOutput: "4", isHidden: false },
      { input: "[4,5,6,7,0,1,2], 3", expectedOutput: "-1", isHidden: false },
      { input: "[1], 0", expectedOutput: "-1", isHidden: false },
      { input: "[5,1,3], 5", expectedOutput: "0", isHidden: true }
    ],
    hints: [
      "Even though the array is rotated, one half of the array (left or right of mid) is ALWAYS strictly sorted.",
      "Determine which half is sorted, then check if target falls within that sorted half."
    ],
    editorial: "### Solution Overview\n\nCompute `mid`. If `nums[left] <= nums[mid]`, the left half is sorted. Check if `target` lies within `[nums[left], nums[mid]]`; if so search left, else search right. If the right half is sorted, check similarly.\n\n- **Time Complexity:** O(log N)\n- **Space Complexity:** O(1)",
    companyTags: ["Amazon", "Microsoft", "Zoho"]
  }
];
