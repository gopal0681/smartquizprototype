from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.response import Response
from .serializers import RegisterSerializer, QuestionSerializer , PdfUploadSerializer
from rest_framework import status
from .models import Quiz, Attempt, Question
from django.contrib.auth.models import User
from django.db.models import Max
from django.http import HttpResponse
import pdfplumber
from django.shortcuts import render

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
    highest_score = Attempt.objects.filter(user=user).aggregate(Max('score'))['score__max']

    recent_attempts = Attempt.objects.filter(user=user).order_by('-attempted_at')[:5]

    return Response({
        'total_quizzes': total_quizzes,
        'total_attempts': total_attempts,
        'highest_score': highest_score,
        'recent_attempts': [
            {
                'quiz_title': attempt.quiz.title,
                'score': attempt.score,
                'attempted_at': attempt.attempted_at
            } for attempt in recent_attempts
        ]
    })

def signup(request):
    return HttpResponse("Sig Up Page")

def login(request):
    return HttpResponse("Login Page")

@api_view(["POST"])
def logout(request):
    logout(request)
    return Response({"message": "Logged out successfully"})

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def submit_quiz(request,topic):

    answers = request.data['answers']
    score = 0

    for answer in answers:

        question = Question.objects.get(id=answer['question_id'])

        if question.correct_answer == answer['selected']:
            score += 1

    return Response({
        "score": score,
        "total": len(answers)
    })


@api_view(['GET'])
def start_quiz(request, topic):

    questions = Question.objects.filter(topic=topic)

    if not questions.exists():
        return Response({
            "message": "Work in Progress",
            "questions": []
        })

    random_questions = questions.order_by('?')[:10]

    serializer = QuestionSerializer(random_questions, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_pdf(request):

    topic = request.data.get("topic")
    pdf_file = request.FILES.get("file")

    pdf_file = request.FILES["pdf_file"]

    upload_pdf.objects.create(
        topic=topic,
        pdf_file=pdf_file
    )

    if not pdf_file or not topic:
        return Response({"error": "Topic and PDF file are required"}, status=400)

    text = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"

    lines = text.split("\n")
    question = None
    options = []

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if line.startswith("Q"):
            question = line
            options = []

        elif line.startswith(("A)", "B)", "C)", "D)")):
            options.append(line[2:].strip())

        elif line.startswith("Answer:"):
            correct = line.split(":")[1].strip()
            if question and len(options) == 4:
                Question.objects.create(
                    topic=topic,
                    question_text=question,
                    option_a=options[0],
                    option_b=options[1],
                    option_c=options[2],
                    option_d=options[3],
                    correct_answer=correct
                )
            options = []

    return Response({"message": "PDF uploaded and questions saved"})

def save_questions(request):

    questions = request.session.get("preview_questions")
    topic = request.session.get("topic")

    for q in questions:

        Question.objects.create(
            topic=topic,
            question_text=q["question"],
            option_a=q["a"],
            option_b=q["b"],
            option_c=q["c"],
            option_d=q["d"],
            correct_answer=q["correct"]
        )

    return render(request, "success.html")