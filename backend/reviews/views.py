from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.http import JsonResponse
import requests
from allauth.socialaccount.models import SocialToken
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view

mockReviews = {
    "reviews": [
        {
            "reviewId": "234567890",
            "reviewer": {
                "displayName": "Alice Cooper",
                "profilePhotoUrl": "https://example.com/photo7.jpg",
                "isAnonymous": False
            },
            "comment": "Wonderful place with great vibes! The service was top-notch.",
            "starRating": "FIVE",
            "createTime": "2024-12-22T11:00:00Z",
            "updateTime": "2024-12-22T12:30:00Z",
            "reviewReply": {
                "comment": "Thank you, Alice! We’re thrilled you enjoyed your visit.",
                "updateTime": "2024-12-22T13:00:00Z"
            }
        },
        {
            "reviewId": "876543210",
            "reviewer": {
                "displayName": "Bob Marley",
                "profilePhotoUrl": "https://example.com/photo8.jpg",
                "isAnonymous": False
            },
            "comment": "The coffee was mediocre, but the ambiance was fantastic.",
            "starRating": "THREE",
            "createTime": "2024-12-21T09:00:00Z",
            "updateTime": "2024-12-21T09:30:00Z",
            "reviewReply": {
                "comment": "Thanks for your feedback, Bob. We'll work on improving our coffee.",
                "updateTime": "2024-12-21T10:00:00Z"
            }
        },
        {
            "reviewId": "654321987",
            "reviewer": {
                "displayName": "Charlie Brown",
                "profilePhotoUrl": "https://example.com/photo9.jpg",
                "isAnonymous": False
            },
            "comment": "The pastries were delightful, but the service was slow.",
            "starRating": "FOUR",
            "createTime": "2024-12-20T14:10:00Z",
            "updateTime": "2024-12-20T14:30:00Z",
            "reviewReply": {
                "comment": "We appreciate your feedback, Charlie. We'll focus on improving our service speed.",
                "updateTime": "2024-12-20T15:00:00Z"
            }
        },
        {
            "reviewId": "135791357",
            "reviewer": {
                "displayName": "David Williams",
                "profilePhotoUrl": "https://example.com/photo10.jpg",
                "isAnonymous": False
            },
            "comment": "A pleasant experience overall. The muffins were amazing!",
            "starRating": "FIVE",
            "createTime": "2024-12-19T17:45:00Z",
            "updateTime": "2024-12-19T18:15:00Z",
            "reviewReply": {
                "comment": "Thanks, David! We're so happy to hear you loved the muffins.",
                "updateTime": "2024-12-19T18:45:00Z"
            }
        },
        {
            "reviewId": "987654321",
            "reviewer": {
                "displayName": "Eva Green",
                "profilePhotoUrl": "https://example.com/photo11.jpg",
                "isAnonymous": False
            },
            "comment": "Had a great time! The staff were friendly, and the food was decent.",
            "starRating": "FOUR",
            "createTime": "2024-12-18T12:00:00Z",
            "updateTime": "2024-12-18T12:30:00Z",
            "reviewReply": {
                "comment": "Thank you for your review, Eva! We hope to see you again soon.",
                "updateTime": "2024-12-18T13:00:00Z"
            }
        },
        {
            "reviewId": "246801357",
            "reviewer": {
                "displayName": "Frank Castle",
                "profilePhotoUrl": "https://example.com/photo12.jpg",
                "isAnonymous": False
            },
            "comment": "The food was too salty for my taste, but the environment was nice.",
            "starRating": "TWO",
            "createTime": "2024-12-17T13:20:00Z",
            "updateTime": "2024-12-17T13:40:00Z",
            "reviewReply": {
                "comment": "We apologize for the experience, Frank. We'll review the seasoning to improve it.",
                "updateTime": "2024-12-17T14:00:00Z"
            }
        },
        {
            "reviewId": "102938475",
            "reviewer": {
                "displayName": "Grace Hopper",
                "profilePhotoUrl": "https://example.com/photo13.jpg",
                "isAnonymous": False
            },
            "comment": "Excellent gluten-free options, I loved the brownies!",
            "starRating": "FIVE",
            "createTime": "2024-12-16T16:30:00Z",
            "updateTime": "2024-12-16T17:00:00Z",
            "reviewReply": {
                "comment": "Thank you, Grace! We're glad you enjoyed our gluten-free treats.",
                "updateTime": "2024-12-16T17:30:00Z"
            }
        },
        {
            "reviewId": "564738291",
            "reviewer": {
                "displayName": "Henry Ford",
                "profilePhotoUrl": "https://example.com/photo14.jpg",
                "isAnonymous": False
            },
            "comment": "Nice atmosphere, but the portions were too small for the price.",
            "starRating": "THREE",
            "createTime": "2024-12-15T11:00:00Z",
            "updateTime": "2024-12-15T11:30:00Z",
            "reviewReply": {
                "comment": "Thank you for your feedback, Henry. We'll review our portion sizes.",
                "updateTime": "2024-12-15T12:00:00Z"
            }
        },
        {
            "reviewId": "112233445",
            "reviewer": {
                "displayName": "Isaac Newton",
                "profilePhotoUrl": "https://example.com/photo15.jpg",
                "isAnonymous": False
            },
            "comment": "The staff was amazing, but I felt the food could have been more flavorful.",
            "starRating": "FOUR",
            "createTime": "2024-12-14T15:00:00Z",
            "updateTime": "2024-12-14T15:30:00Z",
            "reviewReply": {
                "comment": "Thank you for your feedback, Isaac! We'll work on improving the flavors.",
                "updateTime": "2024-12-14T16:00:00Z"
            }
        },
        {
            "reviewId": "223344556",
            "reviewer": {
                "displayName": "Jack Sparrow",
                "profilePhotoUrl": "https://example.com/photo16.jpg",
                "isAnonymous": False
            },
            "comment": "The atmosphere was perfect for a night out, but the prices were a bit high.",
            "starRating": "THREE",
            "createTime": "2024-12-13T19:10:00Z",
            "updateTime": "2024-12-13T19:40:00Z",
            "reviewReply": {
                "comment": "Thanks for your review, Jack. We'll review our pricing.",
                "updateTime": "2024-12-13T20:00:00Z"
            }
        },
        {
            "reviewId": "223344577",
            "reviewer": {
                "displayName": "Lara Croft",
                "profilePhotoUrl": "https://example.com/photo17.jpg",
                "isAnonymous": False
            },
            "comment": "I love the variety of vegetarian options, and the staff was so helpful!",
            "starRating": "FIVE",
            "createTime": "2024-12-12T08:25:00Z",
            "updateTime": "2024-12-12T09:00:00Z",
            "reviewReply": {
                "comment": "Thank you, Lara! We're thrilled to know you enjoyed our vegetarian offerings.",
                "updateTime": "2024-12-12T09:30:00Z"
            }
        },
        {
            "reviewId": "334455668",
            "reviewer": {
                "displayName": "Mark Zuckerberg",
                "profilePhotoUrl": "https://example.com/photo18.jpg",
                "isAnonymous": False
            },
            "comment": "Nice place, but I wish the Wi-Fi had been faster for work.",
            "starRating": "THREE",
            "createTime": "2024-12-11T11:15:00Z",
            "updateTime": "2024-12-11T11:45:00Z",
            "reviewReply": {
                "comment": "Thanks for your feedback, Mark. We'll improve the Wi-Fi speed.",
                "updateTime": "2024-12-11T12:00:00Z"
            }
        }
    ]
}

@api_view(['GET'])
def get_reviews(request):
    return JsonResponse(mockReviews, safe=False)

# def logout(request):
#   logout(request)

'''def login(request):
  google_auth_url = "https://accounts.google.com/o/oauth2/v2/auth"
  client_id = "255102167652-f47m1u1p8opljejslqssdcg4qndc572o.apps.googleusercontent.com"
  redirect_uri = "http://localhost:3000/api/auth/callback"  
  scope = "openid email profile"
  response_type = "code"

  # Construct the Google login URL
  google_login_url = (
      f"{google_auth_url}?client_id={client_id}"
      f"&redirect_uri={redirect_uri}"
      f"&response_type={response_type}&scope={scope}"
  )

  return JsonResponse({"url": google_login_url})


def get_google_access_token(user):
    token = SocialToken.objects.filter(account__user=user, account__provider='google').first()
    if token:
        return token.token
    return None


def fetch_business_reviews(access_token):
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    # Get accountId
    accounts_url = 'https://mybusinessbusinessinformation.googleapis.com/v1/accounts'
    accounts_response = requests.get(accounts_url, headers=headers)
    accounts_data = accounts_response.json()
    account_id = accounts_data['accounts'][0]['name'].split('/')[-1]

    # Get locationId and reviews
    locations_url = f'https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{account_id}/locations'
    locations_response = requests.get(locations_url, headers=headers)
    locations_data = locations_response.json()

    reviews = []
    for location in locations_data['locations']:
        location_id = location['name'].split('/')[-1]
        reviews_url = f'https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{account_id}/locations/{location_id}/reviews'
        reviews_response = requests.get(reviews_url, headers=headers)
        reviews_data = reviews_response.json()
        reviews.extend(reviews_data.get('reviews', []))

    return reviews

@login_required
def fetch_reviews_view(request):
    access_token = get_google_access_token(request.user)
    if access_token:
        reviews = fetch_business_reviews(access_token)
        return render(request, 'reviews.html', {'reviews': reviews})
    return render(request, 'error.html', {'message': 'Unable to fetch reviews'})'''

