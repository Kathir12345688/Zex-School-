from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

from .models import Academic, AboutSection, Activity, Admission, Event, Facility, HeroSection, Testimonial
from .serializers import (
    AcademicSerializer,
    AboutSectionSerializer,
    ActivitySerializer,
    AdmissionSerializer,
    EventSerializer,
    FacilitySerializer,
    HeroSectionSerializer,
    TestimonialSerializer,
)


class PublicModelViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['display_order', 'created_at', 'event_date', 'title', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action in {'list', 'retrieve'} and hasattr(self.queryset.model, 'is_active'):
            queryset = queryset.filter(is_active=True)

        if not self.request.query_params.get('ordering'):
            model_name = self.queryset.model.__name__
            if model_name == 'Event':
                queryset = queryset.order_by('-is_featured', '-event_date', 'title')
            elif model_name in {'Facility', 'Academic', 'Activity'}:
                queryset = queryset.order_by('display_order', 'title')
            elif model_name == 'Testimonial':
                queryset = queryset.order_by('display_order', 'name')
            else:
                queryset = queryset.order_by('-created_at')

        return queryset

    def get_permissions(self):
        if self.action in {'list', 'retrieve'}:
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminUser()]


class HeroSectionViewSet(PublicModelViewSet):
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionSerializer


class AboutSectionViewSet(PublicModelViewSet):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer


class FacilityViewSet(PublicModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    filterset_fields = ['is_active']
    search_fields = ['title', 'description', 'icon']


class AcademicViewSet(PublicModelViewSet):
    queryset = Academic.objects.all()
    serializer_class = AcademicSerializer
    filterset_fields = ['is_active']
    search_fields = ['title', 'description']


class ActivityViewSet(PublicModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filterset_fields = ['is_active']
    search_fields = ['title', 'description']


class EventViewSet(PublicModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_fields = ['is_featured', 'is_active']
    search_fields = ['title', 'description', 'location']


class AdmissionViewSet(PublicModelViewSet):
    queryset = Admission.objects.all()
    serializer_class = AdmissionSerializer
    filterset_fields = ['is_active']


class TestimonialViewSet(PublicModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    filterset_fields = ['is_active']
