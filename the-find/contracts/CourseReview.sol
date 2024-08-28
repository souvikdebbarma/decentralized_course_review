// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseReview {
    struct Review {
        uint256 id;
        address reviewer;
        string courseName;
        string reviewText;
        uint256 rating;
        uint256 timestamp;
    }

    Review[] public reviews;
    mapping(address => uint256) public tokens;
    uint256 public nextReviewId;
    uint256 public tokenReward = 10; // Number of tokens for each review

    // Event to notify when a new review is submitted
    event ReviewSubmitted(uint256 id, address reviewer, string courseName, uint256 rating);

    // Function to submit a new review
    function submitReview(string memory _courseName, string memory _reviewText, uint256 _rating) public {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");

        reviews.push(Review({
            id: nextReviewId,
            reviewer: msg.sender,
            courseName: _courseName,
            reviewText: _reviewText,
            rating: _rating,
            timestamp: block.timestamp
        }));

        tokens[msg.sender] += tokenReward;

        emit ReviewSubmitted(nextReviewId, msg.sender, _courseName, _rating);

        nextReviewId++;
    }

    // Function to get the number of tokens a user has
    function getTokenBalance(address _user) public view returns (uint256) {
        return tokens[_user];
    }

    // Function to get a specific review
    function getReview(uint256 _id) public view returns (Review memory) {
        require(_id < reviews.length, "Review does not exist");
        return reviews[_id];
    }

    // Function to get the total number of reviews
    function getTotalReviews() public view returns (uint256) {
        return reviews.length;
    }
}
