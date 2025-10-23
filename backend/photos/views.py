from rest_framework import generics, permissions
from .models import Media
from .serializers import MediaSerializer

class MediaListCreateView(generics.ListAPIView):
    serializer_class = MediaSerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
        # Only return media belonging to the logged-in user
        return Media.objects.filter(user=self.request.user)