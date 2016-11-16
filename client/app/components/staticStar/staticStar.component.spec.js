'use strict';

describe('Component: staticStar', function() {
  // load the component's module
  beforeEach(module('sagarankApp.staticStar'));

  var staticStarComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    staticStarComponent = $componentController('staticStar', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
