import os
import io
from PyPDF2 import PdfReader, PdfWriter
from PIL import Image

def merge_pdfs(files):
    writer = PdfWriter()
    for file in files:
        reader = PdfReader(file)
        for page in reader.pages:
            writer.add_page(page)
    
    output = io.BytesIO()
    writer.write(output)
    output.seek(0)
    return output

def optimize_pdf(file):
    reader = PdfReader(file)
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    
    # Metadata stripping and compression
    writer.add_metadata({}) # Clear metadata
    
    output = io.BytesIO()
    writer.write(output)
    output.seek(0)
    return output

def protect_pdf(file, password):
    reader = PdfReader(file)
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    
    writer.encrypt(password)
    
    output = io.BytesIO()
    writer.write(output)
    output.seek(0)
    return output

def extract_text(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def convert_img_to_pdf(files):
    images = []
    for file in files:
        img = Image.open(file).convert('RGB')
        images.append(img)
    
    if not images:
        return None
        
    output = io.BytesIO()
    images[0].save(output, format='PDF', save_all=True, append_images=images[1:])
    output.seek(0)
    return output
