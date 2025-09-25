# expenses/models.py
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # In models.py
    description = models.TextField(blank=True, default='')

    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.amount}"
