from django.contrib import admin
from django.shortcuts import render, redirect
from django.urls import path
import pdfplumber
from .models import Question , UploadedPDF
from django.utils.html import format_html

class QuestionAdmin(admin.ModelAdmin):

    change_list_template = "admin/question_upload.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path("uploadpdf/", self.upload_pdf, name="question-upload-pdf"),
        ]
        return custom_urls + urls


    def upload_pdf(self, request):

        if request.method == "POST":

            pdf_file = request.FILES.get("pdf_file")
            topic = request.POST.get("topic")

            if not pdf_file or not topic:
                self.message_user(request, "Please provide both topic and PDF file.")
                return redirect(request.path)
            
            UploadedPDF.objects.create(
                topic=topic,
                pdf_file=pdf_file
            )

            pdf_file.seek(0)

            with pdfplumber.open(pdf_file) as pdf:

                text = ""

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

                elif line.startswith("A)", "B)", "C)", "D)"):
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

            self.message_user(request, "Questions uploaded successfully!")

            return redirect("..")

        return render(request, "admin/question_upload.html")


class UploadedPDFAdmin(admin.ModelAdmin):

    list_display = ("topic", "view_pdf")

    def view_pdf(self, obj):

        if obj.pdf_file:
            return format_html(
                '<a href="{}" target="_blank">View PDF</a>',
                obj.pdf_file.url
            )

        return "No PDF"

    view_pdf.short_description = "PDF"

admin.site.register(Question, QuestionAdmin)
admin.site.register(UploadedPDF, UploadedPDFAdmin)