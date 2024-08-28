import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CourseReviewABI, CourseReviewAddress } from './contracts/CourseReview';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [reviews, setReviews] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    const init = async () => {
      // Load Web3
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // Default to Hardhat URL if MetaMask not available
      setWeb3(web3);

      // Load Accounts
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Load Contract
      const contract = new web3.eth.Contract(CourseReviewABI, CourseReviewAddress);
      setContract(contract);

      // Load Reviews
      const reviewCount = await contract.methods.getTotalReviews().call();
      const reviewList = [];
      for (let i = 0; i < reviewCount; i++) {
        const review = await contract.methods.getReview(i).call();
        reviewList.push(review);
      }
      setReviews(reviewList);
    };

    init();
  }, []);

  const submitReview = async () => {
    await contract.methods.submitReview(courseName, reviewText, rating).send({ from: account });
    const reviewCount = await contract.methods.getTotalReviews().call();
    const reviewList = [];
    for (let i = 0; i < reviewCount; i++) {
      const review = await contract.methods.getReview(i).call();
      reviewList.push(review);
    }
    setReviews(reviewList);
  };

  return (
    <div className="App">
      <h1 className="text-2xl font-bold">Course Review System</h1>
      <div>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="border p-2 m-2"
        />
        <textarea
          placeholder="Review Text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="border p-2 m-2"
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 m-2"
        />
        <button onClick={submitReview} className="bg-blue-500 text-white p-2 m-2">
          Submit Review
        </button>
      </div>
      <div>
        {reviews.map((review, index) => (
          <div key={index} className="border p-2 m-2">
            <h2 className="text-xl">{review.courseName}</h2>
            <p>{review.reviewText}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
