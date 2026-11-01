import os
import re
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="{top}" w:type="dxa"/>'
        f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'<w:left w:w="{left}" w:type="dxa"/>'
        f'<w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def create_report_docx():
    doc = Document()

    # Page Margins (Standard Academic Binding: Left 1.25", others 1.0")
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.25)
        section.right_margin = Inches(1.0)
        section.page_width = Inches(8.5)
        section.page_height = Inches(11.0)

    # Base Styles
    normal_style = doc.styles['Normal']
    normal_font = normal_style.font
    normal_font.name = 'Times New Roman'
    normal_font.size = Pt(12)
    normal_font.color.rgb = RGBColor(15, 23, 42) # Deep Slate/Navy

    # Read the markdown source
    with open('FINAL_CONSOLIDATED_PROJECT_REPORT.md', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_code_block = False
    code_lines = []
    in_table = False
    table_lines = []

    def flush_code():
        nonlocal code_lines
        if not code_lines:
            return
        code_text = "".join(code_lines)
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.4)
        p.paragraph_format.right_indent = Inches(0.4)
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.05
        
        # Add background / shading via XML
        pBdr = parse_xml(
            f'<w:pBdr {nsdecls("w")}>'
            f'<w:left w:val="single" w:sz="18" w:space="8" w:color="0D9488"/>'
            f'</w:pBdr>'
        )
        p._p.get_or_add_pPr().append(pBdr)
        
        run = p.add_run(code_text.rstrip())
        run.font.name = 'Consolas'
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(30, 41, 59)
        code_lines = []

    def flush_table():
        nonlocal table_lines
        if not table_lines:
            return
        
        # Parse table markdown lines
        raw_rows = []
        for line in table_lines:
            clean = line.strip()
            if clean.startswith('|') and clean.endswith('|'):
                cells = [c.strip() for c in clean[1:-1].split('|')]
                # skip separator row (| :--- | :--- |)
                if all(re.match(r'^:?-+:?$', c) for c in cells):
                    continue
                raw_rows.append(cells)
        
        if raw_rows:
            num_cols = max(len(r) for r in raw_rows)
            table = doc.add_table(rows=len(raw_rows), cols=num_cols)
            table.alignment = WD_TABLE_ALIGNMENT.CENTER
            table.autofit = True
            
            for row_idx, row_data in enumerate(raw_rows):
                is_header = (row_idx == 0)
                table_row = table.rows[row_idx]
                
                # set cantSplit
                trPr = table_row._tr.get_or_add_trPr()
                trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
                if is_header:
                    trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))

                for col_idx in range(num_cols):
                    cell = table_row.cells[col_idx]
                    text = row_data[col_idx] if col_idx < len(row_data) else ""
                    # strip markdown bold / links
                    clean_text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
                    clean_text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', clean_text)
                    
                    cell.text = clean_text
                    p = cell.paragraphs[0]
                    p.paragraph_format.space_before = Pt(3)
                    p.paragraph_format.space_after = Pt(3)
                    p.paragraph_format.line_spacing = 1.05
                    
                    if is_header:
                        set_cell_background(cell, "0F172A") # Navy dark
                        for run in p.runs:
                            run.font.name = 'Times New Roman'
                            run.font.bold = True
                            run.font.size = Pt(10)
                            run.font.color.rgb = RGBColor(255, 255, 255)
                    else:
                        bg_color = "F8FAFC" if row_idx % 2 == 1 else "FFFFFF"
                        set_cell_background(cell, bg_color)
                        for run in p.runs:
                            run.font.name = 'Times New Roman'
                            run.font.size = Pt(9.5)
                            run.font.color.rgb = RGBColor(30, 41, 59)
                    
                    set_cell_margins(cell, top=120, bottom=120, left=150, right=150)
            
            # Table borders via XML
            tblPr = table._tbl.tblPr
            tblBorders = parse_xml(
                f'<w:tblBorders {nsdecls("w")}>'
                f'<w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
                f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
                f'<w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>'
                f'<w:insideV w:val="none"/>'
                f'<w:left w:val="none"/>'
                f'<w:right w:val="none"/>'
                f'</w:tblBorders>'
            )
            tblPr.append(tblBorders)
            
            # space after table
            spacer = doc.add_paragraph()
            spacer.paragraph_format.space_before = Pt(0)
            spacer.paragraph_format.space_after = Pt(6)

        table_lines = []

    for idx, raw_line in enumerate(lines):
        line = raw_line.rstrip('\r\n')

        # Handle Code Blocks
        if line.startswith('```'):
            if in_code_block:
                flush_code()
                in_code_block = False
            else:
                if in_table:
                    flush_table()
                    in_table = False
                in_code_block = True
            continue

        if in_code_block:
            code_lines.append(raw_line)
            continue

        # Handle Tables
        if line.strip().startswith('|') and line.strip().endswith('|'):
            in_table = True
            table_lines.append(line)
            continue
        elif in_table:
            flush_table()
            in_table = False

        # Handle Page Break Tag
        if line.strip() == '\\newpage':
            doc.add_page_break()
            continue

        # Skip horizontal dividers
        if line.strip() == '---':
            continue

        # Handle Headings
        if line.startswith('# '):
            heading_text = line[2:].strip()
            # If it's a chapter title
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(18)
            p.paragraph_format.space_after = Pt(12)
            p.paragraph_format.keep_with_next = True
            
            run = p.add_run(heading_text)
            run.font.name = 'Times New Roman'
            run.font.bold = True
            run.font.size = Pt(16)
            run.font.color.rgb = RGBColor(15, 23, 42)
            
            if "CHAPTER" in heading_text or "NOORUL ISLAM" in heading_text or "ABSTRACT" in heading_text or "BONAFIDE" in heading_text or "DECLARATION" in heading_text or "TABLE OF CONTENTS" in heading_text or "LIST OF" in heading_text:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            continue

        if line.startswith('## '):
            heading_text = line[3:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(14)
            p.paragraph_format.space_after = Pt(6)
            p.paragraph_format.keep_with_next = True
            
            run = p.add_run(heading_text)
            run.font.name = 'Times New Roman'
            run.font.bold = True
            run.font.size = Pt(13.5)
            run.font.color.rgb = RGBColor(13, 148, 136) # Teal
            continue

        if line.startswith('### '):
            heading_text = line[4:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(10)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.keep_with_next = True
            
            run = p.add_run(heading_text)
            run.font.name = 'Times New Roman'
            run.font.bold = True
            run.font.size = Pt(12)
            run.font.color.rgb = RGBColor(30, 41, 59)
            continue

        # Handle List Items
        if re.match(r'^[-*]\s+', line):
            content = re.sub(r'^[-*]\s+', '', line)
            p = doc.add_paragraph(style='List Bullet')
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(3)
            p.paragraph_format.line_spacing = 1.25
            
            # format bold inside list
            parts = re.split(r'(\*\*.*?\*\*)', content)
            for part in parts:
                if part.startswith('**') and part.endswith('**'):
                    r = p.add_run(part[2:-2])
                    r.font.name = 'Times New Roman'
                    r.font.bold = True
                else:
                    r = p.add_run(part)
                    r.font.name = 'Times New Roman'
            continue

        if re.match(r'^\d+\.\s+', line):
            content = re.sub(r'^\d+\.\s+', '', line)
            p = doc.add_paragraph(style='List Number')
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(3)
            p.paragraph_format.line_spacing = 1.25
            
            parts = re.split(r'(\*\*.*?\*\*)', content)
            for part in parts:
                if part.startswith('**') and part.endswith('**'):
                    r = p.add_run(part[2:-2])
                    r.font.name = 'Times New Roman'
                    r.font.bold = True
                else:
                    r = p.add_run(part)
                    r.font.name = 'Times New Roman'
            continue

        # Handle Regular Paragraphs
        clean_line = line.strip()
        if not clean_line:
            continue

        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.35
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

        # Check if diagram insertion can happen in Chapter 6
        if "Figure 6.1: Four-Tier Enterprise Software Architecture" in clean_line and os.path.exists("architecture_diagram.png"):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.paragraph_format.space_before = Pt(8)
            p_img.paragraph_format.space_after = Pt(4)
            p_img.add_run().add_picture("architecture_diagram.png", width=Inches(6.2))

        # Parse inline markdown formatting (bold, italics, code)
        parts = re.split(r'(\*\*.*?\*\*|\*.*?\*|`.*?`)', clean_line)
        for part in parts:
            if part.startswith('**') and part.endswith('**'):
                r = p.add_run(part[2:-2])
                r.font.name = 'Times New Roman'
                r.font.bold = True
            elif part.startswith('*') and part.endswith('*'):
                r = p.add_run(part[1:-1])
                r.font.name = 'Times New Roman'
                r.font.italic = True
            elif part.startswith('`') and part.endswith('`'):
                r = p.add_run(part[1:-1])
                r.font.name = 'Consolas'
                r.font.size = Pt(10)
                r.font.color.rgb = RGBColor(13, 148, 136)
            else:
                r = p.add_run(part)
                r.font.name = 'Times New Roman'

    # Save to Word Document
    output_filename = "FINAL_CONSOLIDATED_PROJECT_REPORT.docx"
    doc.save(output_filename)
    print(f"[SUCCESS] Created {output_filename}")

if __name__ == '__main__':
    create_report_docx()
