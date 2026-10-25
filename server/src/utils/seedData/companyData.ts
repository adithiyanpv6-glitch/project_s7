export interface RawCompany {
  name: string;
  slug: string;
  category: string;
  description: string;
  logoUrl?: string;
  hiringProcess: { round: number; name: string; format: string; duration: string; details: string }[];
  eligibility: { minCgpa: number; backlogsAllowed: number; branches: string[]; graduationYears: number[] };
  examPattern: { sections: { name: string; questions: number; timeMinutes: number; negativeMarking: boolean }[]; totalTimeMinutes: number };
  importantTopics: string[];
  cutoffDetails: { aptitudeCutoff: number; codingCutoff: number; overallCutoff: number; notes: string };
  interviewThemes: string[];
  checklist: string[];
  salaryRange: string;
}

export const companyData: RawCompany[] = [
  {
    name: "TCS (Tata Consultancy Services)",
    slug: "tcs",
    category: "IT Services & Consulting",
    description: "TCS is a global leader in IT services, consulting, and business solutions. Hiring occurs through TCS NQT (National Qualifier Test) offering Ninja, Digital, and Prime cadences.",
    hiringProcess: [
      { round: 1, name: "TCS NQT Online Assessment", format: "Computer-Based Test", duration: "165 Mins", details: "Part A Foundation (Numerical, Verbal, Reasoning) + Part B Advanced (Advanced Quant, Advanced Reasoning, 2 Coding Questions)." },
      { round: 2, name: "Technical Interview", format: "Video / In-person", duration: "30-45 Mins", details: "Deep dive into OOP, DBMS, SQL queries, Final year project architecture, and coding basics." },
      { round: 3, name: "Managerial & HR Round", format: "In-person / Video", duration: "20-30 Mins", details: "Situational questions, relocation willingness, shift flexibility, and company culture alignment." }
    ],
    eligibility: {
      minCgpa: 6.0,
      backlogsAllowed: 1,
      branches: ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "All Engineering"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Numerical Ability", questions: 20, timeMinutes: 25, negativeMarking: false },
        { name: "Verbal Ability", questions: 25, timeMinutes: 25, negativeMarking: false },
        { name: "Reasoning Ability", questions: 20, timeMinutes: 25, negativeMarking: false },
        { name: "Advanced Quantitative & Reasoning", questions: 15, timeMinutes: 25, negativeMarking: false },
        { name: "Advanced Coding (2 Problems)", questions: 2, timeMinutes: 65, negativeMarking: false }
      ],
      totalTimeMinutes: 165
    },
    importantTopics: [
      "Percentages, Profit & Loss, Time & Work, Speed Distance",
      "Syllogisms, Blood Relations, Seating Arrangements, Coding Decoding",
      "Pointers, OOPs principles, Bitwise operations, Array manipulations",
      "SQL Joins, Group By, Subqueries, Normalization",
      "Data Structures: Strings, Arrays, HashMaps, Sliding Window"
    ],
    cutoffDetails: {
      aptitudeCutoff: 65,
      codingCutoff: 60,
      overallCutoff: 70,
      notes: "Score 80%+ overall and pass both coding challenges to be upgraded to TCS Digital (7 LPA) or TCS Prime (9-11 LPA) interviews."
    },
    interviewThemes: [
      "Project walkthrough & technical choices",
      "Basic SQL queries & table design",
      "Polymorphism, Inheritance vs Composition",
      "Willingness to work across technologies & shifts"
    ],
    checklist: [
      "Practice TCS NQT past numerical problems",
      "Master standard array & string coding problems in C/C++/Java/Python",
      "Prepare a 2-minute clear explanation of your capstone project",
      "Review core DBMS concepts & write clean SQL joins"
    ],
    salaryRange: "₹3.36 LPA (Ninja) | ₹7.0 LPA (Digital) | ₹9.0 - 11.5 LPA (Prime)"
  },
  {
    name: "Infosys",
    slug: "infosys",
    category: "IT Services",
    description: "Infosys is a global leader in next-generation digital services and consulting. Placement drives hire for System Engineer (SE), Digital Specialist Engineer (DSE), and Specialist Programmer (SP).",
    hiringProcess: [
      { round: 1, name: "Online Assessment (InfyTQ / HackWithInfy / Campus)", format: "Online CBT", duration: "100 Mins", details: "Reasoning Ability, Technical Mathematical Ability, Verbal Ability, Pseudo-code, and Numerical Puzzle." },
      { round: 2, name: "Technical Interview", format: "Virtual / Face to Face", duration: "35-45 Mins", details: "Core CS fundamentals (DBMS, OS, Networks), Pseudo-code tracing, and coding problem solving on screen." },
      { round: 3, name: "HR Interview", format: "Virtual", duration: "15-20 Mins", details: "Communication assessment, background verification, location preferences, and soft-skill appraisal." }
    ],
    eligibility: {
      minCgpa: 6.5,
      backlogsAllowed: 0,
      branches: ["CSE", "IT", "ECE", "EEE", "All STEM disciplines"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Reasoning Ability", questions: 15, timeMinutes: 25, negativeMarking: false },
        { name: "Technical Mathematical Ability", questions: 10, timeMinutes: 35, negativeMarking: false },
        { name: "Verbal Ability", questions: 20, timeMinutes: 20, negativeMarking: false },
        { name: "Pseudo-code Analysis", questions: 5, timeMinutes: 10, negativeMarking: false },
        { name: "Numerical Puzzle Solving", questions: 4, timeMinutes: 10, negativeMarking: false }
      ],
      totalTimeMinutes: 100
    },
    importantTopics: [
      "Pseudo-code tracing (Loops, Bitwise, Recursion)",
      "Data Sufficiency & Syllogisms",
      "Permutations, Combinations & Probability",
      "Relational Database Normalization & ACID Properties",
      "Dynamic Programming, Two Pointers, Trees (for DSE & SP roles)"
    ],
    cutoffDetails: {
      aptitudeCutoff: 65,
      codingCutoff: 70,
      overallCutoff: 68,
      notes: "High sectional cutoffs enforced across both Reasoning and Pseudo-code sections."
    },
    interviewThemes: [
      "Pseudo-code dry run on notepad/whiteboard",
      "Difference between abstract class and interface in Java/C++",
      "Normalization forms (1NF to BCNF)",
      "Explain an instance where you demonstrated leadership or fast learning"
    ],
    checklist: [
      "Solve at least 50 pseudo-code tracing questions",
      "Revise critical reasoning and syllogisms",
      "Practice dry-running algorithms line-by-line without an IDE",
      "Review Infosys 5 Core Values (C-LIFE)"
    ],
    salaryRange: "₹3.6 LPA (System Engineer) | ₹6.5 LPA (DSE) | ₹9.5 LPA (Specialist Programmer)"
  },
  {
    name: "Amazon",
    slug: "amazon",
    category: "Big Tech / Product",
    description: "Amazon builds e-commerce, cloud infrastructure (AWS), streaming, and AI products. Campus hiring for Software Development Engineer (SDE-1) focuses heavily on DSA and Leadership Principles.",
    hiringProcess: [
      { round: 1, name: "Online Assessment (OA)", format: "HackerRank platform", duration: "90-120 Mins", details: "2 Medium/Hard DSA coding challenges + Work Styles Assessment (Leadership Principles evaluation)." },
      { round: 2, name: "Technical Round 1 (Data Structures)", format: "Live Coding on Chime", duration: "60 Mins", details: "Live coding on Trees, Graphs, Two Pointers, or Dynamic Programming with optimal time/space complexity analysis." },
      { round: 3, name: "Technical Round 2 (Algorithms & Problem Solving)", format: "Live Coding on Chime", duration: "60 Mins", details: "Complex algorithm design, edge cases, unit tests, and 15 mins on Amazon Leadership Principles." },
      { round: 4, name: "Bar Raiser / Hiring Manager", format: "Video Interview", duration: "60 Mins", details: "Deep behavioral drill-down using STAR method on Customer Obsession, Ownership, Bias for Action, and high-level design." }
    ],
    eligibility: {
      minCgpa: 7.0,
      backlogsAllowed: 0,
      branches: ["CSE", "IT", "ECE", "Mathematics & Computing"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Coding Challenge 1 (Arrays / Strings / HashMaps)", questions: 1, timeMinutes: 35, negativeMarking: false },
        { name: "Coding Challenge 2 (Trees / Graphs / DP)", questions: 1, timeMinutes: 35, negativeMarking: false },
        { name: "Work Style Assessment & System Simulation", questions: 25, timeMinutes: 20, negativeMarking: false }
      ],
      totalTimeMinutes: 90
    },
    importantTopics: [
      "Binary Trees, Binary Search Trees, Tries",
      "Graphs (BFS, DFS, Dijkstra, Topological Sort)",
      "Dynamic Programming (0/1 Knapsack, Longest Common Subsequence, Coin Change)",
      "LRU Cache, Monotonic Queue, Two Pointers, Sliding Window",
      "Amazon 16 Leadership Principles (STAR method stories)"
    ],
    cutoffDetails: {
      aptitudeCutoff: 0,
      codingCutoff: 90,
      overallCutoff: 85,
      notes: "Must pass 100% of test cases on both coding questions and align strongly on Leadership Principles to secure interview invites."
    },
    interviewThemes: [
      "Explain time and space complexity with Big-O notation",
      "Proactively write edge case tests before the interviewer asks",
      "Tell me about a time you had to make a decision with incomplete information",
      "Tell me about a time you took ownership beyond your required scope"
    ],
    checklist: [
      "Solve Blind 75 and LeetCode Top Interview 150 problems",
      "Prepare 2 distinct STAR stories for each of the 16 Leadership Principles",
      "Practice vocalizing thoughts aloud while writing clean code on Google Docs / Notepad",
      "Review modular code design, naming conventions, and boundary condition handling"
    ],
    salaryRange: "₹28.0 - ₹44.0 LPA (Base + Stocks + Sign-on bonuses)"
  },
  {
    name: "Microsoft",
    slug: "microsoft",
    category: "Big Tech / Product",
    description: "Microsoft creates cloud platforms (Azure), enterprise software, operating systems, and developer tools. SDE campus hiring prioritizes clean code, systems understanding, and algorithmic elegance.",
    hiringProcess: [
      { round: 1, name: "Online Coding Assessment", format: "Codility / Mettl", duration: "70-90 Mins", details: "3 DSA coding problems evaluating algorithmic correctness, edge case handling, and time efficiency." },
      { round: 2, name: "Technical Round 1 (DSA & Code Quality)", format: "Teams Live Coding", duration: "45-60 Mins", details: "Medium DSA problems with an emphasis on readable, production-grade code, defensive programming, and memory safety." },
      { round: 3, name: "Technical Round 2 (Algorithms & Core Systems)", format: "Teams Live Coding", duration: "45-60 Mins", details: "Data structures, Operating Systems (concurrency, threads, memory paging), and low-level object-oriented design." },
      { round: 4, name: "AA (As Appropriate / Partner Manager) Round", format: "Video Interview", duration: "45-60 Mins", details: "Growth mindset, architectural problem solving, past projects, and cultural alignment." }
    ],
    eligibility: {
      minCgpa: 7.0,
      backlogsAllowed: 0,
      branches: ["CSE", "IT", "ECE", "Circuital Branches"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Algorithm Problem 1 (Easy-Medium)", questions: 1, timeMinutes: 25, negativeMarking: false },
        { name: "Algorithm Problem 2 (Medium)", questions: 1, timeMinutes: 30, negativeMarking: false },
        { name: "Algorithm Problem 3 (Medium-Hard)", questions: 1, timeMinutes: 35, negativeMarking: false }
      ],
      totalTimeMinutes: 90
    },
    importantTopics: [
      "Linked Lists, Strings, Matrix manipulations, Two Pointers",
      "Binary Trees, Lowest Common Ancestor, Tree Traversals",
      "Recursion, Backtracking & Dynamic Programming",
      "Operating System Concurrency (Mutex, Semaphores, Deadlocks, Virtual Memory)",
      "Object-Oriented Design (SOLID principles)"
    ],
    cutoffDetails: {
      aptitudeCutoff: 0,
      codingCutoff: 85,
      overallCutoff: 85,
      notes: "Codility evaluates strict correctness across hidden boundary test cases and memory overhead."
    },
    interviewThemes: [
      "How would you refactor this code to make it maintainable for a team?",
      "Design an LRU cache or rate limiter class with thread safety",
      "Explain how a page fault is handled by the CPU MMU and OS kernel",
      "Demonstrate Microsoft 'Growth Mindset': learning from failure"
    ],
    checklist: [
      "Practice writing clean production code without compiler linting shortcuts",
      "Review core OS concepts: processes, threads, virtual memory, synchronization",
      "Prepare clear explanations for all projects listed on your resume",
      "Study Microsoft design principles and developer ecosystem"
    ],
    salaryRange: "₹24.0 - ₹48.0 LPA (Base + Stock Units + Joining Bonus)"
  },
  {
    name: "Wipro",
    slug: "wipro",
    category: "IT Services",
    description: "Wipro is a prominent technology services and consulting company. Campus recruitment operates through the Elite National Talent Hunt (NTH) and Turbo cadences.",
    hiringProcess: [
      { round: 1, name: "Wipro Elite NTH Assessment", format: "AMCAT platform", duration: "128 Mins", details: "Aptitude (Quant, Logical, English) + Written Communication Test (Essay) + Online Programming (2 Coding Qs)." },
      { round: 2, name: "Technical Interview", format: "Virtual / In-person", duration: "25-35 Mins", details: "Programming basics in C++/Java/Python, academic mini-projects, basic SQL queries." },
      { round: 3, name: "HR Interview", format: "Virtual", duration: "15-20 Mins", details: "Verification of documents, service agreement discussion, and communication evaluation." }
    ],
    eligibility: {
      minCgpa: 6.0,
      backlogsAllowed: 1,
      branches: ["All Engineering Branches", "B.Tech / B.E / MCA"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Quantitative Aptitude", questions: 16, timeMinutes: 16, negativeMarking: false },
        { name: "Logical Reasoning", questions: 14, timeMinutes: 14, negativeMarking: false },
        { name: "Verbal English", questions: 18, timeMinutes: 18, negativeMarking: false },
        { name: "Written Communication (Essay)", questions: 1, timeMinutes: 20, negativeMarking: false },
        { name: "Coding Test (2 Questions)", questions: 2, timeMinutes: 60, negativeMarking: false }
      ],
      totalTimeMinutes: 128
    },
    importantTopics: [
      "Simple & Compound Interest, Time & Distance, Profit & Loss",
      "Blood Relations, Direction Sense, Coding-Decoding",
      "Grammar, Reading Comprehension, Sentence Completion",
      "Basic coding: String palindromes, Armstrong numbers, Array sorting, Matrix operations",
      "Core DBMS and Web concepts"
    ],
    cutoffDetails: {
      aptitudeCutoff: 60,
      codingCutoff: 50,
      overallCutoff: 65,
      notes: "Solving at least 1 coding question completely and clearing sectional aptitude cutoffs secures Elite selection; 2 coding questions upgrades to Turbo (6.5 LPA)."
    },
    interviewThemes: [
      "Walkthrough of simple algorithms (Fibonacci, Palindrome, Bubble Sort)",
      "Explain the differences between C and C++ or Java and Python",
      "Willingness to relocate to Wipro development centers across India"
    ],
    checklist: [
      "Practice 15-minute essay writing on contemporary tech and business topics",
      "Review basic number-theoretic and array coding problems",
      "Revise common formulas for quantitative aptitude",
      "Ensure resume projects have clear problem statements and personal contributions"
    ],
    salaryRange: "₹3.5 LPA (Elite) | ₹6.5 LPA (Turbo)"
  },
  {
    name: "Accenture",
    slug: "accenture",
    category: "Consulting & Technology",
    description: "Accenture is a leading global professional services company. Campus drives hire for Associate Software Engineer (ASE) and Advanced ASE (AASE) roles.",
    hiringProcess: [
      { round: 1, name: "Cognitive and Technical Assessment", format: "Online Proctored", duration: "90 Mins", details: "Cognitive (Critical Thinking, English, Abstract Reasoning) + Technical (Common App Suites, Pseudo-code, Cloud & Networking)." },
      { round: 2, name: "Coding Assessment", format: "Online Coding", duration: "45 Mins", details: "2 Coding questions (Strings, Arrays, Math). Unlocked only upon clearing Round 1 cutoff." },
      { round: 3, name: "Communication Assessment", format: "AI Automated Speech Test", duration: "20 Mins", details: "Reading sentences, repeat after me, storytelling, and impromptu speaking evaluated by speech recognition software." },
      { round: 4, name: "Interview Round (Technical + HR)", format: "Virtual Video Call", duration: "25-30 Mins", details: "Discussion of resume projects, technology interest, and situational behavioral questions." }
    ],
    eligibility: {
      minCgpa: 6.5,
      backlogsAllowed: 0,
      branches: ["All Engineering Branches", "M.Tech / MCA / M.Sc"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Cognitive Assessment (English, Critical Thinking, Abstract)", questions: 50, timeMinutes: 50, negativeMarking: false },
        { name: "Technical Assessment (Pseudo-code, Cloud, Security)", questions: 40, timeMinutes: 40, negativeMarking: false },
        { name: "Coding Assessment (2 Problems)", questions: 2, timeMinutes: 45, negativeMarking: false }
      ],
      totalTimeMinutes: 135
    },
    importantTopics: [
      "Pseudo-code tracing (Bitwise operators, Recursive loops)",
      "Cloud fundamentals (IaaS, PaaS, SaaS, Public/Private cloud)",
      "Network security, Firewalls, Encryption basics, MS Office suites",
      "Arrays, String manipulation, Matrix math, Hash Maps"
    ],
    cutoffDetails: {
      aptitudeCutoff: 65,
      codingCutoff: 60,
      overallCutoff: 70,
      notes: "The Cognitive + Technical round is an elimination round; clearing it immediately transitions candidate into the Coding test."
    },
    interviewThemes: [
      "Questions on final year college project architecture",
      "Scenario-based questions: how do you manage conflicts in team deliverables?",
      "Why Accenture and interest in enterprise cloud transformation?"
    ],
    checklist: [
      "Practice listening and speaking into a microphone for the Automated Communication Test",
      "Review Cloud computing basics (AWS/Azure/GCP fundamentals)",
      "Master bitwise operators (AND, OR, XOR, Left/Right shifts) for pseudo-code questions",
      "Prepare clear responses for team collaboration questions"
    ],
    salaryRange: "₹4.5 LPA (ASE) | ₹6.5 LPA (AASE)"
  },
  {
    name: "Cognizant",
    slug: "cognizant",
    category: "IT Services & Consulting",
    description: "Cognizant provides digital solutions, IT consulting, and operations. Campus hiring offers GenC, GenC Elevate, and GenC Next tracks.",
    hiringProcess: [
      { round: 1, name: "Cognizant Online Aptitude & Technical Test", format: "Online CBT", duration: "100 Mins", details: "Quantitative, Logical, Verbal, Code Debugging (fixing syntax/logical bugs in 7 snippets)." },
      { round: 2, name: "Advanced Skill Assessment (For GenC Next / Elevate)", format: "Online Coding", duration: "80 Mins", details: "Hands-on coding challenges in DSA or domain (Cloud, Full Stack, Data Engineering)." },
      { round: 3, name: "Technical & HR Interview", format: "Virtual", duration: "30-40 Mins", details: "Project evaluation, Java/Python/C++ OOPs, SQL queries, and candidate adaptability." }
    ],
    eligibility: {
      minCgpa: 6.0,
      backlogsAllowed: 1,
      branches: ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "All branches"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Quantitative Ability", questions: 25, timeMinutes: 35, negativeMarking: false },
        { name: "Logical Reasoning", questions: 20, timeMinutes: 25, negativeMarking: false },
        { name: "Verbal Ability", questions: 20, timeMinutes: 20, negativeMarking: false },
        { name: "Automata Fix / Code Debugging", questions: 7, timeMinutes: 20, negativeMarking: false }
      ],
      totalTimeMinutes: 100
    },
    importantTopics: [
      "Code debugging: array index out of bounds, loop termination conditions, integer overflow",
      "Number systems, Profit & Loss, Speed & Distance, Probability",
      "Data Interpretation, Syllogisms, Direction Sense",
      "OOP concepts: Polymorphism, Inheritance, Abstraction, Encapsulation",
      "Basic SQL queries (SELECT, JOIN, GROUP BY, Aggregate functions)"
    ],
    cutoffDetails: {
      aptitudeCutoff: 60,
      codingCutoff: 65,
      overallCutoff: 65,
      notes: "Automata Fix debugging accuracy is critical for qualification to the Elevate track (₹4.5 - ₹5.5 LPA)."
    },
    interviewThemes: [
      "Debug code snippets live during the interview",
      "Explain normalization up to 3NF with real-world examples",
      "Explain the lifecycle of your final-year college project"
    ],
    checklist: [
      "Practice 50+ Automata Fix debugging questions in C/C++/Java",
      "Review basic SQL syntax and relational table relationships",
      "Brush up on quantitative aptitude formulas and shortcuts",
      "Prepare a concise 1-minute self-introduction tailored to technology"
    ],
    salaryRange: "₹4.0 LPA (GenC) | ₹5.4 LPA (GenC Elevate) | ₹6.75 - 9.0 LPA (GenC Next)"
  },
  {
    name: "Zoho",
    slug: "zoho",
    category: "Product & SaaS",
    description: "Zoho builds a comprehensive suite of cloud software products (CRM, Mail, Books, Creator). Their hiring process is famous for pure programming and problem-solving without generic resume filtering.",
    hiringProcess: [
      { round: 1, name: "General Aptitude & C Programming MCQs", format: "Offline / Online", duration: "60-90 Mins", details: "Basic math & analytical reasoning + C programming snippet evaluation (pointers, recursion, bitwise)." },
      { round: 2, name: "Basic Programming Round", format: "Hands-on Coding", duration: "90 Mins", details: "5-6 coding problems on arrays, strings, matrix manipulations, patterns, and number systems." },
      { round: 3, name: "Advanced Programming Round", format: "System / Module Design", duration: "120-180 Mins", details: "Implement a complete miniature application (e.g. Railway Reservation, Taxi Booking, Snake Game, Ludo) in pure C++/Java without external libraries." },
      { round: 4, name: "Technical HR & General HR", format: "In-person", duration: "30-45 Mins", details: "Code review with Zoho team lead, architectural trade-offs, passion for coding, and long-term career aspirations." }
    ],
    eligibility: {
      minCgpa: 5.5,
      backlogsAllowed: 2,
      branches: ["All Branches / Degrees", "Skills and problem solving prioritized over GPA"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Analytical & Math Aptitude", questions: 15, timeMinutes: 30, negativeMarking: false },
        { name: "C Language Syntax & Tracing MCQs", questions: 15, timeMinutes: 30, negativeMarking: false },
        { name: "Hands-on Coding (5 Problems)", questions: 5, timeMinutes: 90, negativeMarking: false }
      ],
      totalTimeMinutes: 150
    },
    importantTopics: [
      "Pointers, double pointers, dynamic memory allocation (`malloc`, `free`) in C",
      "Recursion, backtracking, and matrix traversal (spiral, rotation)",
      "String parsing, custom tokenizers, regex-like character evaluation",
      "Object-Oriented Design for applications (Railway booking, Flight reservation)",
      "Data Structures without built-in libraries (implementing custom linked lists/queues)"
    ],
    cutoffDetails: {
      aptitudeCutoff: 50,
      codingCutoff: 80,
      overallCutoff: 75,
      notes: "Zoho heavily weights the Advanced Programming Round; clean OOP design and functional interactive CLI features are required."
    },
    interviewThemes: [
      "Live walkthrough of your miniature application code",
      "Add a sudden new feature to your code (e.g. cancellation policy, waiting list priorities)",
      "Pointer manipulation and memory leak prevention in C"
    ],
    checklist: [
      "Build at least 3 CLI mini-projects (Railway reservation, ATM, Vending machine)",
      "Master C pointers, memory addresses, and recursive functions",
      "Practice writing modular code with classes/structs without using language standard libraries",
      "Ensure fast typing and code debugging speed under time pressure"
    ],
    salaryRange: "₹6.0 - ₹12.0 LPA (Software Developer)"
  },
  {
    name: "Freshworks",
    slug: "freshworks",
    category: "Product & SaaS",
    description: "Freshworks creates modern SaaS software for customer service, IT service management (Freshservice), and CRM. Software engineer hiring tests clean code, REST APIs, and scalable problem solving.",
    hiringProcess: [
      { round: 1, name: "Online Coding Assessment", format: "HackerEarth / Mettl", duration: "90 Mins", details: "3 DSA coding problems (Arrays, HashMaps, Two Pointers, Trees) + MCQs on CS Fundamentals." },
      { round: 2, name: "Technical Interview 1 (DSA & Problem Solving)", format: "Video Call with CodePair", duration: "60 Mins", details: "Medium level algorithmic challenges, time/space optimization, and data structure selection." },
      { round: 3, name: "Technical Interview 2 (Web Systems & OOP)", format: "Video Call", duration: "60 Mins", details: "Object-oriented design, RESTful API principles, database modeling, and JavaScript/Backend fundamentals." },
      { round: 4, name: "Culture Fit & Leadership Round", format: "Video Call", duration: "30-45 Mins", details: "Alignment with Freshworks culture (CHAT: Craftsmanship, Happy work environment, Agility, True friend of customer)." }
    ],
    eligibility: {
      minCgpa: 7.0,
      backlogsAllowed: 0,
      branches: ["CSE", "IT", "ECE"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Computer Science MCQs (OS, DBMS, Networks, JS)", questions: 20, timeMinutes: 30, negativeMarking: true },
        { name: "Coding Problems (2 Medium DSA)", questions: 2, timeMinutes: 60, negativeMarking: false }
      ],
      totalTimeMinutes: 90
    },
    importantTopics: [
      "Arrays, Hash Tables, Sliding Window, Monotonic Stacks",
      "Binary Trees, Lowest Common Ancestor, Tree Traversals",
      "RESTful API design, HTTP methods, status codes, CORS",
      "Database indexing, transaction isolation, SQL queries",
      "Full stack basics: React lifecycle, Node.js event loop, asynchronous promises"
    ],
    cutoffDetails: {
      aptitudeCutoff: 0,
      codingCutoff: 80,
      overallCutoff: 80,
      notes: "Strong preference for students with solid full-stack web projects and clean software engineering habits."
    },
    interviewThemes: [
      "Design a REST API schema for a ticketing or CRM feature",
      "How would you optimize slow database queries in an application?",
      "Explain the event loop and asynchronous execution in Node.js / JavaScript",
      "Tell me about a challenging bug you fixed in your project"
    ],
    checklist: [
      "Review web architecture, client-server communication, and HTTP protocols",
      "Practice solving LeetCode Medium problems in under 30 minutes",
      "Be prepared to demonstrate and explain live web applications you have built",
      "Study Freshworks core products (Freshdesk, Freshservice) and modern SaaS trends"
    ],
    salaryRange: "₹12.0 - ₹18.0 LPA"
  },
  {
    name: "Deloitte",
    slug: "deloitte",
    category: "Consulting & Advisory",
    description: "Deloitte is one of the Big Four professional services firms, hiring for Technology Analyst, Risk & Financial Advisory, and Enterprise Technology roles.",
    hiringProcess: [
      { round: 1, name: "Online Cognitive & Technical Assessment", format: "Online CBT", duration: "90 Mins", details: "Quantitative Aptitude, Logical Reasoning, Verbal Ability, Technical MCQs (DBMS, SQL, Python/Java, Cloud), and Coding." },
      { round: 2, name: "Case Study / Group Discussion", format: "Virtual / In-person", duration: "30-45 Mins", details: "Business-technology case presentation, collaborative problem solving, articulation, and team dynamics." },
      { round: 3, name: "Technical Interview", format: "Virtual / In-person", duration: "30-40 Mins", details: "SQL queries, project architecture, data analytics fundamentals, and technology adoption." },
      { round: 4, name: "HR Interview", format: "Virtual / In-person", duration: "20 Mins", details: "Consulting mindset, client management scenarios, ethics, and career goals." }
    ],
    eligibility: {
      minCgpa: 6.5,
      backlogsAllowed: 0,
      branches: ["All Engineering Branches", "B.Tech / MCA / M.Tech"],
      graduationYears: [2024, 2025, 2026]
    },
    examPattern: {
      sections: [
        { name: "Quantitative Aptitude", questions: 15, timeMinutes: 20, negativeMarking: false },
        { name: "Logical Reasoning", questions: 15, timeMinutes: 20, negativeMarking: false },
        { name: "Verbal Ability", questions: 15, timeMinutes: 15, negativeMarking: false },
        { name: "Technical MCQs (SQL, DBMS, Cloud, Cyber)", questions: 20, timeMinutes: 20, negativeMarking: false },
        { name: "Coding Test (1 Problem)", questions: 1, timeMinutes: 30, negativeMarking: false }
      ],
      totalTimeMinutes: 105
    },
    importantTopics: [
      "SQL (Joins, Aggregations, Group By, Window functions)",
      "Data Interpretation (Bar charts, Pie charts, Tabular data)",
      "Profit & Loss, Ratios, Time & Work, Speed & Distance",
      "Critical reasoning, Statement-Assumption, Cause & Effect",
      "Cloud concepts, Cybersecurity fundamentals, Enterprise IT governance"
    ],
    cutoffDetails: {
      aptitudeCutoff: 65,
      codingCutoff: 60,
      overallCutoff: 70,
      notes: "Strong communication, professional business articulation, and structured thinking are heavily evaluated."
    },
    interviewThemes: [
      "Explain how your project solves a commercial or real-world problem",
      "Write SQL queries to find second-highest salary or customer order totals",
      "How would you advise a retail client looking to migrate to the cloud?",
      "Describe a scenario where you negotiated a win-win outcome in a team"
    ],
    checklist: [
      "Practice business case analysis and structured problem-framing",
      "Master writing medium-to-advanced SQL queries on paper",
      "Prepare for group discussion: active listening, summarizing, constructive contribution",
      "Review current technology consulting trends (GenAI, Cloud transformation, Cyber resilience)"
    ],
    salaryRange: "₹6.5 - ₹10.0 LPA (Analyst / Consultant)"
  }
];
