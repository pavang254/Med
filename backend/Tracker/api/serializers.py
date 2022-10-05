from rest_framework import serializers
from Tracker.models import *
    

class TabletSerializer(serializers.ModelSerializer):
    timings = serializers.ListField(child=serializers.CharField())
    class Meta:
        model = Tablet
        fields = ['id', 'name', 'strength', 'timings']