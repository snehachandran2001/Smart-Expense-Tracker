from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.users, name='users'),           # GET & POST users
    path('categories/', views.categories, name='categories'),  # GET & POST categories
    path('expenses/', views.expenses, name='expenses'),   # GET & POST expenses
]
