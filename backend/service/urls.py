from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet,RegisterView, LoginView,UserUpdateAPIView

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet, basename='journalentry')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/update/', UserUpdateAPIView.as_view(), name='user-update'),
]
