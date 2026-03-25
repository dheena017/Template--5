import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import Feature

def seed_features():
    features = [
        {'title': 'Instant speech', 'icon': '🎨', 'category': 'Audio'},
        {'title': 'Audiobook', 'icon': '📖', 'category': 'Audio'},
        {'title': 'Image & Video', 'icon': '🎬', 'category': 'Media'},
        {'title': 'ElevenAgents', 'icon': '🤖', 'category': 'AI'},
        {'title': 'Music', 'icon': '🎵', 'category': 'Audio'},
        {'title': 'Dubbed video', 'icon': '📺', 'category': 'Media'},
    ]

    for f in features:
        Feature.objects.get_or_create(title=f['title'], defaults=f)
    
    print(f"Successfully seeded {len(features)} features.")

if __name__ == '__main__':
    seed_features()
