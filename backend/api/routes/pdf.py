from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response
from typing import List, Optional, Any, Dict
from ..services import pdf_service, analytics_service
import io
import json

router = APIRouter(prefix="/api/pdf", tags=["PDF Engine"])

@router.post("/merge")
async def merge_pdf(
    files: List[UploadFile] = File(...),
    page_orders: Optional[str] = Form(None)
):
    """
    Expert-level PDF Merging
    - [files]: List of PDF binaries
    - [page_orders]: Optional JSON array of lists e.g. "[[0,2],[1]]"
    """
    # 1. Parse optional page orders
    try: 
        parsed_orders = json.loads(page_orders) if page_orders else None
    except: 
        parsed_orders = None

    # 2. Convert FastAPI UploadFiles to BytesIO
    buffers = []
    for f in files:
        if f.content_type != "application/pdf":
            raise HTTPException(400, detail=f"File {f.filename} is not a PDF")
        
        contents = await f.read()
        buffers.append(io.BytesIO(contents))

    # 3. Process the merge
    try:
        if len(buffers) < 2:
            raise HTTPException(400, detail="At least 2 PDF files are required.")
            
        output = pdf_service.merge_pdfs(buffers, parsed_orders)
        
        # Record analytics
        analytics_service.record_activity(
            action="PDF Merge", 
            target=f"{len(files)} files", 
            engine="pdf",
            pages=sum([len(f.getbuffer()) // 100000 for f in buffers]) # Rough estimate
        )

        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="merged.pdf"'}
        )
    except Exception as e:
        raise HTTPException(500, detail=f"Merge Engine Error: {str(e)}")

@router.post("/optimize")
async def optimize_pdf(file: UploadFile = File(...)):
    """Compress and clean PDF metadata"""
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
        
    contents = await file.read()
    output = pdf_service.optimize_pdf(io.BytesIO(contents))
    
    analytics_service.record_activity(
        action="PDF Optimize",
        target=file.filename,
        engine="pdf",
        saved_mb=len(contents) // (1024 * 1024)
    )

    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="optimized.pdf"'}
    )

@router.post("/protect")
async def protect_pdf(file: UploadFile = File(...), password: str = Form(...)):
    """Apply password protection"""
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    
    contents = await file.read()
    output = pdf_service.protect_pdf(io.BytesIO(contents), password)
    
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="protected.pdf"'}
    )

@router.post("/split")
async def split_pdf(
    file: UploadFile = File(...),
    mode: str = Form(...), # 'every', 'ranges', 'all'
    interval: Optional[int] = Form(None),
    ranges: Optional[str] = Form(None)
):
    """
    Split PDF into multiple parts and return as ZIP
    """
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
        
    contents = await file.read()
    options = {
        'interval': interval,
        'ranges': ranges
    }
    
    split_results = pdf_service.split_pdf(io.BytesIO(contents), mode, options)
    
    if not split_results:
        raise HTTPException(400, detail="No pages were split. Check your parameters.")

    # Create ZIP in memory
    import zipfile
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for filename, buf in split_results:
            zip_file.writestr(filename, buf.read())
            
    zip_buffer.seek(0)
    
    return Response(
        content=zip_buffer.read(),
        media_type="application/zip",
        headers={"Content-Disposition": 'attachment; filename="split_pdfs.zip"'}
    )

@router.post("/to-pdf")
async def convert_to_pdf(files: List[UploadFile] = File(...)):
    """Convert multiple images into a combined PDF document."""
    buffers = [io.BytesIO(await f.read()) for f in files]
    output = pdf_service.convert_images_to_pdf(buffers)
    
    analytics_service.record_activity(
        action="Image to PDF",
        target=f"{len(files)} files",
        engine="api"
    )

    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="converted.pdf"'}
    )

@router.post("/remove-pages")
async def remove_pages(
    file: UploadFile = File(...),
    pages: str = Form(...) # comma-separated 0-indexed ints
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    pages_list = [int(p.strip()) for p in pages.split(',')]
    output = pdf_service.remove_pages(io.BytesIO(contents), pages_list)
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="removed_pages.pdf"'}
    )

@router.post("/extract-pages")
async def extract_pages(
    file: UploadFile = File(...),
    pages: str = Form(...) # comma-separated 0-indexed ints
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    pages_list = [int(p.strip()) for p in pages.split(',')]
    output = pdf_service.extract_pages(io.BytesIO(contents), pages_list)
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="extracted_pages.pdf"'}
    )

@router.post("/rotate")
async def rotate(
    file: UploadFile = File(...),
    degrees: int = Form(...)
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    output = pdf_service.rotate_pdf(io.BytesIO(contents), degrees)
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="rotated.pdf"'}
    )

@router.post("/unlock")
async def unlock(
    file: UploadFile = File(...),
    password: str = Form(...)
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    output = pdf_service.unlock_pdf(io.BytesIO(contents), password)
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="unlocked.pdf"'}
    )

@router.post("/sign")
async def sign(
    file: UploadFile = File(...),
    name: str = Form("Aura User")
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    output = pdf_service.sign_pdf(io.BytesIO(contents), name)
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="signed.pdf"'}
    )

@router.post("/redact")
async def redact(
    file: UploadFile = File(...),
    keywords: str = Form("")
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    kw_list = [k.strip() for k in keywords.split(',') if k.strip()]
    output = pdf_service.redact_pdf(io.BytesIO(contents), kw_list)
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="redacted.pdf"'}
    )
