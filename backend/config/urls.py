from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "healthy", "message": "Django Backend is Online"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check),
]
