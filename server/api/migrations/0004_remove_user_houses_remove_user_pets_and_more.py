# Generated by Django 5.0.1 on 2024-01-10 16:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_user_houses'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='houses',
        ),
        migrations.RemoveField(
            model_name='user',
            name='pets',
        ),
        migrations.RemoveField(
            model_name='user',
            name='posts',
        ),
        migrations.AddField(
            model_name='address',
            name='homeOwner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
        migrations.AddField(
            model_name='pet',
            name='owner',
            field=models.ManyToManyField(to='api.user'),
        ),
        migrations.AddField(
            model_name='post',
            name='postedBy',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
    ]
