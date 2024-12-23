from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock data to simulate Google Reviews
MOCK_REVIEWS = [
    {"review_id": "1", "author_name": "Alice", "rating": 5, "text": "Excellent service!", "time": "2023-12-01"},
    {"review_id": "2", "author_name": "Bob", "rating": 4, "text": "Very good experience!", "time": "2023-12-03"}
]

# Endpoint to fetch reviews
@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    return jsonify(MOCK_REVIEWS)

# Endpoint to respond to a review
@app.route('/api/reviews/respond', methods=['POST'])
def respond_to_review():
    data = request.json
    response = {
        "status": "success",
        "message": f"Responded to review {data['review_id']} with message: {data['response']}"
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)