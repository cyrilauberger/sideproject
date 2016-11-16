'use strict';

describe('Component: ReviewThanksComponent', function() {
  // load the controller's module
  beforeEach(module('sagarankApp.reviewThanks'));

  var ReviewThanksComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ReviewThanksComponent = $componentController('reviewThanks', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
