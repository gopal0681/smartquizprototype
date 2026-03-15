from django.contrib import admin
from django.urls import path
from django.shortcuts import render, redirect
from .models import Question, Topic
import re


class QuestionAdmin(admin.ModelAdmin):

    change_list_template = "admin/questions_changelist.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path("bulk-upload/", self.bulk_upload)
        ]
        return custom_urls + urls


    def bulk_upload(self, request):

        if request.method == "POST":

            topic_id = request.POST.get("topic")
            topic = Topic.objects.get(id=topic_id)

            data = request.POST.get("questions")

            lines = [line.strip() for line in data.split("\n") if line.strip()]

            i = 0

            while i < len(lines):

                if re.match(r'^(Q?\d+\.)', lines[i]):
                    i += 1
                    continue

                question_lines = []

                while i < len(lines) and not re.match(r'^\d+\.', lines[i]):
                    question_lines.append(lines[i])
                    i += 1

                question_text = " ".join(question_lines)

                if i + 4 >= len(lines):
                    break

                option_a = lines[i]
                option_b = lines[i+1]
                option_c = lines[i+2]
                option_d = lines[i+3]

                correct_line = lines[i+4].strip().upper()

                match = re.search(r'[ABCD]$', correct_line)

                if match:
                    correct = match.group()
                else:
                    print("Skipping invalid question:", question_text)
                    i += 5
                    continue

                Question.objects.create(
                    topic=topic,
                    question_text=question_text,
                    option_a=option_a,
                    option_b=option_b,
                    option_c=option_c,
                    option_d=option_d,
                    correct_answer=correct
                )

                i += 5

            return redirect("../")

        topics = Topic.objects.all()

        return render(request, "admin/bulk_upload.html", {"topics": topics})


admin.site.register(Question, QuestionAdmin)
admin.site.register(Topic)