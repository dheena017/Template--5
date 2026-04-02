"""
FAQ PDF Export Service
Handles PDF generation for FAQ exports
"""

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib import colors
from io import BytesIO
from datetime import datetime
import os
from typing import Optional


class FAQPDFExporter:
    """Generate PDF exports for FAQ documents"""
    
    # PDF Styling
    TITLE_FONT_SIZE = 24
    SUBTITLE_FONT_SIZE = 14
    HEADING_FONT_SIZE = 16
    BODY_FONT_SIZE = 11
    
    # Colors
    COLOR_PRIMARY = colors.HexColor('#6366f1')  # Indigo
    COLOR_SECONDARY = colors.HexColor('#64748b')  # Slate
    COLOR_BORDER = colors.HexColor('#e2e8f0')  # Light gray
    
    @staticmethod
    def export_single_faq(
        faq: dict,
        output_path: str = None
    ) -> Optional[str]:
        """
        Export single FAQ to PDF
        
        Args:
            faq: FAQ dictionary with question, answer, etc
            output_path: Path to save PDF (optional)
            
        Returns:
            Path to generated PDF or bytes
        """
        
        # Create output path if not provided
        if output_path is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_path = f"exports/faq_{timestamp}.pdf"
            os.makedirs("exports", exist_ok=True)
        
        # Create PDF
        doc = SimpleDocTemplate(
            output_path,
            pagesize=letter,
            rightMargin=0.75*inch,
            leftMargin=0.75*inch,
            topMargin=1*inch,
            bottomMargin=0.75*inch
        )
        
        # Container for PDF elements
        elements = []
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=FAQPDFExporter.TITLE_FONT_SIZE,
            textColor=FAQPDFExporter.COLOR_PRIMARY,
            spaceAfter=12,
            alignment=TA_LEFT,
            fontName='Helvetica-Bold'
        )
        
        question_style = ParagraphStyle(
            'QuestionStyle',
            parent=styles['Heading2'],
            fontSize=FAQPDFExporter.HEADING_FONT_SIZE,
            textColor=FAQPDFExporter.COLOR_PRIMARY,
            spaceAfter=12,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        )
        
        answer_style = ParagraphStyle(
            'AnswerStyle',
            parent=styles['Normal'],
            fontSize=FAQPDFExporter.BODY_FONT_SIZE,
            alignment=TA_JUSTIFY,
            spaceAfter=12,
            leading=14
        )
        
        metadata_style = ParagraphStyle(
            'Metadata',
            parent=styles['Normal'],
            fontSize=9,
            textColor=FAQPDFExporter.COLOR_SECONDARY,
            spaceAfter=6
        )
        
        # Add header
        elements.append(Paragraph("FAQ Documentation", title_style))
        elements.append(Spacer(1, 0.3*inch))
        
        # Add question
        elements.append(Paragraph(f"<b>Q: {faq['question']}</b>", question_style))
        
        # Add answer
        answer_text = faq['answer'].replace('\n', '<br/>')
        elements.append(Paragraph(f"<b>A:</b> {answer_text}", answer_style))
        
        # Add metadata
        if faq.get('difficulty'):
            difficulty_color = FAQPDFExporter._get_difficulty_color(faq['difficulty'])
            elements.append(
                Paragraph(
                    f"<font color='{difficulty_color}'><b>Difficulty:</b> {faq['difficulty'].upper()}</font>",
                    metadata_style
                )
            )
        
        if faq.get('tags'):
            tags_text = ", ".join(faq['tags'])
            elements.append(Paragraph(f"<b>Tags:</b> {tags_text}", metadata_style))
        
        if faq.get('tips'):
            elements.append(Spacer(1, 0.15*inch))
            tip_style = ParagraphStyle(
                'TipStyle',
                parent=styles['Normal'],
                fontSize=10,
                textColor=colors.HexColor('#f59e0b'),
                leftIndent=20,
                spaceAfter=12,
                borderPadding=10,
                borderColor=colors.HexColor('#fed7aa'),
                borderWidth=1,
                borderRadius=5
            )
            elements.append(Paragraph(f"<b>💡 Tip:</b> {faq['tips']}", tip_style))
        
        # Add footer
        elements.append(Spacer(1, 0.5*inch))
        footer_text = f"<font size=8 color='{FAQPDFExporter.COLOR_SECONDARY}'>Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | TextAI Support System</font>"
        elements.append(Paragraph(footer_text, styles['Normal']))
        
        # Build PDF
        doc.build(elements)
        
        return output_path
    
    @staticmethod
    def export_multiple_faqs(
        faqs: list,
        category_name: str = "FAQ Documentation",
        output_path: str = None
    ) -> Optional[str]:
        """
        Export multiple FAQs to single PDF
        
        Args:
            faqs: List of FAQ dictionaries
            category_name: Name of the category/document
            output_path: Path to save PDF
            
        Returns:
            Path to generated PDF
        """
        
        if output_path is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_path = f"exports/faq_bundle_{timestamp}.pdf"
            os.makedirs("exports", exist_ok=True)
        
        doc = SimpleDocTemplate(
            output_path,
            pagesize=letter,
            rightMargin=0.75*inch,
            leftMargin=0.75*inch,
            topMargin=1*inch,
            bottomMargin=0.75*inch
        )
        
        elements = []
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=28,
            textColor=FAQPDFExporter.COLOR_PRIMARY,
            spaceAfter=6,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        )
        
        subtitle_style = ParagraphStyle(
            'Subtitle',
            parent=styles['Normal'],
            fontSize=12,
            textColor=FAQPDFExporter.COLOR_SECONDARY,
            spaceAfter=20,
            alignment=TA_CENTER
        )
        
        question_style = ParagraphStyle(
            'QuestionStyle',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=FAQPDFExporter.COLOR_PRIMARY,
            spaceAfter=10,
            spaceBefore=16,
            fontName='Helvetica-Bold',
            borderColor=FAQPDFExporter.COLOR_BORDER,
            borderWidth=0,
            borderPadding=8
        )
        
        answer_style = ParagraphStyle(
            'AnswerStyle',
            parent=styles['Normal'],
            fontSize=10,
            alignment=TA_JUSTIFY,
            spaceAfter=10,
            leading=12
        )
        
        # Add title page
        elements.append(Paragraph(category_name, title_style))
        elements.append(
            Paragraph(
                f"<i>Generated on {datetime.now().strftime('%B %d, %Y at %H:%M')}</i>",
                subtitle_style
            )
        )
        elements.append(Spacer(1, 0.3*inch))
        elements.append(
            Paragraph(
                f"<b>Total FAQs:</b> {len(faqs)}",
                styles['Normal']
            )
        )
        elements.append(PageBreak())
        
        # Add table of contents
        elements.append(Paragraph("Table of Contents", ParagraphStyle(
            'TOC',
            parent=styles['Heading1'],
            fontSize=16,
            textColor=FAQPDFExporter.COLOR_PRIMARY,
            spaceAfter=12
        )))
        
        toc_items = []
        for idx, faq in enumerate(faqs, 1):
            toc_items.append(f"{idx}. {faq['question']}")
        
        for item in toc_items:
            elements.append(Paragraph(item, styles['Normal']))
        
        elements.append(PageBreak())
        
        # Add FAQ content
        for idx, faq in enumerate(faqs, 1):
            elements.append(
                Paragraph(f"{idx}. {faq['question']}", question_style)
            )
            
            answer_text = faq['answer'].replace('\n', '<br/>')
            elements.append(Paragraph(answer_text, answer_style))
            
            # Add metadata
            metadata_items = []
            if faq.get('difficulty'):
                metadata_items.append(f"<b>Difficulty:</b> {faq['difficulty']}")
            if faq.get('views'):
                metadata_items.append(f"<b>Views:</b> {faq['views']}")
            if faq.get('tags'):
                metadata_items.append(f"<b>Tags:</b> {', '.join(faq['tags'])}")
            
            if metadata_items:
                metadata_text = " | ".join(metadata_items)
                elements.append(
                    Paragraph(metadata_text, styles['Normal'])
                )
            
            elements.append(Spacer(1, 0.2*inch))
        
        # Build PDF
        doc.build(elements)
        
        return output_path
    
    @staticmethod
    def export_to_bytes(faq: dict) -> bytes:
        """
        Export FAQ to PDF bytes (for streaming response)
        
        Args:
            faq: FAQ dictionary
            
        Returns:
            PDF as bytes
        """
        
        buffer = BytesIO()
        
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        elements = []
        styles = getSampleStyleSheet()
        
        # Add content
        title_style = styles['Heading1']
        elements.append(Paragraph(f"Q: {faq['question']}", title_style))
        elements.append(Spacer(1, 0.2*inch))
        elements.append(Paragraph(f"A: {faq['answer']}", styles['Normal']))
        
        # Build PDF into buffer
        doc.build(elements)
        buffer.seek(0)
        
        return buffer.getvalue()
    
    @staticmethod
    def _get_difficulty_color(difficulty: str) -> str:
        """Get color code for difficulty level"""
        
        difficulty_colors = {
            'easy': '#10b981',      # Green
            'medium': '#f59e0b',    # Amber
            'hard': '#ef4444'       # Red
        }
        
        return difficulty_colors.get(difficulty.lower(), '#6366f1')
    
    @staticmethod
    def generate_export_summary(faqs: list) -> dict:
        """Generate summary statistics for export"""
        
        total_words = sum(
            len(faq['answer'].split()) for faq in faqs
        )
        
        difficulty_count = {
            'easy': len([f for f in faqs if f.get('difficulty') == 'easy']),
            'medium': len([f for f in faqs if f.get('difficulty') == 'medium']),
            'hard': len([f for f in faqs if f.get('difficulty') == 'hard']),
        }
        
        total_tags = sum(
            len(faq.get('tags', [])) for faq in faqs
        )
        
        return {
            'total_faqs': len(faqs),
            'total_words': total_words,
            'average_length': round(total_words / len(faqs)) if faqs else 0,
            'difficulty_breakdown': difficulty_count,
            'total_tags': total_tags,
            'generated_at': datetime.now().isoformat()
        }


# Service function for backend integration
def export_faq_pdf(faq_data: dict, export_format: str = 'single') -> dict:
    """
    Main function to export FAQ to PDF
    
    Args:
        faq_data: FAQ information
        export_format: 'single' or 'multiple'
        
    Returns:
        Dictionary with export status and path
    """
    
    try:
        if export_format == 'single':
            pdf_path = FAQPDFExporter.export_single_faq(faq_data)
        else:
            pdf_path = FAQPDFExporter.export_multiple_faqs(faq_data)
        
        return {
            'status': 'success',
            'path': pdf_path,
            'format': 'pdf',
            'timestamp': datetime.now().isoformat()
        }
    
    except Exception as e:
        return {
            'status': 'error',
            'message': str(e),
            'timestamp': datetime.now().isoformat()
        }
