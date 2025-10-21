from rest_framework import serializers
from .models import Media

class MediaSerializer(serializers.ModelSerializer):
    file_url = serializers.ReadOnlyField()

    class Meta:
        model = Media
        fields = ['id', 'type', 'file', 'file_url', 'caption', 'created_at']