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

## Cloudinary Media Storage

To store uploaded media on Cloudinary instead of the local `/media` directory, set the following environment variables:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

How to upload images:

- Upload images through Django Admin or existing APIs that accept file uploads.
- Django uses `cloudinary_storage.storage.MediaCloudinaryStorage` for all media file storage.
- Uploaded images are stored on Cloudinary and served via HTTPS URLs.

Deployment notes:

- Keep Cloudinary credentials secret and add them to Render environment variables.
- The existing backend build command remains unchanged.
- Local development also uses Cloudinary for media uploads when the environment variables are provided.
