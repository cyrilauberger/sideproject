'use strict';

describe('Component: dynamicStar', function() {
  // load the component's module
  beforeEach(module('sagarankApp.dynamicStar'));

  var dynamicStarComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    dynamicStarComponent = $componentController('dynamicStar', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
