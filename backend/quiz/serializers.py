from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Question

class RegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ['email' , 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email Already Exists")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
    

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question 
        fields = ['id','question_text','option_a','option_b','option_c','option_d']
        extra_kwargs = {'correct_answer' : {'write_only' : True }}

class PdfUploadSerializer(serializers.Serializer):
    topic = serializers.CharField()
    file = serializers.FileField()

    def validate_file(self, value):
        if not value.name.endswith('.pdf'):
            raise serializers.ValidationError("Only PDF files are allowed")
        return value