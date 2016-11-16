'use strict';

describe('Component: reviewDisplay', function() {
  // load the component's module
  beforeEach(module('sagarankApp.reviewDisplay'));

  var reviewDisplayComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    reviewDisplayComponent = $componentController('reviewDisplay', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
