from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='base'),
    path('create/', views.create, name='create'),
    path('edit/', views.edit, name='edit'),
    path('edit-Tablet/', views.editTablet, name='editTablet'),
    path('delete-Tablet/', views.deleteTablet, name='deleteTablet'),

]