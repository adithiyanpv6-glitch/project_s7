import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, ArrowStyle

def create_architecture_diagram():
    fig, ax = plt.subplots(figsize=(19.2, 10.8), dpi=300)
    fig.patch.set_facecolor('#F8FAFC')
    ax.set_facecolor('#F8FAFC')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Color Palette
    NAVY_DARK = '#0F172A'
    NAVY_MED = '#1E293B'
    TEAL_MAIN = '#0D9488'
    TEAL_LIGHT = '#CCFBF1'
    TEAL_BORDER = '#14B8A6'
    SLATE_LIGHT = '#F1F5F9'
    SLATE_BORDER = '#CBD5E1'
    SLATE_TEXT = '#475569'
    WHITE = '#FFFFFF'
    AMBER_BG = '#FEF3C7'
    AMBER_BORDER = '#D97706'
    BLUE_BG = '#EFF6FF'
    BLUE_BORDER = '#3B82F6'

    # Title Banner
    ax.text(50, 96.5, "PlacementPrep — Intelligent Placement Preparation Platform", 
            ha='center', va='center', fontsize=20, fontweight='bold', color=NAVY_DARK, fontfamily='sans-serif')
    ax.text(50, 93.8, "System Architecture & End-to-End Data Flow Pipeline", 
            ha='center', va='center', fontsize=12, fontweight='medium', color=TEAL_MAIN, fontfamily='sans-serif')

    def draw_card(x, y, w, h, bg, border, title, items, badge="", title_color=NAVY_DARK):
        box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.6,rounding_size=1.2",
                             facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(box)
        
        # Badge if present
        if badge:
            badge_box = FancyBboxPatch((x + 1.5, y + h - 2.8), len(badge)*0.95 + 1.2, 2.0,
                                       boxstyle="round,pad=0.3,rounding_size=0.6",
                                       facecolor=TEAL_MAIN, edgecolor=TEAL_MAIN, zorder=3)
            ax.add_patch(badge_box)
            ax.text(x + 1.5 + (len(badge)*0.95 + 1.2)/2, y + h - 1.8, badge,
                    ha='center', va='center', fontsize=7.5, fontweight='bold', color=WHITE)
            title_y = y + h - 5.0
        else:
            title_y = y + h - 2.8

        ax.text(x + w/2, title_y, title, ha='center', va='center', 
                fontsize=10.5, fontweight='bold', color=title_color, zorder=3)
        
        line_y = title_y - 2.8
        for itm in items:
            ax.text(x + 1.8, line_y, f"• {itm}", ha='left', va='center', 
                    fontsize=8.2, color=SLATE_TEXT, zorder=3)
            line_y -= 2.2

    # ==================== TIER 1: CLIENT LAYER ====================
    # Tier 1 Container
    t1_box = FancyBboxPatch((3, 71), 94, 20, boxstyle="round,pad=0.8,rounding_size=1.5",
                            facecolor=WHITE, edgecolor=SLATE_BORDER, linewidth=1.2, linestyle='--', zorder=1)
    ax.add_patch(t1_box)
    ax.text(5.5, 89.2, "1. PRESENTATION LAYER (React 19 + TypeScript + Tailwind CSS | Vite Port 5173)", 
            ha='left', va='center', fontsize=9.5, fontweight='bold', color=NAVY_DARK, zorder=3)

    # 3 Client Cards
    draw_card(5, 73, 28, 14, SLATE_LIGHT, TEAL_BORDER, "Student Preparation Portal",
              ["Diagnostic & Placement Readiness (0-100)", "Adaptive 30/60/90-Day Roadmap", "Sandboxed DSA Code Editor & Runner", "Full Mock Tests & Heuristic ATS Resume"],
              badge="PORTAL 1")

    draw_card(36, 73, 28, 14, SLATE_LIGHT, BLUE_BORDER, "Placement Officer (TPO) Suite",
              ["Real-Time Cohort Readiness Distribution", "Student Directory & At-Risk Intervention", "Question Bank Management System", "NAAC / NBA Accreditation Export (CSV/JSON)"],
              badge="PORTAL 2")

    draw_card(67, 73, 28, 14, SLATE_LIGHT, AMBER_BORDER, "Interviewer / Mentor Portal",
              ["Assigned Candidate Interview Roster", "Google Meet / Video Room Scheduling", "4-Metric Rubric Grading (Tech/Comm/STAR)", "Comprehensive Student Feedback Reports"],
              badge="PORTAL 3")

    # Flow Arrow 1 -> 2
    ax.annotate("", xy=(50, 64.5), xytext=(50, 70.8),
                arrowprops=dict(arrowstyle="-|>", color=TEAL_MAIN, lw=2.5, mutation_scale=15), zorder=5)
    ax.text(50, 67.8, "HTTPS / RESTful APIs / JWT Bearer Tokens", ha='center', va='center',
            fontsize=8, fontweight='bold', color=NAVY_MED, bbox=dict(boxstyle="round,pad=0.3", fc=TEAL_LIGHT, ec=TEAL_MAIN, lw=1))

    # ==================== TIER 2: API GATEWAY ====================
    t2_box = FancyBboxPatch((15, 57.5), 70, 7, boxstyle="round,pad=0.8,rounding_size=1.2",
                            facecolor=NAVY_DARK, edgecolor=NAVY_DARK, linewidth=1, zorder=2)
    ax.add_patch(t2_box)
    ax.text(50, 62.3, "2. API GATEWAY & SECURITY MIDDLEWARE (Node.js + Express.js REST API | Port 5000)", 
            ha='center', va='center', fontsize=10, fontweight='bold', color=WHITE, zorder=3)
    ax.text(50, 59.5, "JWT Authentication  •  Role-Based Access Control (RBAC)  •  CORS Headers  •  Error Handling & Logging", 
            ha='center', va='center', fontsize=8.5, color=TEAL_LIGHT, zorder=3)

    # Flow Arrow 2 -> 3
    ax.annotate("", xy=(50, 50.8), xytext=(50, 57.2),
                arrowprops=dict(arrowstyle="-|>", color=TEAL_MAIN, lw=2.5, mutation_scale=15), zorder=5)
    ax.text(50, 54, "Internal Service Dispatch & Controller Routing", ha='center', va='center',
            fontsize=8, fontweight='bold', color=NAVY_MED, bbox=dict(boxstyle="round,pad=0.3", fc=WHITE, ec=SLATE_BORDER, lw=1))

    # ==================== TIER 3: INTELLIGENCE ENGINES ====================
    t3_box = FancyBboxPatch((3, 27.5), 94, 23, boxstyle="round,pad=0.8,rounding_size=1.5",
                            facecolor=WHITE, edgecolor=SLATE_BORDER, linewidth=1.2, linestyle='--', zorder=1)
    ax.add_patch(t3_box)
    ax.text(5.5, 48.5, "3. CORE INTELLIGENCE & EVALUATION ENGINES (Backend Services)", 
            ha='left', va='center', fontsize=9.5, fontweight='bold', color=NAVY_DARK, zorder=3)

    # 5 Engine Cards
    engines = [
        ("Readiness Scoring Engine", "readiness.service.ts", ["Dynamic 0-100 formula", "Weighted score model", "Diagnostic baseline sync", "Continuous streak bonus"], 4.8),
        ("Adaptive Roadmap Engine", "roadmap.service.ts", ["30/60/90 day generation", "Category task breakdown", "Weak-area remediation", "Interactive checklist state"], 23.2),
        ("Sandboxed Code Runner", "codeRunner.service.ts", ["Multi-language execution", "JS / Python / C++ / Java", "Time & memory benchmarks", "Hidden test case judge"], 41.6),
        ("STAR Interview Evaluator", "interview.service.ts", ["Situation/Task/Action/Result", "Technical depth & clarity", "4-dimension rubric scoring", "Strengths & gaps report"], 60.0),
        ("Heuristic ATS Resume Parser", "resumeParser.service.ts", ["Action verb density check", "Quantified metric auditor", "Target role keyword match", "Section-by-section advice"], 78.4),
    ]

    for title, subtitle, items, ex in engines:
        ebox = FancyBboxPatch((ex, 29.5), 16.8, 17, boxstyle="round,pad=0.5,rounding_size=1.0",
                              facecolor=SLATE_LIGHT, edgecolor=TEAL_BORDER, linewidth=1.3, zorder=2)
        ax.add_patch(ebox)
        ax.text(ex + 8.4, 44.5, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color=NAVY_DARK, zorder=3)
        ax.text(ex + 8.4, 42.6, subtitle, ha='center', va='center', fontsize=7.2, fontweight='medium', color=TEAL_MAIN, fontfamily='monospace', zorder=3)
        
        ey = 39.8
        for itm in items:
            ax.text(ex + 1.2, ey, f"• {itm}", ha='left', va='center', fontsize=7.2, color=SLATE_TEXT, zorder=3)
            ey -= 2.2

    # Flow Arrow 3 -> 4
    ax.annotate("", xy=(50, 20.8), xytext=(50, 27.2),
                arrowprops=dict(arrowstyle="<|-|>", color=TEAL_MAIN, lw=2.5, mutation_scale=15), zorder=5)
    ax.text(50, 24, "Prisma ORM Client v6  (Type-Safe Relational Queries)", ha='center', va='center',
            fontsize=8, fontweight='bold', color=NAVY_MED, bbox=dict(boxstyle="round,pad=0.3", fc=TEAL_LIGHT, ec=TEAL_MAIN, lw=1))

    # ==================== TIER 4: DATA PERSISTENCE LAYER ====================
    t4_box = FancyBboxPatch((10, 4.5), 80, 16, boxstyle="round,pad=0.8,rounding_size=1.5",
                            facecolor=NAVY_DARK, edgecolor=NAVY_DARK, linewidth=1, zorder=2)
    ax.add_patch(t4_box)
    ax.text(50, 18.2, "4. DATA PERSISTENCE LAYER (Relational Database: SQLite / PostgreSQL)", 
            ha='center', va='center', fontsize=10.5, fontweight='bold', color=WHITE, zorder=3)

    # 16 Database Models Grid inside Persistence
    models = [
        "User (Auth & RBAC)", "StudentProfile", "DiagnosticResult", "RoadmapTask",
        "Question (184+ Bank)", "PracticeLog", "Bookmark", "CodingProblem (15 DSA)",
        "CodingSubmission", "MockTest (5 Preloaded)", "TestQuestion", "TestAttempt",
        "MockInterview", "ResumeAnalysis", "CompanyProfile (10 Blueprints)", "Notification"
    ]

    col_w = 19
    start_x = 13.5
    start_y = 14.5
    for i, m in enumerate(models):
        c = i % 4
        r = i // 4
        mx = start_x + c * col_w
        my = start_y - r * 3.2
        mbox = FancyBboxPatch((mx, my - 1.2), 17.5, 2.4, boxstyle="round,pad=0.2,rounding_size=0.5",
                              facecolor=NAVY_MED, edgecolor=TEAL_BORDER, linewidth=0.8, zorder=3)
        ax.add_patch(mbox)
        ax.text(mx + 8.75, my, m, ha='center', va='center', fontsize=7.2, color=WHITE, fontfamily='sans-serif', zorder=4)

    plt.tight_layout()
    plt.savefig('architecture_diagram.png', dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    print("✓ Successfully generated architecture_diagram.png (High Resolution 300 DPI)!")

if __name__ == '__main__':
    create_architecture_diagram()
