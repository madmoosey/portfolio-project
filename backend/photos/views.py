from rest_framework import generics, permissions
from .models import Media
from .serializers import MediaSerializer

class MediaListCreateView(generics.ListCreateAPIView):
    serializer_class = MediaSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        # Only return media belonging to the logged-in user
        # return Media.objects.filter(user=self.request.user)
        return Media.objects.all()

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the new media item
        serializer.save(user=self.request.user)