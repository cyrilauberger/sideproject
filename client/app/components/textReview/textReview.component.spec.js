'use strict';

describe('Component: textReview', function() {
  // load the component's module
  beforeEach(module('sagarankApp.textReview'));

  var textReviewComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    textReviewComponent = $componentController('textReview', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
