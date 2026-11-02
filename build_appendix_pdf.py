import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

PDF_FILENAME = "APPENDIX_PROJECT_FIGURES_AND_CODES.pdf"

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#475569"))
        
        # Header (Pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 800, "NOORUL ISLAM CENTRE FOR HIGHER EDUCATION — B.E. MINI-PROJECT APPENDIX")
            self.drawRightString(A4[0] - 54, 800, "CONSOLIDATED PROJECT REPORT")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(54, 794, A4[0] - 54, 794)

        # Footer
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawString(54, 38, "Department of Computer Science & Engineering | Appendix Report")
        self.drawRightString(A4[0] - 54, 38, page_str)
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.6)
        self.line(54, 48, A4[0] - 54, 48)
        self.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        PDF_FILENAME,
        pagesize=A4,
        leftMargin=50,
        rightMargin=50,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0F172A'),
        alignment=1, # Center
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#475569'),
        alignment=1,
        spaceAfter=15
    )

    chapter_heading = ParagraphStyle(
        'ChapterHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=18,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=12,
        spaceAfter=4,
        keepWithNext=True
    )

    fig_title = ParagraphStyle(
        'FigTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=6,
        spaceAfter=2,
        keepWithNext=True
    )

    fig_desc = ParagraphStyle(
        'FigDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=8
    )

    meta_style = ParagraphStyle(
        'MetaStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.HexColor('#64748B'),
        spaceAfter=10
    )

    story = []

    # Title Banner
    story.append(Paragraph("NOORUL ISLAM CENTRE FOR HIGHER EDUCATION", ParagraphStyle('Inst', parent=title_style, fontSize=12, leading=15, textColor=colors.HexColor('#1E293B'))))
    story.append(Paragraph("DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING", ParagraphStyle('Dept', parent=subtitle_style, fontSize=9.5, leading=12, fontName='Helvetica-Bold', textColor=colors.HexColor('#0F172A'))))
    story.append(Spacer(1, 10))
    story.append(Paragraph("APPENDIX: CONSOLIDATED CODE ARTIFACTS, ARCHITECTURES & EXECUTION TELEMETRY", title_style))
    story.append(Paragraph("Comprehensive Visual Evidence for Projects 1 through 6 (Chapters 3 to 8)<br/>Student: <b>ADITHIYAN P V</b> | Register No: <b>[Insert Register Number]</b>", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor('#0F172A'), spaceBefore=2, spaceAfter=14))

    # Overview text
    intro_p = Paragraph(
        "<b>Appendix Overview:</b> This appendix compiles all structural diagrams, core algorithm implementations, "
        "and runtime telemetry traces across all six mini-project systems. All figures are formatted in high-contrast "
        "monochrome (black text on pure white background) at 300 DPI publication standards, ensuring optimal legibility "
        "for print submission and formal academic evaluation.",
        fig_desc
    )
    story.append(intro_p)
    story.append(Spacer(1, 8))

    # Project metadata catalog
    projects = [
        {
            "chapter": "CHAPTER 3 — PROJECT 1: TRANSFORMER-BASED LANGUAGE MODEL",
            "figures": [
                {
                    "num": "Figure 1.1",
                    "title": "Tiny Transformer Language Model Pipeline Architecture",
                    "file": "bw_figures/fig_1_1_architecture_diagram.png",
                    "desc": "End-to-end dataflow pipeline of the causal decoder-only transformer model implemented in PyTorch, showing character corpus tokenization, dual embedding summation, multi-head causal blocks, and linear projection.",
                    "type": "System Architecture Flow"
                },
                {
                    "num": "Figure 1.2",
                    "title": "Tiny Transformer Core Architecture & Residual Block Code",
                    "file": "bw_figures/fig_1_2_model_architecture.png",
                    "desc": "PyTorch implementation of the Pre-LayerNorm TransformerBlock class featuring dual residual connections, LayerNorm stabilization, and a 256-dimensional feed-forward network with GELU non-linear activations.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 1.3",
                    "title": "Causal Masking & Scaled Dot-Product Attention Code",
                    "file": "bw_figures/fig_1_3_causal_masking_forward.png",
                    "desc": "Core self-attention implementation illustrating Q, K, V chunk projection, lower-triangular boolean mask fill, softmax scaling by 1/sqrt(head_dim), and attention weight dropout.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 1.4",
                    "title": "Autoregressive Generation & Softmax Sampling Code",
                    "file": "bw_figures/fig_1_4_generation_sampling.png",
                    "desc": "Inference generation function with receptive field cropping, temperature-scaled logit division, softmax probability distribution construction, and multinomial token sampling.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 1.5",
                    "title": "Tiny Transformer Training Loss Convergence & Output Telemetry",
                    "file": "bw_figures/fig_1_5_terminal_output.png",
                    "desc": "Console training log showing cross-entropy loss reduction from 3.95 nats to 1.42 nats across 1,500 steps, hardware device allocation, and qualitative autoregressive text completion.",
                    "type": "Execution Output / Telemetry"
                }
            ]
        },
        {
            "chapter": "CHAPTER 4 — PROJECT 2: WEB-BASED OLLAMA LLM INTERFACE",
            "figures": [
                {
                    "num": "Figure 2.1",
                    "title": "Web-Based Ollama Client Client-Server Architecture",
                    "file": "bw_figures/fig_2_1_ollama_architecture.png",
                    "desc": "Four-tier architectural diagram depicting user browser interaction, Flask application gateway orchestration, local Ollama daemon hosting (Port 11434), and the Qwen 1.7B foundation model runtime.",
                    "type": "System Architecture Flow"
                },
                {
                    "num": "Figure 2.2",
                    "title": "Ollama Client Initialization & Connection Handler Code",
                    "file": "bw_figures/fig_2_2_ollama_connection_code.png",
                    "desc": "Python client setup establishing verified socket connectivity to the local Ollama daemon, retrieving available installed models, and handling network exception boundaries.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 2.3",
                    "title": "Flask Route for Multi-Turn Conversational Streaming Code",
                    "file": "bw_figures/fig_2_3_interactive_chat_code.png",
                    "desc": "Flask API route managing conversational context history, system prompt injection, JSON payload transmission, and assistant reply serialization.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 2.4",
                    "title": "System Prompt Conditioning & Behavioral Persona Presets Code",
                    "file": "bw_figures/fig_2_4_prompt_conditioning_code.png",
                    "desc": "Configuration dictionary defining strict behavioral personas (Socratic Tutor, Code Reviewer, Concise Explainer) modifying LLM tone and guardrails without parameter fine-tuning.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 2.5",
                    "title": "Ollama Client Execution & Persona Response Telemetry",
                    "file": "bw_figures/fig_2_5_ollama_terminal_output.png",
                    "desc": "Runtime execution log illustrating model weights loading, context token processing, first-token latency (64ms), generation velocity (28.4 tokens/sec), and memory footprint.",
                    "type": "Execution Output / Telemetry"
                }
            ]
        },
        {
            "chapter": "CHAPTER 5 — PROJECT 3: UNIVERSITY LEAVE PROCESSING AGENT",
            "figures": [
                {
                    "num": "Figure 3.1",
                    "title": "University Leave Processing Agent Architecture",
                    "file": "bw_figures/fig_3_1_leave_agent_architecture.png",
                    "desc": "Autonomous 9-step decision pipeline combining natural language parsing, deterministic database tools, multi-rule policy evaluation, and administrative HOD escalation.",
                    "type": "System Architecture Flow"
                },
                {
                    "num": "Figure 3.2",
                    "title": "Deterministic SQLite Database Tool Layer Functions Code",
                    "file": "bw_figures/fig_3_2_tool_layer_code.png",
                    "desc": "Python tool wrappers executing authoritative queries against SQLite relational tables for student attendance percentage, academic examination dates, and leave balances.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 3.3",
                    "title": "Institutional Policy Reasoning & Escalation Engine Code",
                    "file": "bw_figures/fig_3_3_policy_reasoning_code.png",
                    "desc": "Multi-constraint policy evaluator assessing attendance thresholds (>= 75%), timetable examination conflicts, and leave quotas to output APPROVED, REJECTED, or ESCALATE_TO_HOD.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 3.4",
                    "title": "Atomic Database Mutation & Read-After-Write Verification Code",
                    "file": "bw_figures/fig_3_4_verification_state_code.png",
                    "desc": "Transactional database commit function and subsequent read-after-write verification ensuring balance deductions match requested duration without state desynchronization.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 3.5",
                    "title": "Leave Processing Agent Multi-Step Execution Output",
                    "file": "bw_figures/fig_3_5_agent_execution_output.png",
                    "desc": "Console trace showing step-by-step tool invocations for Student NICHE-CSE-104, rule violations detected (Exam conflict + low attendance), and automated HOD escalation dispatch.",
                    "type": "Execution Output / Telemetry"
                }
            ]
        },
        {
            "chapter": "CHAPTER 6 — PROJECT 4: AI RECRUITMENT ASSISTANT",
            "figures": [
                {
                    "num": "Figure 4.1",
                    "title": "AI Recruitment Assistant End-to-End Workflow Architecture",
                    "file": "bw_figures/fig_4_1_recruitment_agent_workflow.png",
                    "desc": "Agentic recruitment pipeline showing resume ingestion, text sanitization, skill screening, dynamic 5-question structured interview generation, and human review authorization.",
                    "type": "System Architecture Flow"
                },
                {
                    "num": "Figure 4.2",
                    "title": "Secure Resume Ingestion & Content Guardrail Code",
                    "file": "bw_figures/fig_4_2_application_creation_code.png",
                    "desc": "Flask route handling secure multi-format document uploads (.pdf, .docx, .txt), text extraction, hiring sanitization, and the 40-character minimum content guardrail check.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 4.3",
                    "title": "Autonomous Screening Agent & Skill Matching Logic Code",
                    "file": "bw_figures/fig_4_3_screening_agent_code.png",
                    "desc": "Autonomous screening agent querying candidate biodata, matching role prerequisites via structured LLM schema, recording match scores, and appending to candidate memory.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 4.4",
                    "title": "Structured Interview State Machine & Evaluation Code",
                    "file": "bw_figures/fig_4_4_interview_eval_state_code.png",
                    "desc": "State transition logic iterating through 5 rubric-calibrated interview questions, evaluating answers across score/evidence/feedback, and finalizing the advisory recommendation.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 4.5",
                    "title": "Recruitment Agent Execution Trace & Human Review Console",
                    "file": "bw_figures/fig_4_5_agent_trace_hitl_output.png",
                    "desc": "Complete agent trace log showing applicant screening metrics, answer rubric evaluations, advisory score computation (8.7/10), and final human hiring manager decision commit.",
                    "type": "Execution Output / Telemetry"
                }
            ]
        },
        {
            "chapter": "CHAPTER 7 — PROJECT 5: AI EMAIL PROCESSING AGENT (N8N)",
            "figures": [
                {
                    "num": "Figure 5.1",
                    "title": "AI Email Processing & Automation Agent Architecture",
                    "file": "bw_figures/fig_5_1_email_agent_workflow.png",
                    "desc": "Event-driven automation workflow orchestrated in n8n featuring Gmail OAuth2 trigger, keyword classifier ('Bio-Data'), binary attachment routing, and human approval barrier.",
                    "type": "System Architecture Flow"
                },
                {
                    "num": "Figure 5.2",
                    "title": "Google Cloud OAuth 2.0 & n8n Runtime Configuration Code",
                    "file": "bw_figures/fig_5_2_n8n_oauth_setup_code.png",
                    "desc": "Configuration manifest specifying Google OAuth2 client credentials, authorized scopes (gmail.readonly, gmail.send, drive.file), and localhost redirect URI for n8n.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 5.3",
                    "title": "Email Intent Classification & Attachment Routing Logic Code",
                    "file": "bw_figures/fig_5_3_email_classification_logic.png",
                    "desc": "JavaScript function node inspecting email subject/body for 'Bio-Data' keywords, parsing binary MIME attachments, and routing to Google Drive or AI draft generation.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 5.4",
                    "title": "Contextual Response Generation & Human Approval Contract Code",
                    "file": "bw_figures/fig_5_4_response_generation_approval_code.png",
                    "desc": "Node script formulating missing attachment prompt for Qwen 1.7B, generating a courteous draft, and pausing execution until approved in the n8n placement officer portal.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 5.5",
                    "title": "n8n Automation Engine Execution Log & Dispatch Telemetry",
                    "file": "bw_figures/fig_5_5_execution_telemetry_output.png",
                    "desc": "End-to-end execution log detailing email trigger detection, missing attachment detection, LLM draft synthesis, officer authorization event, and successful Gmail API dispatch.",
                    "type": "Execution Output / Telemetry"
                }
            ]
        },
        {
            "chapter": "CHAPTER 8 — PROJECT 6: PLACEMENTPREP PLATFORM",
            "figures": [
                {
                    "num": "Figure 6.1",
                    "title": "PlacementPrep Full-Stack Platform Architecture",
                    "file": "bw_figures/fig_6_1_placementprep_architecture.png",
                    "desc": "Enterprise four-tier software architecture combining React 19 presentation layer, Express API gateway with JWT/RBAC security, core computational AI engines, and Prisma ORM.",
                    "type": "System Architecture Flow"
                },
                {
                    "num": "Figure 6.2",
                    "title": "Dynamic Placement Readiness Scoring (PRS) Service Code",
                    "file": "bw_figures/fig_6_2_prs_scoring_engine_code.png",
                    "desc": "TypeScript service implementing the 7-factor weighted mathematical formula (Diagnostic, Roadmap, Practice, Coding, Mock Tests, Resume, Interview) calculating live student PRS (0-100).",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 6.3",
                    "title": "Adaptive 30/60/90-Day Roadmap Generation Service Code",
                    "file": "bw_figures/fig_6_3_roadmap_generator_code.png",
                    "desc": "Adaptive curriculum synthesizer tailoring daily milestones across Quantitative Aptitude, Data Structures, Core Computer Science, and Mock Interviews based on detected weaknesses.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 6.4",
                    "title": "Sandboxed Multi-Language DSA Execution Engine Code",
                    "file": "bw_figures/fig_6_4_dsa_code_runner_code.png",
                    "desc": "Node.js Virtual Machine (VM) execution sandbox enforcing a 2,000ms timeout, memory limits, and automated verification against hidden and sample test cases.",
                    "type": "Source Code Artifact"
                },
                {
                    "num": "Figure 6.5",
                    "title": "Heuristic Natural Language ATS Resume Analyzer Code",
                    "file": "bw_figures/fig_6_5_ats_resume_parser_code.png",
                    "desc": "Natural language ATS resume analyzer evaluating standard section compliance, technical keyword alignment, and action verb density via the Google XYZ formula.",
                    "type": "Source Code Artifact"
                }
            ]
        }
    ]

    # Render each chapter
    for p_idx, proj in enumerate(projects):
        if p_idx > 0:
            story.append(PageBreak())

        story.append(Paragraph(proj['chapter'], chapter_heading))
        story.append(HRFlowable(width="100%", thickness=1.0, color=colors.HexColor('#CBD5E1'), spaceBefore=2, spaceAfter=12))

        for fig in proj['figures']:
            element_box = []
            element_box.append(Paragraph(f"<b>{fig['num']}: {fig['title']}</b>", fig_title))
            element_box.append(Paragraph(f"<b>Classification:</b> {fig['type']} | <b>Specification:</b> High-Contrast Monochrome (300 DPI)", meta_style))

            # Include image
            if os.path.exists(fig['file']):
                img = Image(fig['file'], width=495, height=270)
                element_box.append(img)
            else:
                element_box.append(Paragraph(f"[Image File Missing: {fig['file']}]", fig_desc))

            element_box.append(Spacer(1, 4))
            element_box.append(Paragraph(f"<b>Technical Description:</b> {fig['desc']}", fig_desc))
            element_box.append(Spacer(1, 10))

            story.append(KeepTogether(element_box))

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"\n[SUCCESS] Generated professional Appendix PDF: {PDF_FILENAME}")

if __name__ == "__main__":
    build_pdf()
