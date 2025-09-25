# expenses/admin.py
from django.contrib import admin
from .models import User, Category, Expense

# Register User model
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

# Register Category model
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

# Register Expense model
@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'category', 'amount', 'date')
    list_filter = ('user', 'category', 'date')
    search_fields = ('description',)
    date_hierarchy = 'date'
