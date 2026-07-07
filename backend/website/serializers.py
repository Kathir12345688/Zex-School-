from rest_framework import serializers

from .models import Academic, AboutSection, Activity, Admission, Event, Facility, HeroSection, Testimonial


class HeroSectionSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=False, allow_blank=True)
    subtitle = serializers.CharField(required=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = HeroSection
        fields = [
            'id', 'title', 'subtitle', 'description', 'background_image', 'button_text', 'button_link', 'is_active',
            'created_at', 'updated_at',
        ]


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = [
            'id', 'heading', 'description', 'mission', 'vision', 'image', 'principal_message',
            'created_at', 'updated_at',
        ]


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = [
            'id', 'title', 'description', 'image', 'icon', 'display_order', 'is_active',
            'created_at', 'updated_at',
        ]


class AcademicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = [
            'id', 'title', 'description', 'image', 'display_order', 'is_active',
            'created_at', 'updated_at',
        ]


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = [
            'id', 'title', 'description', 'image', 'display_order', 'is_active',
            'created_at', 'updated_at',
        ]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'image', 'event_date', 'location', 'is_featured', 'is_active',
            'created_at', 'updated_at',
        ]


class AdmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission
        fields = [
            'id', 'title', 'description', 'eligibility', 'required_documents', 'admission_process', 'brochure', 'is_active',
            'created_at', 'updated_at',
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'role', 'message', 'photo', 'rating', 'display_order', 'is_active',
            'created_at', 'updated_at',
        ]
