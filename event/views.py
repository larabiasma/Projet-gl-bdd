from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer , PrestataireSerializer , EventSerializer, RatingSerializer, EventPhotoSerializer,AvailabilitySerializer , CartSerializer , PaymentSerializer , ChecklistItemSerializer , TaskSerializer , DevisRequestSerializer,NotificationSerializer , EventReservationSerializer
from .models import User , Prestataire , Event, Rating , Availability , Cart , Payment , ChecklistItem , Task , DevisRequest , Notification , EventReservation
from rest_framework.permissions import IsAuthenticated , AllowAny
import jwt, datetime
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.db import transaction
from rest_framework import viewsets
from .utils import create_notification


class RegisterView(APIView):
    def post(self, request):
        # Vérifier si le type d'utilisateur est un prestataire ou non
        is_prestataire = request.data.get('is_prestataire', False)
        
        if is_prestataire:
            # Si prestataire, utiliser le serializer Prestataire
            serializer = PrestataireSerializer(data=request.data)
        else:
            # Si client normal, utiliser le serializer User
            serializer = UserSerializer(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "message": "Compte créé avec succès",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "is_prestataire": user.is_prestataire
            }
        })
    
class LoginView(APIView):
    def post(self , request):
        email= request.data['email']
        password= request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('user not found')
        if not user.check_password(password):
            raise AuthenticationFailed('incorrect password')
        
        payload = {
           'id': user.id,
           'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60),
           'iat': datetime.datetime.now(datetime.timezone.utc)
        }

        token = jwt.encode(payload , 'secret' , algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt' , value=token , httponly=True)

        response.data = {
            'jwt': token
        }
        return response
    
# afficher d'apres les categories    
class ProfileserviceView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        # Récupérer le paramètre 'service' depuis kwargs
        service = kwargs.get('service')

        if service:
            # Filtrer les prestataires en fonction du service
            if service in ['photographe', 'salle', 'cuisinier', 'decor']:
                prestataires = Prestataire.objects.filter(service=service)
            else:
                return Response({"error": "Service non valide"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Si aucun service n'est spécifié, retourner tous les prestataires
            prestataires = Prestataire.objects.all()

        # Sérialisation des données
        prestataire_serializer = PrestataireSerializer(prestataires, many=True)

        # Retourner les prestataires filtrés
        return Response({
            'prestataires': prestataire_serializer.data
        })   
    

class UserView(APIView):   
    def get(self,request):
        token = request.COOKIES.get('jwt')
        if not token :
            raise AuthenticationFailed('unauthenticated ')
        try :
            payload = jwt.decode( token, 'secret' , algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('unauthenticated ')
        
        user= User.objects.filter(id= payload['id']).first()
        serializer=UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self,request):
        response=Response()
        response.delete_cookie('jwt')
        response.data ={
            'message': 'success'
        }
        return response


class ProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)

        events = Event.objects.filter(prestataire=user)
        event_serializer = EventSerializer(events, many=True)

        ratings = Rating.objects.filter(event__prestataire=user)
        rating_serializer = RatingSerializer(ratings, many=True)

        availability = Availability.objects.filter(event__prestataire=user)
        availability_serializer = AvailabilitySerializer(availability, many=True)


        return Response({
            'user': user_serializer.data,
            'events': event_serializer.data,
            'ratings': rating_serializer.data,
            'availability': availability_serializer.data,

        })

class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profil mis à jour avec succès"})
        return Response(serializer.errors, status=400)
    

class EventView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Créer un événement pour un prestataire spécifique.
        """
        # Récupérer l'utilisateur (prestataire) connecté
        prestataire = request.user
        
        # Ajouter l'ID du prestataire à la requête avant de sauvegarder l'événement
        data = request.data.copy()  # Faire une copie de la requête
        data['prestataire'] = prestataire.id  # Associer l'événement au prestataire connecté
        
        # Sérialiser les données de l'événement
        serializer = EventSerializer(data=data)
        
        if serializer.is_valid():
            # Sauvegarder l'événement associé au prestataire
            serializer.save(prestataire=prestataire)
            return Response({"message": "Événement créé avec succès", "event": serializer.data}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, event_id):
        """
        Supprimer un événement d'un prestataire spécifique.
        """
        try:
            # Récupérer l'événement à supprimer
            event = Event.objects.get(id=event_id)
            
            # Vérifier que l'événement appartient au prestataire connecté
            if event.prestataire != request.user:
                return Response({"error": "Vous ne pouvez supprimer que vos propres événements."}, status=status.HTTP_403_FORBIDDEN)
            
            # Supprimer l'événement
            event.delete()
            return Response({"message": "Événement supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)
        
        except Event.DoesNotExist:
            return Response({"error": "Événement non trouvé."}, status=status.HTTP_404_NOT_FOUND)
        
class EventPhotoView(APIView):
    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser, FormParser]  # Permet de traiter les fichiers multipart/form-data

    def post(self, request, event_id):
        event = Event.objects.get(id=event_id, prestataire=request.user)
        serializer = EventPhotoSerializer(data=request.data)
        if serializer.is_valid():
            photo = serializer.save(event=event)
            return Response({"message": "Photo ajoutée avec succès", "photo": serializer.data})
        return Response(serializer.errors, status=400)

class AvailabilityView(APIView):
    
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = AvailabilitySerializer(data=request.data)
        if serializer.is_valid():
            availability = serializer.save(prestataire=request.user)
            return Response({"message": "Disponibilité ajoutée avec succès", "availability": serializer.data})
        return Response(serializer.errors, status=400)

    def get(self, request):
        availabilities = Availability.objects.filter(prestataire=request.user)
        serializer = AvailabilitySerializer(availabilities, many=True)
        return Response(serializer.data)

class EventReservationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EventReservationSerializer(data=request.data)
        if serializer.is_valid():
            # Vérifier la disponibilité
            reservation = EventReservation(
                event=serializer.validated_data['event'],
                availability=serializer.validated_data['availability'],
                reserved_by=request.user,
                reserved_date=serializer.validated_data.get('reserved_date'),
                start_time=serializer.validated_data.get('start_time'),
                end_time=serializer.validated_data.get('end_time')
            )

            if not reservation.is_available():
                return Response({"error": "La date ou l'intervalle est déjà réservé."}, status=400)

            reservation.save()
            return Response(EventReservationSerializer(reservation).data, status=201)
        return Response(serializer.errors, status=400)



class RatingView(APIView):
    permission_classes = [IsAuthenticated]  # Assurez-vous que l'utilisateur est authentifié

    def post(self, request, event_id):
        # Récupérer l'événement auquel le rating se rapporte
        event = Event.objects.filter(id=event_id).first()
        if not event:
            return Response({"error": "Événement non trouvé"}, status=status.HTTP_404_NOT_FOUND)

        # Vérifier si l'utilisateur a déjà noté cet événement
        existing_rating = Rating.objects.filter(user=request.user, event=event).first()
        if existing_rating:
            # Si une notation existe déjà, on la met à jour
            existing_rating.rating = request.data.get('rating')
            existing_rating.feedback = request.data.get('feedback')
            existing_rating.save()
            return Response({
                "message": "Évaluation mise à jour avec succès",
                "rating": RatingSerializer(existing_rating).data
            })

        # Si l'utilisateur n'a pas encore noté l'événement, créer une nouvelle évaluation
        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, event=event)
            return Response({
                "message": "Évaluation ajoutée avec succès",
                "rating": serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, event_id):
        # Récupérer l'événement pour lequel les notations sont demandées
        event = Event.objects.filter(id=event_id).first()
        if not event:
            return Response({"error": "Événement non trouvé"}, status=status.HTTP_404_NOT_FOUND)

        # Récupérer toutes les évaluations de l'événement
        ratings = Rating.objects.filter(event=event)
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        prestataire_id = request.data.get('prestataire_id')
        if not prestataire_id:
            return Response({"error": "Prestataire ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            prestataire = Prestataire.objects.get(id=prestataire_id)
        except Prestataire.DoesNotExist:
            return Response({"error": "Prestataire not found."}, status=status.HTTP_404_NOT_FOUND)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart.prestataires.add(prestataire)
        cart.update_total_price()  # Recalcule le total après ajout
        return Response({"message": "Prestataire added to cart."})

    def delete(self, request):
        prestataire_id = request.data.get('prestataire_id')
        if not prestataire_id:
            return Response({"error": "Prestataire ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            prestataire = Prestataire.objects.get(id=prestataire_id)
        except Prestataire.DoesNotExist:
            return Response({"error": "Prestataire not found."}, status=status.HTTP_404_NOT_FOUND)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart.prestataires.remove(prestataire)
        cart.update_total_price()  # Recalcule le total après suppression
        return Response({"message": "Prestataire removed from cart."})
    
class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        method = request.data.get('method')
        if method not in ['CIB', 'EDH']:
            return Response({"error": "Invalid payment method. Choose 'CIB' or 'EDH'."}, status=status.HTTP_400_BAD_REQUEST)

        # Récupérer le panier de l'utilisateur
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

        if not cart.prestataires.exists():
            return Response({"error": "Cart is empty. Cannot proceed with payment."}, status=status.HTTP_400_BAD_REQUEST)

        # Utiliser le total_price de la cart
        total_price = cart.total_price

        # Simulation de paiement
        with transaction.atomic():
            # Créer le paiement
            payment = Payment.objects.create(
                user=request.user,
                cart=cart,
                total_price=total_price,
                method=method,
                success=True  # Simulation d'un paiement réussi
            )

            # Réinitialiser le panier après paiement réussi
            cart.prestataires.clear()  # Vider le panier
            cart.reset_total_price()  # Réinitialiser le total_price à 0 après paiement

        # Réponse avec le paiement
        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ChecklistItemManageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Créer un checklist et ajouter des tâches"""
        data = request.data
        data['user'] = request.user.id  # Lier l'utilisateur connecté
        checklist_serializer = ChecklistItemSerializer(data=data)

        if checklist_serializer.is_valid():
            checklist = checklist_serializer.save()
            tasks_data = data.get('tasks', [])
            for task_data in tasks_data:
                task_data['checklist_item'] = checklist.id
                task_serializer = TaskSerializer(data=task_data)
                if task_serializer.is_valid():
                    task_serializer.save()

            return Response(checklist_serializer.data, status=status.HTTP_201_CREATED)
        return Response(checklist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, checklist_item_id=None):
        """Lister ou afficher un checklist avec ses tâches"""
        if checklist_item_id:
            try:
                checklist = ChecklistItem.objects.get(id=checklist_item_id, user=request.user)
            except ChecklistItem.DoesNotExist:
                return Response({"detail": "ChecklistItem not found."}, status=status.HTTP_404_NOT_FOUND)

            checklist_serializer = ChecklistItemSerializer(checklist)
            return Response(checklist_serializer.data)
        
        checklist_items = ChecklistItem.objects.filter(user=request.user)
        serializer = ChecklistItemSerializer(checklist_items, many=True)
        return Response(serializer.data)

    def put(self, request, checklist_item_id):
        """Mettre à jour un checklist et ses tâches"""
        try:
            checklist = ChecklistItem.objects.get(id=checklist_item_id, user=request.user)
        except ChecklistItem.DoesNotExist:
            return Response({"detail": "ChecklistItem not found."}, status=status.HTTP_404_NOT_FOUND)

        checklist_serializer = ChecklistItemSerializer(checklist, data=request.data)
        if checklist_serializer.is_valid():
            checklist_serializer.save()

            # Mise à jour des tâches
            tasks_data = request.data.get('tasks', [])
            for task_data in tasks_data:
                task_id = task_data.get('id')
                if task_id:
                    try:
                        task = Task.objects.get(id=task_id, checklist_item=checklist)
                        task_serializer = TaskSerializer(task, data=task_data)
                        if task_serializer.is_valid():
                            task_serializer.save()
                    except Task.DoesNotExist:
                        continue

            return Response(checklist_serializer.data)
        return Response(checklist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, checklist_item_id=None):
        """Supprimer un checklist ou une tâche"""
        if checklist_item_id:
            try:
                checklist = ChecklistItem.objects.get(id=checklist_item_id, user=request.user)
                checklist.delete()
                return Response({"detail": "ChecklistItem deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
            except ChecklistItem.DoesNotExist:
                return Response({"detail": "ChecklistItem not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            task_id = request.data.get('task_id')
            if task_id:
                try:
                    task = Task.objects.get(id=task_id, checklist_item__user=request.user)
                    task.delete()
                    return Response({"detail": "Task deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
                except Task.DoesNotExist:
                    return Response({"detail": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

            return Response({"detail": "No task_id provided."}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, checklist_item_id):
        """Ajouter une nouvelle tâche à un checklist existant"""
        try:
            checklist = ChecklistItem.objects.get(id=checklist_item_id, user=request.user)
        except ChecklistItem.DoesNotExist:
            return Response({"detail": "ChecklistItem not found."}, status=status.HTTP_404_NOT_FOUND)

        task_data = request.data
        task_data['checklist_item'] = checklist.id
        task_serializer = TaskSerializer(data=task_data)

        if task_serializer.is_valid():
            task_serializer.save()
            return Response(task_serializer.data, status=status.HTTP_201_CREATED)
        return Response(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateDevisRequestView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        description = request.data.get('description')
        price_min = request.data.get('price_min')
        price_max = request.data.get('price_max')

        if not description or not price_min or not price_max:
            return Response({"error": "Tous les champs sont requis."}, status=status.HTTP_400_BAD_REQUEST)

        # Filtrer les prestataires en fonction du prix
        prestataires = Prestataire.objects.filter(prix__gte=price_min, prix__lte=price_max)

        if not prestataires.exists():
            return Response({"error": "Aucun prestataire ne correspond à cet intervalle de prix."}, status=status.HTTP_404_NOT_FOUND)

        devis_requests = []
        for prestataire in prestataires:
            devis_request = DevisRequest.objects.create(
                user=user,
                prestataire=prestataire,
                description=description,
                price_min=price_min,
                price_max=price_max
            )
            devis_requests.append(devis_request)

            # Créer une notification pour chaque prestataire
            message = f"Nouvelle demande de devis de {user.name} - Description: {description}"
            create_notification(prestataire, message)  # Appel de la fonction pour envoyer la notification

        response_data = DevisRequestSerializer(devis_requests, many=True).data
        return Response(response_data, status=status.HTTP_201_CREATED)
    
class NotificationListView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        notifications = Notification.objects.filter(user=user).order_by('-date_created')

        if not notifications.exists():
            return Response({"message": "Aucune notification."}, status=status.HTTP_404_NOT_FOUND)

        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    
    

# views.py
class MarkNotificationAsReadView(APIView):
    def post(self, request, *args, **kwargs):
        notification_id = request.data.get('notification_id')

        try:
            notification = Notification.objects.get(id=notification_id, user=request.user)
        except Notification.DoesNotExist:
            return Response({"error": "Notification introuvable."}, status=status.HTTP_404_NOT_FOUND)

        notification.is_read = True
        notification.save()

        return Response({"message": "Notification marquée comme lue."}, status=status.HTTP_200_OK)

class RespondToDevisRequestView(APIView):
    def post(self, request):
        devis_request_id = request.data.get('devis_request_id')
        response = request.data.get('response')  # "accepted" ou "refused"
        
        if not devis_request_id or not response:
            return Response({"error": "devis_request_id et response sont nécessaires."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            devis_request = DevisRequest.objects.get(id=devis_request_id)
        except DevisRequest.DoesNotExist:
            return Response({"error": "Demande de devis non trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Vérifier que la réponse est valide
        if response not in ["accepted", "refused"]:
            return Response({"error": "La réponse doit être 'accepted' ou 'refused'."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Mettre à jour l'état de la demande de devis
        devis_request.status = response
        devis_request.save()

        # Créer une notification pour l'utilisateur
        message = f"Votre demande de devis pour {devis_request.event_name} a été {response} par le prestataire {devis_request.prestataire.name}."
        Notification.objects.create(user=devis_request.user, message=message)

        return Response({"message": "Réponse enregistrée avec succès."}, status=status.HTTP_200_OK)
