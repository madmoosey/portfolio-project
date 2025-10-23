import boto3
from storages.backends.s3boto3 import S3Boto3Storage

from django.conf import settings

class StaticStorage(S3Boto3Storage):
    bucket_name = settings.AWS_S3_STATIC_BUCKET_NAME
    default_acl = "public-read"
    location = "static"
    file_overwrite = True

class PrivateMediaStorage(S3Boto3Storage):
    """
    S3 storage for private user uploads.
    Generates presigned URLs for secure access.
    """
    bucket_name = settings.AWS_S3_MEDIA_BUCKET_NAME
    location = "media"
    default_acl = "private"
    file_overwrite = False
    custom_domain = False

