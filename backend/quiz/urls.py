from django.urls import path
from .views import upload_pdf , save_questions

urlpatterns = [
    path('upload-pdf/', upload_pdf),
    path("save-questions/", save_questions),

]