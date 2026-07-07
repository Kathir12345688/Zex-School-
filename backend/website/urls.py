from rest_framework.routers import DefaultRouter

from .views import (
    AcademicViewSet,
    AboutSectionViewSet,
    ActivityViewSet,
    AdmissionViewSet,
    EventViewSet,
    FacilityViewSet,
    HeroSectionViewSet,
    TestimonialViewSet,
)

router = DefaultRouter()
router.register(r'hero', HeroSectionViewSet, basename='hero')
router.register(r'about', AboutSectionViewSet, basename='about')
router.register(r'facilities', FacilityViewSet, basename='facilities')
router.register(r'academics', AcademicViewSet, basename='academics')
router.register(r'activities', ActivityViewSet, basename='activities')
router.register(r'events', EventViewSet, basename='events')
router.register(r'admissions', AdmissionViewSet, basename='admissions')
router.register(r'testimonials', TestimonialViewSet, basename='testimonials')

urlpatterns = router.urls
