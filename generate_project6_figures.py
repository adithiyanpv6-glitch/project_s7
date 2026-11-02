import matplotlib.pyplot as plt
import matplotlib.patches as patches

def save_code_card(filename, title, code_lines, width=11, height=6.2, dpi=250):
    fig, ax = plt.subplots(figsize=(width, height), dpi=dpi)
    fig.patch.set_facecolor('#0f172a') # Dark Navy background
    ax.set_facecolor('#0f172a')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Window title bar
    bar = patches.FancyBboxPatch((0, 91), 100, 9, boxstyle="round,pad=0.2,rounding_size=1.5",
                                 facecolor='#1e293b', edgecolor='#334155', linewidth=1)
    ax.add_patch(bar)

    # Mac-style dots
    circle_colors = ['#ef4444', '#f59e0b', '#10b981']
    for idx, c in enumerate(circle_colors):
        circ = plt.Circle((2.5 + idx * 2.2, 95.5), 1.0, color=c)
        ax.add_patch(circ)

    # Title
    ax.text(50, 95.5, title, ha='center', va='center', color='#94a3b8',
            fontsize=10.5, fontfamily='monospace', fontweight='bold')

    # Line numbers and Code
    y_pos = 85
    y_step = 76 / max(len(code_lines), 1)
    
    for i, line in enumerate(code_lines):
        line_num = f"{i+1:2d}"
        ax.text(3, y_pos, line_num, ha='left', va='center', color='#475569',
                fontsize=8.8, fontfamily='monospace')
        
        # Color coding simple syntax
        text_color = '#e2e8f0'
        if line.strip().startswith('//') or line.strip().startswith('#'):
            text_color = '#64748b'
        elif any(k in line for k in ['export ', 'async ', 'function ', 'const ', 'let ', 'return ', 'await ', 'if ', 'else ', 'interface ']):
            text_color = '#38bdf8'
        elif any(f in line for f in ['prisma', 'recalculateStudentReadiness', 'generatePersonalizedRoadmap', 'executeCode', 'analyzeResumeText']):
            text_color = '#2dd4bf'
        elif any(s in line for s in ['"', "'", '`']):
            text_color = '#fde047'

        ax.text(8, y_pos, line, ha='left', va='center', color=text_color,
                fontsize=8.8, fontfamily='monospace')
        y_pos -= y_step

    plt.tight_layout()
    plt.savefig(filename, dpi=dpi, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()
    print(f"Generated {filename}")


# 1. System Architecture Diagram
def generate_architecture_diagram():
    fig, ax = plt.subplots(figsize=(12, 6.8), dpi=250)
    fig.patch.set_facecolor('#0b0f19')
    ax.set_facecolor('#0b0f19')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Title Banner
    ax.text(50, 95.5, "PlacementPrep: Institutional Placement Readiness Platform Architecture",
            ha='center', va='center', color='#f8fafc', fontsize=12.5, fontweight='bold')
    ax.text(50, 91.5, "Four-Tier System: React 19 SPA, Express REST API, Multi-Factor AI Engines, & Prisma ORM",
            ha='center', va='center', color='#94a3b8', fontsize=9.2)

    def draw_box(x, y, w, h, title, subtitle, fill_c, edge_c, text_c='#ffffff'):
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.5,rounding_size=1.5",
                                     facecolor=fill_c, edgecolor=edge_c, linewidth=1.5)
        ax.add_patch(box)
        ax.text(x + w/2, y + h*0.65, title, ha='center', va='center',
                color=text_c, fontsize=9.2, fontweight='bold')
        ax.text(x + w/2, y + h*0.3, subtitle, ha='center', va='center',
                color='#cbd5e1', fontsize=7.8)

    # Tier 1: Client
    draw_box(4, 68, 28, 18, "Tier 1: Client Presentation", "React 19, Vite, Tailwind, Recharts", "#1e293b", "#3b82f6")
    # Tier 2: API Gateway
    draw_box(36, 68, 28, 18, "Tier 2: API Gateway & Security", "Express.js, TypeScript, JWT, RBAC", "#1e293b", "#06b6d4")
    # Tier 4: Persistence
    draw_box(68, 68, 28, 18, "Tier 4: Relational Persistence", "Prisma ORM v6, SQLite/PostgreSQL", "#1e293b", "#8b5cf6")

    # Connectors Top
    ax.annotate("", xy=(36, 77), xytext=(32, 77),
                arrowprops=dict(arrowstyle="<->", color="#38bdf8", lw=1.8))
    ax.annotate("", xy=(68, 77), xytext=(64, 77),
                arrowprops=dict(arrowstyle="<->", color="#38bdf8", lw=1.8))

    # Downward connector to Intelligence Engines
    ax.annotate("", xy=(50, 52), xytext=(50, 68),
                arrowprops=dict(arrowstyle="->", color="#ec4899", lw=1.8))

    # Tier 3: Core Computational & AI Engines (Bottom 4 cards)
    draw_box(4, 28, 21, 20, "PRS Scoring Engine", "7-Factor Weighted Dynamic Formula", "#0f172a", "#ec4899")
    draw_box(28, 28, 21, 20, "Adaptive Roadmap", "30/60/90-Day Task Generator", "#0f172a", "#f59e0b")
    draw_box(52, 28, 21, 20, "Sandboxed DSA Runner", "Node.js VM Isolation & Test Runner", "#0f172a", "#10b981")
    draw_box(76, 28, 20, 20, "ATS Resume Analyzer", "Keyword Heuristics & Section Scoring", "#0f172a", "#6366f1")

    # Bottom Foundation Info
    box_foot = patches.FancyBboxPatch((4, 7), 92, 14, boxstyle="round,pad=0.3,rounding_size=1.0",
                                      facecolor="#111827", edgecolor="#374151", linewidth=1.0, linestyle=':')
    ax.add_patch(box_foot)
    ax.text(50, 14, "Multi-Tenant Operational Roles: Student Dashboard (PRS Tracking)  |  TPO / Admin Suite  |  Interview Mentor Portal",
            ha='center', va='center', color='#38bdf8', fontsize=8.8, fontweight='bold')

    plt.tight_layout()
    plt.savefig("fig_6_1_placementprep_architecture.png", dpi=250, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()
    print("Generated fig_6_1_placementprep_architecture.png")


# 2. PRS Dynamic Scoring Formula Code
def generate_prs_code():
    code = [
        "export async function recalculateStudentReadiness(studentProfileId: string): Promise<number> {",
        "  const profile = await prisma.studentProfile.findUnique({",
        "    where: { id: studentProfileId },",
        "    include: { diagnosticResult: true, roadmapTasks: true, user: { ... } }",
        "  });",
        "  ",
        "  // Multi-Factor Mathematical Weighting Matrix (Total: 100%):",
        "  // 1. Diagnostic Baseline: 20%  |  2. Roadmap Task Completion: 20%",
        "  // 3. Practice Accuracy: 15%    |  4. Coding Problems Solved: 15%",
        "  // 5. Mock Assessments: 15%     |  6. Resume ATS Quality: 10%",
        "  // 7. Mock Interview Score: 5%",
        "  const readinessScore =",
        "    diagnosticScore * 0.20 +",
        "    roadmapPct * 0.20 +",
        "    practiceScore * 0.15 +",
        "    codingScore * 0.15 +",
        "    mockTestScore * 0.15 +",
        "    resumeScore * 0.10 +",
        "    interviewScore * 0.05;",
        "  ",
        "  await prisma.studentProfile.update({",
        "    where: { id: studentProfileId },",
        "    data: { readinessScore: Math.round(readinessScore * 10) / 10 }",
        "  });",
        "  return readinessScore;",
        "}"
    ]
    save_code_card("fig_6_2_prs_scoring_engine_code.png",
                   "PlacementPrep: Dynamic Placement Readiness Scoring (PRS) Service", code)


# 3. Adaptive Roadmap Engine Code
def generate_roadmap_code():
    code = [
        "export async function generatePersonalizedRoadmap(params: RoadmapGenerationParams) {",
        "  const { profileId, skillLevel, weakAreas, durationDays = 60 } = params;",
        "  ",
        "  // Prune incomplete stale tasks before synthesizing adaptive roadmap",
        "  await prisma.roadmapTask.deleteMany({ where: { profileId, completed: false } });",
        "  ",
        "  const totalDays = Math.min(90, Math.max(30, durationDays));",
        "  const tasksToCreate = [];",
        "  ",
        "  // Curated Multi-Tier Syllabi: Quant, DSA, Core CS, Verbal & STAR Mock",
        "  for (let day = 1; day <= totalDays; day++) {",
        "    const category = resolveCategoryByDay(day, weakAreas);",
        "    const task = resolveCuratedTask(day, category, skillLevel);",
        "    tasksToCreate.push({",
        "      profileId, dayNumber: day, title: task.title,",
        "      category: task.category, estimatedMinutes: 45, completed: false",
        "    });",
        "  }",
        "  ",
        "  await prisma.roadmapTask.createMany({ data: tasksToCreate });",
        "  return { success: true, totalTasks: tasksToCreate.length };",
        "}"
    ]
    save_code_card("fig_6_3_roadmap_generator_code.png",
                   "PlacementPrep: Adaptive 30/60/90-Day Roadmap Generation Service", code)


# 4. Sandboxed Code Runner Code
def generate_coderunner_code():
    code = [
        "export async function executeCode(code: string, language: string, testCases: TestCase[]) {",
        "  const startTime = Date.now();",
        "  const testCaseResults = [];",
        "  let passedCount = 0;",
        "  ",
        "  for (const tc of testCases) {",
        "    // Sandboxed execution using Node.js Virtual Machine (VM) context",
        "    const sandbox = { input: tc.input, result: null, console: { log: () => {} } };",
        "    const context = vm.createContext(sandbox);",
        "    ",
        "    try {",
        "      const script = new vm.Script(wrapCodeWithHarness(code, tc.input));",
        "      script.runInContext(context, { timeout: 2000 }); // 2-second timeout guardrail",
        "      const isPassed = normalize(sandbox.result) === normalize(tc.expectedOutput);",
        "      if (isPassed) passedCount++;",
        "      testCaseResults.push({ input: tc.input, passed: isPassed });",
        "    } catch (err: any) {",
        "      return { status: 'RUNTIME_ERROR', error: err.message, passedCount: 0 };",
        "    }",
        "  }",
        "  return { status: passedCount === testCases.length ? 'ACCEPTED' : 'WRONG_ANSWER',",
        "           passedCount, totalCount: testCases.length, runtimeMs: Date.now() - startTime };",
        "}"
    ]
    save_code_card("fig_6_4_dsa_code_runner_code.png",
                   "PlacementPrep: Sandboxed Multi-Language DSA Execution Engine", code)


# 5. ATS Resume Parser Code
def generate_resumeparser_code():
    code = [
        "export function analyzeResumeText(rawText: string, targetRole: string): ResumeAnalysisResult {",
        "  const lower = (rawText || '').toLowerCase();",
        "  ",
        "  // 1. Mandatory Section Validation (Education, Skills, Projects, Experience)",
        "  const sectionsFound = STANDARD_SECTIONS.filter(s => s.regex.test(lower)).length;",
        "  const sectionsScore = Math.round((sectionsFound / 5) * 100);",
        "  ",
        "  // 2. Technical Keyword Alignment (Languages, Cloud, Databases, Frameworks)",
        "  const matchedKeywords = COMMON_TECH_KEYWORDS.filter(k => lower.includes(k.toLowerCase()));",
        "  const missingKeywords = COMMON_TECH_KEYWORDS.filter(k => !lower.includes(k.toLowerCase()));",
        "  const keywordScore = Math.min(100, Math.round((matchedKeywords.length / 12) * 100));",
        "  ",
        "  // 3. Quantitative Impact & Action Verb Density (XYZ Formula)",
        "  const actionVerbCount = ACTION_VERBS.filter(v => lower.includes(v)).length;",
        "  const impactScore = Math.min(100, actionVerbCount * 12);",
        "  ",
        "  const overallScore = Math.round(sectionsScore*0.25 + keywordScore*0.45 + impactScore*0.30);",
        "  return { overallScore, matchedKeywords, missingKeywords, bulletFeedback: [...] };",
        "}"
    ]
    save_code_card("fig_6_5_ats_resume_parser_code.png",
                   "PlacementPrep: Heuristic Natural Language ATS Resume Analyzer", code)

if __name__ == "__main__":
    generate_architecture_diagram()
    generate_prs_code()
    generate_roadmap_code()
    generate_coderunner_code()
    generate_resumeparser_code()
