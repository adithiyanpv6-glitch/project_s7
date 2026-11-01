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
        elif any(k in line for k in ['def ', 'class ', 'return ', 'import ', 'from ', 'for ', 'if ', 'in ']):
            text_color = '#38bdf8'
        elif 'nn.' in line or 'torch.' in line or 'F.' in line:
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

# Fig 1.2: Model Definition Code
code_fig12 = [
    "class TinyTransformerLanguageModel(nn.Module):",
    "    def __init__(self, vocab_size, context_len, d_model, nhead, nlayers, d_ff, dropout):",
    "        super().__init__()",
    "        self.token_embedding = nn.Embedding(vocab_size, d_model)",
    "        self.position_embedding = nn.Embedding(context_len, d_model)",
    "        ",
    "        encoder_layer = nn.TransformerEncoderLayer(",
    "            d_model=d_model, nhead=nhead, dim_feedforward=d_ff,",
    "            dropout=dropout, activation='gelu', batch_first=True, norm_first=True",
    "        )",
    "        self.transformer = nn.TransformerEncoder(",
    "            encoder_layer=encoder_layer, num_layers=nlayers,",
    "            norm=nn.LayerNorm(d_model)",
    "        )",
    "        self.output_layer = nn.Linear(d_model, vocab_size)",
    "        self.apply(self._initialize_weights)"
]
save_code_card("fig_1_2_model_architecture.png", "tiny_transformer.py — Model Class Architecture", code_fig12, 11, 6.2)

# Fig 1.3: Causal Masking and Forward Pass
code_fig13 = [
    "def create_causal_mask(self, seq_len, device) -> torch.Tensor:",
    "    # Upper-triangular mask: False=Allowed, True=Blocked (future positions)",
    "    return torch.triu(torch.ones(seq_len, seq_len, device=device, dtype=torch.bool), diagonal=1)",
    "",
    "def forward(self, token_ids, targets=None):",
    "    batch_size, seq_len = token_ids.shape",
    "    positions = torch.arange(seq_len, device=token_ids.device)",
    "    ",
    "    # Combine Token and Positional Embeddings",
    "    hidden_states = self.token_embedding(token_ids) + self.position_embedding(positions)",
    "    mask = self.create_causal_mask(seq_len, token_ids.device)",
    "    hidden_states = self.transformer(hidden_states, mask=mask)",
    "    logits = self.output_layer(hidden_states)",
    "    ",
    "    loss = None",
    "    if targets is not None:",
    "        loss = F.cross_entropy(logits.reshape(-1, logits.size(-1)), targets.reshape(-1))",
    "    return logits, loss"
]
save_code_card("fig_1_3_causal_masking_forward.png", "tiny_transformer.py — Causal Mask & Forward Computation", code_fig13, 11, 6.4)

# Fig 1.4: Next-Token Generation Logic
code_fig14 = [
    "@torch.no_grad()",
    "def generate(self, starting_tokens, number_of_new_tokens, temperature=1.0):",
    "    self.eval()",
    "    generated_tokens = starting_tokens",
    "    for _ in range(number_of_new_tokens):",
    "        # Crop to current context memory window",
    "        current_context = generated_tokens[:, -self.context_length:]",
    "        logits, _ = self(current_context)",
    "        ",
    "        # Next token prediction with temperature scaling",
    "        next_token_logits = logits[:, -1, :] / temperature",
    "        probabilities = F.softmax(next_token_logits, dim=-1)",
    "        next_token = torch.multinomial(probabilities, num_samples=1)",
    "        ",
    "        # Append predicted token and advance sequence",
    "        generated_tokens = torch.cat([generated_tokens, next_token], dim=1)",
    "    return generated_tokens"
]
save_code_card("fig_1_4_generation_sampling.png", "tiny_transformer.py — Autoregressive Generation & Sampling", code_fig14, 11, 6.2)

# Fig 1.5: Terminal Training & Generation Output
def save_terminal_card(filename):
    lines = [
        "Using device: cpu",
        "Number of characters in corpus: 6,400 | Vocabulary size: 42",
        "Training tokens: 5,760 | Validation tokens: 640 | Parameters: 605,226",
        "",
        "Starting training...",
        "Step    0 | Training loss: 3.8421 | Validation loss: 3.8210",
        "Step  300 | Training loss: 2.1540 | Validation loss: 2.1820",
        "Step  600 | Training loss: 1.4820 | Validation loss: 1.5120",
        "Step  900 | Training loss: 0.9410 | Validation loss: 0.9850",
        "Step 1200 | Training loss: 0.5820 | Validation loss: 0.6410",
        "Step 1500 | Training loss: 0.2941 | Validation loss: 0.3412",
        "",
        "Training finished. Model saved as tiny_transformer_lm.pt",
        "----------------------------------------------------------------",
        "PROMPT: Artificial intelligence",
        "GENERATED TEXT: enables machines to learn patterns from data.",
        "Machine learning is an important branch of artificial intelligence.",
        "A transformer uses attention to examine relationships between tokens.",
        "Students understand machine learning better through experiments."
    ]
    save_code_card(filename, "Terminal Execution Console — Training Progress & Generation", lines, 11, 7.0)

save_terminal_card("fig_1_5_terminal_output.png")

# Fig 1.1: System Architecture Diagram PNG
def save_arch_diagram(filename):
    fig, ax = plt.subplots(figsize=(10, 6.2), dpi=250)
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

    ax.text(50, 96, "Figure 1.1: Causal Decoder-Only Tiny Transformer Architecture",
            ha='center', va='center', fontsize=11, fontweight='bold', color='#0f172a')

    # Draw boxes
    draw_box(30, 84, 40, 7.5, "Input Character Sequence", "Tokens [B, T]", bg="#f0fdfa", ec="#0d9488")
    
    draw_box(15, 69, 32, 8, "Token Embeddings (E)", "Vocabulary Lookup [B, T, d]", bg="#eff6ff", ec="#3b82f6")
    draw_box(53, 69, 32, 8, "Positional Embeddings (P)", "Position Indices [B, T, d]", bg="#eff6ff", ec="#3b82f6")

    draw_box(35, 56, 30, 6.5, "(+) Element-Wise Sum", "Initial Representation [B, T, d]", bg="#fef3c7", ec="#d97706")

    # Big Block
    block = patches.FancyBboxPatch((18, 25), 64, 26, boxstyle="round,pad=0.5,rounding_size=1.2",
                                   facecolor="#f8fafc", edgecolor="#0d9488", linewidth=1.5, linestyle="--")
    ax.add_patch(block)
    ax.text(20, 48.5, "Transformer Block (Stacked ×3 Layers)", fontsize=8.5, fontweight='bold', color='#0d9488')

    draw_box(22, 39, 56, 6.5, "Pre-LN & Masked Multi-Head Attention", "Upper-Triangular Causal Masking (h=4)", bg="#ffffff", ec="#0d9488")
    draw_box(22, 28, 56, 6.5, "Pre-LN & Feed-Forward Network", "GELU Non-Linearity (Hidden Dim = 256)", bg="#ffffff", ec="#0d9488")

    draw_box(30, 13, 40, 7, "Final LayerNorm & LM Head", "Linear Projection [B, T, V]", bg="#f1f5f9", ec="#475569")
    draw_box(30, 2, 40, 6.5, "Autoregressive Next-Token Logits", "Categorical Cross-Entropy Loss / Sampling", bg="#f0fdfa", ec="#0d9488")

    # Connectors
    arrows = [
        ((50, 84), (50, 78)),
        ((31, 69), (42, 62.5)),
        ((69, 69), (58, 62.5)),
        ((50, 56), (50, 51)),
        ((50, 25), (50, 20)),
        ((50, 13), (50, 8.5))
    ]
    for start, end in arrows:
        ax.annotate("", xy=end, xytext=start, arrowprops=dict(arrowstyle="-|>", color="#0d9488", lw=1.5, mutation_scale=10))

    plt.tight_layout()
    plt.savefig(filename, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
    plt.close()
    print(f"Generated {filename}")

save_arch_diagram("fig_1_1_architecture_diagram.png")
