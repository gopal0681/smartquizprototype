from django.contrib import admin
from django.urls import path, include
from quiz.views import dashboard, register, signup, login, submit_quiz
from quiz.views import logout_view, bulk_upload_questions, QuestionList, StartQuiz
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path("logout/", logout_view, name="logout"),

    path('api/register/', register, name='register'),
    path('dashboard/', dashboard, name='dashboard'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),

    path('quiz/<str:topic_name>/', StartQuiz.as_view(), name='startQuiz'),
    path('submit-quiz/<str:topic>/', submit_quiz, name='submit_quiz'),

    path("bulk-upload/", bulk_upload_questions, name='uploadquestions'),
    path("questions/", QuestionList.as_view(), name="questions"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)