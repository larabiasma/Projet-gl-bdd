# Generated by Django 5.1.3 on 2025-01-05 15:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0011_cart_total_price_alter_event_prestataire'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='cart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='event.cart'),
        ),
    ]
