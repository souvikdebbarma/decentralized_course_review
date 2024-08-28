const CourseReview = artifacts.require("CourseReview");

module.exports = function (deployer) {
  deployer.deploy(CourseReview);
};
