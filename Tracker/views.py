from django.shortcuts import render


# Create your views here.

def index(request):
    context = {
    'time': get_time(),
    'tablets' : [{'name': 'one', 'status': 'No'}, {'name': 'two', 'status': 'No'}, {'name': 'three', 'status': 'No'}]
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
    

