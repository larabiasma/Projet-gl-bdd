from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from .models import Cart

@receiver(m2m_changed, sender=Cart.prestataires.through)
def update_cart_total_price(sender, instance, **kwargs):
    instance.update_total_price()
