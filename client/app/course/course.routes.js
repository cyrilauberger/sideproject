'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('course', {
      url: '/course/:id/:name',
      template: '<course></course>'
    });
}
