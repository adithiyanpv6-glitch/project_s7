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
        elif any(k in line for k in ['const ', 'let ', 'var ', 'return ', 'function', 'if', 'else', 'import ', 'from ', 'await ']):
            text_color = '#38bdf8'
        elif any(f in line for f in ['gmail_trigger', 'upload_drive', 'generate_reply', 'require_approval', 'classify_intent']):
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


# 1. Architecture Diagram
def generate_architecture_diagram():
    fig, ax = plt.subplots(figsize=(12, 6.8), dpi=250)
    fig.patch.set_facecolor('#0b0f19')
    ax.set_facecolor('#0b0f19')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Title
    ax.text(50, 95, "n8n AI Email Processing & Automation Agent Architecture",
            ha='center', va='center', color='#f8fafc', fontsize=13, fontweight='bold')
    ax.text(50, 91, "Event-Driven Ingestion, Intent Classification, Binary Pipeline, and HITL Dispatch",
            ha='center', va='center', color='#94a3b8', fontsize=9.5)

    def draw_node(x, y, w, h, title, subtitle, fill_c, edge_c, text_c='#ffffff'):
        box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.5,rounding_size=1.5",
                                     facecolor=fill_c, edgecolor=edge_c, linewidth=1.5)
        ax.add_patch(box)
        ax.text(x + w/2, y + h*0.65, title, ha='center', va='center',
                color=text_c, fontsize=9.2, fontweight='bold')
        ax.text(x + w/2, y + h*0.3, subtitle, ha='center', va='center',
                color='#cbd5e1', fontsize=7.8)

    # Core Pipeline
    draw_node(3, 62, 19, 18, "Gmail Trigger", "OAuth2 Polling / Webhook", "#1e293b", "#ef4444")
    draw_node(26, 62, 21, 18, "Intent Classifier", "Subject/Body: 'Bio-Data'", "#1e293b", "#3b82f6")
    draw_node(51, 62, 21, 18, "Attachment Router", "Inspect Binary & MIME Data", "#1e293b", "#8b5cf6")

    # Connectors
    ax.annotate("", xy=(26, 71), xytext=(22, 71),
                arrowprops=dict(arrowstyle="->", color="#38bdf8", lw=1.8))
    ax.annotate("", xy=(51, 71), xytext=(47, 71),
                arrowprops=dict(arrowstyle="->", color="#38bdf8", lw=1.8))

    # Branch 1 (Yes -> Drive)
    draw_node(76, 73, 21, 16, "Google Drive Node", "Store PDF/DOCX to Folder", "#064e3b", "#10b981")
    ax.annotate("Attachment Found", xy=(76, 81), xytext=(72, 75),
                arrowprops=dict(arrowstyle="->", color="#10b981", lw=1.8),
                fontsize=8, color="#34d399", ha='center')

    # Branch 2 (No -> AI Reply -> Approval -> Send)
    draw_node(76, 46, 21, 16, "AI Response Generator", "Draft Polite Missing Attachment Notice", "#451a03", "#f59e0b")
    ax.annotate("Attachment Missing", xy=(76, 54), xytext=(72, 65),
                arrowprops=dict(arrowstyle="->", color="#f59e0b", lw=1.8),
                fontsize=8, color="#fbbf24", ha='center')

    # Bottom flow for Missing Attachment Branch
    draw_node(51, 18, 22, 18, "Human Approval (HITL)", "Review & Authorize Outbound Draft", "#450a0a", "#f43f5e")
    draw_node(15, 18, 22, 18, "Gmail Send Node", "Dispatch Approved Email to Sender", "#1e293b", "#06b6d4")

    # Connectors Bottom
    ax.annotate("", xy=(62, 36), xytext=(86, 46),
                arrowprops=dict(arrowstyle="->", color="#f43f5e", lw=1.8))
    ax.annotate("Approved", xy=(37, 27), xytext=(51, 27),
                arrowprops=dict(arrowstyle="->", color="#10b981", lw=1.8),
                fontsize=8.5, color="#34d399")

    # Telemetry Badge
    box_audit = patches.FancyBboxPatch((3, 5), 94, 9, boxstyle="round,pad=0.3,rounding_size=1.0",
                                       facecolor="#111827", edgecolor="#374151", linewidth=1.0, linestyle=':')
    ax.add_patch(box_audit)
    ax.text(50, 9.5, "n8n Workflow Engine: Deterministic Node Execution + Google Cloud OAuth2 (127.0.0.1:5678)",
            ha='center', va='center', color='#94a3b8', fontsize=8.2, fontfamily='monospace')

    plt.tight_layout()
    plt.savefig("fig_5_1_email_agent_workflow.png", dpi=250, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()
    print("Generated fig_5_1_email_agent_workflow.png")


# 2. n8n & Google Cloud OAuth Setup
def generate_oauth_setup_code():
    code = [
        "// n8n Google OAuth2 Credential Configuration",
        "// Google Cloud Console > APIs & Services > Credentials > OAuth 2.0 Client IDs",
        "module.exports = {",
        "  name: 'Google OAuth2 - S7 Recruitment Automation',",
        "  authType: 'OAuth2',",
        "  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',",
        "  accessTokenUrl: 'https://oauth2.googleapis.com/token',",
        "  clientId: '1092837465-xxxxxx.apps.googleusercontent.com',",
        "  clientSecret: 'GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx',",
        "  scope: [",
        "    'https://www.googleapis.com/auth/gmail.readonly',",
        "    'https://www.googleapis.com/auth/gmail.send',",
        "    'https://www.googleapis.com/auth/drive.file'",
        "  ],",
        "  redirectUri: 'http://localhost:5678/rest/oauth2-credential/callback',",
        "  environment: {",
        "    runtime: 'Node.js LTS (v22.x)',",
        "    cliStart: 'n8n start',",
        "    activePort: 5678",
        "  }",
        "};"
    ]
    save_code_card("fig_5_2_n8n_oauth_setup_code.png",
                   "Project 5: Google OAuth2 & n8n Runtime Configuration", code)


# 3. Email Classification & Intent Filtering Logic
def generate_classification_code():
    code = [
        "// n8n Code Node: Email Intent Classification & Attachment Detection",
        "for (const item of $input.all()) {",
        "  const subject = (item.json.subject || '').toLowerCase();",
        "  const body = (item.json.textPlain || item.json.snippet || '').toLowerCase();",
        "  const hasKeyword = subject.includes('bio-data') || body.includes('bio-data') ||",
        "                     subject.includes('biodata') || body.includes('resume');",
        "  ",
        "  if (!hasKeyword) {",
        "    // Ignore non-recruitment emails to save processing credits",
        "    item.json.decision = 'IGNORE';",
        "    continue;",
        "  }",
        "  ",
        "  // Inspect n8n binary payload metadata for attached documents",
        "  const hasAttachment = item.binary && Object.keys(item.binary).length > 0;",
        "  item.json.intent = 'JOB_APPLICATION';",
        "  item.json.hasAttachment = hasAttachment;",
        "  item.json.senderEmail = item.json.from.value[0].address;",
        "  item.json.senderName = item.json.from.value[0].name || 'Applicant';",
        "}",
        "return $input.all();"
    ]
    save_code_card("fig_5_3_email_classification_logic.png",
                   "Project 5: Intent Classification & Attachment Routing Logic", code)


# 4. Contextual AI Response Generation & Approval Node
def generate_response_approval_code():
    code = [
        "// n8n AI Agent Node: Missing Attachment Contextual Response Draft",
        "const draftPrompt = `You are an AI Recruitment Assistant for University Placement.",
        "Candidate Name: ${senderName}",
        "Email Subject: ${subject}",
        "Issue: The email contains the 'Bio-Data' subject but NO document attachment was found.",
        "Task: Generate a courteous, formal reply instructing the candidate to re-submit.",
        "Include instructions: Send as PDF/DOCX format under 8MB within 48 hours.`;",
        "",
        "const generatedDraft = await llmClient.complete({",
        "  model: 'qwen3:1.7b',",
        "  prompt: draftPrompt,",
        "  temperature: 0.3",
        "});",
        "",
        "// Human-in-the-Loop Approval Step",
        "const approvalState = await n8n.waitForApproval({",
        "  reviewerEmail: 'placement-officer@niche.edu',",
        "  candidateEmail: senderEmail,",
        "  draftBody: generatedDraft.text,",
        "  timeoutHours: 24",
        "});",
        "if (approvalState.isApproved) { sendReplyEmail(senderEmail, generatedDraft.text); }"
    ]
    save_code_card("fig_5_4_response_generation_approval_code.png",
                   "Project 5: AI Response Generation & HITL Approval Contract", code)


# 5. Execution Telemetry Output
def generate_telemetry_output():
    fig, ax = plt.subplots(figsize=(11, 6.4), dpi=250)
    fig.patch.set_facecolor('#030712')
    ax.set_facecolor('#030712')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    bar = patches.FancyBboxPatch((0, 91), 100, 9, boxstyle="round,pad=0.2,rounding_size=1.5",
                                 facecolor='#111827', edgecolor='#1f2937', linewidth=1)
    ax.add_patch(bar)
    for idx, c in enumerate(['#ef4444', '#f59e0b', '#10b981']):
        circ = plt.Circle((2.5 + idx * 2.2, 95.5), 1.0, color=c)
        ax.add_patch(circ)
    ax.text(50, 95.5, "n8n Automation Engine Execution Log (http://localhost:5678)",
            ha='center', va='center', color='#9ca3af', fontsize=10, fontfamily='monospace', fontweight='bold')

    terminal_lines = [
        ("[TRIGGER] Gmail Polling Node: 1 Unread Message Detected (ID: msg_9824f2b)", "#38bdf8"),
        (">>> STEP 1: PARSING SENDER & METADATA", "#e2e8f0"),
        ("    From: 'Adithiyan P V' <applicant@example.com> | Subject: 'Application for S7 Bio-Data'", "#cbd5e1"),
        (">>> STEP 2: INTENT & KEYWORD CLASSIFICATION", "#e2e8f0"),
        ("    Keyword Match: 'Bio-Data' detected in Subject line | Intent: RECRUITMENT_APPLICATION", "#22c55e"),
        (">>> STEP 3: ATTACHMENT CONDITIONAL ROUTING", "#e2e8f0"),
        ("    Binary payload inspection: data.attachment0 = null | Condition Result: ATTACHMENT_MISSING", "#ef4444"),
        (">>> STEP 4: CONTEXTUAL AI DRAFT GENERATION", "#e2e8f0"),
        ("    Invoking Qwen 1.7B LLM Agent -> Draft synthesized: 'Missing Biodata Document Notification'", "#f59e0b"),
        (">>> STEP 5: HUMAN-IN-THE-LOOP (HITL) APPROVAL STAGE", "#e2e8f0"),
        ("    Outbound draft queued in n8n Approval Portal for review by Placement Officer...", "#a855f7"),
        ("    [APPROVE EVENT] Officer approved outbound dispatch at 2026-11-01T17:40:12Z", "#34d399"),
        (">>> STEP 6: GMAIL API DISPATCH", "#e2e8f0"),
        ("    Dispatching reply to 'applicant@example.com' via Gmail OAuth2 REST Endpoint -> Status: 200 OK", "#2dd4bf"),
        (">>> WORKFLOW COMPLETED SUCCESSFULLY in 1,248 ms", "#38bdf8")
    ]

    y_pos = 84
    for line_text, color in terminal_lines:
        ax.text(3, y_pos, line_text, ha='left', va='center', color=color,
                fontsize=8.4, fontfamily='monospace')
        y_pos -= 4.6

    plt.tight_layout()
    plt.savefig("fig_5_5_execution_telemetry_output.png", dpi=250, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()
    print("Generated fig_5_5_execution_telemetry_output.png")

if __name__ == "__main__":
    generate_architecture_diagram()
    generate_oauth_setup_code()
    generate_classification_code()
    generate_response_approval_code()
    generate_telemetry_output()
