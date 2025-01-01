from .models import Notification

def create_notification(user, message):
    """
    Crée une notification pour un utilisateur donné.
    """
    notification = Notification.objects.create(user=user, message=message)
    return notification