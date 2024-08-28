const CourseReview = artifacts.require('CourseReview')

contract('CourseReview', (accounts) => {
  let courseReview

  before(async () => {
    courseReview = await CourseReview.deployed()
  })

  it('should submit a review and reward tokens', async () => {
    const review = {
      courseName: 'Blockchain 101',
      reviewText: 'Great course!',
      rating: 5
    }

    await courseReview.submitReview(review.courseName, review.reviewText, review.rating, { from: accounts[0] })

    const reviewCount = await courseReview.getTotalReviews()
    assert.equal(reviewCount.toNumber(), 1, 'Review count should be 1')

    const reviewData = await courseReview.getReview(0)
    assert.equal(reviewData.courseName, review.courseName, 'Course name should match')
    assert.equal(reviewData.reviewText, review.reviewText, 'Review text should match')
    assert.equal(reviewData.rating, review.rating, 'Rating should match')

    const balance = await courseReview.getTokenBalance(accounts[0])
    assert.equal(balance.toNumber(), 10, 'Token balance should be 10')
  })
})
