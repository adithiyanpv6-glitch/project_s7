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
                fontsize=9, fontfamily='monospace')
        
        # Color coding simple syntax
        text_color = '#e2e8f0'
        if line.strip().startswith('#'):
            text_color = '#64748b'
        elif any(k in line for k in ['def ', 'class ', 'return ', 'import ', 'from ', 'for ', 'if ', 'elif ', 'else:', 'in ']):
            text_color = '#38bdf8'
        elif any(f in line for f in ['tool_', 'execute(', 'commit()', 'fetchone()', 'fetchall()', 'dict(']):
            text_color = '#2dd4bf'
        elif any(s in line for s in ['"', "'"]):
            text_color = '#fde047'

        ax.text(8, y_pos, line, ha='left', va='center', color=text_color,
                fontsize=9, fontfamily='monospace')
        y_pos -= y_step

    plt.tight_layout()
    plt.savefig(filename, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
    plt.close()
    print(f"Generated {filename}")

# Fig 3.1: Multi-Tool Agentic Architecture Diagram
def save_arch_diagram(filename):
    fig, ax = plt.subplots(figsize=(10.8, 6.4), dpi=250)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#ffffff')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    def draw_box(x, y, w, h, title, subtitle="", bg="#f8fafc", ec="#0d9488"):
        b = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.4,rounding_size=1.0",
                                   facecolor=bg, edgecolor=ec, linewidth=1.5)
        ax.add_patch(b)
        ax.text(x + w/2, y + h/2 + (1.2 if subtitle else 0), title,
                ha='center', va='center', fontsize=9.2, fontweight='bold', color='#0f172a')
        if subtitle:
            ax.text(x + w/2, y + h/2 - 2.0, subtitle,
                    ha='center', va='center', fontsize=7.2, color='#475569')

    ax.text(50, 96, "Figure 3.1: Multi-Tool Agentic Architecture for University Leave Processing",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#0f172a')

    # Student input
    draw_box(30, 84, 40, 8, "Student Leave Request", "Natural Language Query (Dates + Reason)", bg="#f0fdfa", ec="#0d9488")
    
    # Arrow to Agent
    ax.annotate("", xy=(50, 77), xytext=(50, 84), arrowprops=dict(arrowstyle="-|>", color="#0d9488", lw=1.8, mutation_scale=10))

    # Big Agent Boundary
    agent_group = patches.FancyBboxPatch((8, 25), 84, 50, boxstyle="round,pad=0.5,rounding_size=1.2",
                                         facecolor="#f8fafc", edgecolor="#0d9488", linewidth=1.5, linestyle="--")
    ax.add_patch(agent_group)
    ax.text(10, 72, "Autonomous University Leave Processing Agent (Cognitive State Machine)", fontsize=8.5, fontweight='bold', color="#0f766e")

    # Step 1: Parser
    draw_box(12, 60, 24, 8, "1. Request Parser", "Extract Dates & Duration", bg="#ffffff", ec="#0d9488")
    
    # Step 2: Tools Layer
    tools_box = patches.FancyBboxPatch((40, 48), 50, 22, boxstyle="round,pad=0.4,rounding_size=0.8",
                                       facecolor="#eff6ff", edgecolor="#3b82f6", linewidth=1.2)
    ax.add_patch(tools_box)
    ax.text(65, 67, "External Database Tool Layer", fontsize=8.2, fontweight='bold', color="#1d4ed8", ha='center')

    draw_box(42, 58, 22, 6.5, "Attendance Tool", "Query cumulative %", bg="#ffffff", ec="#3b82f6")
    draw_box(66, 58, 22, 6.5, "Exams Tool", "Check timetable clash", bg="#ffffff", ec="#3b82f6")
    draw_box(42, 50, 22, 6.5, "Leave Balance Tool", "Remaining days check", bg="#ffffff", ec="#3b82f6")
    draw_box(66, 50, 22, 6.5, "Leave Policy Tool", "Min attendance: 75%", bg="#ffffff", ec="#3b82f6")

    # Step 3: Policy Reasoning
    draw_box(12, 45, 24, 9, "2. Policy Reasoning Engine", "Multi-rule Constraint Cross-check", bg="#fef3c7", ec="#d97706")

    # Step 4: Decision Matrix
    draw_box(22, 29, 16, 8, "APPROVE", "Ledger Deducted", bg="#ecfdf5", ec="#10b981")
    draw_box(42, 29, 16, 8, "REJECT", "Limit Exceeded", bg="#fef2f2", ec="#ef4444")
    draw_box(62, 29, 24, 8, "ESCALATE TO HOD", "HITL Human Review Gate", bg="#fffbeb", ec="#f59e0b")

    # Connecting arrows inside
    ax.annotate("", xy=(40, 64), xytext=(36, 64), arrowprops=dict(arrowstyle="-|>", color="#0d9488", lw=1.5))
    ax.annotate("", xy=(24, 54), xytext=(50, 48), arrowprops=dict(arrowstyle="-|>", color="#d97706", lw=1.5))
    ax.annotate("", xy=(30, 37), xytext=(24, 45), arrowprops=dict(arrowstyle="-|>", color="#10b981", lw=1.5))
    ax.annotate("", xy=(50, 37), xytext=(24, 45), arrowprops=dict(arrowstyle="-|>", color="#ef4444", lw=1.5))
    ax.annotate("", xy=(74, 37), xytext=(24, 45), arrowprops=dict(arrowstyle="-|>", color="#f59e0b", lw=1.5))

    # Bottom Actions: Verify & Notify
    draw_box(15, 8, 30, 9, "State Verification Tool", "tool_verify() Closed-Loop Check", bg="#ffffff", ec="#0d9488")
    draw_box(55, 8, 30, 9, "Student Notification", "Personalized Determination Emitted", bg="#ffffff", ec="#0d9488")

    # Connecting out
    ax.annotate("", xy=(30, 17), xytext=(30, 25), arrowprops=dict(arrowstyle="-|>", color="#0d9488", lw=1.5))
    ax.annotate("", xy=(55, 12.5), xytext=(45, 12.5), arrowprops=dict(arrowstyle="-|>", color="#0d9488", lw=1.5))

    plt.tight_layout()
    plt.savefig(filename, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
    plt.close()
    print(f"Generated {filename}")

save_arch_diagram("fig_3_1_leave_agent_architecture.png")

# Fig 3.2: Tool Layer Code
code_fig32 = [
    "# External Database Tool Functions for SQLite Interaction",
    "def tool_attendance(student_id):",
    "    conn = db()",
    "    row = conn.execute('SELECT * FROM attendance WHERE student_id=?', (student_id,)).fetchone()",
    "    conn.close()",
    "    return dict(row) if row else None",
    "",
    "def tool_exams(student_id, start_date, end_date):",
    "    student = tool_student_profile(student_id)",
    "    conn = db()",
    "    rows = conn.execute('''",
    "        SELECT * FROM exams WHERE programme=? AND semester=? ",
    "        AND exam_date BETWEEN ? AND ? ORDER BY exam_date",
    "    ''', (student['programme'], student['semester'], start_date, end_date)).fetchall()",
    "    conn.close()",
    "    return [dict(r) for r in rows]",
    "",
    "def tool_leave_balance(student_id):",
    "    conn = db()",
    "    row = conn.execute('SELECT * FROM leave_balance WHERE student_id=?', (student_id,)).fetchone()",
    "    conn.close()",
    "    return dict(row) if row else None"
]
save_code_card("fig_3_2_tool_layer_code.png", "leave_agent.py — Database Tool Execution Layer", code_fig32, 11, 6.6)

# Fig 3.3: Policy Reasoning & Decision Logic
code_fig33 = [
    "# Multi-Constraint Policy Reasoning & Decision Logic",
    "policy = tool_leave_policy()",
    "reasons = []",
    "",
    "# 1. Duration & Balance Check",
    "if parsed['requested_days'] > policy['max_days_per_request']:",
    "    reasons.append(f'Request exceeds max {policy[\"max_days_per_request\"]} days limit.')",
    "if bal['remaining_days'] < parsed['requested_days']:",
    "    reasons.append('Insufficient remaining leave balance.')",
    "",
    "# 2. Examination & Attendance Threshold Check",
    "if exams and policy['exam_restriction']:",
    "    reasons.append('Leave request overlaps with an internal examination.')",
    "attendance_below = att['attendance_percent'] < policy['min_attendance']",
    "if attendance_below:",
    "    reasons.append(f'Attendance {att[\"attendance_percent\"]}% is below the 75.0% threshold.')",
    "",
    "# 3. Final Decision State Emission",
    "if parsed['requested_days'] > policy['max_days_per_request'] or bal['remaining_days'] < parsed['requested_days']:",
    "    decision = 'REJECTED'",
    "elif exams and policy['exam_restriction'] or attendance_below:",
    "    decision = 'ESCALATE_TO_HOD'  # Human-In-The-Loop Escalation",
    "else:",
    "    decision = 'APPROVED'"
]
save_code_card("fig_3_3_policy_reasoning_code.png", "leave_agent.py — Policy Evaluation & Decision Engine", code_fig33, 11, 6.8)

# Fig 3.4: Verification & Escalation Workflow
code_fig34 = [
    "# Closed-Loop Verification & System Mutation",
    "def tool_update_leave(request_id, student_id, status, days):",
    "    conn = db()",
    "    now = datetime.now().isoformat(timespec='seconds')",
    "    if status == 'APPROVED':",
    "        conn.execute('UPDATE leave_balance SET used_days=used_days+?, remaining_days=remaining_days-? WHERE student_id=?',",
    "                     (days, days, student_id))",
    "    conn.execute('UPDATE leave_requests SET status=?, updated_at=? WHERE request_id=?', (status, now, request_id))",
    "    conn.commit()",
    "    conn.close()",
    "    return {'success': True, 'status': status}",
    "",
    "def tool_verify(request_id, student_id):",
    "    conn = db()",
    "    req = conn.execute('SELECT * FROM leave_requests WHERE request_id=?', (request_id,)).fetchone()",
    "    bal = conn.execute('SELECT * FROM leave_balance WHERE student_id=?', (student_id,)).fetchone()",
    "    conn.close()",
    "    return {'request': dict(req) if req else None, 'balance': dict(bal) if bal else None}",
    "",
    "# Verification Assertion in Pipeline",
    "verification = tool_verify(request_id, student_id)",
    "verified = verification['request'] and verification['request']['status'] == decision"
]
save_code_card("fig_3_4_verification_state_code.png", "leave_agent.py — System State Mutation & Verification", code_fig34, 11, 6.8)

# Fig 3.5: Terminal / JSON Agent Output
def save_agent_output(filename):
    lines = [
        "POST /run-agent (student_id='STU001', request='Leave from 2026-09-04 to 2026-09-04 for personal reasons')",
        "{",
        "  'student': {'student_id': 'STU001', 'name': 'Ananya Raj', 'attendance_percent': 88.5},",
        "  'parsed_request': {'start_date': '2026-09-04', 'end_date': '2026-09-04', 'requested_days': 1},",
        "  'events': [",
        "    {'step': 'understand', 'status': 'completed', 'msg': 'Parsed dates and identified student STU001.'},",
        "    {'step': 'attendance', 'status': 'completed', 'data': {'attendance_percent': 88.5}},",
        "    {'step': 'calendar',   'status': 'completed', 'data': {'exam_conflict': True, 'exam': 'Computer Networks Internal'}},",
        "    {'step': 'balance',    'status': 'completed', 'data': {'remaining_days': 10}},",
        "    {'step': 'policy',     'status': 'completed', 'issues': ['Leave overlaps an examination.']},",
        "    {'step': 'decision',   'decision': 'ESCALATE_TO_HOD', 'reason': 'Human review required due to exam clash.'},",
        "    {'step': 'verify',     'verified': True, 'current_db_status': 'ESCALATE_TO_HOD'},",
        "    {'step': 'notify',     'message': 'Dear Ananya Raj, your request has been ESCALATED to the HoD.'}",
        "  ],",
        "  'final_decision': 'ESCALATE_TO_HOD'",
        "}"
    ]
    save_code_card(filename, "Agent Output Console — Multi-Step Event Execution Log", lines, 11, 6.8)

save_agent_output("fig_3_5_agent_execution_output.png")
