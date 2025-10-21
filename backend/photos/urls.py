from django.urls import path
from .views import MediaListCreateView

urlpatterns = [
    path('media/', MediaListCreateView.as_view(), name='media-list-create'),
]