# Zexsch Project

Full-stack project with a Django REST API backend and a Vite + React frontend.

## Structure

- backend/: Django application with DRF and PostgreSQL support
- frontend/: React frontend built with Vite

## Deployment Notes

- Keep environment variables in a local .env file and do not commit secrets.
- The repository root includes a .gitignore configured for Python, Django, Node, and editor artifacts.
- Media uploads in the project demo folders are preserved and are not ignored.
- For Render, set the build command to: `cd backend && pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput && python manage.py create_admin`
