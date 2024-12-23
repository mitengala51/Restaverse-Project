import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  // Fetch reviews from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/reviews')
      .then(response => setReviews(response.data.reviews))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  // Handle responding to a review
  const respondToReview = () => {
    if (selectedReview && responseMessage) {
      axios.post('http://127.0.0.1:5000/api/reviews/respond', {
        reviewId: selectedReview.reviewId,
        response: responseMessage
      })
      .then(response => alert(response.data.message))
      .catch(error => console.error('Error responding to review:', error));
    } else {
      alert('Please select a review and enter a response message.');
    }
  };

  return (
    <div className="App">
      <h1>Google Reviews Portal</h1>
      <div>
        <h2>Reviews</h2>
        <ul>
          {reviews.map(review => (
            <li key={review.reviewId}>
              <p><strong>{review.reviewer.displayName}</strong> ({review.starRating} stars): {review.comment}</p>
              <button onClick={() => setSelectedReview(review)}>Respond</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedReview && (
        <div>
          <h2>Respond to Review</h2>
          <p>Responding to: <strong>{selectedReview.reviewer.displayName}</strong></p>
          <textarea
            value={responseMessage}
            onChange={e => setResponseMessage(e.target.value)}
            placeholder="Enter your response..."
          />
          <button onClick={respondToReview}>Submit Response</button>
        </div>
      )}
    </div>
  );
}

export default App;
