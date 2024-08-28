import React, { useState } from 'react';
import Web3 from 'web3';
import CourseReview from '../contracts/CourseReview.json';

const ReviewForm = () => {
  const [courseName, setCourseName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  const initWeb3 = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = CourseReview.networks[networkId];
    const contract = new web3.eth.Contract(
      CourseReview.abi,
      deployedNetwork && deployedNetwork.address,
    );

    setWeb3(web3);
    setContract(contract);
    setAccount(accounts[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!contract) return;
    await contract.methods.submitReview(courseName, reviewText, rating).send({ from: account });
  };

  React.useEffect(() => {
    initWeb3();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Review</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
