from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView

from Tracker.api.serializers import TabletSerializer
from Tracker.models import *
from Tracker.utils import get_time


class TabletView(ListAPIView, CreateAPIView):
    queryset=Tablet.objects.filter(timings__contains=[get_time()])
    serializer_class = TabletSerializer

class TabletListView(ListAPIView):
    queryset=Tablet.objects.all()
    serializer_class = TabletSerializer

class TabletUpdateView(RetrieveUpdateDestroyAPIView):
    queryset=Tablet.objects.all()
    serializer_class = TabletSerializer
