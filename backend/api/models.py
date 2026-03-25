from django.db import models

class Feature(models.Model):
    title = models.CharField(max_length=100)
    icon = models.CharField(max_length=50) # Emoji or SVG path
    badge = models.CharField(max_length=20, blank=True, null=True)
    category = models.CharField(max_length=50, default='General')
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
