'use strict';

describe('Component: infoList', function() {
  // load the component's module
  beforeEach(module('sagarankApp.infoList'));

  var infoListComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    infoListComponent = $componentController('infoList', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
