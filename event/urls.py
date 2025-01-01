
from django.urls import path , include
from .views import RegisterView , LoginView , UserView , LogoutView , HelloWorldView ,ProfileView, UpdateProfileView,  EventView, EventPhotoView,AvailabilityView , CartView , RatingView , PaymentView , ChecklistItemManageView , CreateDevisRequestView, NotificationListView , MarkNotificationAsReadView , RespondToDevisRequestView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('helloworld/', HelloWorldView.as_view()),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/update/', UpdateProfileView.as_view(), name='update_profile'),
    path('events/', EventView.as_view(), name='event_list_create'),
    path('events/<int:event_id>', EventView.as_view(), name='event-detail'),
    path('events/<int:event_id>/photos/', EventPhotoView.as_view(), name='event_photos'),
    path('availability/', AvailabilityView.as_view(), name='availability'),
    path('cart/', CartView.as_view(), name='cart'),
    path('rating/<int:event_id>', RatingView.as_view(), name='rating'),
    path('cart/payment/', PaymentView.as_view(), name='cart_payment'),
    path('checklist-items/', ChecklistItemManageView.as_view(), name='create_checklist'),
    path('checklist-items/<int:checklist_item_id>/', ChecklistItemManageView.as_view(), name='manage_checklist'),
    path('checklist-items/<int:checklist_item_id>/add-task/', ChecklistItemManageView.as_view(), name='add_task_to_checklist'),  # Ajout de tâche
    path('devis/create/', CreateDevisRequestView.as_view(), name='create_devis_request'),
    path('notifications/', NotificationListView.as_view(), name='notification_list'),
    path('mark-notification-as-read/', MarkNotificationAsReadView.as_view(), name='mark_notification_as_read'),
    path('respond-to-devis/', RespondToDevisRequestView.as_view(), name='respond_to_devis_request'),


]

