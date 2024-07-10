from rest_framework import viewsets, permissions
from .models import JournalEntry
from .serializers import JournalEntrySerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
# Create your views here.


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer


class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })

        return Response({'error': 'Invalid Credentials'}, status=400)


class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.all()

    def perform_create(self,serializer):
        serializer.save()

    #
    def list(self, request):
        """
          GET endpoint to retrieve all journal entries

        """
        queryset = self.get_queryset()
        serializer = JournalEntrySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """
         GET endpoint to retrieve a single journal entry

        """
        queryset = self.get_queryset()
        journal_entry = get_object_or_404(queryset, pk=pk)
        serializer = JournalEntrySerializer(journal_entry)
        return Response(serializer.data)

    def create(self, request):
        """
        POST endpoint to create a new journal entry
        """
        serializer = JournalEntrySerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        """
        PUT endpoint to update a new journal entry
        """
        journal_entry = JournalEntry.objects.get(pk=pk)
        serializer = JournalEntrySerializer(journal_entry, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        """"
         DELETE endpoint to update a new journal entry
        """
        journal_entry = JournalEntry.objects.get(pk=pk)
        journal_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
