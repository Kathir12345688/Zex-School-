from django.contrib import admin
from django.utils.html import format_html

from .models import Academic, AboutSection, Activity, Admission, Event, Facility, HeroSection, Testimonial


class ImagePreviewMixin:
    def preview_image(self, obj):
        image_field = getattr(obj, 'image', None) or getattr(obj, 'background_image', None) or getattr(obj, 'photo', None)
        if image_field:
            return format_html('<img src="{}" width="60" height="60" style="object-fit:cover; border-radius:4px;" />', image_field.url)
        return '-'

    preview_image.short_description = 'Preview'


@admin.register(HeroSection)
class HeroSectionAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ('title', 'is_active', 'preview_image', 'created_at')
    search_fields = ('title', 'subtitle', 'description')
    list_filter = ('is_active',)
    ordering = ('-is_active', '-created_at')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(AboutSection)
class AboutSectionAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ('heading', 'preview_image', 'created_at')
    search_fields = ('heading', 'description', 'mission', 'vision', 'principal_message')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Facility)
class FacilityAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ('title', 'display_order', 'is_active', 'preview_image', 'created_at')
    search_fields = ('title', 'description', 'icon')
    list_filter = ('is_active',)
    ordering = ('display_order', 'title')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Academic)
class AcademicAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ('title', 'display_order', 'is_active', 'preview_image', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('is_active',)
    ordering = ('display_order', 'title')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Activity)
class ActivityAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ('title', 'display_order', 'is_active', 'preview_image', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('is_active',)
    ordering = ('display_order', 'title')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Event)
class EventAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ('title', 'event_date', 'location', 'is_featured', 'is_active', 'preview_image', 'created_at')
    search_fields = ('title', 'description', 'location')
    list_filter = ('is_featured', 'is_active', 'event_date')
    ordering = ('-event_date',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Admission)
class AdmissionAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'created_at')
    search_fields = ('title', 'description', 'eligibility', 'required_documents')
    list_filter = ('is_active',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Testimonial)
class TestimonialAdmin(ImagePreviewMixin, admin.ModelAdmin):
    list_display = ('name', 'role', 'rating', 'display_order', 'is_active', 'preview_image', 'created_at')
    search_fields = ('name', 'role', 'message')
    list_filter = ('is_active', 'rating')
    ordering = ('display_order', 'name')
    readonly_fields = ('created_at', 'updated_at')
