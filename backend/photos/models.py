import re
from django.db import models
from django.conf import settings
from photos.storage_backends import PrivateMediaStorage  # 👈 import your custom S3 backend


def user_media_path(instance, filename):
    """
    Build S3 key like:
      user_uploads/<sanitized_user_email>/<filename>
    e.g. user_uploads/john_doe_at_gmail_com/photo.png
    """
    email = getattr(instance.user, "email", "unknown_user")

    # Replace unsafe characters for S3 keys
    safe_email = re.sub(r'[^a-zA-Z0-9_@.-]', '_', email)
    safe_email = safe_email.replace('@', '_at_').replace('.', '_')

    # Always use forward slashes for S3
    return f"user_uploads/{safe_email}/{filename}"


class Media(models.Model):
    MEDIA_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='media'
    )
    type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)

    # 👇 Use your PrivateMediaStorage for secure uploads
    file = models.FileField(
        storage=PrivateMediaStorage(),
        upload_to=user_media_path,
        blank=True,
        null=True
    )

    caption = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.caption or self.type}"

    @property
    def file_url(self):
        """Return presigned URL for private media file"""
        if self.file:
            return self.file.url  # django-storages will presign if AWS_QUERYSTRING_AUTH=True
        return None