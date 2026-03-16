from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser , JSONParser
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import logout as auth_logout
from django.db.models import Max,Avg
from django.http import HttpResponse
from .serializers import RegisterSerializer, QuestionSerializer
from .models import Quiz, Attempt, Question, Topic
import re, random

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    user = request.user

    total_quizzes = Quiz.objects.count()
    total_attempts = Attempt.objects.filter(user=user).count()

    highest_score = Attempt.objects.filter(user=user).aggregate(
        Max('score')
    )['score__max'] or 0

    average_score = Attempt.objects.filter(user=user).aggregate(
        Avg('score')
    )['score__avg'] or 0

    leaderboard = Attempt.objects.order_by('-score')[:10]

    leaderboard_data = [
        {
            "username": attempt.user.username,
            "score": attempt.score
        }
        for attempt in leaderboard
    ]

    return Response({
        "total_quizzes": total_quizzes,
        "total_attempts": total_attempts,
        "average_score": round(average_score, 2),
        "highest_score": highest_score,
        "leaderboard": leaderboard_data
    })


def signup(request):
    return HttpResponse("Sign Up Page")


def login(request):
    return HttpResponse("Login Page")


@api_view(["POST"])
def logout_view(request):
    auth_logout(request)
    return Response({"message": "Logged out successfully"})


@api_view(['POST'])
def bulk_upload_questions(request):
    topic_name = request.data.get("topic")
    questions_text = request.data.get("questions")

    if not topic_name or not questions_text:
        return Response({"error": "Topic and questions text required"}, status=400)

    topic, _ = Topic.objects.get_or_create(title=topic_name)

    blocks = re.split(r"Q\d+", questions_text)
    created = 0

    for block in blocks:
        lines = [l.strip() for l in block.split("\n") if l.strip()]

        if len(lines) < 6:
            continue

        question = lines[0]
        options = []
        correct = None

        for line in lines:
            if line.startswith(("A)", "B)", "C)", "D)")):
                options.append(line.split(")", 1)[1].strip())

            if line.startswith("Answer:"):
                correct = line.split("Answer:")[1].strip()

        if len(options) == 4 and correct:
            Question.objects.create(
                topic=topic,
                question_text=question,
                option_a=options[0],
                option_b=options[1],
                option_c=options[2],
                option_d=options[3],
                correct_answer=correct
            )
            created += 1

    return Response({
        "message": "Questions uploaded successfully",
        "questions_created": created
    })


class QuestionList(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class StartQuiz(APIView):

    def get(self, request, topic_name):
        try:
            topic = Topic.objects.get(title=topic_name)
        except Topic.DoesNotExist:
            return Response({"message": "Work in Progress", "questions": []})

        question_ids = list(
            Question.objects.filter(topic=topic).values_list("id", flat=True)
        )

        random_ids = random.sample(question_ids, min(10, len(question_ids)))

        questions = Question.objects.filter(id__in=random_ids)

        serializer = QuestionSerializer(questions, many=True)

        return Response({
            "message": "Success",
            "questions": serializer.data
        })
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def submit_quiz(request, topic):
    answers = request.data.get("answers", [])
    score = 0

    for answer in answers:
        question_id = answer.get("question_id")
        selected = answer.get("selected")
        try:
            question = Question.objects.get(id=question_id)
            if question.correct_answer == selected:
                score += 1
        except Question.DoesNotExist:
            continue

    return Response({
        "score": score,
        "total": len(answers)
    })