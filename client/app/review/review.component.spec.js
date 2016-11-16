'use strict';

describe('Component: ReviewComponent', function() {
  // load the controller's module
  beforeEach(module('sagarankApp.review'));

  var ReviewComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ReviewComponent = $componentController('review', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
