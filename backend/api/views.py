from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Feature
from .serializers import FeatureSerializer
from . import pdf_service
import io

class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

@api_view(['POST'])
def merge_pdf_view(request):
    files = request.FILES.getlist('files')
    if not files:
        return Response({"error": "No files provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        output = pdf_service.merge_pdfs(files)
        response = HttpResponse(output.read(), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="merged.pdf"'
        return response
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def optimize_pdf_view(request):
    file = request.FILES.get('file')
    if not file:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        output = pdf_service.optimize_pdf(file)
        response = HttpResponse(output.read(), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="optimized.pdf"'
        return response
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def protect_pdf_view(request):
    file = request.FILES.get('file')
    password = request.data.get('password')
    if not file or not password:
        return Response({"error": "File or password missing"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        output = pdf_service.protect_pdf(file, password)
        response = HttpResponse(output.read(), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="protected.pdf"'
        return response
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def extract_text_view(request):
    file = request.FILES.get('file')
    if not file:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        text = pdf_service.extract_text(file)
        return Response({"text": text}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def convert_to_pdf_view(request):
    files = request.FILES.getlist('files') # Images
    if not files:
        return Response({"error": "No files provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        output = pdf_service.convert_img_to_pdf(files)
        response = HttpResponse(output.read(), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="converted.pdf"'
        return response
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
