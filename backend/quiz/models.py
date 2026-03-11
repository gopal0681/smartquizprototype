from django.db import models
from django.contrib.auth.models import User

class Quiz(models.Model):
    title = models.CharField(max_length=255)

class Attempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.IntegerField()
    attempted_at = models.DateTimeField(auto_now_add=True)

class Question(models.Model):
    topic = models.CharField(max_length=100)
    question_text = models.TextField()

    option_a = models.CharField(max_length=255) 
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)
    
    correct_answer = models.CharField(max_length=1)
    pdf_file = models.FileField(upload_to="question_pdfs/", null=True, blank=True)
    
    def __str__(self):
        return self.question_text
    
class UploadedPDF(models.Model):
    topic = models.CharField(max_length=255)
    file_data = models.BinaryField() 
    pdf_file = models.FileField(upload_to='uploaded_pdfs/')
    file_name = models.CharField(max_length=255) 
    extracted_text = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.topic