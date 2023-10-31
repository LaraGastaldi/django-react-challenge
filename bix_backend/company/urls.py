from . import views

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'company', views.Company, basename='company')
urlpatterns = router.urls
