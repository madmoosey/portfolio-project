from django.contrib import admin
from django.utils.html import format_html
from .models import Media


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'type', 'caption', 'preview', 'created_at')
    list_filter = ('type', 'created_at')
    search_fields = ('caption', 'user__email')

    def preview(self, obj):
        if obj.type == 'image' and obj.file:
            return format_html('<img src="{}" width="100" />', obj.file.url)
        elif obj.type == 'video' and obj.file:
            return format_html(
                '<video width="150" height="100" controls>'
                '<source src="{}" type="video/mp4">'
                'Your browser does not support the video tag.'
                '</video>', obj.file.url
            )
        return "—"
    preview.short_description = "Preview"