# Generated by Django 4.2.7 on 2023-11-14 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0002_alter_address_building_number_alter_address_commune_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='main_house',
            field=models.BooleanField(default=False),
        ),
    ]