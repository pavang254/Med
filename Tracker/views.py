import json
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Tablet
from .forms import createPrescription
from .utils import get_time

from datetime import datetime

# Create your views here.

def index(request):
    context = {
            'time': get_time(),
            'tablets' : Tablet.objects.filter(timings__contains=[get_time()]),
            'date' : datetime.now(),
            }
    
    return render(request, 'Tracker/med.html', context=context)

def create(request):
    tablet = createPrescription()

    if request.method == 'POST':
        print(request.POST)
        tablet = createPrescription(request.POST)
        if tablet.is_valid():
            tablet.save()
            return redirect('/')

    context={'tablet': tablet}
    return render(request, 'Tracker/create_new.html',context=context)


def edit(request):        
    
    return render(request, 'Tracker/edit.html', {'tablets':Tablet.objects.all().distinct()})

def editTablet(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        id = int(data['form']['id'])

        Tablet.objects.filter(id=id).update(timings= data['form']['timing'])

        return HttpResponse(json.dumps({'status':301, 'message':'success'}), content_type='application/json')
    
    return JsonResponse('error', safe=False)

def deleteTablet(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        id = int(data['info']['id'])

        Tablet.objects.get(id=id).delete()

        return HttpResponse(json.dumps({'status':202, 'message':'success'}), content_type='application/json')
    
    return JsonResponse({'status':204}, safe=False)