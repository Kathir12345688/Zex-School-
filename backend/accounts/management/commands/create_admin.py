import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    # This command is used during deployment so Render can create an initial
    # Django admin account even though free-tier deployments do not expose a shell.
    help = 'Create a Django superuser from environment variables during deployment.'

    def handle(self, *args, **options):
        # Read the requested admin credentials from environment variables. A
        # Django settings fallback is also supported so the command remains easy
        # to test without changing the deployment behavior.
        username = (os.getenv('ADMIN_USERNAME') or getattr(settings, 'ADMIN_USERNAME', '')).strip()
        email = (os.getenv('ADMIN_EMAIL') or getattr(settings, 'ADMIN_EMAIL', '')).strip()
        password = (os.getenv('ADMIN_PASSWORD') or getattr(settings, 'ADMIN_PASSWORD', '')).strip()

        # If any required environment variable is missing, skip creation rather
        # than crashing the deployment build or leaving the project in a broken state.
        if not username or not email or not password:
            self.stdout.write(
                self.style.WARNING(
                    'Admin credentials were not fully provided. Skipping superuser creation.'
                )
            )
            return

        # Use the project's configured user model so the command remains compatible
        # with custom user models as well as Django's default User model.
        User = get_user_model()

        # Check whether a user with the requested username already exists before
        # attempting to create a new account. This prevents duplicates on reruns.
        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING('Superuser already exists.'))
            return

        # Create the superuser with the environment-provided values.
        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
        )
        self.stdout.write(self.style.SUCCESS('Superuser created successfully.'))
