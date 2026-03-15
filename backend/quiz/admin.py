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

            lines = [l.strip() for l in data.split("\n") if l.strip()]

            for i in range(0, len(lines), 6):

                block = lines[i:i+6]

                if len(block) < 6:
                    continue

                question_text = block[0]
                option_a = block[1]
                option_b = block[2]
                option_c = block[3]
                option_d = block[4]

                correct_line = block[5].upper()

                match = re.search(r'[ABCD]', correct_line)

                if not match:
                    continue

                correct = match.group()

                Question.objects.create(
                    topic=topic,
                    question_text=question_text,
                    option_a=option_a,
                    option_b=option_b,
                    option_c=option_c,
                    option_d=option_d,
                    correct_answer=correct
                )

            return redirect("../")

        topics = Topic.objects.all()

        return render(request, "admin/bulk_upload.html", {"topics": topics})


admin.site.register(Question, QuestionAdmin)
admin.site.register(Topic)