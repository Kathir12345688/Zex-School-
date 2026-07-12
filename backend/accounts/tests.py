import os

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import TestCase


class CreateAdminCommandTests(TestCase):
    def _clear_admin_environment(self):
        for key in ['ADMIN_USERNAME', 'ADMIN_EMAIL', 'ADMIN_PASSWORD']:
            os.environ.pop(key, None)

    def test_create_admin_command_skips_without_credentials(self):
        self._clear_admin_environment()
        with self.settings(ADMIN_USERNAME='', ADMIN_EMAIL='', ADMIN_PASSWORD=''):
            call_command('create_admin')
            self.assertEqual(get_user_model().objects.count(), 0)

    def test_create_admin_command_creates_superuser_once(self):
        self._clear_admin_environment()
        with self.settings(ADMIN_USERNAME='testadmin', ADMIN_EMAIL='test@example.com', ADMIN_PASSWORD='TestPassword123!'):
            call_command('create_admin')
            self.assertTrue(get_user_model().objects.filter(username='testadmin').exists())
            call_command('create_admin')
            self.assertEqual(get_user_model().objects.filter(username='testadmin').count(), 1)
