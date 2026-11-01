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
        if line.strip().startswith('#'):
            text_color = '#64748b'
        elif any(k in line for k in ['def ', 'class ', 'return ', 'import ', 'from ', 'for ', 'if ', 'elif ', 'else:', 'in ', 'raise ']):
            text_color = '#38bdf8'
        elif any(f in line for f in ['run_screening_agent', 'prepare_interview', 'evaluate_interview_answer', 'finalize_interview', 'record_human_decision', 'one(', 'all_rows(', 'secure_filename']):
            text_color = '#2dd4bf'
        elif any(s in line for s in ['"', "'"]):
            text_color = '#fde047'

        ax.text(8, y_pos, line, ha='left', va='center', color=text_color,
                fontsize=8.8, fontfamily='monospace')
        y_pos -= y_step

    plt.tight_layout()
    plt.savefig(filename, dpi=dpi, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()
    print(f"Generated {filename}")


# 1. Architecture Diagram
def generate_architecture_diagram():
    fig, ax = plt.subplots(figsize=(12, 6.8), dpi=250)
    fig.patch.set_facecolor('#0b0f19')
    ax.set_facecolor('#0b0f19')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Title
    ax.text(50, 95, "AI Recruitment Assistant (Agentic Interview System) Architecture",
            ha='center', va='center', color='#f8fafc', fontsize=13, fontweight='bold')
    ax.text(50, 91, "Multi-Step Goal-Oriented Recruitment Pipeline with Human-in-the-Loop Safeguards",
            ha='center', va='center', color='#94a3b8', fontsize=9.5)

    # Box styling helper
    def draw_node(x, y, w, h, title, subtitle, fill_c, edge_c, text_c='#ffffff'):
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.5,rounding_size=1.5",
                                     facecolor=fill_c, edgecolor=edge_c, linewidth=1.5)
        ax.add_patch(box)
        ax.text(x + w/2, y + h*0.65, title, ha='center', va='center',
                color=text_c, fontsize=9.5, fontweight='bold')
        ax.text(x + w/2, y + h*0.3, subtitle, ha='center', va='center',
                color='#cbd5e1', fontsize=7.8)

    # Sequence of boxes
    # Row 1: Candidate -> Resume Ingestion -> Database -> Screening Agent
    draw_node(3, 68, 18, 16, "Candidate Submission", "PDF/DOCX/TXT Ingestion", "#1e293b", "#3b82f6")
    draw_node(27, 68, 20, 16, "Resume Processing", "Extract, Sanitize, Guardrail", "#1e293b", "#06b6d4")
    draw_node(53, 68, 20, 16, "Relational Store", "Candidates, Resumes, Roles", "#1e293b", "#8b5cf6")
    draw_node(79, 68, 18, 16, "Screening Agent", "Skill Match & Suitability", "#1e293b", "#ec4899")

    # Connectors Row 1
    for x_c in [21.5, 47.5, 73.5]:
        ax.annotate("", xy=(x_c + 5, 76), xytext=(x_c, 76),
                    arrowprops=dict(arrowstyle="->", color="#38bdf8", lw=1.8))

    # Connector Row 1 to Row 2
    ax.annotate("", xy=(88, 52), xytext=(88, 68),
                arrowprops=dict(arrowstyle="->", color="#ec4899", lw=1.8))

    # Row 2: Final Human Decision <- Human Reviewer <- Advisory Result <- 5-Question Interview
    draw_node(77, 36, 20, 16, "Interview Agent", "5-Question Rubric Pipeline", "#1e293b", "#f59e0b")
    draw_node(51, 36, 20, 16, "Answer Evaluator", "Score, Evidence, Feedback", "#1e293b", "#10b981")
    draw_node(26, 36, 19, 16, "Advisory Synthesis", "Comprehensive Candidate Rec", "#1e293b", "#6366f1")
    draw_node(3, 36, 18, 16, "Human Review (HITL)", "Final Human Decision Portal", "#450a0a", "#ef4444")

    # Connectors Row 2
    ax.annotate("", xy=(71, 44), xytext=(77, 44),
                arrowprops=dict(arrowstyle="->", color="#10b981", lw=1.8))
    ax.annotate("", xy=(45, 44), xytext=(51, 44),
                arrowprops=dict(arrowstyle="->", color="#6366f1", lw=1.8))
    ax.annotate("", xy=(21, 44), xytext=(26, 44),
                arrowprops=dict(arrowstyle="->", color="#ef4444", lw=1.8))

    # Bottom Foundation: Observability & Memory
    box_obs = patches.FancyBboxPatch((3, 7), 94, 21, boxstyle="round,pad=0.5,rounding_size=1.5",
                                     facecolor="#111827", edgecolor="#374151", linewidth=1.2, linestyle='--')
    ax.add_patch(box_obs)
    ax.text(50, 23, "GOAL-DIRECTED AGENTIC BACKBONE & AUDITABILITY INFRASTRUCTURE",
            ha='center', va='center', color='#38bdf8', fontsize=9.5, fontweight='bold')
    
    # Sub-elements inside backbone
    ax.text(18, 14, "Candidate Memory Layer\n(Context & Prior Interactions)", ha='center', va='center',
            color='#94a3b8', fontsize=8, bbox=dict(boxstyle="round", facecolor="#1f2937", edgecolor="#4b5563"))
    ax.text(50, 14, "RAG Knowledge Base\n(Company, Roles, Skill Criteria)", ha='center', va='center',
            color='#94a3b8', fontsize=8, bbox=dict(boxstyle="round", facecolor="#1f2937", edgecolor="#4b5563"))
    ax.text(82, 14, "Agent Trace & Telemetry\n(Step-by-step Audit Logs & JSON)", ha='center', va='center',
            color='#94a3b8', fontsize=8, bbox=dict(boxstyle="round", facecolor="#1f2937", edgecolor="#4b5563"))

    plt.tight_layout()
    plt.savefig("fig_4_1_recruitment_agent_workflow.png", dpi=250, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()
    print("Generated fig_4_1_recruitment_agent_workflow.png")


# 2. Application Creation & Resume Ingestion Code
def generate_app_creation_code():
    code = [
        "@app.post('/apply')",
        "def apply_candidate():",
        "    file = request.files.get('resume')",
        "    suffix = Path(file.filename).suffix.lower()",
        "    if suffix not in ALLOWED_EXTENSIONS: # .pdf, .docx, .txt",
        "        raise ValueError('Unsupported file format.')",
        "    ",
        "    safe_name = secure_filename(file.filename)",
        "    stored_path = UPLOAD_DIR / f'{uuid.uuid4().hex}_{safe_name}'",
        "    file.save(stored_path)",
        "    ",
        "    # Convert document to raw machine-readable text",
        "    raw_text, file_type = extract_text(stored_path)",
        "    sanitized = sanitize_for_hiring(raw_text) # Strip PII / noise",
        "    ",
        "    # Content guardrail before triggering expensive LLM reasoning",
        "    if len(sanitized.strip()) < 40:",
        "        raise ValueError('Biodata contains insufficient text.')",
        "    ",
        "    app_id = create_application(name, email, role_id, sanitized)",
        "    run_screening_agent(app_id) # Autonomous Next-State Trigger",
        "    return redirect(f'/application/{app_id}')"
    ]
    save_code_card("fig_4_2_application_creation_code.png",
                   "Project 4: Secure Resume Ingestion & Pipeline Orchestration", code)


# 3. Screening & Skill Matching Code
def generate_screening_code():
    code = [
        "def run_screening_agent(application_id: int):",
        "    # Retrieve applicant biodata, role requirements & target skills",
        "    app = one('SELECT * FROM applications WHERE id=?', (application_id,))",
        "    role = one('SELECT * FROM roles WHERE id=?', (app['role_id'],))",
        "    skills = all_rows('SELECT * FROM role_skills WHERE role_id=?', (role['id'],))",
        "    ",
        "    # Construct LLM prompt with structured screening schema",
        "    prompt = build_screening_prompt(app['resume_text'], role, skills)",
        "    response = ollama_client.chat('qwen3:1.7b', prompt)",
        "    parsed = json.loads(response['content'])",
        "    ",
        "    # Persist structured matching metrics into database",
        "    cursor.execute('''INSERT INTO screening_results (application_id,",
        "                      skill_match_score, agent_recommendation)",
        "                      VALUES (?, ?, ?)''',",
        "                   (application_id, parsed['match_score'], parsed['recommendation']))",
        "    ",
        "    # Append to long-term candidate memory for subsequent interview stages",
        "    record_candidate_memory(app['candidate_id'], parsed['screening_summary'])",
        "    conn.commit()"
    ]
    save_code_card("fig_4_3_screening_agent_code.png",
                   "Project 4: Autonomous Screening Agent & Skill Matching Logic", code)


# 4. 5-Question Interview & Multi-Criteria Evaluation Code
def generate_interview_eval_code():
    code = [
        "@app.route('/application/<int:application_id>/interview', methods=['POST'])",
        "def handle_interview_answer(application_id):",
        "    q_id = int(request.form.get('question_id'))",
        "    candidate_answer = request.form.get('answer').strip()",
        "    ",
        "    # Component 4: Multi-Criteria Answer Evaluation Agent",
        "    # Returns: Score (0-10), Evidence Summary, Improvement Feedback",
        "    eval_result = evaluate_interview_answer(application_id, q_id, candidate_answer)",
        "    ",
        "    # Agentic State Progression Check: Query unanswered questions",
        "    unanswered = one('''SELECT q.question_id FROM interview_questions q",
        "                        LEFT JOIN interview_answers a USING(question_id)",
        "                        WHERE q.interview_id=? AND a.answer_id IS NULL",
        "                        ORDER BY q.position LIMIT 1''', (interview_id,))",
        "    ",
        "    if not unanswered:",
        "        # Finalize interview, generate advisory recommendation for human review",
        "        finalize_interview(application_id)",
        "        flash('Interview completed. Advisory score ready for Human Review.')",
        "        return redirect(f'/application/{application_id}')",
        "    return redirect(f'/application/{application_id}/interview')"
    ]
    save_code_card("fig_4_4_interview_eval_state_code.png",
                   "Project 4: Structured Interview State Machine & Evaluation", code)


# 5. Observability / Agent Trace & Human Review Output
def generate_agent_trace_output():
    fig, ax = plt.subplots(figsize=(11, 6.4), dpi=250)
    fig.patch.set_facecolor('#030712')
    ax.set_facecolor('#030712')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Window title bar
    bar = patches.FancyBboxPatch((0, 91), 100, 9, boxstyle="round,pad=0.2,rounding_size=1.5",
                                 facecolor='#111827', edgecolor='#1f2937', linewidth=1)
    ax.add_patch(bar)
    for idx, c in enumerate(['#ef4444', '#f59e0b', '#10b981']):
        circ = plt.Circle((2.5 + idx * 2.2, 95.5), 1.0, color=c)
        ax.add_patch(circ)
    ax.text(50, 95.5, "Agent Execution Telemetry & Human-in-the-Loop Audit Console",
            ha='center', va='center', color='#9ca3af', fontsize=10, fontfamily='monospace', fontweight='bold')

    terminal_lines = [
        ("[SYSTEM] Initializing Agent Run #402 for Application ID: 104 (Candidate: Ananya Rao)", "#38bdf8"),
        (">>> STEP 1: RESUME EXTRACTION & SANITIZATION", "#e2e8f0"),
        ("    Extracted 1,420 tokens | Sanitized length: 890 chars | Validation: PASSED [> 40 chars]", "#22c55e"),
        (">>> STEP 2: SCREENING AGENT EXECUTION", "#e2e8f0"),
        ("    Target Role: 'AI Systems Engineer' | Skill Match Score: 88.5% (Match: PyTorch, Docker, LLMs)", "#2dd4bf"),
        (">>> STEP 3: PREPARE 5-QUESTION STRUCTURED INTERVIEW", "#e2e8f0"),
        ("    Generated 5 rubric-calibrated technical questions tied to role competencies", "#f59e0b"),
        (">>> STEP 4: ANSWER EVALUATION (Question 3/5: 'Explain Pre-LN vs Post-LN')", "#e2e8f0"),
        ("    Candidate Answer: 'Pre-LN applies LayerNorm before residual connection preventing gradient explosion.'", "#cbd5e1"),
        ("    Agent Score: 9/10 | Evidence: 'Accurately explains gradient flow' | Feedback: 'Cite training stability'", "#a855f7"),
        (">>> STEP 5: STATE VERIFICATION: Unanswered Questions Remaining = 0", "#38bdf8"),
        ("    Transitioning Status: INTERVIEW_COMPLETED -> AWAITING_HUMAN_DECISION", "#fbbf24"),
        (">>> STEP 6: AGENT ADVISORY SYNTHESIS", "#e2e8f0"),
        ("    Advisory Score: 8.7/10 | Agent Recommendation: 'RECOMMENDED FOR HIRE (Strong Technical Core)'", "#34d399"),
        (">>> STEP 7: HUMAN-IN-THE-LOOP (HITL) ARBITRATION", "#e2e8f0"),
        ("    Reviewer: 'Dr. K. S. Sharma (Lead Hiring Mgr)' | Final Human Decision: 'HIRED' (Approved)", "#ef4444"),
        ("    Audit Trail Committed to DB table `human_reviews` at 2026-11-01T17:15:02Z", "#94a3b8")
    ]

    y_pos = 84
    for line_text, color in terminal_lines:
        ax.text(3, y_pos, line_text, ha='left', va='center', color=color,
                fontsize=8.4, fontfamily='monospace')
        y_pos -= 4.6

    plt.tight_layout()
    plt.savefig("fig_4_5_agent_trace_hitl_output.png", dpi=250, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()
    print("Generated fig_4_5_agent_trace_hitl_output.png")

if __name__ == "__main__":
    generate_architecture_diagram()
    generate_app_creation_code()
    generate_screening_code()
    generate_interview_eval_code()
    generate_agent_trace_output()
