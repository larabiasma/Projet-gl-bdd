from django.apps import AppConfig


class EventConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'event'

class YourAppConfig(AppConfig):
    name = 'your_app'

    def ready(self):
        import event.singals  # Assurez-vous que le fichier signals.py est bien importé