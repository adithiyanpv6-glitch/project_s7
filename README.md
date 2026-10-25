# PlacementPrep — Intelligent Student Placement Preparation Platform

> A production-ready, full-stack campus placement preparation web application built for college students, placement cell officers (TPO), and technical interviewers.

---

## 🌟 Executive Summary

**PlacementPrep** delivers systematic campus placement readiness for engineering and computer science students. Rather than generic flashcards, the platform unifies dynamic placement readiness diagnostics, personalized 30/60/90-day adaptive roadmaps, topic-wise practice with instant feedback, a sandboxed multi-language DSA coding workspace, full-length company-specific mock tests with sectional cutoffs, STAR-method AI mock interviews, mentor scheduling, an ATS resume analyzer, and institutional cohort administration.

---

## 🔑 Quick Demo Credentials & Role Switcher

The application features a 1-click **Role Switcher** in the top navigation bar. You can also sign in with any of the following pre-seeded credentials:

| Role | Email | Password | Primary Capabilities |
| :--- | :--- | :--- | :--- |
| **Student** | `student@placementprep.com` | `Student@123` | Diagnostic assessment, 30/60/90 roadmap, practice engine, coding workspace, mock tests, AI interview, resume analyzer, company prep |
| **Placement Officer / Admin** | `admin@placementprep.com` | `Admin@123` | Institutional readiness analytics, student roster, question bank CRUD, test publishing, accreditation CSV/JSON export |
| **Interviewer / Mentor** | `mentor@placementprep.com` | `Mentor@123` | Assigned candidate interviews, structured 4-metric rubric scoring (Communication, Tech Depth, Structure, Confidence) |

---

## 🏗️ Architecture & Technology Stack

```
                          ┌─────────────────────────────────────┐
                          │   PlacementPrep Frontend (Vite)     │
                          │   React 19, TypeScript, TailwindCSS │
                          │   Port 5173                         │
                          └──────────────────┬──────────────────┘
                                             │ HTTP / REST / JWT
                                             ▼
                          ┌─────────────────────────────────────┐
                          │   PlacementPrep Backend (Express)   │
                          │   Node.js, TypeScript               │
                          │   Port 5000                         │
                          └──────────────────┬──────────────────┘
                                             │ Prisma ORM
                                             ▼
                          ┌─────────────────────────────────────┐
                          │   SQLite Database (Prisma Client)   │
                          │   dev.db                            │
                          └─────────────────────────────────────┘
```

### Frontend
- **Framework:** React 19 + TypeScript (Vite bundler)
- **Styling:** Tailwind CSS with custom design system (Deep Navy `#0F172A`, Emerald/Teal `#0D9488`, slate neutrals, dark mode)
- **Icons:** `lucide-react`
- **Charts:** Interactive SVG Radar & Velocity Visualizations
- **Routing:** `react-router-dom` v7 with RBAC protected route wrappers

### Backend
- **Framework:** Express + TypeScript
- **Database ORM:** Prisma Client v6.19 with SQLite (`server/prisma/schema.prisma`)
- **Authentication:** JWT (JSON Web Tokens) + `bcryptjs` password hashing
- **Code Execution:** Sandboxed JavaScript / simulated Python / C++ / Java runner with memory and execution time tracking
- **Resume Intelligence:** NLP heuristic parser checking action verbs, quantifiable metrics, section layouts, and target role keywords

---

## 🚀 Core Product Capabilities

### 1. Multi-Step Onboarding & Diagnostics
- Multi-step profile setup: graduation year, target roles, preferred companies, self-assessed skill level, daily study commitment.
- 12-question initial diagnostic assessing Quantitative, Logical, Verbal, DSA, OS/DBMS, and HR readiness.
- Dynamic Placement Readiness Score (0–100%) calculated from weighted diagnostic scores, practice consistency, solved coding problems, test performance, and interview ratings.

### 2. Personalized 30/60/90-Day Adaptive Roadmap
- Generates categorized daily tasks (DSA, Aptitude, CS Fundamentals, Mock Test, Resume Polish, Interview Prep).
- Interactive checkboxes with instant completion recalculations and streak updates.

### 3. Practice Engine (184+ Seed Questions)
- Filter by Category: Quantitative, Logical Reasoning, Verbal Ability, Technical/CS Core, Data Structures, HR/Behavioral.
- Difficulty levels: Easy, Medium, Hard.
- Bookmark questions for later revision, filter by incorrect answers, and view in-depth explanations with key takeaways.

### 4. Sandboxed DSA Coding Workspace (15+ LeetCode-style Problems)
- Problem statements with examples, constraints, hints, and expected complexity.
- In-browser code editor with syntax highlighting and multi-language support (JavaScript, Python, C++, Java).
- "Run Code" against visible sample test cases and "Submit Code" against hidden test suites with execution time and memory benchmarks.

### 5. Mock Assessments (5 Full-Length Preloaded Tests)
- Timed assessments matching real recruitment patterns (TCS NQT, Infosys DSE, Cognizant GenC, Amazon OA, Full-Length Aptitude).
- Question palette with status tracking: Attempted, Marked for Review, Unvisited.
- Comprehensive scorecard comparing student percentage against target recruiter cutoffs.

### 6. Mock Interviews (AI-Assisted & Mentor-Led)
- **System Simulation:** Structured 5-question interview flow evaluated across Communication, Technical Depth, STAR Structure, and Confidence.
- **Mentor Portal:** Scheduled mentor interviews with Google Meet/Zoom link integration and rubric feedback submission.

### 7. Resume Intelligence & ATS Scoring
- Upload or paste plain-text resumes.
- Analyzes quantifiable impact (`%`, `$`, scale numbers), action verbs (`Spearheaded`, `Architected`, `Engineered`), core tech keywords, and structure.
- Line-by-line bullet rewrite recommendations and missing keyword alerts.

### 8. Company Preparation Blueprints (10 Tier-1 Tech Giants)
- Dedicated prep blueprints for TCS, Infosys, Wipro, Accenture, Cognizant, Amazon, Microsoft, Zoho, Freshworks, and Deloitte.
- Hiring rounds breakdown, syllabus patterns, salary packages, and personal student note-taking.

### 9. Institutional Placement Officer (TPO) Suite
- Cohort readiness distribution across cutoffs (Elite >80%, Standard 65–80%, Needs Support <65%).
- Departmental participation analytics.
- Question bank manager with question creation and filtering.
- One-click NAAC/NBA accreditation export in CSV and JSON formats.

---

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js:** v18.0.0 or later (v20+ / v24 recommended)
- **npm:** v9.0.0 or later

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/placement-prep.git
cd placement-prep

# Install Backend Dependencies
cd server
npm install

# Install Frontend Dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

**Backend (`server/.env`):**
```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="placement_prep_jwt_super_secret_production_key_2026"
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
```

**Frontend (`client/.env`):**
```env
VITE_API_URL="http://localhost:5000/api"
```

### 3. Initialize & Seed the Database

```bash
cd server
npx prisma db push
npx tsx prisma/seed.ts
```

This seeds:
- 3 User Roles (Student, Admin, Mentor)
- 184 Placement Questions across 6 categories
- 15 DSA Coding Problems with automated test cases
- 10 Company Blueprints with recruitment patterns
- 5 Full-Length Mock Assessments

### 4. Start the Application

**Run Backend (Terminal 1):**
```bash
cd server
npm run dev
# Server listening on http://localhost:5000
```

**Run Frontend (Terminal 2):**
```bash
cd client
npm run dev
# Vite dev server running at http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

## 🧪 Testing & Verification

A dedicated end-to-end verification script is included to test all API services:

```bash
node test_e2e.js
```

### Verification Checklist:
- [x] JWT Authentication & Role-Based Access Control
- [x] Placement Readiness Score calculation engine
- [x] Practice engine question querying & bookmarks
- [x] Sandboxed DSA code evaluation & test case runner
- [x] Mock assessment lifecycle & cutoff comparisons
- [x] AI Mock interview STAR rubric evaluation
- [x] Resume ATS parser & bullet improvement engine
- [x] Company preparation hub & note persistence
- [x] Admin cohort analytics & CSV/JSON export
- [x] Mentor candidate evaluation portal

---

## 📁 Repository Structure

```
├── client/                     # Frontend Vite + React + TypeScript
│   ├── src/
│   │   ├── api/client.ts       # Centralized Fetch client with JWT interceptor
│   │   ├── components/         # Reusable UI components (Card, Button, Modal, etc.)
│   │   ├── context/            # AuthContext & NotificationContext
│   │   ├── pages/              # 18 Application pages (Student, Admin, Mentor, Landing)
│   │   ├── types/index.ts      # TypeScript definitions
│   │   ├── App.tsx             # Route definitions & layout wrappers
│   │   └── main.tsx            # Application entrypoint
│   └── package.json
│
├── server/                     # Backend Node.js + Express + TypeScript
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema (16 models)
│   │   └── seed.ts             # 184-question master seed script
│   ├── src/
│   │   ├── routes/             # Express REST controllers
│   │   ├── services/           # Readiness, Roadmap, CodeRunner, Resume services
│   │   ├── middleware/         # Auth & RBAC middlewares
│   │   └── index.ts            # Express server entry point
│   └── package.json
│
├── test_e2e.js                 # Automated API test suite
└── README.md                   # System documentation
```

---

## 🔒 Security & Best Practices

- **Password Hashing:** Standard `bcryptjs` salt rounds for all user accounts.
- **Protected Endpoints:** Strict JWT middleware on all student, mentor, and admin routes.
- **Role Verification:** Placement Officer routes strictly guard against privilege escalation.
- **Input Sanitization:** Safe SQL generation via Prisma query engine with zero raw SQL injection vectors.
- **Code Execution:** Sandboxed script evaluation with timeouts to prevent resource starvation.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
