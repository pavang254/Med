# Generated by Django 4.0.6 on 2022-07-18 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tablet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('timing', models.CharField(choices=[('morning', 'Morning'), ('afternoon', 'Afternoon'), ('night', 'Night')], max_length=15)),
            ],
        ),
    ]
