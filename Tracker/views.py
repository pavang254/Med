from django.shortcuts import render
from .models import Tablet

# Create your views here.

def index(request):
    context = {
            'time': get_time(),
            'tablets' : Tablet.objects.all()
            }
    
    return render(request, 'Tracker/index.html', context=context)

def get_time():
    from datetime import datetime
    time = datetime.now().hour
    if time < 12:
        return "morning"
    elif time < 16:
        return "afternoon"
    else:
        return "night"
    

