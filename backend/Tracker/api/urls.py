from django.urls import path
from . import views

urlpatterns = [
    path('tablets/', views.TabletView.as_view()),
    path('tablets/all/', views.TabletListView.as_view()),
    path('tablets/update/<int:pk>/', views.TabletUpdateView.as_view()),
]