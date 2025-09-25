# ExpenseApp/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Category, Expense
from .serializers import UserSerializer, CategorySerializer, ExpenseSerializer

@api_view(['GET', 'POST'])
def users(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    users_list = User.objects.all()
    serializer = UserSerializer(users_list, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def categories(request):
    if request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    categories_list = Category.objects.all()
    serializer = CategorySerializer(categories_list, many=True)
    return Response(serializer.data)
@api_view(['GET', 'POST'])
def expenses(request):
    if request.method == 'POST':
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    user_id = request.query_params.get('user_id')
    if user_id:
        expenses_list = Expense.objects.filter(user_id=user_id).order_by('-date')
    else:
        expenses_list = Expense.objects.all().order_by('-date')

    serializer = ExpenseSerializer(expenses_list, many=True)
    return Response(serializer.data)
