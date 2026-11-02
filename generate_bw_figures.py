import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Clean High-Contrast Black & White / Grayscale Theme
BG_WHITE = '#FFFFFF'
BORDER_DARK = '#1E293B'
HEADER_BG = '#F1F5F9'
TEXT_DARK = '#0F172A'
TEXT_MUTED = '#475569'
CODE_TEXT = '#0F172A'
LINE_NUM_COLOR = '#64748B'

def save_bw_code_card(filename, title, code_lines, width=12, height=6.8, dpi=300):
    fig, ax = plt.subplots(figsize=(width, height), dpi=dpi)
    fig.patch.set_facecolor(BG_WHITE)
    ax.set_facecolor(BG_WHITE)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Outer border
    outer = patches.FancyBboxPatch((1, 1), 98, 98, boxstyle="round,pad=0.2,rounding_size=1.2",
                                  facecolor=BG_WHITE, edgecolor=BORDER_DARK, linewidth=1.8)
    ax.add_patch(outer)

    # Window title bar (subtle light gray)
    bar = patches.FancyBboxPatch((1, 91), 98, 8, boxstyle="round,pad=0.1,rounding_size=1.0",
                                 facecolor=HEADER_BG, edgecolor=BORDER_DARK, linewidth=1.2)
    ax.add_patch(bar)

    # Window dots in crisp grayscale
    circle_colors = ['#94A3B8', '#CBD5E1', '#E2E8F0']
    for idx, c in enumerate(circle_colors):
        circ = plt.Circle((3.5 + idx * 2.2, 95), 0.9, color=c, ec=BORDER_DARK, lw=0.8)
        ax.add_patch(circ)

    # Title
    ax.text(50, 95, title, ha='center', va='center', color=TEXT_DARK,
            fontsize=11, fontfamily='monospace', fontweight='bold')

    # Line numbers and Code
    y_pos = 85
    y_step = 76 / max(len(code_lines), 1)

    for i, line in enumerate(code_lines):
        line_num = f"{i+1:2d}"
        ax.text(3.5, y_pos, line_num, ha='left', va='center', color=LINE_NUM_COLOR,
                fontsize=9.2, fontfamily='monospace')
        
        # Crisp monochrome with bold accents
        is_comment = line.strip().startswith('#') or line.strip().startswith('//')
        is_kw = any(line.strip().startswith(kw) for kw in ['def ', 'class ', 'return ', 'import ', 'from ', 'for ', 'if ', 'export ', 'async ', 'const ', 'let ', '@'])
        
        text_color = '#64748B' if is_comment else TEXT_DARK
        weight = 'bold' if is_kw else 'normal'

        ax.text(8.5, y_pos, line, ha='left', va='center', color=text_color,
                fontsize=9.2, fontfamily='monospace', fontweight=weight)
        y_pos -= y_step

    plt.tight_layout()
    plt.savefig(filename, dpi=dpi, bbox_inches='tight', facecolor=BG_WHITE)
    plt.close()
    print(f"[OK] Generated {filename}")

def save_bw_terminal_card(filename, title, term_lines, width=12, height=6.8, dpi=300):
    fig, ax = plt.subplots(figsize=(width, height), dpi=dpi)
    fig.patch.set_facecolor(BG_WHITE)
    ax.set_facecolor(BG_WHITE)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    outer = patches.FancyBboxPatch((1, 1), 98, 98, boxstyle="round,pad=0.2,rounding_size=1.2",
                                  facecolor=BG_WHITE, edgecolor=BORDER_DARK, linewidth=1.8)
    ax.add_patch(outer)

    bar = patches.FancyBboxPatch((1, 91), 98, 8, boxstyle="round,pad=0.1,rounding_size=1.0",
                                 facecolor=HEADER_BG, edgecolor=BORDER_DARK, linewidth=1.2)
    ax.add_patch(bar)

    for idx, c in enumerate(['#94A3B8', '#CBD5E1', '#E2E8F0']):
        circ = plt.Circle((3.5 + idx * 2.2, 95), 0.9, color=c, ec=BORDER_DARK, lw=0.8)
        ax.add_patch(circ)

    ax.text(50, 95, title, ha='center', va='center', color=TEXT_DARK,
            fontsize=11, fontfamily='monospace', fontweight='bold')

    y_pos = 84
    y_step = 75 / max(len(term_lines), 1)

    for prefix, body in term_lines:
        ax.text(3.5, y_pos, prefix, ha='left', va='center', color=TEXT_DARK,
                fontsize=9.0, fontfamily='monospace', fontweight='bold')
        ax.text(3.5 + len(prefix)*1.2 + 1, y_pos, body, ha='left', va='center', color=TEXT_MUTED,
                fontsize=8.8, fontfamily='monospace')
        y_pos -= y_step

    plt.tight_layout()
    plt.savefig(filename, dpi=dpi, bbox_inches='tight', facecolor=BG_WHITE)
    plt.close()
    print(f"[OK] Generated {filename}")

def save_bw_flow_diagram(filename, title, subtitle, stages, width=13, height=7, dpi=300):
    fig, ax = plt.subplots(figsize=(width, height), dpi=dpi)
    fig.patch.set_facecolor(BG_WHITE)
    ax.set_facecolor(BG_WHITE)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Border
    outer = patches.FancyBboxPatch((1, 1), 98, 98, boxstyle="round,pad=0.2,rounding_size=1.2",
                                  facecolor=BG_WHITE, edgecolor=BORDER_DARK, linewidth=1.8)
    ax.add_patch(outer)

    # Title
    ax.text(50, 93, title, ha='center', va='center', color=TEXT_DARK,
            fontsize=13, fontfamily='sans-serif', fontweight='bold')
    ax.text(50, 88.5, subtitle, ha='center', va='center', color=TEXT_MUTED,
            fontsize=9.5, fontfamily='sans-serif')

    # Draw stages in 2 rows or 1 row depending on count
    n = len(stages)
    if n <= 5:
        w = 16
        h = 48
        spacing = (94 - n * w) / (n + 1)
        for i, st in enumerate(stages):
            x = 3 + (i + 1) * spacing + i * w
            y = 24
            box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.4,rounding_size=1.2",
                                         facecolor=HEADER_BG, edgecolor=BORDER_DARK, linewidth=1.5)
            ax.add_patch(box)
            ax.text(x + w/2, y + h - 5, st['title'], ha='center', va='center',
                    color=TEXT_DARK, fontsize=10, fontweight='bold', fontfamily='sans-serif')
            
            # items
            item_y = y + h - 13
            for itm in st['items']:
                ax.text(x + 1.5, item_y, f"• {itm}", ha='left', va='center',
                        color=TEXT_MUTED, fontsize=8.2, fontfamily='sans-serif')
                item_y -= 7

            if i < n - 1:
                ax.annotate("", xy=(x + w + spacing, y + h/2), xytext=(x + w, y + h/2),
                            arrowprops=dict(arrowstyle="->", color=BORDER_DARK, lw=2.0))
    else:
        # 2 Rows flow
        row1 = stages[:(n+1)//2]
        row2 = stages[(n+1)//2:]
        # Row 1
        w = 19
        h = 24
        spacing1 = (92 - len(row1)*w) / (len(row1)+1)
        for i, st in enumerate(row1):
            x = 4 + (i+1)*spacing1 + i*w
            y = 55
            box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.3,rounding_size=1.0",
                                         facecolor=HEADER_BG, edgecolor=BORDER_DARK, linewidth=1.4)
            ax.add_patch(box)
            ax.text(x + w/2, y + h - 4, st['title'], ha='center', va='center',
                    color=TEXT_DARK, fontsize=9.5, fontweight='bold', fontfamily='sans-serif')
            item_y = y + h - 9
            for itm in st['items']:
                ax.text(x + 1.2, item_y, f"• {itm}", ha='left', va='center',
                        color=TEXT_MUTED, fontsize=7.8, fontfamily='sans-serif')
                item_y -= 4.2
            if i < len(row1) - 1:
                ax.annotate("", xy=(x + w + spacing1, y + h/2), xytext=(x + w, y + h/2),
                            arrowprops=dict(arrowstyle="->", color=BORDER_DARK, lw=1.8))

        # Down arrow from last of row 1 to last of row 2
        last_x1 = 4 + len(row1)*spacing1 + (len(row1)-1)*w + w/2
        ax.annotate("", xy=(last_x1, 38), xytext=(last_x1, 55),
                    arrowprops=dict(arrowstyle="->", color=BORDER_DARK, lw=1.8))

        # Row 2 (right to left)
        spacing2 = (92 - len(row2)*w) / (len(row2)+1)
        for i, st in enumerate(reversed(row2)):
            idx_rev = len(row2) - 1 - i
            x = 4 + (i+1)*spacing2 + i*w
            y = 14
            box = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.3,rounding_size=1.0",
                                         facecolor=HEADER_BG, edgecolor=BORDER_DARK, linewidth=1.4)
            ax.add_patch(box)
            ax.text(x + w/2, y + h - 4, st['title'], ha='center', va='center',
                    color=TEXT_DARK, fontsize=9.5, fontweight='bold', fontfamily='sans-serif')
            item_y = y + h - 9
            for itm in st['items']:
                ax.text(x + 1.2, item_y, f"• {itm}", ha='left', va='center',
                        color=TEXT_MUTED, fontsize=7.8, fontfamily='sans-serif')
                item_y -= 4.2
            if i < len(row2) - 1:
                ax.annotate("", xy=(x, y + h/2), xytext=(x - spacing2, y + h/2),
                            arrowprops=dict(arrowstyle="<-", color=BORDER_DARK, lw=1.8))

    plt.tight_layout()
    plt.savefig(filename, dpi=dpi, bbox_inches='tight', facecolor=BG_WHITE)
    plt.close()
    print(f"[OK] Generated {filename}")

if __name__ == "__main__":
    out_dir = "bw_figures"
    os.makedirs(out_dir, exist_ok=True)
    print("Base monochrome generator ready.")
