from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'features', views.FeatureViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('health', lambda r: views.Response({"status": "healthy"}), name='health'), # Placeholder for simple health check
    path('pdf/merge', views.merge_pdf_view, name='pdf-merge'),
    path('pdf/optimize', views.optimize_pdf_view, name='pdf-optimize'),
    path('pdf/protect', views.protect_pdf_view, name='pdf-protect'),
    path('pdf/extract', views.extract_text_view, name='pdf-extract'),
    path('pdf/to-pdf', views.convert_to_pdf_view, name='pdf-to-pdf'),
]
