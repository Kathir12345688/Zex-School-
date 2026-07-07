from django.test import SimpleTestCase

from .serializers import HeroSectionSerializer


class HeroSectionSerializerTests(SimpleTestCase):
    def test_title_can_be_blank_when_saving_hero_with_no_title(self):
        serializer = HeroSectionSerializer(data={
            'title': '',
            'subtitle': '',
            'description': '',
        })

        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['title'], '')
