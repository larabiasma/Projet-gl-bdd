from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import JSONField

class User(AbstractUser):
    name = models.CharField(max_length=300)
    email = models.CharField(max_length=300, unique=True)
    password = models.CharField(max_length=300)
    username = None  # Remplacer username par email comme identifiant
    is_prestataire = models.BooleanField(default=False)
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

class Prestataire(User):
    address = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    service = models.CharField(
        max_length=50,
        choices=[('photographe', 'Photographe'), ('salle', 'Salle'), ('cuisinier', 'Cuisinier'), ('decor', 'Décor')],
        null=True,
        blank=True
    )
    description = models.TextField(null=True, blank=True)
    prix = models.DecimalField(max_digits=10, decimal_places=2)  # Exemple de champ prix

class Event(models.Model):
    prestataire = models.ForeignKey(Prestataire, related_name='events', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    photos = models.ManyToManyField('EventPhoto', related_name='events')  # Relier aux photos d'événements 
    date = models.DateTimeField()  # Ligne corrigée
    def __str__(self):
        return self.name

class EventPhoto(models.Model):
    event = models.ForeignKey(Event, related_name='event_photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='event_photos/')

    def __str__(self):
        return f"Photo for {self.event.name}" if self.event else "Photo"
    
    

class Availability(models.Model):
    prestataire = models.ForeignKey(Prestataire, related_name='availabilities', on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return f"{self.start_date} - {self.end_date}"
    
class EventReservation(models.Model):
    availability = models.ForeignKey(Availability, related_name='reservations', on_delete=models.CASCADE)
    reserved_by = models.ForeignKey(User, related_name='reservations', on_delete=models.CASCADE)
    reserved_date = models.DateField(null=True, blank=True)  # Pour une date précise
    start_time = models.DateTimeField(null=True, blank=True)  # Début de l'intervalle
    end_time = models.DateTimeField(null=True, blank=True)  # Fin de l'intervalle
    reserved_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Reservation for {self.event.name} by {self.reserved_by.name}"

    def is_available(self):
        """
        Vérifie si la date ou l'intervalle est disponible.
        """
        reservations = EventReservation.objects.filter(availability=self.availability)

        if self.reserved_date:
            return not reservations.filter(reserved_date=self.reserved_date).exists()
        elif self.start_time and self.end_time:
            return not reservations.filter(
                start_time__lt=self.end_time,
                end_time__gt=self.start_time
            ).exists()
        return True



class Rating(models.Model):
    user = models.ForeignKey(User, related_name='ratings', on_delete=models.CASCADE)
    event = models.ForeignKey(Event, related_name='ratings', on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(1, '1 étoile'), (2, '2 étoiles'), (3, '3 étoiles'), (4, '4 étoiles'), (5, '5 étoiles')])
    feedback = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Évaluation de {self.user.name} pour {self.event.name}"

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")
    prestataires = models.ManyToManyField(Prestataire, related_name="carts", blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def update_total_price(self):
        self.total_price = sum(prestataire.prix for prestataire in self.prestataires.all())
        self.save()

    def reset_total_price(self):
        """
        Réinitialise le total_price à 0 après un paiement.
        """
        self.total_price = 0.00
        self.save()
    
    
    def __str__(self):
        return f"Cart of {self.user.username} - Total Price: {self.total_price}"
    
class Payment(models.Model):
    PAYMENT_METHODS = [
        ('CIB', 'Carte CIB'),
        ('EDH', 'ElDahabia')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="payments")
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    method = models.CharField(choices=PAYMENT_METHODS, max_length=3)
    timestamp = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=False)

    def __str__(self):
        return f"Payment by {self.user.username} ({self.method}) - {'Success' if self.success else 'Failed'}"

class ChecklistItem(models.Model):
    user = models.ForeignKey(User, related_name='checklist_items', on_delete=models.CASCADE)
    event_name = models.CharField(max_length=255, default="Unknown Event")
    event_date = models.DateField(default="2025-01-01")
    description = models.TextField(max_length=255)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.event_name} - {'Completed' if self.is_completed else 'Pending'}"

class Task(models.Model):
    checklist_item = models.ForeignKey(ChecklistItem, related_name='tasks', on_delete=models.CASCADE, null=True, blank=True)
    description = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.description} - {'Completed' if self.is_completed else 'Pending'}"



class DevisRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='devis_requests')
    prestataire = models.ForeignKey(Prestataire, on_delete=models.CASCADE, related_name='devis_responses')
    description = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)
    price_min = models.DecimalField(max_digits=10, decimal_places=2)  # Prix minimum
    price_max = models.DecimalField(max_digits=10, decimal_places=2)  # Prix maximum
    event_name = models.CharField(max_length=255 , null=True, blank=True)  # Assurez-vous que ce champ existe
    event_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('refused', 'Refused')], default='pending')

    def __str__(self):
        return self.event_name    

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')  # Utilisateur destinataire
    message = models.TextField()  # Contenu de la notification
    date_sent = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)  # Si la notification a été lue ou non

    def __str__(self):
        return f"Notification pour {self.user.name} - {self.message}"    