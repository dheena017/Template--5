from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Query
from fastapi.responses import Response
from typing import List, Optional, Any, Dict
from ..services import pdf_service, analytics_service
from ..services.conversion_history_service import ConversionHistoryService
import io
import json
from backend.api.models.database_models import PDFOperation
from backend.core.db import get_db
from sqlalchemy.orm import Session


PDF_TOOL_CATALOG = [
    {"conversion_key": "pdf_merge", "label": "Merge PDFs", "engine": "pdf_service.merge_pdfs", "supported": True, "accepts_multiple_files": True, "output": "pdf"},
    {"conversion_key": "image_to_pdf", "label": "Images to PDF", "engine": "pdf_service.convert_images_to_pdf", "supported": True, "accepts_multiple_files": True, "output": "pdf"},
    {"conversion_key": "pdf_optimize", "label": "Optimize PDF", "engine": "pdf_service.optimize_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_protect", "label": "Protect PDF", "engine": "pdf_service.protect_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_unlock", "label": "Unlock PDF", "engine": "pdf_service.unlock_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_sign", "label": "Sign PDF", "engine": "pdf_service.sign_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_redact", "label": "Redact PDF", "engine": "pdf_service.redact_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_remove_pages", "label": "Remove Pages", "engine": "pdf_service.remove_pages", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_extract_pages", "label": "Extract Pages", "engine": "pdf_service.extract_pages", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_rotate", "label": "Rotate PDF", "engine": "pdf_service.rotate_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_to_word", "label": "PDF to Word", "engine": "pdf_service.convert_pdf_to_word", "supported": True, "accepts_multiple_files": False, "output": "docx"},
    {"conversion_key": "pdf_split", "label": "Split PDF", "engine": "pdf_service.split_pdf", "supported": True, "accepts_multiple_files": False, "output": "zip"},
    {"conversion_key": "pdf_compression", "label": "Compress PDF", "engine": "pdf_service.optimize_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_encryption", "label": "Encrypt PDF", "engine": "pdf_service.protect_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_decryption", "label": "Decrypt PDF", "engine": "pdf_service.unlock_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "jpg_to_pdf", "label": "JPG to PDF", "engine": "pdf_service.convert_images_to_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "png_to_pdf", "label": "PNG to PDF", "engine": "pdf_service.convert_images_to_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "word_to_pdf", "label": "Word to PDF", "engine": "pdf_service.convert_word_to_pdf", "supported": True, "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "excel_to_pdf", "label": "Excel to PDF", "engine": "backend.client", "supported": False, "reason": "Excel to PDF requires spreadsheet rendering support.", "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "ppt_to_pdf", "label": "PPT to PDF", "engine": "backend.client", "supported": False, "reason": "PPT to PDF requires presentation rendering support.", "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_to_excel", "label": "PDF to Excel", "engine": "backend.client", "supported": False, "reason": "PDF to Excel table extraction is not implemented yet.", "accepts_multiple_files": False, "output": "xlsx"},
    {"conversion_key": "pdf_to_ppt", "label": "PDF to PPT", "engine": "backend.client", "supported": False, "reason": "PDF to PPT conversion is not implemented yet.", "accepts_multiple_files": False, "output": "pptx"},
    {"conversion_key": "pdf_to_jpg", "label": "PDF to JPG", "engine": "backend.client", "supported": False, "reason": "PDF rasterization is not implemented on backend yet.", "accepts_multiple_files": False, "output": "jpg"},
    {"conversion_key": "pdf_to_ofd", "label": "PDF to OFD", "engine": "backend.client", "supported": False, "reason": "OFD conversion is not implemented yet.", "accepts_multiple_files": False, "output": "ofd"},
    {"conversion_key": "ofd_to_pdf", "label": "OFD to PDF", "engine": "backend.client", "supported": False, "reason": "OFD conversion is not implemented yet.", "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_to_cad", "label": "PDF to CAD", "engine": "backend.client", "supported": False, "reason": "CAD conversion is not implemented yet.", "accepts_multiple_files": False, "output": "dwg"},
    {"conversion_key": "cad_to_pdf", "label": "CAD to PDF", "engine": "backend.client", "supported": False, "reason": "CAD conversion is not implemented yet.", "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "caj_to_pdf", "label": "CAJ to PDF", "engine": "backend.client", "supported": False, "reason": "CAJ conversion is not implemented yet.", "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "caj_to_word", "label": "CAJ to Word", "engine": "backend.client", "supported": False, "reason": "CAJ conversion is not implemented yet.", "accepts_multiple_files": False, "output": "docx"},
    {"conversion_key": "pdf_to_long_image", "label": "PDF to Long Image", "engine": "backend.client", "supported": False, "reason": "Long image rendering is not implemented on backend yet.", "accepts_multiple_files": False, "output": "png"},
    {"conversion_key": "pdf_english_chinese", "label": "PDF English to Chinese", "engine": "backend.client", "supported": False, "reason": "PDF translation workflow is not implemented yet.", "accepts_multiple_files": False, "output": "pdf"},
    {"conversion_key": "pdf_chinese_english", "label": "PDF Chinese to English", "engine": "backend.client", "supported": False, "reason": "PDF translation workflow is not implemented yet.", "accepts_multiple_files": False, "output": "pdf"},
]

UNSUPPORTED_CONVERSIONS = {
    item["conversion_key"]: item.get("reason", "Conversion is not implemented yet.")
    for item in PDF_TOOL_CATALOG
    if item.get("supported") is False
}


def _record_pdf_operation(db: Session, operation_type: str, file_count: int = 1, status: str = 'SUCCESS', file_size_mb: float | None = None):
    try:
        db.add(PDFOperation(
            operation_type=operation_type,
            file_count=file_count,
            file_size_mb=file_size_mb,
            status=status,
        ))
        db.commit()
    except Exception:
        db.rollback()

router = APIRouter(prefix="/api/pdf", tags=["PDF Engine"])

@router.post("/merge")
async def merge_pdf(
    files: List[UploadFile] = File(...),
    page_orders: Optional[str] = Form(None),
    db: Session = Depends(get_db)
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
        _record_pdf_operation(db, 'merge', len(files), 'SUCCESS')

        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="merged.pdf"'}
        )
    except Exception as e:
        raise HTTPException(500, detail=f"Merge Engine Error: {str(e)}")

@router.post("/optimize")
async def optimize_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
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
    _record_pdf_operation(db, 'optimize', 1, 'SUCCESS', len(contents) / (1024 * 1024))

    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="optimized.pdf"'}
    )

@router.post("/protect")
async def protect_pdf(file: UploadFile = File(...), password: str = Form(...), db: Session = Depends(get_db)):
    """Apply password protection"""
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    
    contents = await file.read()
    output = pdf_service.protect_pdf(io.BytesIO(contents), password)
    _record_pdf_operation(db, 'protect', 1, 'SUCCESS', len(contents) / (1024 * 1024))
    
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
    ranges: Optional[str] = Form(None),
    db: Session = Depends(get_db)
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

    _record_pdf_operation(db, 'split', 1, 'SUCCESS')
            
    zip_buffer.seek(0)
    
    return Response(
        content=zip_buffer.read(),
        media_type="application/zip",
        headers={"Content-Disposition": 'attachment; filename="split_pdfs.zip"'}
    )

@router.post("/to-pdf")
async def convert_to_pdf(files: List[UploadFile] = File(...), db: Session = Depends(get_db)):
    """Convert multiple images into a combined PDF document."""
    buffers = [io.BytesIO(await f.read()) for f in files]
    output = pdf_service.convert_images_to_pdf(buffers)
    
    analytics_service.record_activity(
        action="Image to PDF",
        target=f"{len(files)} files",
        engine="api"
    )
    _record_pdf_operation(db, 'to-pdf', len(files), 'SUCCESS')

    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="converted.pdf"'}
    )

@router.post("/remove-pages")
async def remove_pages(
    file: UploadFile = File(...),
    pages: str = Form(...), # comma-separated 0-indexed ints
    db: Session = Depends(get_db)
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    pages_list = [int(p.strip()) for p in pages.split(',')]
    output = pdf_service.remove_pages(io.BytesIO(contents), pages_list)
    _record_pdf_operation(db, 'remove-pages', 1, 'SUCCESS')
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="removed_pages.pdf"'}
    )

@router.post("/extract-pages")
async def extract_pages(
    file: UploadFile = File(...),
    pages: str = Form(...), # comma-separated 0-indexed ints
    db: Session = Depends(get_db)
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    pages_list = [int(p.strip()) for p in pages.split(',')]
    output = pdf_service.extract_pages(io.BytesIO(contents), pages_list)
    _record_pdf_operation(db, 'extract-pages', 1, 'SUCCESS')
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="extracted_pages.pdf"'}
    )

@router.post("/rotate")
async def rotate(
    file: UploadFile = File(...),
    degrees: int = Form(...),
    db: Session = Depends(get_db)
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    output = pdf_service.rotate_pdf(io.BytesIO(contents), degrees)
    _record_pdf_operation(db, 'rotate', 1, 'SUCCESS')
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="rotated.pdf"'}
    )

@router.post("/unlock")
async def unlock(
    file: UploadFile = File(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    output = pdf_service.unlock_pdf(io.BytesIO(contents), password)
    _record_pdf_operation(db, 'unlock', 1, 'SUCCESS')
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="unlocked.pdf"'}
    )

@router.post("/sign")
async def sign(
    file: UploadFile = File(...),
    name: str = Form("Aura User"),
    db: Session = Depends(get_db)
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    output = pdf_service.sign_pdf(io.BytesIO(contents), name)
    _record_pdf_operation(db, 'sign', 1, 'SUCCESS')
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="signed.pdf"'}
    )

@router.post("/redact")
async def redact(
    file: UploadFile = File(...),
    keywords: str = Form(""),
    db: Session = Depends(get_db)
):
    if file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")
    contents = await file.read()
    kw_list = [k.strip() for k in keywords.split(',') if k.strip()]
    output = pdf_service.redact_pdf(io.BytesIO(contents), kw_list)
    _record_pdf_operation(db, 'redact', 1, 'SUCCESS')
    return Response(
        content=output.read(),
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="redacted.pdf"'}
    )


@router.get("/tools")
async def get_tools():
    """Return the available PDF tool catalog for the frontend."""

    return {
        "status": "success",
        "items": PDF_TOOL_CATALOG,
    }


@router.get("/catalog")
async def get_catalog():
    """Alias for the PDF tool catalog."""

    return await get_tools()


@router.post("/convert")
async def universal_convert(
    file: UploadFile = File(...),
    target_format: Optional[str] = Form(None),
    target_format_query: Optional[str] = Query(None, alias="target_format"),
    pages: Optional[str] = Form(None),
    degrees: Optional[int] = Form(None),
    password: Optional[str] = Form(None),
    name: Optional[str] = Form(None),
    keywords: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """Universal PDF conversion endpoint used by the frontend conversion hub."""

    effective_target = (target_format_query or target_format)
    if not effective_target:
        raise HTTPException(400, detail="target_format is required")

    operation = effective_target.lower().strip()

    if operation in UNSUPPORTED_CONVERSIONS:
        raise HTTPException(501, detail=UNSUPPORTED_CONVERSIONS[operation])

    image_to_pdf_ops = {'image_to_pdf', 'to_pdf', 'to-pdf', 'jpg_to_pdf', 'png_to_pdf'}
    word_to_pdf_ops = {'word_to_pdf'}

    if operation in word_to_pdf_ops:
        valid_docx_types = {
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
            'application/octet-stream',
        }
        if file.content_type not in valid_docx_types and not str(file.filename or '').lower().endswith('.docx'):
            raise HTTPException(400, detail='Invalid DOCX file type')
    elif operation not in image_to_pdf_ops and file.content_type != "application/pdf":
        raise HTTPException(400, detail="Invalid file type")

    contents = await file.read()
    buffer = io.BytesIO(contents)

    if operation in {'pdf_merge', 'merge'}:
        raise HTTPException(400, detail="Use /merge for combining multiple PDFs")

    if operation in {'pdf_to_word', 'docx', 'word'}:
        output = pdf_service.convert_pdf_to_word(buffer)
        _record_pdf_operation(db, 'pdf_to_word', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": 'attachment; filename="converted.docx"'}
        )

    if operation in word_to_pdf_ops:
        output = pdf_service.convert_word_to_pdf(buffer)
        _record_pdf_operation(db, 'word_to_pdf', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="converted.pdf"'}
        )

    if operation in {'pdf_merge'}:
        raise HTTPException(400, detail="Use /merge for merging multiple PDFs")

    if operation in {'pdf_split', 'split'}:
        split_results = pdf_service.split_pdf(buffer, mode='all', options={})
        if not split_results:
            raise HTTPException(400, detail="No pages found to split")

        import zipfile
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
            for filename, buf in split_results:
                zip_file.writestr(filename, buf.read())
        zip_buffer.seek(0)

        _record_pdf_operation(db, 'split', 1, 'SUCCESS')
        return Response(
            content=zip_buffer.read(),
            media_type="application/zip",
            headers={"Content-Disposition": 'attachment; filename="split_pdfs.zip"'}
        )

    if operation in {'pdf_optimize', 'compress', 'pdf_compression'}:
        output = pdf_service.optimize_pdf(buffer)
        _record_pdf_operation(db, 'optimize', 1, 'SUCCESS', len(contents) / (1024 * 1024))
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="optimized.pdf"'}
        )

    if operation in {'pdf_protect', 'protect', 'pdf_encryption'}:
        if not password:
            raise HTTPException(400, detail="Password is required")
        output = pdf_service.protect_pdf(buffer, password)
        _record_pdf_operation(db, 'protect', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="protected.pdf"'}
        )

    if operation in {'pdf_unlock', 'unlock', 'pdf_decryption'}:
        if not password:
            raise HTTPException(400, detail="Password is required")
        output = pdf_service.unlock_pdf(buffer, password)
        _record_pdf_operation(db, 'unlock', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="unlocked.pdf"'}
        )

    if operation in {'pdf_sign', 'sign'}:
        output = pdf_service.sign_pdf(buffer, name or 'Aura User')
        _record_pdf_operation(db, 'sign', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="signed.pdf"'}
        )

    if operation in {'pdf_redact', 'redact'}:
        kw_list = [k.strip() for k in (keywords or '').split(',') if k.strip()]
        output = pdf_service.redact_pdf(buffer, kw_list)
        _record_pdf_operation(db, 'redact', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="redacted.pdf"'}
        )

    if operation in {'pdf_remove_pages', 'remove-pages'}:
        pages_list = [int(p.strip()) for p in (pages or '').split(',') if p.strip()]
        output = pdf_service.remove_pages(buffer, pages_list)
        _record_pdf_operation(db, 'remove-pages', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="removed_pages.pdf"'}
        )

    if operation in {'pdf_extract_pages', 'extract-pages'}:
        pages_list = [int(p.strip()) for p in (pages or '').split(',') if p.strip()]
        output = pdf_service.extract_pages(buffer, pages_list)
        _record_pdf_operation(db, 'extract-pages', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="extracted_pages.pdf"'}
        )

    if operation in {'pdf_rotate', 'rotate'}:
        output = pdf_service.rotate_pdf(buffer, degrees or 90)
        _record_pdf_operation(db, 'rotate', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="rotated.pdf"'}
        )

    if operation in image_to_pdf_ops:
        output = pdf_service.convert_images_to_pdf([buffer])
        _record_pdf_operation(db, 'to-pdf', 1, 'SUCCESS')
        return Response(
            content=output.read(),
            media_type="application/pdf",
            headers={"Content-Disposition": 'attachment; filename="converted.pdf"'}
        )

    raise HTTPException(
        status_code=400,
        detail=f"Unsupported conversion target: {effective_target}"
    )


# ============================================================================
# CONVERSION HISTORY ENDPOINTS (Phase 2)
# ============================================================================

@router.get("/history")
async def get_conversion_history(
    conversion_key: Optional[str] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db)
):
    """Retrieve recent conversions from history."""
    try:
        records = ConversionHistoryService.get_recent_conversions(
            db,
            conversion_key=conversion_key,
            limit=limit,
            days=days
        )
        return {
            "status": "success",
            "total": len(records),
            "items": [
                {
                    "id": r.id,
                    "conversion_key": r.conversion_key,
                    "from_format": r.from_format,
                    "to_format": r.to_format,
                    "file_name": r.file_name,
                    "file_size_bytes": r.file_size_bytes,
                    "output_size_bytes": r.output_size_bytes,
                    "output_url": r.output_url,
                    "status": r.status,
                    "processing_time_ms": r.processing_time_ms,
                    "created_at": r.created_at.isoformat() if r.created_at else None,
                    "accessed_at": r.accessed_at.isoformat() if r.accessed_at else None,
                }
                for r in records
            ]
        }
    except Exception as e:
        raise HTTPException(500, detail=f"Failed to retrieve history: {str(e)}")


@router.post("/history/save")
async def save_to_history(
    conversion_key: str = Form(...),
    from_format: str = Form(...),
    to_format: str = Form(...),
    file_name: str = Form(...),
    file_size_bytes: Optional[int] = Form(None),
    output_url: Optional[str] = Form(None),
    output_size_bytes: Optional[int] = Form(None),
    status: str = Form("SUCCESS"),
    processing_time_ms: Optional[int] = Form(None),
    db: Session = Depends(get_db)
):
    """Save a conversion record to history."""
    try:
        record = ConversionHistoryService.save_conversion(
            db,
            conversion_key=conversion_key,
            from_format=from_format,
            to_format=to_format,
            file_name=file_name,
            file_size_bytes=file_size_bytes,
            output_url=output_url,
            output_size_bytes=output_size_bytes,
            status=status,
            processing_time_ms=processing_time_ms
        )
        return {
            "status": "success",
            "id": record.id,
            "message": "Conversion saved to history"
        }
    except Exception as e:
        raise HTTPException(500, detail=f"Failed to save to history: {str(e)}")


@router.get("/history/stats")
async def get_history_stats(db: Session = Depends(get_db)):
    """Get statistics about conversion history."""
    try:
        stats = ConversionHistoryService.get_stats(db)
        return {
            "status": "success",
            **stats
        }
    except Exception as e:
        raise HTTPException(500, detail=f"Failed to get stats: {str(e)}")


@router.post("/history/cleanup")
async def cleanup_old_history(
    days: int = Query(90, ge=1, le=365),
    db: Session = Depends(get_db)
):
    """Delete conversion history older than specified days."""
    try:
        deleted = ConversionHistoryService.delete_old_entries(db, days=days)
        return {
            "status": "success",
            "deleted_count": deleted,
            "message": f"Deleted {deleted} records older than {days} days"
        }
    except Exception as e:
        raise HTTPException(500, detail=f"Failed to cleanup history: {str(e)}")

