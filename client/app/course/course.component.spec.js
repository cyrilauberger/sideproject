'use strict';

describe('Component: CourseComponent', function() {
  // load the controller's module
  beforeEach(module('sagarankApp.course'));

  var CourseComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CourseComponent = $componentController('course', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
