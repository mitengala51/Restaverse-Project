from django.urls import path
from . import views

urlpatterns = [
  # path("login/",views.login),
  # path("logout/",views.logout),
  path("review/",views.get_reviews, name="fetch_reviews"),
]
