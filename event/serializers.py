from rest_framework import serializers
from .models import User , Prestataire , Event , EventPhoto , Availability , Rating , Cart , Payment  , ChecklistItem , Task , DevisRequest , Notification , EventReservation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'is_prestataire']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    

class PrestataireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestataire
        fields = ['id', 'name', 'email', 'password', 'is_prestataire', 'address', 'phone_number', 'service', 'description', 'prix']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance    
    
class EventSerializer(serializers.ModelSerializer):
    photos = serializers.PrimaryKeyRelatedField(queryset=EventPhoto.objects.all(), many=True, required=False)

    class Meta:
        model = Event
        fields = ['prestataire','id', 'name', 'description', 'photos', 'date']
        read_only_fields = ['prestataire'] 


class EventPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventPhoto
        fields = ['id', 'image']


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['id', 'start_date', 'end_date']

class EventReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventReservation
        fields = ['id', 'availability', 'reserved_by', 'reserved_date', 'start_time', 'end_time', 'reserved_on']

    def validate(self, data):
        """
        Validation des dates et de la disponibilité.
        """
        availability = data.get('availability')
        reserved_date = data.get('reserved_date')
        start_time = data.get('start_time')
        end_time = data.get('end_time')

        if not reserved_date and not (start_time and end_time):
            raise serializers.ValidationError("Vous devez fournir une date ou un intervalle de temps.")

        # Vérifier si la réservation est dans les disponibilités du prestataire
        if reserved_date:
            if not (availability.start_date.date() <= reserved_date <= availability.end_date.date()):
                raise serializers.ValidationError("La date de réservation est en dehors des disponibilités.")
        elif start_time and end_time:
            if start_time < availability.start_date or end_time > availability.end_date:
                raise serializers.ValidationError("L'intervalle de réservation est en dehors des disponibilités.")

        return data


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['user', 'rating', 'feedback', 'created_at']    


class CartSerializer(serializers.ModelSerializer):
    prestataires = PrestataireSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'prestataires', 'total_price']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'cart', 'total_price', 'method', 'timestamp', 'success']

class TaskSerializer(serializers.ModelSerializer):
    checklist_item = serializers.PrimaryKeyRelatedField(queryset=ChecklistItem.objects.all())
    class Meta:
        model = Task
        fields = ['id', 'description', 'is_completed' , 'checklist_item']
    def create(self, validated_data):
        checklist_item = validated_data.get('checklist_item', None)
        if checklist_item is None:
            # Si checklist_item n'est pas fourni, on l'assigne à None.
            pass
        return super().create(validated_data)    

class ChecklistItemSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = ChecklistItem
        fields = ['id', 'user', 'event_name', 'event_date', 'description', 'tasks', 'is_completed']

class DevisRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevisRequest
        fields = ['user', 'prestataire', 'description', 'status', 'date_sent', 'price_min', 'price_max', 'event_date' , 'event_name']

    def create(self, validated_data):
        return DevisRequest.objects.create(**validated_data)


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'date_created', 'is_read']