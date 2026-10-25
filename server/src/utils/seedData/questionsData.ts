export interface RawQuestion {
  title: string;
  prompt: string;
  category: string;
  subCategory: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  options: string[];
  correctOpt: number;
  explanation: string;
  companyTags: string[];
  isMockTest?: boolean;
}

// 155+ high quality placement questions
export const questionsData: RawQuestion[] = [
  // --- QUANTITATIVE APTITUDE (18 Qs) ---
  {
    title: "Profit and Loss Margin",
    prompt: "A merchant buys an item for $150 and marks it up by 40%. During a clearance sale, he offers a 20% discount on the marked price. What is his actual profit percentage?",
    category: "QUANTITATIVE",
    subCategory: "Profit & Loss",
    difficulty: "EASY",
    options: ["10%", "12%", "15%", "18%"],
    correctOpt: 1,
    explanation: "Cost Price = 150. Marked Price = 150 * 1.40 = 210. Selling Price with 20% discount = 210 * 0.80 = 168. Profit = 168 - 150 = 18. Profit % = (18 / 150) * 100 = 12%.",
    companyTags: ["TCS", "Infosys", "Wipro"]
  },
  {
    title: "Time and Work Efficiency",
    prompt: "A can complete a project in 12 days, and B is 60% more efficient than A. How many days will B alone take to complete the same project?",
    category: "QUANTITATIVE",
    subCategory: "Time & Work",
    difficulty: "EASY",
    options: ["6.5 days", "7.5 days", "8 days", "9 days"],
    correctOpt: 1,
    explanation: "Ratio of efficiency of A to B = 100 : 160 = 5 : 8. Time taken is inversely proportional to efficiency: Time of B = 12 * (5 / 8) = 60 / 8 = 7.5 days.",
    companyTags: ["Cognizant", "Accenture", "TCS"]
  },
  {
    title: "Pipes and Cisterns Inflow",
    prompt: "Pipe A can fill a tank in 20 hours while Pipe B can fill it in 30 hours. A leak at the bottom can empty the full tank in 60 hours. If all three are opened together, how long will it take to fill the tank?",
    category: "QUANTITATIVE",
    subCategory: "Time & Work",
    difficulty: "MEDIUM",
    options: ["12 hours", "15 hours", "18 hours", "20 hours"],
    correctOpt: 1,
    explanation: "Net rate per hour = (1/20) + (1/30) - (1/60) = (3 + 2 - 1)/60 = 4/60 = 1/15. Hence, tank fills in 15 hours.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    title: "Speed, Distance, and Relative Motion",
    prompt: "Two trains 140 m and 160 m long run at speeds of 60 km/h and 40 km/h respectively in opposite directions on parallel tracks. How much time do they take to cross each other completely?",
    category: "QUANTITATIVE",
    subCategory: "Speed & Distance",
    difficulty: "MEDIUM",
    options: ["9.8 seconds", "10.8 seconds", "11.5 seconds", "12.2 seconds"],
    correctOpt: 1,
    explanation: "Total distance = 140 + 160 = 300 m. Relative speed in opposite directions = 60 + 40 = 100 km/h = 100 * (5/18) = 250/9 m/s. Time = 300 / (250/9) = (300 * 9) / 250 = 10.8 seconds.",
    companyTags: ["Accenture", "Deloitte", "Wipro"]
  },
  {
    title: "Boats and Streams Upstream Speed",
    prompt: "A boat travels 24 km upstream in 6 hours and 28 km downstream in 4 hours. What is the speed of the water current in km/h?",
    category: "QUANTITATIVE",
    subCategory: "Speed & Distance",
    difficulty: "EASY",
    options: ["1.5 km/h", "2 km/h", "2.5 km/h", "3 km/h"],
    correctOpt: 0,
    explanation: "Upstream speed = 24 / 6 = 4 km/h. Downstream speed = 28 / 4 = 7 km/h. Current speed = (Downstream - Upstream) / 2 = (7 - 4) / 2 = 1.5 km/h.",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    title: "Compound Interest Compounded Semi-Annually",
    prompt: "Find the compound interest on $10,000 for 1.5 years at 10% per annum, compounded semi-annually.",
    category: "QUANTITATIVE",
    subCategory: "Simple & Compound Interest",
    difficulty: "MEDIUM",
    options: ["$1,500.00", "$1,576.25", "$1,625.50", "$1,710.00"],
    correctOpt: 1,
    explanation: "Rate semi-annually = 10% / 2 = 5%. Number of periods n = 1.5 * 2 = 3. Amount = 10000 * (1 + 0.05)^3 = 10000 * 1.157625 = $11,576.25. Interest = 11,576.25 - 10000 = $1,576.25.",
    companyTags: ["Deloitte", "TCS"]
  },
  {
    title: "Permutations of Non-repeating Letters",
    prompt: "In how many distinct ways can the letters of the word 'CAMPUS' be arranged such that the vowels always stay together?",
    category: "QUANTITATIVE",
    subCategory: "Permutations & Combinations",
    difficulty: "MEDIUM",
    options: ["120", "240", "360", "480"],
    correctOpt: 1,
    explanation: "Vowels in 'CAMPUS' are A and U (2 vowels). Consonants are C, M, P, S (4 consonants). Treat (A, U) as 1 block. Total units = 4 consonants + 1 block = 5 units. Arrangements of 5 units = 5! = 120. Vowels can be arranged among themselves in 2! = 2 ways. Total = 120 * 2 = 240.",
    companyTags: ["Amazon", "Zoho", "Infosys"]
  },
  {
    title: "Probability of Marbles Drawn",
    prompt: "A bag contains 5 red, 4 green, and 3 blue balls. If two balls are drawn at random without replacement, what is the probability that both are green?",
    category: "QUANTITATIVE",
    subCategory: "Probability",
    difficulty: "EASY",
    options: ["1/11", "2/11", "1/6", "3/22"],
    correctOpt: 0,
    explanation: "Total balls = 5 + 4 + 3 = 12. P(both green) = (4/12) * (3/11) = (1/3) * (3/11) = 1/11.",
    companyTags: ["Accenture", "TCS"]
  },
  {
    title: "Mixtures and Alligation",
    prompt: "In what ratio must tea worth $60 per kg be blended with tea worth $65 per kg so that selling the mixture at $68.20 per kg yields a 10% gain?",
    category: "QUANTITATIVE",
    subCategory: "Alligation & Mixture",
    difficulty: "HARD",
    options: ["2 : 3", "3 : 2", "3 : 4", "4 : 5"],
    correctOpt: 1,
    explanation: "Selling Price = 68.20 at 10% gain => Mean Cost Price = 68.20 / 1.10 = 62. By rule of alligation: Cheaper (60) vs Dearer (65), Mean (62). Difference (65 - 62) : (62 - 60) = 3 : 2.",
    companyTags: ["TCS", "Cognizant"]
  },
  {
    title: "Ages Linear Equations",
    prompt: "Ten years ago, the father was four times as old as his son. In ten years from now, he will be twice as old as his son. What is the father's current age?",
    category: "QUANTITATIVE",
    subCategory: "Problems on Ages",
    difficulty: "EASY",
    options: ["45 years", "50 years", "55 years", "60 years"],
    correctOpt: 1,
    explanation: "Let ages 10 years ago be 4x and x. Present ages: 4x + 10 and x + 10. In 10 years: (4x + 20) = 2 * (x + 20) => 4x + 20 = 2x + 40 => 2x = 20 => x = 10. Present age of father = 4(10) + 10 = 50 years.",
    companyTags: ["Wipro", "Infosys"]
  },
  {
    title: "Number System Remainder Theorem",
    prompt: "What is the remainder when (7^84) is divided by 342?",
    category: "QUANTITATIVE",
    subCategory: "Number Systems",
    difficulty: "HARD",
    options: ["1", "7", "49", "341"],
    correctOpt: 0,
    explanation: "Note that 7^3 = 343 = 342 + 1. 7^84 = (7^3)^28 = (342 + 1)^28. By binomial expansion, every term except the last is a multiple of 342. The last term is 1^28 = 1. Hence, remainder is 1.",
    companyTags: ["Amazon", "Zoho"]
  },
  {
    title: "Geometric Progression Sum to Infinity",
    prompt: "The first term of an infinite geometric progression is 12 and the sum to infinity is 36. What is the common ratio?",
    category: "QUANTITATIVE",
    subCategory: "Progressions",
    difficulty: "EASY",
    options: ["1/3", "1/2", "2/3", "3/4"],
    correctOpt: 2,
    explanation: "Sum S_inf = a / (1 - r) => 36 = 12 / (1 - r) => 1 - r = 12 / 36 = 1/3 => r = 1 - 1/3 = 2/3.",
    companyTags: ["Cognizant", "TCS"]
  },
  {
    title: "Data Interpretation Average Revenue",
    prompt: "A company's quarterly revenues are Q1: $4.2M, Q2: $5.8M, Q3: $6.6M, Q4: $7.4M. By what percentage did Q4 revenue increase compared to Q1?",
    category: "QUANTITATIVE",
    subCategory: "Data Interpretation",
    difficulty: "EASY",
    options: ["65.2%", "72.4%", "76.2%", "81.0%"],
    correctOpt: 2,
    explanation: "Increase = 7.4 - 4.2 = 3.2M. Percentage increase = (3.2 / 4.2) * 100 = 76.19% ≈ 76.2%.",
    companyTags: ["Deloitte", "Accenture"]
  },
  {
    title: "Calendar Day Calculation",
    prompt: "If 15th August 2011 was a Monday, what day of the week was 15th August 2012?",
    category: "QUANTITATIVE",
    subCategory: "Calendars & Clocks",
    difficulty: "EASY",
    options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    correctOpt: 1,
    explanation: "2012 is a leap year and February 2012 falls between August 15, 2011 and August 15, 2012. A leap year has 2 odd days (366 mod 7 = 2). Monday + 2 days = Wednesday.",
    companyTags: ["Infosys", "Wipro"]
  },
  {
    title: "Clocks Angle at Exact Time",
    prompt: "What is the angle between the hour hand and the minute hand of a clock at 3:40?",
    category: "QUANTITATIVE",
    subCategory: "Calendars & Clocks",
    difficulty: "MEDIUM",
    options: ["120°", "125°", "130°", "140°"],
    correctOpt: 2,
    explanation: "Formula: |30*H - (11/2)*M|. Here H = 3, M = 40. Angle = |30(3) - (11/2)(40)| = |90 - 220| = 130°.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    title: "Mensuration Cylinder Volume to Surface",
    prompt: "A solid cylinder of base radius 7 cm and height 10 cm is melted into identical spheres of radius 3.5 cm. How many spheres can be formed?",
    category: "QUANTITATIVE",
    subCategory: "Mensuration",
    difficulty: "MEDIUM",
    options: ["6", "8", "10", "12"],
    correctOpt: 1,
    explanation: "Volume of cylinder = π * r^2 * h = π * 49 * 10 = 490π. Volume of one sphere = (4/3) * π * (3.5)^3 = (4/3) * π * (42.875) = 57.166π. Number of spheres = 490π / ( (4/3) * 3.5^3 * π ) = 490 / 57.166 ≈ 8.57 => 8 complete spheres.",
    companyTags: ["TCS", "Wipro"]
  },
  {
    title: "HCF and LCM Product Rule",
    prompt: "The HCF and LCM of two numbers are 18 and 378 respectively. If one number is 54, what is the other number?",
    category: "QUANTITATIVE",
    subCategory: "Number Systems",
    difficulty: "EASY",
    options: ["108", "126", "144", "162"],
    correctOpt: 1,
    explanation: "Product of two numbers = HCF * LCM. Number 2 = (18 * 378) / 54 = 378 / 3 = 126.",
    companyTags: ["Cognizant", "Infosys"]
  },
  {
    title: "Races and Games of Skill",
    prompt: "In a 1000m race, A beats B by 100m or 10 seconds. What is A's time to complete the race?",
    category: "QUANTITATIVE",
    subCategory: "Speed & Distance",
    difficulty: "HARD",
    options: ["80 seconds", "90 seconds", "100 seconds", "110 seconds"],
    correctOpt: 1,
    explanation: "B covers 100m in 10 seconds => Speed of B = 10 m/s. Total time taken by B for 1000m = 1000 / 10 = 100 seconds. Since A beats B by 10 seconds, A's time = 100 - 10 = 90 seconds.",
    companyTags: ["Amazon", "TCS"]
  },

  // --- LOGICAL REASONING (17 Qs) ---
  {
    title: "Blood Relations Coded Expression",
    prompt: "If P + Q means 'P is the brother of Q', P - Q means 'P is the mother of Q', and P * Q means 'P is the sister of Q', which expression shows that M is the maternal uncle of R?",
    category: "LOGICAL",
    subCategory: "Blood Relations",
    difficulty: "MEDIUM",
    options: ["M + K - R", "M - K + R", "M * K - R", "M + K * R"],
    correctOpt: 0,
    explanation: "In 'M + K - R', M is brother of K, and K is mother of R. Therefore, M is brother of R's mother, which is maternal uncle.",
    companyTags: ["TCS", "Infosys", "Cognizant"]
  },
  {
    title: "Syllogism Universal and Particular",
    prompt: "Statements: 1. All engineers are problem solvers. 2. Some problem solvers are designers.\nConclusions:\nI. Some engineers are designers.\nII. Some problem solvers are engineers.",
    category: "LOGICAL",
    subCategory: "Syllogisms",
    difficulty: "EASY",
    options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
    correctOpt: 1,
    explanation: "Since 'All engineers are problem solvers', by conversion 'Some problem solvers are engineers' (Conclusion II) definitely holds. No direct link between engineers and designers, so I is not certain.",
    companyTags: ["Accenture", "Wipro"]
  },
  {
    title: "Circular Seating Arrangement",
    prompt: "Six friends A, B, C, D, E, and F sit around a circular table facing the center. B is between A and C. E is between D and F. D is to the immediate left of A. Who is sitting opposite to B?",
    category: "LOGICAL",
    subCategory: "Seating Arrangement",
    difficulty: "MEDIUM",
    options: ["D", "E", "F", "C"],
    correctOpt: 1,
    explanation: "Placing D left of A: A, B, C clockwise, D, E, F counter-clockwise. D is left of A. E sits opposite B.",
    companyTags: ["Amazon", "Zoho", "TCS"]
  },
  {
    title: "Coding Decoding Shift Cipher",
    prompt: "If in a certain code 'SYSTEM' is coded as 'SYSMET' and 'NEARER' is coded as 'AENRER', how is 'FRACTION' coded?",
    category: "LOGICAL",
    subCategory: "Coding-Decoding",
    difficulty: "MEDIUM",
    options: ["CARFNOIT", "CARFTION", "ARFCNOIT", "CARFNOIT"],
    correctOpt: 0,
    explanation: "The word has 8 letters: first 4 letters (FRAC) reversed -> CARF; next 4 letters (TION) reversed -> NOIT. Concatenated = CARFNOIT.",
    companyTags: ["Infosys", "Deloitte"]
  },
  {
    title: "Direction Sense Angle Turns",
    prompt: "Rohan walks 20m North. He turns right and walks 30m. He turns right again and walks 35m. Then he turns left and walks 15m. Finally, he turns left and walks 15m. In which direction and distance is he from his initial point?",
    category: "LOGICAL",
    subCategory: "Direction Sense",
    difficulty: "MEDIUM",
    options: ["45m East", "30m East", "45m North-East", "15m South"],
    correctOpt: 0,
    explanation: "North-South: +20 - 35 + 15 = 0m. East-West: +30 + 15 = 45m East. Hence, exactly 45m East from the starting point.",
    companyTags: ["TCS", "Cognizant"]
  },
  {
    title: "Number Series Pattern Gap",
    prompt: "Find the next number in the sequence: 4, 18, 48, 100, 180, ?",
    category: "LOGICAL",
    subCategory: "Series",
    difficulty: "HARD",
    options: ["248", "272", "294", "312"],
    correctOpt: 2,
    explanation: "Pattern is n^3 - n^2 or n^2 * (n - 1):\n1: 2^2 * (2-1) = 4\n2: 3^2 * (3-1) = 18\n3: 4^2 * (4-1) = 48\n4: 5^2 * (5-1) = 100\n5: 6^2 * (6-1) = 180\n6: 7^2 * (7-1) = 49 * 6 = 294.",
    companyTags: ["Amazon", "Infosys"]
  },
  {
    title: "Alphanumeric Matrix Puzzle",
    prompt: "Which character replaces the question mark?\n| A2 | C4 | E8 |\n| G3 | I9 | K27 |\n| M4 | O16 | ? |",
    category: "LOGICAL",
    subCategory: "Puzzles",
    difficulty: "EASY",
    options: ["Q32", "Q64", "P64", "R64"],
    correctOpt: 1,
    explanation: "Letters skip one: M (+2) O (+2) Q. Numbers in row 3 are powers of 4: 4^1=4, 4^2=16, 4^3=64. Hence Q64.",
    companyTags: ["Accenture", "TCS"]
  },
  {
    title: "Statement and Assumption Analysis",
    prompt: "Statement: 'The municipal corporation advised city residents to boil drinking water for the next 48 hours.'\nAssumptions:\nI. The drinking water pipeline might be contaminated.\nII. Boiling water kills harmful pathogens.",
    category: "LOGICAL",
    subCategory: "Critical Reasoning",
    difficulty: "EASY",
    options: ["Only I is implicit", "Only II is implicit", "Both I and II are implicit", "Neither is implicit"],
    correctOpt: 2,
    explanation: "The warning assumes both that there is a risk of contamination in the pipeline (I) and that boiling effectively neutralizes that risk (II).",
    companyTags: ["Deloitte", "Cognizant"]
  },
  {
    title: "Analogies Semantic Relationship",
    prompt: "ARCHITECT : BLUEPRINT :: SCULPTOR : ?",
    category: "LOGICAL",
    subCategory: "Analogies",
    difficulty: "EASY",
    options: ["CHISEL", "MARBLE", "MAQUETTE", "MUSEUM"],
    correctOpt: 2,
    explanation: "An architect creates a blueprint as the preliminary model/design of the building. A sculptor creates a maquette (preliminary small model) before carving the final sculpture.",
    companyTags: ["Wipro", "Infosys"]
  },
  {
    title: "Order and Ranking Heights",
    prompt: "In a class of 45 students, rank of Tanvi from the top is 16th. What is her rank from the bottom?",
    category: "LOGICAL",
    subCategory: "Ranking & Ordering",
    difficulty: "EASY",
    options: ["29th", "30th", "31st", "32nd"],
    correctOpt: 1,
    explanation: "Rank from bottom = Total students - Rank from top + 1 = 45 - 16 + 1 = 30th.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    title: "Cause and Effect Analysis",
    prompt: "I. The prices of raw vegetables dropped sharply across wholesale markets.\nII. The state experienced an abundant and well-timed monsoon this season.",
    category: "LOGICAL",
    subCategory: "Critical Reasoning",
    difficulty: "EASY",
    options: ["Statement I is the cause and II is the effect", "Statement II is the cause and I is the effect", "Both statements are independent causes", "Both are effects of independent causes"],
    correctOpt: 1,
    explanation: "Abundant monsoon increases crop yield (cause), which increases market supply and drops wholesale prices (effect).",
    companyTags: ["Deloitte", "TCS"]
  },
  {
    title: "Data Sufficiency Unique Solution",
    prompt: "What is the two-digit number?\nI. The sum of the digits is 9.\nII. The difference between the number and the number with reversed digits is 27.",
    category: "LOGICAL",
    subCategory: "Data Sufficiency",
    difficulty: "MEDIUM",
    options: ["I alone is sufficient", "II alone is sufficient", "Both together are sufficient", "Neither is sufficient"],
    correctOpt: 2,
    explanation: "Let number be 10x + y. From I: x + y = 9. From II: (10x + y) - (10y + x) = 9(x - y) = 27 => x - y = 3 (if x > y). Together: 2x = 12 => x = 6, y = 3. Number is 63. Both together are required.",
    companyTags: ["Amazon", "Infosys"]
  },
  {
    title: "Venn Diagram Overlapping Sets",
    prompt: "In a survey of 100 students, 60 study Python, 45 study Java, and 20 study both. How many study neither?",
    category: "LOGICAL",
    subCategory: "Venn Diagrams",
    difficulty: "EASY",
    options: ["10", "15", "20", "25"],
    correctOpt: 1,
    explanation: "Total studying at least one = 60 + 45 - 20 = 85. Neither = 100 - 85 = 15.",
    companyTags: ["Cognizant", "TCS"]
  },
  {
    title: "Truth-Tellers and Liars Logic",
    prompt: "On an island, Knights always tell the truth and Knaves always lie. Person A says: 'Both of us are Knaves.' What are A and B?",
    category: "LOGICAL",
    subCategory: "Puzzles",
    difficulty: "HARD",
    options: ["A is Knight, B is Knave", "A is Knave, B is Knight", "Both are Knaves", "Both are Knights"],
    correctOpt: 1,
    explanation: "If A were a Knight, his statement would be true, meaning he is a Knave (contradiction). Hence A is a Knave. Since A's statement is false, it is not the case that both are knaves, which means B must be a Knight.",
    companyTags: ["Microsoft", "Amazon"]
  },
  {
    title: "Linear Seating Facing North",
    prompt: "Five colleagues P, Q, R, S, and T sit in a row facing north. S sits adjacent to R and T. Q is at an extreme end. P is second to the left of T. Who sits in the exact middle?",
    category: "LOGICAL",
    subCategory: "Seating Arrangement",
    difficulty: "MEDIUM",
    options: ["R", "S", "T", "P"],
    correctOpt: 2,
    explanation: "Arrangement left to right: P, R, T, S, Q. T is in the exact middle (3rd position of 5).",
    companyTags: ["TCS", "Zoho"]
  },
  {
    title: "Dice Opposite Faces",
    prompt: "Two positions of a standard six-sided die are shown where faces 1, 2, 3 are adjacent to each other. If face 4 is opposite to 1 and face 5 is opposite to 2, what face is opposite to 3?",
    category: "LOGICAL",
    subCategory: "Puzzles",
    difficulty: "EASY",
    options: ["4", "5", "6", "Cannot be determined"],
    correctOpt: 2,
    explanation: "Faces are 1 through 6. 1 is opposite 4, 2 is opposite 5. The remaining faces 3 and 6 must be opposite each other.",
    companyTags: ["Wipro", "Infosys"]
  },
  {
    title: "Calendar Day Repetition",
    prompt: "Which year will have the exact same calendar as the year 2024?",
    category: "LOGICAL",
    subCategory: "Calendars",
    difficulty: "MEDIUM",
    options: ["2030", "2048", "2052", "2036"],
    correctOpt: 2,
    explanation: "A leap year repeats its calendar every 28 years (unless century boundary exception occurs). 2024 + 28 = 2052.",
    companyTags: ["Cognizant", "TCS"]
  },

  // --- VERBAL ABILITY (16 Qs) ---
  {
    title: "Subject-Verb Agreement Error",
    prompt: "Identify the grammatically incorrect section: 'The team of researchers (A) / have discovered a novel (B) / enzyme that breaks down (C) / synthetic polymers (D).'",
    category: "VERBAL",
    subCategory: "Sentence Correction",
    difficulty: "EASY",
    options: ["A", "B", "C", "D"],
    correctOpt: 1,
    explanation: "The subject is 'The team' (singular collective noun), so the verb must be 'has discovered', not 'have discovered'.",
    companyTags: ["TCS", "Accenture", "Infosys"]
  },
  {
    title: "Vocabulary Contextual Synonym",
    prompt: "Choose the word most synonymous with 'EPHEMERAL':",
    category: "VERBAL",
    subCategory: "Synonyms & Antonyms",
    difficulty: "MEDIUM",
    options: ["Enduring", "Transient", "Monumental", "Ubiquitous"],
    correctOpt: 1,
    explanation: "'Ephemeral' means lasting for a very short time; 'Transient' has the identical meaning. 'Enduring' is an antonym.",
    companyTags: ["Deloitte", "Amazon"]
  },
  {
    title: "Sentence Completion Parallelism",
    prompt: "Complete the sentence: 'The senior architect not only designed the microservices infrastructure _______ the deployment pipelines.'",
    category: "VERBAL",
    subCategory: "Sentence Completion",
    difficulty: "EASY",
    options: ["and also configured", "but also configured", "as well as configuring", "in addition to configuring"],
    correctOpt: 1,
    explanation: "The correlative conjunction 'not only' requires 'but also' with parallel verb form ('designed ... but also configured').",
    companyTags: ["Infosys", "Cognizant"]
  },
  {
    title: "Reading Comprehension Inference",
    prompt: "Passage: 'Distributed systems prioritize availability and partition tolerance during network failures, often settling for eventual consistency rather than instantaneous synchronization.'\nWhat does the passage imply?",
    category: "VERBAL",
    subCategory: "Reading Comprehension",
    difficulty: "MEDIUM",
    options: [
      "Distributed systems never maintain consistent data.",
      "Partition tolerance requires abandoning availability entirely.",
      "Trade-offs exist between immediate consistency and high availability.",
      "Eventual consistency is inferior in every modern architecture."
    ],
    correctOpt: 2,
    explanation: "The text describes the CAP theorem principle where systems trade off immediate synchronization to keep running during partitions.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Idioms and Phrases Meaning",
    prompt: "What is the meaning of the idiom: 'To cut corners'?",
    category: "VERBAL",
    subCategory: "Idioms & Phrases",
    difficulty: "EASY",
    options: [
      "To negotiate a lower commercial rate",
      "To do something poorly or cheaply to save time/money",
      "To change directions unexpectedly",
      "To perform geometric calculations"
    ],
    correctOpt: 1,
    explanation: "'Cutting corners' means doing something perfunctorily or omitting essential safety/quality steps to save effort or expense.",
    companyTags: ["Accenture", "TCS"]
  },
  {
    title: "Para Jumbles Logical Sequence",
    prompt: "Rearrange the sentences into a coherent paragraph:\nP: This rapid digitization brought unprecedented productivity gains.\nQ: Over the last decade, enterprises accelerated cloud migration.\nR: However, it also expanded the attack surface for cyber threats.\nS: Consequently, zero-trust security became an imperative.",
    category: "VERBAL",
    subCategory: "Para Jumbles",
    difficulty: "MEDIUM",
    options: ["Q - P - R - S", "P - Q - R - S", "Q - R - P - S", "S - R - Q - P"],
    correctOpt: 0,
    explanation: "Q introduces the shift to cloud. P refers back to 'this rapid digitization'. R introduces the drawback ('However... attack surface'). S provides the consequence ('Consequently, zero-trust').",
    companyTags: ["Infosys", "Wipro"]
  },
  {
    title: "Antonym Identification",
    prompt: "Select the word most opposite in meaning to 'METICULOUS':",
    category: "VERBAL",
    subCategory: "Synonyms & Antonyms",
    difficulty: "EASY",
    options: ["Diligent", "Fastidious", "Careless", "Scrupulous"],
    correctOpt: 2,
    explanation: "'Meticulous' means showing great attention to detail. Its opposite is 'Careless'.",
    companyTags: ["Cognizant", "TCS"]
  },
  {
    title: "One-Word Substitution",
    prompt: "What is the one-word substitution for 'A person who is indifferent to pleasure or pain'?",
    category: "VERBAL",
    subCategory: "Vocabulary",
    difficulty: "EASY",
    options: ["Hedonist", "Stoic", "Epicurean", "Ascetic"],
    correctOpt: 1,
    explanation: "A 'Stoic' can endure pain or hardship without showing feelings or complaining.",
    companyTags: ["Accenture", "Deloitte"]
  },
  {
    title: "Conditional Clause Tense",
    prompt: "Choose the correct phrase: 'If our team _______ the load test yesterday, we would have discovered the memory leak before release.'",
    category: "VERBAL",
    subCategory: "Sentence Correction",
    difficulty: "MEDIUM",
    options: ["conducted", "had conducted", "would conduct", "has conducted"],
    correctOpt: 1,
    explanation: "Third conditional (unreal past): 'If + past perfect (had conducted) ... would have + past participle'.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    title: "Active and Passive Voice",
    prompt: "Convert to passive voice: 'The devops engineer configured the reverse proxy.'",
    category: "VERBAL",
    subCategory: "Active & Passive Voice",
    difficulty: "EASY",
    options: [
      "The reverse proxy is configured by the devops engineer.",
      "The reverse proxy was configured by the devops engineer.",
      "The reverse proxy had been configured by the devops engineer.",
      "The reverse proxy has been configured by the devops engineer."
    ],
    correctOpt: 1,
    explanation: "Simple past active ('configured') becomes 'was configured' in passive voice.",
    companyTags: ["Wipro", "Cognizant"]
  },
  {
    title: "Direct and Indirect Speech",
    prompt: "Choose the correct indirect form: The lead said, 'We must finalize the sprint backlog today.'",
    category: "VERBAL",
    subCategory: "Direct & Indirect Speech",
    difficulty: "MEDIUM",
    options: [
      "The lead said that they had to finalize the sprint backlog that day.",
      "The lead says that we must finalize the sprint backlog today.",
      "The lead said that they must finalized the sprint backlog that day.",
      "The lead asked if they could finalize the sprint backlog today."
    ],
    correctOpt: 0,
    explanation: "In reported speech, 'must' shifts to 'had to', pronouns shift to third person, and 'today' shifts to 'that day'.",
    companyTags: ["TCS", "Deloitte"]
  },
  {
    title: "Analogy Relationship",
    prompt: "CANDID : DECEPTIVE :: MITIGATE : ?",
    category: "VERBAL",
    subCategory: "Analogies",
    difficulty: "MEDIUM",
    options: ["Alleviate", "Aggravate", "Assuage", "Moderate"],
    correctOpt: 1,
    explanation: "'Candid' is an antonym of 'Deceptive'. 'Mitigate' means make less severe, so its antonym is 'Aggravate' (make worse).",
    companyTags: ["Amazon", "Zoho"]
  },
  {
    title: "Misspelled Words",
    prompt: "Identify the word that is spelled INCORRECTLY:",
    category: "VERBAL",
    subCategory: "Spelling",
    difficulty: "EASY",
    options: ["Privilege", "Maintenance", "Accommodate", "Consientious"],
    correctOpt: 3,
    explanation: "The correct spelling is 'Conscientious' (with an 'sc').",
    companyTags: ["Infosys", "Accenture"]
  },
  {
    title: "Preposition Usage",
    prompt: "Fill in the blank: 'The new feature is compliant _______ the latest privacy regulations.'",
    category: "VERBAL",
    subCategory: "Grammar",
    difficulty: "EASY",
    options: ["to", "with", "for", "by"],
    correctOpt: 1,
    explanation: "The adjective 'compliant' correctly collocates with the preposition 'with'.",
    companyTags: ["TCS", "Cognizant"]
  },
  {
    title: "Diction and Word Choice",
    prompt: "Choose the correct word: 'High latency had an adverse _______ on checkout conversion rates.'",
    category: "VERBAL",
    subCategory: "Grammar",
    difficulty: "EASY",
    options: ["affect", "effect", "impactful", "effective"],
    correctOpt: 1,
    explanation: "'Effect' is a noun meaning a result or outcome. 'Affect' is primarily a verb.",
    companyTags: ["Wipro", "Deloitte"]
  },
  {
    title: "Critical Reasoning Assumption",
    prompt: "Statement: 'Installing SSDs in all employee workstations reduced build times by 40%. Therefore, increasing RAM will produce a similar 40% reduction.' What flaw is present?",
    category: "VERBAL",
    subCategory: "Critical Reasoning",
    difficulty: "MEDIUM",
    options: [
      "Circular reasoning",
      "False analogy assuming RAM and disk I/O bottlenecks behave identically",
      "Ad hominem fallacy",
      "Post hoc fallacy"
    ],
    correctOpt: 1,
    explanation: "The conclusion assumes that memory capacity provides the exact same bottleneck reduction as disk input/output speed, which is a false equivalence.",
    companyTags: ["Amazon", "Microsoft"]
  },

  // --- PROGRAMMING FUNDAMENTALS (15 Qs) ---
  {
    title: "Pointer Arithmetic in C",
    prompt: "In C, if `int *ptr = 1000;` on a 64-bit architecture where `sizeof(int) == 4`, what is the evaluated value of `ptr + 3`?",
    category: "PROGRAMMING",
    subCategory: "C & Memory",
    difficulty: "EASY",
    options: ["1003", "1006", "1012", "1024"],
    correctOpt: 2,
    explanation: "Pointer arithmetic scales by the size of the referenced type: 1000 + 3 * sizeof(int) = 1000 + 3 * 4 = 1012.",
    companyTags: ["Zoho", "TCS", "Infosys"]
  },
  {
    title: "Bitwise XOR Property",
    prompt: "Given an array where every integer appears twice except one unique element, which bitwise operator finds the unique element in O(N) time and O(1) space?",
    category: "PROGRAMMING",
    subCategory: "Bit Manipulation",
    difficulty: "EASY",
    options: ["Bitwise AND (&)", "Bitwise OR (|)", "Bitwise XOR (^)", "Bitwise NOT (~)"],
    correctOpt: 2,
    explanation: "XOR properties: x ^ x = 0, and x ^ 0 = x. XORing all elements cancels duplicates and leaves only the single element.",
    companyTags: ["Amazon", "Microsoft", "Zoho"]
  },
  {
    title: "OOP Polymorphism Binding",
    prompt: "In Java/C++, when does dynamic method dispatch (runtime polymorphism) resolve the invoked method implementation?",
    category: "PROGRAMMING",
    subCategory: "OOP Concepts",
    difficulty: "MEDIUM",
    options: ["At compile time using reference type", "At load time via linker", "At runtime based on the actual object instance type", "At bytecode compilation time"],
    correctOpt: 2,
    explanation: "Runtime polymorphism utilizes virtual method tables (vtable) to look up the overriding method on the actual heap object at runtime.",
    companyTags: ["Microsoft", "Amazon", "Infosys"]
  },
  {
    title: "Recursion Stack Overflow",
    prompt: "Which programming technique optimizes recursive function calls into iterative loops at compile-time to prevent call-stack overflow?",
    category: "PROGRAMMING",
    subCategory: "Recursion",
    difficulty: "MEDIUM",
    options: ["Memoization", "Tail Call Optimization (TCO)", "Branch Prediction", "Loop Unrolling"],
    correctOpt: 1,
    explanation: "Tail Call Optimization reuses the current stack frame when the recursive invocation is the final operation performed in the function.",
    companyTags: ["Amazon", "Freshworks"]
  },
  {
    title: "Scope and Closures in JS",
    prompt: "What will the following JavaScript code output?\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n```",
    category: "PROGRAMMING",
    subCategory: "JavaScript",
    difficulty: "MEDIUM",
    options: ["0 1 2", "3 3 3", "undefined undefined undefined", "0 0 0"],
    correctOpt: 1,
    explanation: "`var` has function scope, not block scope. By the time the event loop runs the timer callbacks, the single `i` variable has incremented to 3.",
    companyTags: ["Zoho", "Freshworks", "Amazon"]
  },
  {
    title: "Static Keyword Lifetime",
    prompt: "What is the lifetime and visibility of a `static` variable declared inside a C function?",
    category: "PROGRAMMING",
    subCategory: "C & Memory",
    difficulty: "EASY",
    options: [
      "Lifetime: duration of function call; Scope: local",
      "Lifetime: entire program run; Scope: local to the function",
      "Lifetime: entire program run; Scope: global across all files",
      "Lifetime: heap allocated until explicitly freed"
    ],
    correctOpt: 1,
    explanation: "A static local variable is stored in the data segment (persists for the entire execution of the program) but its identifier scope is restricted to the function block.",
    companyTags: ["Zoho", "TCS"]
  },
  {
    title: "Java String Immutability",
    prompt: "Why are `String` objects in Java immutable?",
    category: "PROGRAMMING",
    subCategory: "Java",
    difficulty: "MEDIUM",
    options: [
      "To save heap memory during garbage collection only",
      "To support string pooling, thread safety, and security when passing credentials/network connections",
      "Because the JVM lacks memory write instructions",
      "To force developers to use StringBuilder"
    ],
    correctOpt: 1,
    explanation: "String immutability enables safe String Pool caching, thread-safe sharing without synchronization, and secure caching of hash codes for HashMaps.",
    companyTags: ["Infosys", "Cognizant", "Amazon"]
  },
  {
    title: "Memory Allocation Segments",
    prompt: "In a standard process memory layout, which segment dynamically grows upward towards high memory addresses?",
    category: "PROGRAMMING",
    subCategory: "C & Memory",
    difficulty: "MEDIUM",
    options: ["Call Stack", "Heap", "Text/Code Segment", "BSS Segment"],
    correctOpt: 1,
    explanation: "The heap grows upward (toward higher memory addresses via `brk`/`sbrk`/`mmap`), while the user stack typically grows downward from high addresses.",
    companyTags: ["Microsoft", "Zoho"]
  },
  {
    title: "Const Correctness in C++",
    prompt: "What does `const int * const ptr` signify in C++?",
    category: "PROGRAMMING",
    subCategory: "C++",
    difficulty: "MEDIUM",
    options: [
      "A mutable pointer to a mutable integer",
      "A constant pointer to a mutable integer",
      "A mutable pointer to a constant integer",
      "A constant pointer to a constant integer"
    ],
    correctOpt: 3,
    explanation: "Read right to left: `const ptr` (constant pointer) to `const int` (constant integer). Neither the target value nor the pointer address can be modified.",
    companyTags: ["Microsoft", "Amazon"]
  },
  {
    title: "Shallow vs Deep Copy",
    prompt: "When cloning an object containing nested reference types, what distinguishes a Deep Copy from a Shallow Copy?",
    category: "PROGRAMMING",
    subCategory: "OOP Concepts",
    difficulty: "EASY",
    options: [
      "Shallow copy copies references; Deep copy recursively creates new instances of all nested objects",
      "Deep copy uses bitwise operations while shallow copy uses serialization",
      "Shallow copy is thread-safe while deep copy is not",
      "There is no functional difference in managed runtimes"
    ],
    correctOpt: 0,
    explanation: "A shallow copy replicates top-level primitives and copies reference addresses. A deep copy recursively duplicates every referenced object in memory.",
    companyTags: ["Freshworks", "Infosys"]
  },
  {
    title: "Exception Handling Finally Block",
    prompt: "In Java, what happens if both a `try` block and a `finally` block contain explicit `return` statements?",
    category: "PROGRAMMING",
    subCategory: "Java",
    difficulty: "MEDIUM",
    options: [
      "Compilation error",
      "The value from the `try` block is returned",
      "The value from the `finally` block overrides and is returned",
      "Runtime NullPointerException is thrown"
    ],
    correctOpt: 2,
    explanation: "The `finally` block executes before method completion, and its explicit `return` supersedes any previous return value or pending unhandled exceptions.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    title: "Pass by Value vs Reference",
    prompt: "How does Java handle passing an object as an argument to a method?",
    category: "PROGRAMMING",
    subCategory: "Java",
    difficulty: "MEDIUM",
    options: [
      "Pass by reference directly",
      "Pass by value of the reference (pointer copy)",
      "Deep copies the entire object by default",
      "Uses copy-on-write semantics"
    ],
    correctOpt: 1,
    explanation: "Java is strictly pass-by-value. When an object is passed, the value copied is the reference handle (memory address) to the object.",
    companyTags: ["Amazon", "Cognizant"]
  },
  {
    title: "Python List vs Tuple",
    prompt: "What is the key architectural difference between Python `list` and `tuple`?",
    category: "PROGRAMMING",
    subCategory: "Python",
    difficulty: "EASY",
    options: [
      "Lists are immutable; Tuples are mutable",
      "Lists are mutable and over-allocated in memory; Tuples are immutable and fixed size",
      "Lists can only store homogeneous types",
      "Tuples cannot be indexed"
    ],
    correctOpt: 1,
    explanation: "Python lists are mutable arrays that over-allocate capacity to support amortized O(1) appends. Tuples are immutable, compact, and hashable if their elements are hashable.",
    companyTags: ["Amazon", "Deloitte"]
  },
  {
    title: "Garbage Collection Reference Counting Flaw",
    prompt: "What is the primary classic weakness of pure reference-counting garbage collection algorithms?",
    category: "PROGRAMMING",
    subCategory: "Memory Management",
    difficulty: "MEDIUM",
    options: [
      "Inability to collect circular/cyclic references",
      "Excessive stop-the-world pause times",
      "Memory fragmentation in fixed-size blocks",
      "Incompatibility with multi-core processors"
    ],
    correctOpt: 0,
    explanation: "If object A references object B and B references A, their reference counts never drop to zero even when completely unreachable from the root set.",
    companyTags: ["Microsoft", "Amazon"]
  },
  {
    title: "Abstract Class vs Interface",
    prompt: "In object-oriented design, when should an abstract class be favored over an interface?",
    category: "PROGRAMMING",
    subCategory: "OOP Concepts",
    difficulty: "EASY",
    options: [
      "When you need to define multiple inheritance of type only",
      "When you want to share common state (non-static instance fields) and default method implementations",
      "When all methods must be stateless contracts",
      "When designing public client APIs only"
    ],
    correctOpt: 1,
    explanation: "Abstract classes permit stateful instance fields, constructors, and shared partial code implementation across closely related subclasses.",
    companyTags: ["Infosys", "Wipro"]
  },

  // --- DATA STRUCTURES & ALGORITHMS (18 Qs) ---
  {
    title: "Hash Table Collision Resolution",
    prompt: "What is the worst-case time complexity of searching for an element in a Hash Table that resolves collisions via separate chaining?",
    category: "DSA",
    subCategory: "Hashing",
    difficulty: "EASY",
    options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
    correctOpt: 2,
    explanation: "In the worst case, all N keys hash to the same bucket index, degrading the bucket into a linear linked list of length N with O(N) lookup.",
    companyTags: ["Amazon", "Microsoft", "TCS"]
  },
  {
    title: "Binary Search Tree In-order Traversal",
    prompt: "Which tree traversal of a valid Binary Search Tree (BST) produces keys in strictly ascending sorted order?",
    category: "DSA",
    subCategory: "Trees",
    difficulty: "EASY",
    options: ["Pre-order traversal", "In-order traversal", "Post-order traversal", "Level-order traversal"],
    correctOpt: 1,
    explanation: "In-order traversal visits Left subtree -> Current Node -> Right subtree. By BST invariant (Left < Node < Right), this yields strictly sorted order.",
    companyTags: ["Microsoft", "Amazon", "Zoho"]
  },
  {
    title: "QuickSort Worst-Case Pivot",
    prompt: "What choice of pivot in QuickSort triggers the worst-case time complexity of O(N^2) on an already sorted array?",
    category: "DSA",
    subCategory: "Sorting",
    difficulty: "EASY",
    options: ["Median-of-three pivot", "Random pivot", "Always choosing the first or last element", "Middle element pivot"],
    correctOpt: 2,
    explanation: "Selecting the first or last element in a sorted array produces completely unbalanced partitions of size 0 and N - 1 at every recursion level.",
    companyTags: ["Infosys", "TCS", "Accenture"]
  },
  {
    title: "Balanced Tree Height Comparison",
    prompt: "What is the maximum height difference permitted between left and right subtrees of any node in an AVL tree?",
    category: "DSA",
    subCategory: "Trees",
    difficulty: "EASY",
    options: ["0", "1", "2", "log(N)"],
    correctOpt: 1,
    explanation: "The AVL balance factor is defined as Height(left) - Height(right), which must strictly remain in {-1, 0, 1} for every node.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Dijkstra's Algorithm Constraint",
    prompt: "Under which condition does Dijkstra's shortest path algorithm fail to produce the correct shortest path?",
    category: "DSA",
    subCategory: "Graphs",
    difficulty: "MEDIUM",
    options: ["When the graph contains cycles", "When the graph has negative edge weights", "When the graph is disconnected", "When the graph has undirected edges"],
    correctOpt: 1,
    explanation: "Dijkstra's algorithm greedily assumes that adding an edge can never reduce the cumulative distance to an already settled node. Negative weights violate this assumption.",
    companyTags: ["Amazon", "Microsoft", "Zoho"]
  },
  {
    title: "Topological Sort Requirement",
    prompt: "A topological sort can only be performed on which class of graphs?",
    category: "DSA",
    subCategory: "Graphs",
    difficulty: "EASY",
    options: ["Undirected Acyclic Graphs", "Directed Cyclic Graphs", "Directed Acyclic Graphs (DAG)", "Complete Graphs"],
    correctOpt: 2,
    explanation: "Topological sorting orders vertices such that for every directed edge u -> v, u comes before v. This ordering is impossible if any cycle exists.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Stack Implementation of Queue",
    prompt: "To implement a FIFO Queue using two LIFO Stacks (stackIn and stackOut), what is the amortized time complexity of the `dequeue()` operation?",
    category: "DSA",
    subCategory: "Stacks & Queues",
    difficulty: "MEDIUM",
    options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
    correctOpt: 0,
    explanation: "Each element is pushed to stackIn once, popped once, pushed to stackOut once, and popped once. Total 4 operations per item across its lifetime => amortized O(1).",
    companyTags: ["Amazon", "Infosys", "Zoho"]
  },
  {
    title: "Dynamic Programming Overlapping Subproblems",
    prompt: "What two foundational properties indicate that a problem is solvable via Dynamic Programming?",
    category: "DSA",
    subCategory: "Dynamic Programming",
    difficulty: "MEDIUM",
    options: [
      "Greedy choice property and divide-and-conquer",
      "Optimal substructure and overlapping subproblems",
      "Linear time complexity and binary state",
      "Acyclic dependency and constant space"
    ],
    correctOpt: 1,
    explanation: "Optimal substructure ensures the global optimum is composed of optimal solutions to subproblems; overlapping subproblems ensures memoization/tabulation saves redundant computation.",
    companyTags: ["Amazon", "Microsoft", "Freshworks"]
  },
  {
    title: "Priority Queue Heap Operations",
    prompt: "What is the time complexity to insert an element into a binary min-heap with N elements?",
    category: "DSA",
    subCategory: "Heaps",
    difficulty: "EASY",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctOpt: 1,
    explanation: "The element is added at the bottom-most leaf and sifted/bubbled up along the tree height, which is bounded by O(log N).",
    companyTags: ["Amazon", "TCS"]
  },
  {
    title: "Trie (Prefix Tree) Search Complexity",
    prompt: "Given a vocabulary of N words where the maximum word length is L, what is the time complexity to search for a word of length K in a Trie?",
    category: "DSA",
    subCategory: "Tries",
    difficulty: "EASY",
    options: ["O(N)", "O(L * N)", "O(K)", "O(log N)"],
    correctOpt: 2,
    explanation: "Searching in a Trie depends solely on the number of characters in the target key K, traversing one edge per character => O(K), completely independent of N.",
    companyTags: ["Amazon", "Microsoft", "Zoho"]
  },
  {
    title: "Floyd's Cycle Finding Algorithm",
    prompt: "In Floyd's Tortoise and Hare algorithm to detect cycles in a linked list, how fast do the pointers advance?",
    category: "DSA",
    subCategory: "Linked Lists",
    difficulty: "EASY",
    options: ["Both move 1 step", "Slow moves 1 step, Fast moves 2 steps", "Slow moves 2 steps, Fast moves 3 steps", "Slow moves 1 step, Fast moves N steps"],
    correctOpt: 1,
    explanation: "Slow advances by 1 node while Fast advances by 2 nodes. If a cycle exists, the relative distance decreases by 1 each step until they collide.",
    companyTags: ["Amazon", "Microsoft", "Cognizant"]
  },
  {
    title: "Minimum Spanning Tree Disjoint Sets",
    prompt: "Which data structure is utilized in Kruskal's algorithm to detect cycles efficiently when considering edges?",
    category: "DSA",
    subCategory: "Graphs",
    difficulty: "MEDIUM",
    options: ["Fibonacci Heap", "Disjoint Set Union (Union-Find)", "Red-Black Tree", "Adjacency Matrix"],
    correctOpt: 1,
    explanation: "Kruskal's algorithm sorts edges by weight and uses Union-Find with path compression to determine in near-O(1) whether two endpoints belong to the same component.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Two Pointers Technique Prerequisite",
    prompt: "For the classic Two Pointers approach to solve the Two-Sum problem in O(N) time without extra memory, what must be true about the input array?",
    category: "DSA",
    subCategory: "Two Pointers",
    difficulty: "EASY",
    options: ["It must contain only positive values", "It must be sorted", "It must have distinct elements", "Its length must be a power of two"],
    correctOpt: 1,
    explanation: "Two pointers converging from ends rely on monotonicity: if sum < target increment left pointer; if sum > target decrement right pointer. This requires a sorted array.",
    companyTags: ["Amazon", "Microsoft", "Infosys"]
  },
  {
    title: "Sliding Window Maximum Complexity",
    prompt: "What data structure enables finding the maximum in every sliding window of size K across an array of length N in overall O(N) time?",
    category: "DSA",
    subCategory: "Sliding Window",
    difficulty: "HARD",
    options: ["Min-Heap", "Monotonic Deque (Double-ended Queue)", "Binary Search Tree", "Circular Buffer"],
    correctOpt: 1,
    explanation: "A monotonic decreasing deque stores indices of relevant candidates. Each index is inserted and evicted at most once, achieving O(N) linear time.",
    companyTags: ["Amazon", "Microsoft", "Zoho"]
  },
  {
    title: "Space Complexity of Merge Sort",
    prompt: "What is the auxiliary space complexity of standard top-down Merge Sort on an array of size N?",
    category: "DSA",
    subCategory: "Sorting",
    difficulty: "EASY",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctOpt: 2,
    explanation: "Merge sort requires a temporary buffer of size N during the merge step to store elements while merging two sorted halves.",
    companyTags: ["TCS", "Wipro", "Infosys"]
  },
  {
    title: "0/1 Knapsack State Representation",
    prompt: "In the 0/1 Knapsack problem with N items and maximum weight W, what is the size of the 2D DP table?",
    category: "DSA",
    subCategory: "Dynamic Programming",
    difficulty: "MEDIUM",
    options: ["(N + 1) * (W + 1)", "N * N", "W * W", "2^N * W"],
    correctOpt: 0,
    explanation: "Rows represent items from 0 to N and columns represent capacities from 0 to W, requiring an (N + 1) x (W + 1) table for pseudo-polynomial O(N * W) time.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Binary Tree Diameter Definition",
    prompt: "The diameter of a binary tree is defined as:",
    category: "DSA",
    subCategory: "Trees",
    difficulty: "MEDIUM",
    options: [
      "The total count of all leaf nodes",
      "The length of the longest path between any two nodes in a tree",
      "The height of the root node multiplied by 2",
      "The maximum width of any level"
    ],
    correctOpt: 1,
    explanation: "Tree diameter is the number of edges (or nodes) on the longest path between any two nodes, which may or may not pass through the root.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "KMP String Matching Preprocessing",
    prompt: "What array does the Knuth-Morris-Pratt (KMP) algorithm precompute for the search pattern?",
    category: "DSA",
    subCategory: "Strings",
    difficulty: "HARD",
    options: ["Suffix Automaton", "Longest Prefix which is also Suffix (LPS array)", "Z-array", "Huffman frequency tree"],
    correctOpt: 1,
    explanation: "The LPS array records the length of the longest proper prefix of pattern[0..i] that is also a suffix, allowing shifts without backtracking the text index.",
    companyTags: ["Amazon", "Microsoft"]
  },

  // --- OPERATING SYSTEMS (15 Qs) ---
  {
    title: "Process vs Thread Memory Sharing",
    prompt: "Which of the following memory segments is uniquely allocated per thread rather than shared among threads of the same process?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "EASY",
    options: ["Heap", "Data / BSS Segment", "Call Stack and Program Counter", "Text (Code) Segment"],
    correctOpt: 2,
    explanation: "Threads of a process share the code segment, data segment, open file descriptors, and heap, but each thread has its own private call stack and register state (PC).",
    companyTags: ["Microsoft", "Amazon", "Infosys"]
  },
  {
    title: "Deadlock Necessary Conditions",
    prompt: "Which of the following is NOT one of the four Coffman conditions necessary for a system deadlock to occur?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "MEDIUM",
    options: ["Mutual Exclusion", "Hold and Wait", "Preemption allowed", "Circular Wait"],
    correctOpt: 2,
    explanation: "The condition is NO PREEMPTION (resources cannot be forcibly confiscated). If preemption is allowed, deadlocks can be broken.",
    companyTags: ["TCS", "Cognizant", "Microsoft"]
  },
  {
    title: "Virtual Memory Page Fault Handling",
    prompt: "When does a Page Fault hardware interrupt trigger in a virtual memory operating system?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "MEDIUM",
    options: [
      "When a process accesses an illegal kernel memory address",
      "When the referenced page table entry has its valid bit set to 0 (page not in physical RAM)",
      "When the CPU cache suffers an L1 miss",
      "When disk space runs out during swapping"
    ],
    correctOpt: 1,
    explanation: "A page fault occurs when the CPU MMU attempts to translate an address whose page table entry valid bit is false, prompting the OS to fetch the page from backing store.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "CPU Scheduling Algorithms Comparison",
    prompt: "Which CPU scheduling algorithm is mathematically proven to produce the minimal average waiting time for a given set of stationary processes?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "EASY",
    options: ["First-Come First-Served (FCFS)", "Round Robin (RR)", "Shortest Job First (SJF)", "Priority Scheduling"],
    correctOpt: 2,
    explanation: "Shortest Job First (SJF / SRTF) is provably optimal regarding minimum average waiting time because shorter jobs release waiting time quicker for others.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    title: "Thrashing Phenomenon",
    prompt: "What is 'Thrashing' in an operating system?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "EASY",
    options: [
      "High CPU utilization running user processes",
      "A condition where the OS spends more time swapping pages in and out than executing instructions",
      "Overheating of CPU cores during compilation",
      "Corrupted disk sectors during write operations"
    ],
    correctOpt: 1,
    explanation: "Thrashing occurs when the sum of process working sets exceeds available physical memory, causing continuous page faults and disk I/O paging thrash.",
    companyTags: ["Microsoft", "Cognizant"]
  },
  {
    title: "Belady's Anomaly",
    prompt: "Belady's Anomaly—where increasing the number of physical page frames results in MORE page faults—occurs in which page replacement algorithm?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "MEDIUM",
    options: ["Least Recently Used (LRU)", "Optimal (OPT)", "First-In First-Out (FIFO)", "Least Frequently Used (LFU)"],
    correctOpt: 2,
    explanation: "FIFO is not a stack algorithm (the set of pages in k frames is not always a subset of pages in k+1 frames), allowing Belady's Anomaly.",
    companyTags: ["Amazon", "TCS"]
  },
  {
    title: "Semaphore Mutex Difference",
    prompt: "What is the critical distinction between a Mutex and a Binary Semaphore?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "MEDIUM",
    options: [
      "A mutex has an ownership concept (only the locking thread can unlock it); a semaphore can be signaled by any thread",
      "A semaphore cannot have a value greater than 1",
      "Mutexes are hardware-only while semaphores are software-only",
      "There is zero difference"
    ],
    correctOpt: 0,
    explanation: "A Mutex is a lock with ownership (the thread that acquires it must be the thread that releases it). A Semaphore is a signaling mechanism without ownership semantics.",
    companyTags: ["Microsoft", "Zoho"]
  },
  {
    title: "Banker's Algorithm Purpose",
    prompt: "In operating systems, what is the primary role of Dijkstra's Banker's Algorithm?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "MEDIUM",
    options: ["Deadlock Detection", "Deadlock Avoidance", "Deadlock Recovery", "Page Replacement"],
    correctOpt: 1,
    explanation: "The Banker's Algorithm tests for safety by simulating the allocation of maximum possible resources, ensuring the system stays in a safe state (Deadlock Avoidance).",
    companyTags: ["Infosys", "TCS"]
  },
  {
    title: "Context Switching Overhead",
    prompt: "Which component of context switching between two processes takes significant time on modern hardware?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "MEDIUM",
    options: [
      "Writing integer registers",
      "Flushing the Translation Lookaside Buffer (TLB) and cold cache misses",
      "Incrementing system uptime counter",
      "Updating thread IDs"
    ],
    correctOpt: 1,
    explanation: "Switching address spaces invalidates virtual-to-physical mappings in the TLB (or requires ASID tags) and causes cache misses as the new process accesses its own working set.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Fork System Call Return Value",
    prompt: "In Unix-like systems, what does the `fork()` system call return to the parent process upon success?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "EASY",
    options: ["0", "The Process ID (PID) of the newly created child", "-1", "A file descriptor"],
    correctOpt: 1,
    explanation: "`fork()` returns 0 to the newly created child process, and returns the PID of the child to the parent process (or -1 on failure).",
    companyTags: ["Zoho", "Microsoft"]
  },
  {
    title: "Internal vs External Fragmentation",
    prompt: "Paging architectures eliminate which type of fragmentation?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "EASY",
    options: ["External Fragmentation", "Internal Fragmentation", "Disk Fragmentation", "Cache Fragmentation"],
    correctOpt: 0,
    explanation: "Since physical memory is divided into fixed-size frames and any page can fit into any frame, external fragmentation is eliminated. Internal fragmentation may still occur on the last page.",
    companyTags: ["TCS", "Cognizant"]
  },
  {
    title: "Inverted Page Table",
    prompt: "What is the key advantage of an Inverted Page Table over traditional multi-level hierarchical page tables?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "HARD",
    options: [
      "Faster lookup speed without hashing",
      "Memory space consumed scales with physical RAM size rather than process virtual address space",
      "Complete elimination of page faults",
      "Eliminates the need for a TLB"
    ],
    correctOpt: 1,
    explanation: "An inverted page table has one entry per physical frame instead of per virtual page, keeping memory overhead bounded by physical RAM size.",
    companyTags: ["Microsoft", "Amazon"]
  },
  {
    title: "Zombie Process State",
    prompt: "What defines a 'Zombie' process in Unix systems?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "EASY",
    options: [
      "A process running in an infinite loop consuming 100% CPU",
      "A terminated process whose exit status has not yet been read by its parent via `wait()`",
      "A process orphaned when its parent terminated",
      "A daemon process running in the background"
    ],
    correctOpt: 1,
    explanation: "A zombie process has finished execution but remains in the process table to hold its termination status and resource usage until the parent reaps it.",
    companyTags: ["Zoho", "Accenture"]
  },
  {
    title: "Spooling Concept",
    prompt: "What does the OS term 'SPOOLing' stand for and accomplish?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "EASY",
    options: [
      "Simultaneous Peripheral Operations On-Line; buffers I/O jobs to disk for slow devices like printers",
      "Synchronous Parallel Object Oriented Linking; compiles libraries",
      "Sequential Page Organization of On-demand Loads",
      "Standard Protocol for Output Operations and Logging"
    ],
    correctOpt: 0,
    explanation: "SPOOLing (Simultaneous Peripheral Operations On-Line) holds output data on a fast disk until the slow peripheral device (e.g. printer) is ready to process it.",
    companyTags: ["Wipro", "Infosys"]
  },
  {
    title: "Monolithic vs Microkernel",
    prompt: "Which service typically runs in user space rather than kernel space in a Microkernel architecture?",
    category: "CORE_CS",
    subCategory: "Operating Systems",
    difficulty: "MEDIUM",
    options: ["Low-level hardware interrupts", "Virtual memory management and IPC", "File systems and device drivers", "CPU context switching"],
    correctOpt: 2,
    explanation: "Microkernels keep only essential primitives (minimal IPC, basic VM, thread scheduling) in kernel space; file systems, network stacks, and device drivers run as isolated user processes.",
    companyTags: ["Microsoft", "Amazon"]
  },

  // --- DATABASE MANAGEMENT SYSTEMS (15 Qs) ---
  {
    title: "ACID Isolation Levels Anomaly",
    prompt: "Which concurrency anomaly occurs when Transaction A re-reads a range of rows and discovers new rows inserted and committed by Transaction B?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "MEDIUM",
    options: ["Dirty Read", "Non-repeatable Read", "Phantom Read", "Lost Update"],
    correctOpt: 2,
    explanation: "A Phantom Read occurs when a transaction queries a set of rows satisfying a condition, and a second concurrent transaction inserts new matching rows and commits.",
    companyTags: ["Amazon", "Microsoft", "Zoho"]
  },
  {
    title: "B+ Tree Database Indexing Advantage",
    prompt: "Why do relational database engines prefer B+ Trees over B Trees for storage indexing?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "MEDIUM",
    options: [
      "B+ Trees have fewer levels for small datasets",
      "All records/data pointers reside exclusively in linked leaf nodes, facilitating fast sequential range scans and higher internal node branching factor",
      "B+ Trees never require rebalancing rotations",
      "B+ Trees use less memory during updates"
    ],
    correctOpt: 1,
    explanation: "Internal nodes only store keys (increasing fan-out and reducing I/O depth), and leaves are linked sequentially, allowing high-performance range queries.",
    companyTags: ["Amazon", "Microsoft", "Freshworks"]
  },
  {
    title: "Third Normal Form (3NF) Condition",
    prompt: "A database relation is in Third Normal Form (3NF) if it is in 2NF and has no:",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "EASY",
    options: ["Composite keys", "Partial functional dependencies", "Transitive functional dependencies", "Multi-valued dependencies"],
    correctOpt: 2,
    explanation: "3NF requires that no non-prime attribute is transitively dependent on any candidate key (X -> Y where Y is non-prime implies X must be a superkey).",
    companyTags: ["TCS", "Infosys", "Cognizant"]
  },
  {
    title: "SQL GROUP BY and HAVING Clause",
    prompt: "In standard SQL, how does the `HAVING` clause differ from the `WHERE` clause?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "EASY",
    options: [
      "`WHERE` filters individual rows before aggregation; `HAVING` filters aggregated groups after `GROUP BY`",
      "`HAVING` filters before indexing, `WHERE` filters after",
      "`WHERE` cannot evaluate numerical conditions",
      "They are completely interchangeable syntactically"
    ],
    correctOpt: 0,
    explanation: "`WHERE` applies row-level predicate filters before grouping and aggregation. `HAVING` applies filters on aggregate results (e.g. `COUNT(*) > 5`).",
    companyTags: ["Deloitte", "Accenture", "TCS"]
  },
  {
    title: "Clustered vs Non-Clustered Index",
    prompt: "How many Clustered Indexes can exist on a single table in Microsoft SQL Server or PostgreSQL?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "EASY",
    options: ["Exactly 0", "Exactly 1", "Up to 16", "Unlimited"],
    correctOpt: 1,
    explanation: "A clustered index physically orders the actual data rows on disk. Since data rows can only be sorted in one physical sequence, only one clustered index can exist per table.",
    companyTags: ["Microsoft", "Infosys"]
  },
  {
    title: "Two-Phase Locking (2PL) Protocol",
    prompt: "What guarantee does the strict Two-Phase Locking (2PL) concurrency protocol provide for serializability?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "MEDIUM",
    options: [
      "Guarantees conflict serializability and prevents cascading aborts (if locks are held until commit)",
      "Guarantees absence of deadlocks",
      "Eliminates the need for transaction rollbacks",
      "Guarantees O(1) lock acquisition"
    ],
    correctOpt: 0,
    explanation: "2PL guarantees conflict-serializable schedules. Strict 2PL (holding all exclusive locks until transaction completion) additionally prevents cascading rollbacks.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "WAL (Write-Ahead Logging)",
    prompt: "What core requirement does Write-Ahead Logging (WAL) enforce to guarantee Atomicity and Durability?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "MEDIUM",
    options: [
      "User queries must be cached in memory before execution",
      "Log records describing changes must be flushed to non-volatile disk before the corresponding dirty data pages are written to disk",
      "Transactions must execute sequentially",
      "Secondary indexes must be rebuilt on every commit"
    ],
    correctOpt: 1,
    explanation: "The WAL protocol dictates that log entries describing updates must reach persistent disk before the dirty database buffers are written, enabling crash recovery via UNDO/REDO.",
    companyTags: ["Amazon", "Microsoft", "Freshworks"]
  },
  {
    title: "SQL Self Join Application",
    prompt: "In what scenario is an SQL `SELF JOIN` commonly required?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "EASY",
    options: [
      "When joining two completely distinct schemas",
      "When evaluating hierarchical relationships within the same table, such as finding employees and their managers",
      "When backing up a database to another server",
      "When dropping foreign key constraints"
    ],
    correctOpt: 1,
    explanation: "A self join joins a table to itself using aliases, ideal for recursive or hierarchical structures like an Employees table where `manager_id` references `employee_id`.",
    companyTags: ["Infosys", "Wipro", "TCS"]
  },
  {
    title: "Boyce-Codd Normal Form (BCNF)",
    prompt: "What is the defining condition for a relation to be in BCNF for every non-trivial functional dependency X -> Y?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "MEDIUM",
    options: ["Y must be a prime attribute", "X must be a superkey", "X must be single attribute", "The relation must have no candidate keys"],
    correctOpt: 1,
    explanation: "BCNF is a stricter version of 3NF: for every non-trivial functional dependency X -> Y, X MUST be a superkey (no exceptions for prime attributes).",
    companyTags: ["Cognizant", "TCS"]
  },
  {
    title: "NoSQL CAP Theorem Classification",
    prompt: "According to the CAP Theorem, which pair of guarantees does Apache Cassandra primarily choose in network partition scenarios?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "MEDIUM",
    options: ["Consistency and Partition Tolerance (CP)", "Availability and Partition Tolerance (AP)", "Consistency and Availability (CA)", "None of the above"],
    correctOpt: 1,
    explanation: "Cassandra adopts a masterless, decentralized architecture prioritizing Availability and Partition Tolerance (AP) with tunable eventual consistency.",
    companyTags: ["Amazon", "Freshworks"]
  },
  {
    title: "SQL Correlated Subquery",
    prompt: "What characterizes a 'correlated subquery' in SQL?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "MEDIUM",
    options: [
      "A subquery that runs once and caches its results for all outer rows",
      "A subquery that references column values from the outer query, evaluating once per candidate outer row",
      "A query that joins with an external MongoDB database",
      "A subquery executed asynchronously"
    ],
    correctOpt: 1,
    explanation: "A correlated subquery depends on values from the outer query row. Consequently, it re-executes for each individual row processed by the outer query.",
    companyTags: ["Deloitte", "Zoho"]
  },
  {
    title: "Database View Materialization",
    prompt: "What is the difference between a standard SQL View and a Materialized View?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "EASY",
    options: [
      "A standard view stores results physically on disk; a materialized view is a stored query definition",
      "A standard view is a virtual query computed on the fly; a materialized view stores the query result physically and requires periodic refresh",
      "Materialized views cannot use joins",
      "Standard views can only contain 100 rows"
    ],
    correctOpt: 1,
    explanation: "A standard view executes its underlying query dynamically upon every access. A materialized view precomputes and persists data to disk for fast repeated reads.",
    companyTags: ["Microsoft", "Amazon"]
  },
  {
    title: "Candidate Key Minimal Superkey",
    prompt: "What is a Candidate Key in relational database modeling?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "EASY",
    options: [
      "Any column containing numbers",
      "A minimal superkey whose proper subsets cannot uniquely identify a tuple",
      "A foreign key pointing to the primary key",
      "An index column with non-unique entries"
    ],
    correctOpt: 1,
    explanation: "A candidate key is a minimal set of attributes that uniquely identifies every tuple in a relation without any redundant attributes.",
    companyTags: ["TCS", "Infosys"]
  },
  {
    title: "Optimistic Concurrency Control (OCC)",
    prompt: "When does Optimistic Concurrency Control validate whether any conflicts occurred between concurrent transactions?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "MEDIUM",
    options: ["Before reading data (lock acquisition)", "During the validation phase right before committing writes", "After client disconnects", "On the next database reboot"],
    correctOpt: 1,
    explanation: "OCC executes transactions without acquiring locks during the Read phase, checks for conflicts against concurrent commits during the Validation phase, and commits during the Write phase.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Referential Integrity ON DELETE CASCADE",
    prompt: "What occurs when a parent row is deleted in a table with a foreign key configured as `ON DELETE CASCADE`?",
    category: "CORE_CS",
    subCategory: "DBMS",
    difficulty: "EASY",
    options: [
      "The deletion fails and throws an error",
      "The child foreign key values are set to NULL",
      "All corresponding child rows referencing the deleted parent row are automatically deleted",
      "The parent row is flagged as archived without touching child rows"
    ],
    correctOpt: 2,
    explanation: "`ON DELETE CASCADE` automatically propagates deletion down to all matching child records to uphold referential integrity without orphan records.",
    companyTags: ["Accenture", "TCS"]
  },

  // --- COMPUTER NETWORKS (15 Qs) ---
  {
    title: "TCP 3-Way Handshake Flags",
    prompt: "What is the exact sequence of TCP control flags exchanged to establish a reliable connection between client and server?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "EASY",
    options: ["SYN -> ACK -> SYN", "SYN -> SYN-ACK -> ACK", "ACK -> SYN -> ACK", "FIN -> ACK -> FIN-ACK"],
    correctOpt: 1,
    explanation: "Client sends SYN; Server responds with SYN-ACK; Client replies with ACK. The TCP full-duplex session is now ESTABLISHED.",
    companyTags: ["Amazon", "Microsoft", "Zoho", "TCS"]
  },
  {
    title: "OSI Layer Data Units (PDU)",
    prompt: "What is the Protocol Data Unit (PDU) called at the Transport Layer (Layer 4)?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "EASY",
    options: ["Frame", "Packet", "Segment", "Bit"],
    correctOpt: 2,
    explanation: "Layer 1: Bits, Layer 2: Frames, Layer 3: Packets, Layer 4: Segments (for TCP) or Datagrams (for UDP).",
    companyTags: ["Infosys", "Cognizant", "Wipro"]
  },
  {
    title: "CIDR Subnet Mask Usable Hosts",
    prompt: "How many usable host IP addresses are available in an IPv4 subnet with prefix `/27`?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "MEDIUM",
    options: ["28", "30", "32", "62"],
    correctOpt: 1,
    explanation: "32 bits - 27 prefix bits = 5 host bits. Total addresses = 2^5 = 32. Subtract 2 for the Network Address and Broadcast Address => 30 usable hosts.",
    companyTags: ["Amazon", "Microsoft", "TCS"]
  },
  {
    title: "DNS Resolution Protocol and Port",
    prompt: "Which transport protocol and standard port does standard DNS query resolution primarily utilize?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "EASY",
    options: ["TCP port 80", "UDP port 53", "TCP port 443", "UDP port 67"],
    correctOpt: 1,
    explanation: "DNS queries use UDP port 53 for fast, lightweight resolution. TCP 53 is used for zone transfers or responses exceeding 512 bytes.",
    companyTags: ["Infosys", "Zoho"]
  },
  {
    title: "HTTP Status Code 429",
    prompt: "What does an HTTP 429 response code returned by an API gateway indicate?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "EASY",
    options: ["Unauthorized", "Too Many Requests (Rate limit exceeded)", "Service Unavailable", "Gateway Timeout"],
    correctOpt: 1,
    explanation: "HTTP 429 Too Many Requests indicates the client has sent too many requests in a given amount of time (rate limited).",
    companyTags: ["Freshworks", "Amazon"]
  },
  {
    title: "TCP Congestion Control Mechanisms",
    prompt: "In TCP Reno congestion control, what happens upon detecting a timeout event?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "MEDIUM",
    options: [
      "Congestion window is halved and fast recovery starts",
      "Congestion window is reset to 1 MSS and Slow Start begins",
      "Connection is immediately closed",
      "Window size remains unchanged"
    ],
    correctOpt: 1,
    explanation: "A timeout signifies severe network congestion; TCP sets Slow Start Threshold (ssthresh) to half the current cwnd, resets cwnd to 1 MSS, and enters Slow Start.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "ARP Protocol Layer and Purpose",
    prompt: "What is the function of the Address Resolution Protocol (ARP)?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "EASY",
    options: [
      "Translates domain names to IP addresses",
      "Maps a known IPv4 address to its corresponding physical MAC address on a local area network",
      "Assigns dynamic IP addresses to clients",
      "Routes packets across autonomous systems"
    ],
    correctOpt: 1,
    explanation: "ARP broadcasts a request on the local broadcast domain to resolve an IPv4 address to its Layer 2 hardware MAC address.",
    companyTags: ["TCS", "Accenture"]
  },
  {
    title: "HTTP/2 Multiplexing Enhancement",
    prompt: "What major performance advantage did HTTP/2 introduce over HTTP/1.1?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "MEDIUM",
    options: [
      "Elimination of TCP entirely",
      "Multiplexing multiple requests and responses concurrently over a single TCP connection, eliminating head-of-line blocking at the application layer",
      "Mandatory unencrypted plain text mode",
      "Replacing JSON with XML"
    ],
    correctOpt: 1,
    explanation: "HTTP/2 introduces binary framing and stream multiplexing, allowing multiple bidirectional requests and responses over a single connection simultaneously.",
    companyTags: ["Freshworks", "Amazon", "Microsoft"]
  },
  {
    title: "Symmetric vs Asymmetric Encryption in TLS",
    prompt: "During a TLS 1.3 handshake, why are both asymmetric and symmetric encryption used?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "MEDIUM",
    options: [
      "Symmetric encryption is used for everything because it is more secure",
      "Asymmetric encryption (e.g. Diffie-Hellman) securely negotiates a shared secret; symmetric encryption (e.g. AES-GCM) encrypts the payload efficiently",
      "Asymmetric encryption encrypts all video streams",
      "TLS does not use symmetric cryptography"
    ],
    correctOpt: 1,
    explanation: "Asymmetric cryptography allows key exchange and identity authentication without a pre-shared secret. Fast symmetric ciphers then encrypt bulk application traffic.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Distance Vector Routing Count-to-Infinity",
    prompt: "What problem can arise in Distance Vector routing protocols (like RIP) during network link failures?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "MEDIUM",
    options: ["Count-to-Infinity problem and routing loops", "Dijkstra oscillation", "Subnet broadcast storm", "BGP flapping"],
    correctOpt: 0,
    explanation: "Slow propagation of link failures can cause nodes to gradually increment metrics toward infinity due to mutual routing loops, mitigated by split horizon and poison reverse.",
    companyTags: ["Microsoft", "TCS"]
  },
  {
    title: "NAT (Network Address Translation) PAT",
    prompt: "How does Port Address Translation (PAT / NAT Overload) allow multiple private IP devices to share a single public IP address?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "EASY",
    options: [
      "By mapping unique Layer 4 source port numbers to each internal private IP address and port",
      "By assigning different MAC addresses to public packets",
      "By appending base64 headers to every packet",
      "By running a VPN tunnel per device"
    ],
    correctOpt: 0,
    explanation: "PAT modifies the source port of outgoing packets and maintains a state translation table mapping (Public IP:Port) <-> (Private IP:Port).",
    companyTags: ["Cognizant", "Infosys"]
  },
  {
    title: "TCP vs UDP Header Size",
    prompt: "What is the minimum header size of a standard UDP datagram and TCP segment respectively?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "EASY",
    options: ["UDP: 8 bytes, TCP: 20 bytes", "UDP: 20 bytes, TCP: 8 bytes", "UDP: 4 bytes, TCP: 16 bytes", "UDP: 16 bytes, TCP: 32 bytes"],
    correctOpt: 0,
    explanation: "UDP headers are fixed and lightweight at 8 bytes (Source Port, Dest Port, Length, Checksum). TCP minimum header without options is 20 bytes.",
    companyTags: ["Zoho", "TCS"]
  },
  {
    title: "BGP Autonomous System Routing",
    prompt: "Which routing protocol is the standard Exterior Gateway Protocol (EGP) used to route traffic between distinct Autonomous Systems on the global Internet?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "EASY",
    options: ["OSPF", "BGP (Border Gateway Protocol)", "RIP", "IS-IS"],
    correctOpt: 1,
    explanation: "BGP is a path-vector protocol that manages routing decisions across autonomous systems comprising the backbone of the Internet.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "VLAN (Virtual Local Area Network) Tagging",
    prompt: "Which IEEE standard specifies frame tagging (802.1Q) to identify VLAN traffic over trunk links?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "MEDIUM",
    options: ["IEEE 802.3", "IEEE 802.11", "IEEE 802.1Q", "IEEE 802.15"],
    correctOpt: 2,
    explanation: "IEEE 802.1Q defines 4-byte VLAN tags inserted into Ethernet frames to differentiate multiple logical networks across shared physical trunk links.",
    companyTags: ["Wipro", "TCS"]
  },
  {
    title: "Cross-Origin Resource Sharing (CORS) Preflight",
    prompt: "Which HTTP request method is dispatched by modern browsers as a CORS preflight check before making complex cross-origin requests?",
    category: "CORE_CS",
    subCategory: "Computer Networks",
    difficulty: "EASY",
    options: ["GET", "HEAD", "OPTIONS", "TRACE"],
    correctOpt: 2,
    explanation: "Browsers automatically send an `OPTIONS` request containing CORS headers (`Origin`, `Access-Control-Request-Method`) to verify server authorization before executing the actual call.",
    companyTags: ["Freshworks", "Amazon"]
  },

  // --- HR & BEHAVIORAL INTERVIEW (15 Qs) ---
  {
    title: "STAR Technique for Behavioral Scenarios",
    prompt: "In a competency-based HR interview, what does the STAR behavioral answering framework stand for?",
    category: "HR_INTERVIEW",
    subCategory: "Interview Techniques",
    difficulty: "EASY",
    options: [
      "Strategy, Technique, Action, Result",
      "Situation, Task, Action, Result",
      "Summary, Theory, Assessment, Review",
      "Status, Timeline, Achievement, Reward"
    ],
    correctOpt: 1,
    explanation: "STAR: Situation (context), Task (objective/challenge), Action (specific steps you personally took), and Result (quantified business or project outcome).",
    companyTags: ["Amazon", "Microsoft", "TCS", "Infosys"]
  },
  {
    title: "Handling Project Conflict with a Teammate",
    prompt: "An interviewer asks: 'Tell me about a time you strongly disagreed with a team member on technical design. How did you resolve it?' What demonstrates highest maturity?",
    category: "HR_INTERVIEW",
    subCategory: "Conflict Resolution",
    difficulty: "MEDIUM",
    options: [
      "Escalating immediately to the college professor or manager to overrule them",
      "Agreeing quietly to avoid interpersonal friction even if you believed it was flawed",
      "Focusing objectively on data, benchmarking trade-offs together, and seeking alignment on project goals rather than personal ego",
      "Continuing to write the code your way independently"
    ],
    correctOpt: 2,
    explanation: "Mature conflict resolution relies on depersonalizing the disagreement, testing hypotheses with data/proof-of-concepts, and committing to shared team outcomes.",
    companyTags: ["Amazon", "Deloitte", "Microsoft"]
  },
  {
    title: "Addressing Personal Weaknesses",
    prompt: "When asked 'What is your greatest weakness?', which strategy is most effective?",
    category: "HR_INTERVIEW",
    subCategory: "Self-Awareness",
    difficulty: "MEDIUM",
    options: [
      "Claiming 'I am an extreme perfectionist and work too hard'",
      "Mentioning an authentic, non-fatal professional development area along with concrete proactive steps you have taken to improve",
      "Stating that you possess no recognizable technical or interpersonal weaknesses",
      "Listing technical gaps that are the core prerequisites of the exact job description"
    ],
    correctOpt: 1,
    explanation: "Interviewers look for genuine self-awareness and active commitment to learning. Generic cliches sound disingenuous, while unmitigated core flaws raise flags.",
    companyTags: ["Deloitte", "Accenture", "TCS"]
  },
  {
    title: "Explaining Career Transition or Gaps",
    prompt: "If an interviewer questions a gap in your academic semester or shift from Mechanical to Software, the best framing is:",
    category: "HR_INTERVIEW",
    subCategory: "Career Narrative",
    difficulty: "EASY",
    options: [
      "Blaming academic professors and lack of institutional opportunities",
      "Presenting a clear narrative of personal growth, self-driven coding projects, and how analytical thinking from your background strengthens your software problem solving",
      "Changing the subject quickly to avoid scrutiny",
      "Expressing regret about choosing engineering in the first place"
    ],
    correctOpt: 1,
    explanation: "A positive narrative that highlights proactive skill acquisition (certifications, open source, projects) demonstrates resilience and genuine career commitment.",
    companyTags: ["Infosys", "Wipro", "TCS"]
  },
  {
    title: "Amazon Leadership Principle: Customer Obsession",
    prompt: "Amazon's leadership principle 'Customer Obsession' expects engineers to:",
    category: "HR_INTERVIEW",
    subCategory: "Company Culture",
    difficulty: "EASY",
    options: [
      "Always build the most sophisticated technology stack regardless of user need",
      "Start with the customer and work backwards, vigorously earning and keeping customer trust",
      "Prioritize competitor features over direct customer feedback",
      "Focus solely on internal manager reviews"
    ],
    correctOpt: 1,
    explanation: "Amazon leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust, paying close attention to competitors but obsessing over customers.",
    companyTags: ["Amazon"]
  },
  {
    title: "Questions to Ask the Interviewer",
    prompt: "At the end of an interview, the recruiter asks: 'Do you have any questions for us?' Which question exhibits genuine engagement?",
    category: "HR_INTERVIEW",
    subCategory: "Candidate Questions",
    difficulty: "EASY",
    options: [
      "'How soon can I take paid vacation days?'",
      "'What does a typical onboarding sprint look like for an entry-level engineer on this team, and what key metrics define success in the first 90 days?'",
      "'What is the exact financial valuation of the CEO?'",
      "'No, everything was already covered.'"
    ],
    correctOpt: 1,
    explanation: "Asking about team onboarding, engineering practices, or 90-day impact demonstrates readiness, intellectual curiosity, and high motivation to succeed in the role.",
    companyTags: ["Amazon", "Microsoft", "Freshworks", "Deloitte"]
  },
  {
    title: "Responding to Critical Feedback",
    prompt: "If an interviewer challenges your answer during an interview and points out an error, how should you respond?",
    category: "HR_INTERVIEW",
    subCategory: "Coachability",
    difficulty: "EASY",
    options: [
      "Defend your initial answer stubbornly even if proven wrong",
      "Acknowledge the insight, think through the new constraint or critique, and adapt your approach collaboratively",
      "Remain completely silent and stop answering",
      "Accuse the interviewer of asking a trick question"
    ],
    correctOpt: 1,
    explanation: "Interviewers frequently provide hints or challenge assumptions to evaluate coachability and how you collaborate under pressure.",
    companyTags: ["Microsoft", "Amazon", "Zoho"]
  },
  {
    title: "Handling High Pressure and Tight Deadlines",
    prompt: "How should you articulate your experience handling high-stress deadlines?",
    category: "HR_INTERVIEW",
    subCategory: "Stress Management",
    difficulty: "EASY",
    options: [
      "Explain how you prioritize tasks by impact, communicate early about trade-offs, break deliverables into iterations, and maintain focus",
      "Boast that you never experience stress under any circumstances",
      "Admit that you perform poorly when deadlines approach",
      "Explain that you work 24 hours straight without sleep"
    ],
    correctOpt: 0,
    explanation: "Structured task prioritization, transparent stakeholder communication, and iterative delivery demonstrate sound time management and professional poise.",
    companyTags: ["Accenture", "TCS", "Deloitte"]
  },
  {
    title: "Why Should We Hire You",
    prompt: "When asked 'Why should we hire you over other qualified candidates?', the optimal response highlights:",
    category: "HR_INTERVIEW",
    subCategory: "Value Proposition",
    difficulty: "EASY",
    options: [
      "Putting down the qualifications of other college batchmates",
      "The unique intersection of your technical competencies, hands-on project execution, alignment with company values, and passion to contribute to their specific products",
      "Merely stating your high GPA",
      "Saying that you need the job urgently for financial reasons"
    ],
    correctOpt: 1,
    explanation: "Connect your specific capabilities and passion directly to the company's domain, showcasing how your skills will solve real problems on their team.",
    companyTags: ["TCS", "Infosys", "Cognizant"]
  },
  {
    title: "Navigating Ethical Dilemmas",
    prompt: "If asked: 'What would you do if you noticed a senior team member bypassing code security checks before a major release?'",
    category: "HR_INTERVIEW",
    subCategory: "Ethics & Integrity",
    difficulty: "MEDIUM",
    options: [
      "Ignore it because the senior engineer has more tenure",
      "Privately and professionally discuss the concern with the engineer, and if unresolved, escalate through proper engineering/security protocols to protect user data and product integrity",
      "Post anonymously on public social media",
      "Revert their commit without notifying anyone"
    ],
    correctOpt: 1,
    explanation: "Integrity and safety are non-negotiable. Professional communication combined with established institutional safety escalation ensures risk is addressed constructively.",
    companyTags: ["Deloitte", "Microsoft", "Amazon"]
  },
  {
    title: "Demonstrating Teamwork in Projects",
    prompt: "Which phrase best demonstrates collaborative team success during a technical project presentation?",
    category: "HR_INTERVIEW",
    subCategory: "Teamwork",
    difficulty: "EASY",
    options: [
      "'I did all the coding myself while the others did nothing'",
      "'Our team divided responsibilities according to strengths: I architected the backend and APIs, while collaborating closely with the frontend lead on contracts'",
      "'The project succeeded purely because of my personal leadership'",
      "'It was a group project so I did not have to work hard'"
    ],
    correctOpt: 1,
    explanation: "High-performing engineers share credit, clearly delineate their specific ownership, and acknowledge the contributions of cross-functional peers.",
    companyTags: ["TCS", "Wipro", "Infosys"]
  },
  {
    title: "Five-Year Career Vision",
    prompt: "When asked 'Where do you see yourself in five years?', hiring managers primarily evaluate:",
    category: "HR_INTERVIEW",
    subCategory: "Long-term Goals",
    difficulty: "EASY",
    options: [
      "Whether you plan to leave the company to start a venture next year",
      "Your ambition for continuous technical mastery, willingness to take expanding ownership, and realistic commitment to professional growth within the industry",
      "Whether you can name the exact future salary number you expect",
      "Whether you want the interviewer's exact job position"
    ],
    correctOpt: 1,
    explanation: "Companies seek candidates who are intentional about their career growth, enthusiastic about technical depth/leadership, and likely to provide sustained value.",
    companyTags: ["Accenture", "TCS", "Infosys"]
  },
  {
    title: "Salary Expectation for Campus Freshers",
    prompt: "How should a campus placement candidate address salary expectations during initial HR discussions?",
    category: "HR_INTERVIEW",
    subCategory: "Negotiation",
    difficulty: "EASY",
    options: [
      "Demanding a 50% premium over the standard institutional campus band",
      "Stating openness to the company's standardized campus placement band while emphasizing focus on learning opportunities and team impact",
      "Refusing to discuss the role without upfront compensation guarantees",
      "Asking for zero salary just to get the offer"
    ],
    correctOpt: 1,
    explanation: "Campus placement offers generally follow established tiered compensation bands; expressing respect for institutional standards while focusing on growth creates a strong impression.",
    companyTags: ["TCS", "Cognizant", "Wipro"]
  },
  {
    title: "Handling Project Failures",
    prompt: "What is the core takeaway an interviewer expects when you narrate a project failure?",
    category: "HR_INTERVIEW",
    subCategory: "Resilience",
    difficulty: "MEDIUM",
    options: [
      "Demonstrating that you were blameless and the client was unreasonable",
      "Taking ownership of the shortfall, explaining root causes uncovered, and showing how the retrospective led to permanent process or technical improvements",
      "Avoiding talking about any failure whatsoever",
      "Showing how you abandoned the project when things went wrong"
    ],
    correctOpt: 1,
    explanation: "Failure narratives reveal humility, analytical root cause capability, and whether you convert setbacks into institutional knowledge.",
    companyTags: ["Amazon", "Microsoft", "Freshworks"]
  },
  {
    title: "Cultural Fit and Company Values",
    prompt: "Why is research into a target company's products and recent engineering blogs important prior to an HR interview?",
    category: "HR_INTERVIEW",
    subCategory: "Preparation",
    difficulty: "EASY",
    options: [
      "To flatter the recruiter with memorized corporate slogans",
      "To demonstrate genuine interest, contextualize your project answers to their business challenges, and evaluate if their engineering culture aligns with your aspirations",
      "It is unnecessary because campus interviews only test math",
      "To copy their proprietary code in your resume"
    ],
    correctOpt: 1,
    explanation: "Domain context enables you to tailor your answers to real problems the organization solves, setting you apart from candidates with generic answers.",
    companyTags: ["Deloitte", "Amazon", "Microsoft"]
  },

  // --- TECHNICAL INTERVIEW (15 Qs) ---
  {
    title: "System Design: Microservices vs Monolith",
    prompt: "In modern system architecture, what is a primary trade-off when moving from a Monolith to Microservices?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "System Design",
    difficulty: "MEDIUM",
    options: [
      "Microservices eliminate all network latency and reduce server counts",
      "Microservices improve team decoupling and independent deployability at the cost of distributed system complexity, network latency, and eventual consistency challenges",
      "Microservices do not require database connections",
      "Monoliths cannot handle more than 100 requests per second"
    ],
    correctOpt: 1,
    explanation: "Microservices enable independent scaling and autonomous deployments, but introduce inter-service RPC latency, distributed tracing requirements, and partial failure modes.",
    companyTags: ["Amazon", "Microsoft", "Freshworks"]
  },
  {
    title: "Database Sharding vs Replication",
    prompt: "What is the distinction between Database Replication and Database Sharding?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "System Design",
    difficulty: "MEDIUM",
    options: [
      "Replication copies identical data across multiple nodes for read scaling and fault tolerance; Sharding partitions distinct subsets of data rows across nodes to scale write throughput and storage",
      "Replication is only for NoSQL; Sharding is only for SQL",
      "Sharding creates exact full copies of the database on every continent",
      "Replication splits tables vertically by columns"
    ],
    correctOpt: 0,
    explanation: "Replication duplicates entire datasets to achieve high availability and scale reads. Sharding partitions data horizontally across independent instances to handle huge dataset sizes.",
    companyTags: ["Amazon", "Microsoft", "Zoho"]
  },
  {
    title: "Cache Invalidation Strategies: Write-Through vs Write-Back",
    prompt: "How does a Write-Back (Write-Behind) caching strategy operate?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "System Design",
    difficulty: "MEDIUM",
    options: [
      "Writes are written synchronously to the database only, bypassing cache",
      "Writes are updated in cache first, and asynchronously flushed in batches to the database later, risking data loss on cache failure but providing ultra-low write latency",
      "Writes update both cache and database synchronously",
      "Data is read into cache only when a miss occurs"
    ],
    correctOpt: 1,
    explanation: "Write-back writes to cache immediately and confirms to the client, delaying persistent DB writes. This delivers high write performance but carries risk if the cache crashes before flushing.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Rate Limiting: Token Bucket vs Leaky Bucket",
    prompt: "What key advantage does the Token Bucket rate limiting algorithm provide over the Leaky Bucket algorithm?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "System Design",
    difficulty: "HARD",
    options: [
      "Token bucket completely prevents all traffic spikes",
      "Token bucket allows bursts of traffic up to the bucket capacity while maintaining an average rate, whereas leaky bucket enforces a strictly smoothed output rate",
      "Token bucket requires zero memory",
      "Token bucket is only implemented at client side"
    ],
    correctOpt: 1,
    explanation: "Tokens accumulate up to capacity; a burst of requests can consume all accumulated tokens immediately. Leaky bucket processes requests at a constant, fixed rate.",
    companyTags: ["Amazon", "Microsoft", "Freshworks"]
  },
  {
    title: "REST vs GraphQL Trade-offs",
    prompt: "What core client-side problem does GraphQL solve compared to traditional REST API endpoints?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "API Design",
    difficulty: "EASY",
    options: [
      "Over-fetching and under-fetching of data by allowing clients to query exactly the fields required in a single round-trip",
      "Eliminating the need for an API server",
      "Enforcing SQL queries directly from mobile apps",
      "Eliminating TLS encryption overhead"
    ],
    correctOpt: 0,
    explanation: "REST endpoints often return fixed payloads causing over-fetching (unneeded fields) or require multiple endpoint calls (under-fetching). GraphQL lets clients request exact shapes.",
    companyTags: ["Freshworks", "Amazon", "Microsoft"]
  },
  {
    title: "Idempotency in REST APIs",
    prompt: "Which of the following standard HTTP methods is NOT idempotent according to RFC specifications?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "API Design",
    difficulty: "EASY",
    options: ["GET", "PUT", "DELETE", "POST"],
    correctOpt: 3,
    explanation: "An idempotent method produces the same server state if called multiple times. `POST` creates a new resource on each execution, so it is inherently non-idempotent without unique tokens.",
    companyTags: ["Amazon", "Freshworks", "Zoho"]
  },
  {
    title: "SQL Injection Prevention",
    prompt: "What is the primary industry standard mechanism to prevent SQL Injection vulnerabilities in web applications?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "Web Security",
    difficulty: "EASY",
    options: [
      "Escaping single quotes manually in client-side JavaScript",
      "Using Prepared Statements with Parameterized Queries or Object-Relational Mappers (ORMs)",
      "Disabling database indexing",
      "Encrypting the database passwords with MD5"
    ],
    correctOpt: 1,
    explanation: "Parameterized queries ensure the SQL engine treats user input strictly as literals rather than executable SQL syntax commands, regardless of what characters are supplied.",
    companyTags: ["Deloitte", "TCS", "Infosys"]
  },
  {
    title: "Cross-Site Scripting (XSS) Mitigation",
    prompt: "What browser security policy header helps mitigate Stored and Reflected XSS by restricting allowed script sources?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "Web Security",
    difficulty: "MEDIUM",
    options: ["Strict-Transport-Security (HSTS)", "Content-Security-Policy (CSP)", "X-Frame-Options", "Access-Control-Allow-Origin"],
    correctOpt: 1,
    explanation: "Content-Security-Policy (CSP) specifies authorized domains and nonces from which browsers are allowed to load and execute executable scripts, styles, and media.",
    companyTags: ["Amazon", "Freshworks"]
  },
  {
    title: "JWT (JSON Web Token) Security Considerations",
    prompt: "Why should sensitive confidential data (e.g. passwords, SSNs) never be stored inside standard JWT claims?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "Web Security",
    difficulty: "EASY",
    options: [
      "JWT tokens cannot be transmitted over HTTPS",
      "JWT payloads are only Base64URL-encoded, not encrypted, meaning anyone who inspects the token can decode and view the payload in plain text",
      "JWT tokens expire every 10 seconds",
      "JWTs only support numeric identifiers"
    ],
    correctOpt: 1,
    explanation: "Standard JWTs are signed for tamper-evidence (integrity), not encrypted (confidentiality). The payload is trivial to decode by any party holding the token.",
    companyTags: ["Freshworks", "Amazon", "Microsoft"]
  },
  {
    title: "Memory Leak in Managed Languages",
    prompt: "How can a memory leak occur in a garbage-collected language like Java or C#?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "Software Engineering",
    difficulty: "MEDIUM",
    options: [
      "Garbage collection memory leaks are physically impossible in managed runtimes",
      "Unintentional references retained in static collections, unclosed streams, or registered event listeners that prevent objects from being marked unreachable",
      "Allocating more than 100 integer variables",
      "Using recursion instead of loops"
    ],
    correctOpt: 1,
    explanation: "If an unused object remains reachable from GC roots (such as a static Map cache or lingering observer listener), the collector cannot reclaim it, causing memory leaks.",
    companyTags: ["Microsoft", "Amazon", "Infosys"]
  },
  {
    title: "CAP Theorem Consistency vs ACID Consistency",
    prompt: "How does 'Consistency' in the CAP Theorem differ from 'Consistency' in ACID database transactions?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "Distributed Systems",
    difficulty: "HARD",
    options: [
      "They mean the exact same thing",
      "CAP Consistency means Linearizability (every read receives the most recent write); ACID Consistency means preserving database integrity constraints and invariants",
      "ACID consistency relates to distributed networks while CAP is single-machine",
      "CAP consistency is about disk backups"
    ],
    correctOpt: 1,
    explanation: "In CAP, consistency refers to atomic consistency / single-copy linearizability across distributed nodes. In ACID, consistency means transactions transition database state according to defined schema rules.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Load Balancer Algorithms: Consistent Hashing",
    prompt: "Why is Consistent Hashing preferred over simple modular hashing `hash(key) % N` in distributed caching systems?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "System Design",
    difficulty: "HARD",
    options: [
      "It makes hashing run in O(1) instead of O(N)",
      "When a cache server is added or removed, only K/N keys need to be remapped on average rather than nearly 100% of all keys",
      "It requires no hash function",
      "It eliminates the need for cache eviction policies"
    ],
    correctOpt: 1,
    explanation: "In modular hashing, changing N shifts almost every key to a different bucket. Consistent Hashing maps keys to a ring, minimizing cache invalidations during scaling events.",
    companyTags: ["Amazon", "Microsoft"]
  },
  {
    title: "Database Isolation Level: Read Committed",
    prompt: "Under the 'Read Committed' isolation level, what concurrency anomaly is prevented, and what anomaly can still occur?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "DBMS Internals",
    difficulty: "MEDIUM",
    options: [
      "Prevents Dirty Reads; Non-Repeatable Reads and Phantom Reads can still occur",
      "Prevents Phantom Reads; Dirty Reads can still occur",
      "Prevents all anomalies completely",
      "Allows Dirty Reads but prevents Lost Updates"
    ],
    correctOpt: 0,
    explanation: "Read Committed guarantees that transactions only read data that has been successfully committed (preventing dirty reads). However, a second read of the same row can observe newly committed changes.",
    companyTags: ["Microsoft", "Amazon", "Zoho"]
  },
  {
    title: "Event-Driven Architecture: Kafka Consumer Groups",
    prompt: "In Apache Kafka, what determines the maximum number of consumers that can actively read in parallel from a single topic within the same consumer group?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "Distributed Systems",
    difficulty: "MEDIUM",
    options: [
      "The total RAM on the Kafka broker",
      "The number of partitions configured for that topic",
      "The number of consumer thread pools",
      "The network bandwidth of the producer"
    ],
    correctOpt: 1,
    explanation: "In Kafka, a single partition within a topic can only be assigned to at most one consumer instance per consumer group at any given time.",
    companyTags: ["Amazon", "Freshworks"]
  },
  {
    title: "Design Pattern: Dependency Injection",
    prompt: "What is the primary benefit of applying Dependency Injection (Inversion of Control) in enterprise software architectures?",
    category: "TECHNICAL_INTERVIEW",
    subCategory: "Design Patterns",
    difficulty: "EASY",
    options: [
      "Increases tightly coupled dependencies between classes",
      "Decouples object creation from business logic, dramatically improving testability (mocking) and maintainability",
      "Makes compilation instantaneous",
      "Prevents garbage collection overhead"
    ],
    correctOpt: 1,
    explanation: "Dependency injection passes collaborators from outside rather than instantiating them directly, allowing easy substitution with mock objects during unit testing.",
    companyTags: ["Microsoft", "Infosys", "Deloitte"]
  },

  // --- COMPANY-SPECIFIC QUESTIONS (25 Qs) ---
  {
    title: "TCS NQT: Numerical Reasoning Series",
    prompt: "TCS NQT Question: A sequence is defined as 2, 6, 12, 20, 30, 42, ... What is the 10th term in this sequence?",
    category: "COMPANY_SPECIFIC",
    subCategory: "TCS Pattern",
    difficulty: "EASY",
    options: ["90", "110", "132", "156"],
    correctOpt: 1,
    explanation: "Notice the pattern n * (n + 1):\n1: 1 * 2 = 2\n2: 2 * 3 = 6\n3: 3 * 4 = 12\n...\n10th term = 10 * 11 = 110.",
    companyTags: ["TCS"]
  },
  {
    title: "TCS NQT: Advanced Coding Problem Logic",
    prompt: "TCS Digital/Prime: An array of integers represents daily stock prices. You may buy on day i and sell on day j (j > i). What is the minimum operations to find maximum profit in single pass?",
    category: "COMPANY_SPECIFIC",
    subCategory: "TCS Pattern",
    difficulty: "EASY",
    options: [
      "Track `minPrice` so far and maximize `price - minPrice` in one loop of O(N)",
      "Use two nested loops comparing every pair in O(N^2)",
      "Sort the array first in O(N log N)",
      "Build a segment tree"
    ],
    correctOpt: 0,
    explanation: "Single pass Kadane-like technique: maintain minimum price seen so far and update maximum profit at each step.",
    companyTags: ["TCS"]
  },
  {
    title: "Infosys Pseudo-Code Output",
    prompt: "Infosys Pseudo-code:\n```text\nInteger a, b, c\nSet a = 4, b = 6, c = 2\na = (b ^ c) + a\nif ((a + b) > (c * 5))\n    c = a + b\nelse\n    c = a - b\nPrint c\n```\nWhat is the output?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Infosys Pattern",
    difficulty: "MEDIUM",
    options: ["14", "10", "8", "4"],
    correctOpt: 0,
    explanation: "b = 6 (110_2), c = 2 (010_2). b ^ c = 4 (100_2). a = 4 + 4 = 8. Check: (8 + 6) > (2 * 5) => 14 > 10 (True). c = 8 + 6 = 14.",
    companyTags: ["Infosys"]
  },
  {
    title: "Infosys SP / DSE: Dynamic Programming Jump",
    prompt: "Infosys Specialist Programmer: You are given an array of non-negative integers where each element represents your maximum jump length. To determine if you can reach the last index in O(N) time and O(1) space, what greedy property is tracked?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Infosys Pattern",
    difficulty: "MEDIUM",
    options: ["Max reachable index so far (`maxReach = max(maxReach, i + nums[i])`)", "Minimum element in array", "Sum of all elements", "Binary search on midpoint"],
    correctOpt: 0,
    explanation: "Maintain `maxReach`. As you iterate from 0 to N-1, if `i > maxReach` return false. If `maxReach >= N - 1` return true.",
    companyTags: ["Infosys"]
  },
  {
    title: "Wipro Elite National Talent Hunt: Verbal Error",
    prompt: "Wipro Elite: Choose the correct preposition: 'The placement cell is responsible _______ coordinating campus interview drives.'",
    category: "COMPANY_SPECIFIC",
    subCategory: "Wipro Pattern",
    difficulty: "EASY",
    options: ["with", "for", "to", "on"],
    correctOpt: 1,
    explanation: "'Responsible' takes the preposition 'for' when referring to duties or assignments.",
    companyTags: ["Wipro"]
  },
  {
    title: "Wipro Coding: String Vowel Inversion",
    prompt: "Wipro NLTH Coding: Given a string, reverse only the vowels in the string while keeping consonants in their original positions. What is the optimal algorithmic technique?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Wipro Pattern",
    difficulty: "EASY",
    options: ["Two pointers from start and end swapping when both point to vowels", "Sorting the string", "Matrix transposition", "Dynamic programming table"],
    correctOpt: 0,
    explanation: "Two pointers converging from ends: advance left until a vowel is found, advance right until a vowel is found, swap, and repeat until pointers cross in O(N) time.",
    companyTags: ["Wipro"]
  },
  {
    title: "Accenture Critical Thinking & Abstract Reasoning",
    prompt: "Accenture Cognitive: If '@' denotes '+', '#' denotes '-', '$' denotes '*', and '%' denotes '/', evaluate: 18 $ 4 % 12 @ 6 # 2",
    category: "COMPANY_SPECIFIC",
    subCategory: "Accenture Pattern",
    difficulty: "EASY",
    options: ["8", "10", "12", "14"],
    correctOpt: 1,
    explanation: "Expression: 18 * 4 / 12 + 6 - 2. By BODMAS/PEMDAS: (18 * 4) / 12 = 72 / 12 = 6. Then 6 + 6 - 2 = 10.",
    companyTags: ["Accenture"]
  },
  {
    title: "Accenture Technical: Cloud Fundamentals",
    prompt: "Accenture Cloud Practice: Which cloud computing service model provides virtual machines, raw storage, and virtual networking infrastructure?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Accenture Pattern",
    difficulty: "EASY",
    options: ["SaaS (Software as a Service)", "PaaS (Platform as a Service)", "IaaS (Infrastructure as a Service)", "FaaS (Function as a Service)"],
    correctOpt: 2,
    explanation: "IaaS (e.g. AWS EC2, Azure VMs, GCP Compute Engine) delivers fundamental compute, storage, and networking resources.",
    companyTags: ["Accenture"]
  },
  {
    title: "Cognizant GenC Elevate: Debugging",
    prompt: "Cognizant GenC: What is the logical bug in the following C snippet intended to reverse an array `arr` of size `n`?\n```c\nfor(int i = 0; i < n; i++) {\n    int temp = arr[i];\n    arr[i] = arr[n - 1 - i];\n    arr[n - 1 - i] = temp;\n}\n```",
    category: "COMPANY_SPECIFIC",
    subCategory: "Cognizant Pattern",
    difficulty: "EASY",
    options: [
      "The loop iterates to `n` instead of `n / 2`, swapping elements twice and returning the array to its original order",
      "The swap syntax is invalid in C",
      "Array indices go out of bounds",
      "The loop should count backwards"
    ],
    correctOpt: 0,
    explanation: "Iterating through the full length swaps elements to the opposite end and then swaps them back to their initial positions. The loop condition must be `i < n / 2`.",
    companyTags: ["Cognizant"]
  },
  {
    title: "Cognizant Data Structures: Queue Using Circular Array",
    prompt: "In a circular queue of capacity N implemented using an array, what expression calculates the next position of the `rear` index?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Cognizant Pattern",
    difficulty: "EASY",
    options: ["(rear + 1) % N", "rear + 1", "rear % N", "(rear - 1) % N"],
    correctOpt: 0,
    explanation: "Modulo arithmetic wraps the pointer around from `N - 1` back to `0`, making efficient use of array capacity without shifting.",
    companyTags: ["Cognizant"]
  },
  {
    title: "Amazon SDE: Two Sum Variation",
    prompt: "Amazon Online Assessment: Given an array of integers and a target sum, return indices of two numbers that add up to target. What is the optimal time and space complexity?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Amazon Pattern",
    difficulty: "EASY",
    options: ["Time O(N), Space O(N) using a Hash Map", "Time O(N^2), Space O(1)", "Time O(N log N), Space O(N^2)", "Time O(1), Space O(N)"],
    correctOpt: 0,
    explanation: "Store each value and its index in a hash map as you iterate. Checking if `target - num` exists takes O(1) average lookup, completing in O(N) single pass.",
    companyTags: ["Amazon"]
  },
  {
    title: "Amazon SDE: Least Recently Used (LRU) Cache",
    prompt: "Amazon Technical Interview: Which combination of data structures achieves both `get(key)` and `put(key, value)` operations in strictly O(1) time complexity?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Amazon Pattern",
    difficulty: "MEDIUM",
    options: [
      "Hash Map + Doubly Linked List",
      "Binary Search Tree + Array",
      "Single Linked List + Stack",
      "Max-Heap + Hash Set"
    ],
    correctOpt: 0,
    explanation: "The Hash Map maps keys to nodes in O(1). The Doubly Linked List enables removing and inserting nodes at head/tail in O(1) without shifting elements.",
    companyTags: ["Amazon"]
  },
  {
    title: "Microsoft Software Engineer: Reverse Linked List",
    prompt: "Microsoft Technical Interview: What is the optimal iterative space complexity to reverse a singly linked list in-place?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Microsoft Pattern",
    difficulty: "EASY",
    options: ["O(1) auxiliary space using 3 pointers (prev, curr, next)", "O(N) space using stack recursion", "O(N) space using auxiliary array", "O(log N) space"],
    correctOpt: 0,
    explanation: "Iterating with three pointers (`prev = NULL`, `curr = head`, `next = NULL`) reverses pointer directions in-place in O(N) time with O(1) extra space.",
    companyTags: ["Microsoft"]
  },
  {
    title: "Microsoft Technical: Invert Binary Tree",
    prompt: "Microsoft Interview: What tree traversal can be utilized to invert/mirror a binary tree recursively?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Microsoft Pattern",
    difficulty: "EASY",
    options: [
      "Post-order or pre-order traversal swapping left and right child pointers at each node",
      "In-order traversal without temporary variables",
      "Level order without queue",
      "Only possible iteratively"
    ],
    correctOpt: 0,
    explanation: "Swap the left and right child of the current node, then recursively invert the left and right subtrees (pre-order or post-order traversal).",
    companyTags: ["Microsoft"]
  },
  {
    title: "Zoho Advanced Programming: Matrix Spiral Traversal",
    prompt: "Zoho Round 2 (Advanced Programming): What is the time complexity to print an M x N matrix in clockwise spiral order?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Zoho Pattern",
    difficulty: "EASY",
    options: ["O(M * N)", "O(M + N)", "O((M * N) log(M * N))", "O(M^2)"],
    correctOpt: 0,
    explanation: "Every cell in the matrix is visited exactly once by adjusting top, bottom, left, and right boundary boundaries, resulting in linear O(M * N) time.",
    companyTags: ["Zoho"]
  },
  {
    title: "Zoho Technical: Custom Memory String Tokenizer",
    prompt: "Zoho C Programming: How does the standard C `strtok()` function maintain its parsing state between successive calls?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Zoho Pattern",
    difficulty: "MEDIUM",
    options: [
      "Using an internal `static` pointer to remember the position in the original string",
      "Allocating dynamic memory on the heap every call",
      "Storing state in environment variables",
      "Passing state via global socket"
    ],
    correctOpt: 0,
    explanation: "`strtok` uses an internal static variable to preserve the pointer position across invocations, which also makes it non-thread-safe (unlike `strtok_r`).",
    companyTags: ["Zoho"]
  },
  {
    title: "Freshworks Full Stack: React Reconciliation Key Prop",
    prompt: "Freshworks Frontend Assessment: Why must list items in React have a stable and unique `key` prop?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Freshworks Pattern",
    difficulty: "EASY",
    options: [
      "To enable React's Virtual DOM reconciliation diffing algorithm to identify which items have changed, been added, or removed without re-rendering the entire list",
      "To automatically apply CSS styles",
      "To bind click event listeners",
      "To communicate with backend REST endpoints"
    ],
    correctOpt: 0,
    explanation: "React relies on the `key` to match children in the original tree with children in the subsequent tree, avoiding costly DOM teardowns.",
    companyTags: ["Freshworks"]
  },
  {
    title: "Freshworks Backend: Redis Use Cases",
    prompt: "Freshworks Architecture: What makes Redis an optimal choice for session storage and rate limiting?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Freshworks Pattern",
    difficulty: "EASY",
    options: [
      "In-memory key-value data structures with sub-millisecond latencies, atomic operations, and native key expiration (TTL)",
      "Relational SQL join capabilities",
      "Unlimited free cloud storage",
      "Automatic code transpilation"
    ],
    correctOpt: 0,
    explanation: "Redis stores datasets in RAM, provides atomic commands (e.g. `INCR`, `EXPIRE`), and automatically clears keys when their TTL elapses.",
    companyTags: ["Freshworks"]
  },
  {
    title: "Deloitte Risk & Advisory: Cyber Threat Modeling",
    prompt: "Deloitte Advisory: What does the STRIDE threat modeling framework categorize?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Deloitte Pattern",
    difficulty: "MEDIUM",
    options: [
      "Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege",
      "Security, Technology, Reliability, Integration, Database, Encryption",
      "Speed, Testing, Robustness, Input validation, Debugging, Execution",
      "Software, Telemetry, Risk, Incident, Deployment, Evaluation"
    ],
    correctOpt: 0,
    explanation: "STRIDE is a security threat classification model developed by Microsoft and adopted by enterprise consultancies for software security auditing.",
    companyTags: ["Deloitte"]
  },
  {
    title: "Deloitte Analytics: SQL Window Functions",
    prompt: "Deloitte Technology: Which SQL window function assigns sequential integers starting from 1 to each row within a partition, without skipping numbers for ties?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Deloitte Pattern",
    difficulty: "EASY",
    options: ["`ROW_NUMBER()`", "`RANK()`", "`DENSE_RANK()`", "`NTILE()`"],
    correctOpt: 0,
    explanation: "`ROW_NUMBER()` strictly numbers each row monotonically (1, 2, 3...). `RANK()` skips ranks on ties (1, 2, 2, 4), and `DENSE_RANK()` ties without skipping (1, 2, 2, 3).",
    companyTags: ["Deloitte"]
  },
  {
    title: "TCS Ninja / Digital: Quantitative Speed Metric",
    prompt: "TCS Question: A person travels from town A to B at 40 km/h and returns from B to A at 60 km/h. What is the average speed for the entire round trip?",
    category: "COMPANY_SPECIFIC",
    subCategory: "TCS Pattern",
    difficulty: "EASY",
    options: ["48 km/h", "50 km/h", "52 km/h", "54 km/h"],
    correctOpt: 0,
    explanation: "Harmonic mean when distances are equal: Average speed = (2 * x * y) / (x + y) = (2 * 40 * 60) / (40 + 60) = 4800 / 100 = 48 km/h.",
    companyTags: ["TCS"]
  },
  {
    title: "Infosys Reasoning: Syllogism Disjunction",
    prompt: "Infosys Reasoning: Statements: All laptops are devices. No device is obsolete.\nConclusions:\nI. No laptop is obsolete.\nII. Some devices are laptops.",
    category: "COMPANY_SPECIFIC",
    subCategory: "Infosys Pattern",
    difficulty: "EASY",
    options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
    correctOpt: 2,
    explanation: "Since all laptops are inside devices, and the entire set of devices has zero intersection with obsolete, no laptop can be obsolete (I). Also, some devices are laptops (II). Both follow.",
    companyTags: ["Infosys"]
  },
  {
    title: "Amazon OA: Minimum Spanning Tree Cost",
    prompt: "Amazon OA: Connecting data centers with fiber optic cables at minimum cost without cycles is an instance of which classic algorithmic problem?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Amazon Pattern",
    difficulty: "EASY",
    options: ["Minimum Spanning Tree (Prim's or Kruskal's Algorithm)", "Traveling Salesperson Problem", "Maximum Bipartite Matching", "Bellman-Ford Algorithm"],
    correctOpt: 0,
    explanation: "Connecting all vertices in a weighted undirected graph with minimal total edge weight and no cycles is the definition of a Minimum Spanning Tree.",
    companyTags: ["Amazon"]
  },
  {
    title: "Zoho Round 1: C Recursion Output",
    prompt: "Zoho C Test:\n```c\nint fun(int n) {\n    if (n <= 1) return 1;\n    return n * fun(n - 2);\n}\n// fun(5)\n```\nWhat is the return value of `fun(5)`?",
    category: "COMPANY_SPECIFIC",
    subCategory: "Zoho Pattern",
    difficulty: "EASY",
    options: ["15", "120", "24", "12"],
    correctOpt: 0,
    explanation: "fun(5) = 5 * fun(3) = 5 * (3 * fun(1)) = 5 * 3 * 1 = 15.",
    companyTags: ["Zoho"]
  },
  {
    title: "Accenture Verbal: Active to Passive Transformation",
    prompt: "Accenture Verbal: Transform: 'The committee will announce the placement results tomorrow.'",
    category: "COMPANY_SPECIFIC",
    subCategory: "Accenture Pattern",
    difficulty: "EASY",
    options: [
      "The placement results will be announced by the committee tomorrow.",
      "The placement results would be announced by the committee tomorrow.",
      "The placement results will have been announced by the committee tomorrow.",
      "Tomorrow the placement results is announced by committee."
    ],
    correctOpt: 0,
    explanation: "'Will announce' in simple future active voice converts to 'will be announced' in passive voice.",
    companyTags: ["Accenture"]
  }
];
