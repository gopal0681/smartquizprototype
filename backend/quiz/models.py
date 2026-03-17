from django.db import models
from django.contrib.auth.models import User

class Quiz(models.Model):
    title = models.CharField(max_length=255)

class Topic(models.Model):

    title = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.title
    
class Attempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    score = models.IntegerField()
    attempted_at = models.DateTimeField(auto_now_add=True)

class Question(models.Model):

    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

    question_text = models.TextField()

    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)

    correct_answer = models.CharField(
    max_length=1,
    choices=[
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ('D','D')
    ]
)

    def __str__(self):
        return self.question_text[:60]



