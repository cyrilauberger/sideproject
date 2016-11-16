'use strict';

describe('Service: esService', function() {
  // load the service's module
  beforeEach(module('sagarankApp.esService'));

  // instantiate service
  var esService;
  beforeEach(inject(function(_esService_) {
    esService = _esService_;
  }));

  it('should do something', function() {
    expect(!!esService).to.be.true;
  });
});
