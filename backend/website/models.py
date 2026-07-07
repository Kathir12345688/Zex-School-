from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class HeroSection(TimestampedModel):
    title = models.CharField(max_length=255, blank=True)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    background_image = models.ImageField(upload_to='hero/', blank=True, null=True)
    button_text = models.CharField(max_length=50, blank=True)
    button_link = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Hero Section'
        verbose_name_plural = 'Hero Sections'
        ordering = ['-is_active', '-created_at']

    def __str__(self):
        return self.title or 'Hero Section'


class AboutSection(TimestampedModel):
    heading = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    vision = models.TextField(blank=True)
    image = models.ImageField(upload_to='about/', blank=True, null=True)
    principal_message = models.TextField(blank=True)

    class Meta:
        verbose_name = 'About Section'
        verbose_name_plural = 'About Sections'
        ordering = ['-created_at']

    def __str__(self):
        return self.heading


class Facility(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='facilities/', blank=True, null=True)
    icon = models.CharField(max_length=100, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Facility'
        verbose_name_plural = 'Facilities'
        ordering = ['display_order', 'title']

    def __str__(self):
        return self.title


class Academic(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='academics/', blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Academic'
        verbose_name_plural = 'Academics'
        ordering = ['display_order', 'title']

    def __str__(self):
        return self.title


class Activity(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='activities/', blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'
        ordering = ['display_order', 'title']

    def __str__(self):
        return self.title


class Gallery(TimestampedModel):
    class Category(models.TextChoices):
        CAMPUS = 'Campus', 'Campus'
        SPORTS = 'Sports', 'Sports'
        EVENTS = 'Events', 'Events'
        LABORATORY = 'Laboratory', 'Laboratory'
        CULTURAL = 'Cultural', 'Cultural'
        CLASSROOM = 'Classroom', 'Classroom'
        OTHER = 'Other', 'Other'

    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.OTHER)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Gallery Item'
        verbose_name_plural = 'Gallery'
        ordering = ['display_order', 'title']

    def __str__(self):
        return self.title


class Event(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    event_date = models.DateField()
    location = models.CharField(max_length=255, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
        ordering = ['-event_date', '-created_at']

    def __str__(self):
        return self.title


class Admission(TimestampedModel):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    eligibility = models.TextField(blank=True)
    required_documents = models.TextField(blank=True)
    admission_process = models.TextField(blank=True)
    brochure = models.FileField(upload_to='admissions/', blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Admission'
        verbose_name_plural = 'Admissions'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Testimonial(TimestampedModel):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, blank=True)
    message = models.TextField(blank=True)
    photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    rating = models.PositiveSmallIntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name
