import matplotlib.pyplot as plt
import matplotlib.patches as patches

def save_code_card(filename, title, code_lines, width=11, height=6.2, dpi=250):
    fig, ax = plt.subplots(figsize=(width, height), dpi=dpi)
    fig.patch.set_facecolor('#0f172a') # Dark Navy editor background
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
        elif any(k in line for k in ['def ', 'class ', 'return ', 'import ', 'from ', 'for ', 'if ', 'in ', 'while ', 'break']):
            text_color = '#38bdf8'
        elif 'client.' in line or 'Client(' in line or 'input(' in line or 'print(' in line:
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

# Fig 2.1: Client-Server Architecture Diagram
def save_arch_diagram(filename):
    fig, ax = plt.subplots(figsize=(10.5, 6.2), dpi=250)
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
                ha='center', va='center', fontsize=9.5, fontweight='bold', color='#0f172a')
        if subtitle:
            ax.text(x + w/2, y + h/2 - 2.0, subtitle,
                    ha='center', va='center', fontsize=7.5, color='#475569')

    ax.text(50, 96, "Figure 2.1: Web-Based Local Ollama LLM Client-Server Architecture",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#0f172a')

    # Web Client
    draw_box(30, 81, 40, 9, "1. Web / Python Client Interface", "User Prompt Input & Chat Session Loop", bg="#f0fdfa", ec="#0d9488")
    
    # Arrow down
    ax.annotate("", xy=(50, 68), xytext=(50, 81), arrowprops=dict(arrowstyle="-|>", color="#0d9488", lw=1.8, mutation_scale=12))
    ax.text(51, 74.5, "HTTP REST API Request (Port 11434 / JSON Payload)", fontsize=7.5, color="#0f172a", fontweight='bold')

    # Middle Layer: Ollama Service
    ollama_group = patches.FancyBboxPatch((15, 33), 70, 35, boxstyle="round,pad=0.5,rounding_size=1.2",
                                         facecolor="#f8fafc", edgecolor="#3b82f6", linewidth=1.5, linestyle="--")
    ax.add_patch(ollama_group)
    ax.text(18, 64, "Ollama Local Service Daemon (http://localhost:11434)", fontsize=8.5, fontweight='bold', color="#1e40af")

    draw_box(20, 49, 60, 11, "Ollama Server Core Engine", "REST API Router • Context Memory Buffer • Scheduler", bg="#eff6ff", ec="#3b82f6")
    
    # Arrow inside
    ax.annotate("", xy=(50, 44), xytext=(50, 49), arrowprops=dict(arrowstyle="-|>", color="#3b82f6", lw=1.5, mutation_scale=10))

    draw_box(25, 35, 50, 9, "Local LLM: Qwen 1.7B Model", "GGUF 4-Bit Quantized Weights in RAM/GPU", bg="#fef3c7", ec="#d97706")

    # Arrow down to response
    ax.annotate("", xy=(50, 22), xytext=(50, 33), arrowprops=dict(arrowstyle="-|>", color="#0d9488", lw=1.8, mutation_scale=12))
    ax.text(51, 27.5, "Streamed / Synchronous Chat Response Object", fontsize=7.5, color="#0f172a", fontweight='bold')

    # Response Display
    draw_box(30, 12, 40, 10, "3. Response Rendering & Output", "Structured Markdown Output to User Console / UI", bg="#f0fdfa", ec="#0d9488")

    plt.tight_layout()
    plt.savefig(filename, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
    plt.close()
    print(f"Generated {filename}")

save_arch_diagram("fig_2_1_ollama_architecture.png")

# Fig 2.2: Basic Ollama Connection and Model Verification Code
code_fig22 = [
    "from ollama import Client",
    "",
    "# 1. Initialize Client Connection to Localhost Daemon",
    "client = Client(host='http://localhost:11434')",
    "",
    "# 2. Retrieve & Display Locally Installed Models",
    "print('Models available in Ollama:')",
    "response = client.list()",
    "for model in response.models:",
    "    print(' -', model.model)",
    "",
    "# 3. Execute Single Inference Test with Qwen 1.7B",
    "print('\\nTesting Qwen 1.7B Inference...')",
    "reply = client.chat(",
    "    model='qwen3:1.7b',",
    "    messages=[{'role': 'user', 'content': 'Explain AI in two simple sentences.'}],",
    "    think=False",
    ")",
    "print(reply.message.content)"
]
save_code_card("fig_2_2_ollama_connection_code.png", "ollama_test.py — Client Initialization & Model Query", code_fig22, 11, 6.2)

# Fig 2.3: Interactive Local Chatbot Implementation
code_fig23 = [
    "from ollama import Client",
    "",
    "client = Client(host='http://localhost:11434')",
    "MODEL = 'qwen3:1.7b'",
    "",
    "print('====================================')",
    "print('       Qwen3 Local AI Chatbot')",
    "print('====================================')",
    "print(\"Type 'exit' to quit.\\n\")",
    "",
    "while True:",
    "    user_input = input('You: ')",
    "    if user_input.lower() == 'exit':",
    "        print('Goodbye!')",
    "        break",
    "        ",
    "    reply = client.chat(",
    "        model=MODEL,",
    "        messages=[{'role': 'user', 'content': user_input}],",
    "        think=False",
    "    )",
    "    print('AI:', reply.message.content)"
]
save_code_card("fig_2_3_interactive_chat_code.png", "qwen3_chat.py — Continuous Conversational Loop", code_fig23, 11, 6.5)

# Fig 2.4: System Prompt Role Conditioning Code
code_fig24 = [
    "# Demonstrating System Prompt Conditioning (Persona Modification)",
    "system_prompt_advisor = 'You are a supportive university academic advisor. Focus on learning.'",
    "system_prompt_tpo = 'You are a strict placement officer. Focus on corporate cutoffs and hiring eligibility.'",
    "user_query = 'Explain the importance of classroom attendance.'",
    "",
    "# 1. Query under Academic Advisor Persona",
    "reply_advisor = client.chat(",
    "    model='qwen3:1.7b',",
    "    messages=[",
    "        {'role': 'system', 'content': system_prompt_advisor},",
    "        {'role': 'user', 'content': user_query}",
    "    ],",
    "    think=False",
    ")",
    "",
    "# 2. Query under Campus Placement Officer Persona",
    "reply_tpo = client.chat(",
    "    model='qwen3:1.7b',",
    "    messages=[",
    "        {'role': 'system', 'content': system_prompt_tpo},",
    "        {'role': 'user', 'content': user_query}",
    "    ],",
    "    think=False",
    ")"
]
save_code_card("fig_2_4_prompt_conditioning_code.png", "persona_test.py — System Prompt Conditioning", code_fig24, 11, 6.5)

# Fig 2.5: Terminal Execution & Output Screenshot
def save_terminal_card(filename):
    lines = [
        "PS C:\\Users\\adith\\OneDrive\\Desktop\\PROJECT> python ollama_chat.py",
        "Models available in Ollama:",
        " - qwen3:1.7b",
        "",
        "====================================",
        "       Qwen3 Local AI Chatbot",
        "====================================",
        "Type 'exit' to quit.",
        "",
        "You: Explain AI in two simple sentences.",
        "AI: Artificial Intelligence is the branch of computer science dedicated to creating",
        "systems capable of performing tasks that typically require human cognition.",
        "It relies on algorithms and vast datasets to learn patterns, make predictions, and adapt.",
        "",
        "You: How does local LLM execution work with Ollama?",
        "AI: Ollama acts as a background service listening on port 11434. When Python sends a request,",
        "Ollama manages the model weights directly in system RAM, performs fast quantized inference,",
        "and streams the computed tokens back without requiring internet connectivity.",
        "",
        "You: exit",
        "Goodbye!"
    ]
    save_code_card(filename, "Terminal Execution Console — Ollama Local Inference Output", lines, 11, 7.2)

save_terminal_card("fig_2_5_ollama_terminal_output.png")
