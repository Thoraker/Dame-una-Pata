# Generated by Django 4.2.7 on 2023-11-14 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='building_number',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='address',
            name='commune',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='address',
            name='department_number',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='address',
            name='region',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='pet',
            name='age',
            field=models.IntegerField(),
        ),
    ]
