from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Create a superuser account for Zex School admin access.'

    def add_arguments(self, parser):
        parser.add_argument('--username', default='admin')
        parser.add_argument('--email', default='admin@zexschool.com')
        parser.add_argument('--password', default='ZexAdmin@123')

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(username=options['username']).exists():
            User.objects.create_superuser(
                username=options['username'],
                email=options['email'],
                password=options['password'],
            )
            self.stdout.write(self.style.SUCCESS('Superuser created successfully.'))
        else:
            self.stdout.write(self.style.WARNING('Superuser already exists.'))
