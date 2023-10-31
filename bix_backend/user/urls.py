from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'user', views.User, basename='user')
urlpatterns = router.urls
