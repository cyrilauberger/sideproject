'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('reviewThanks', {
      url: '/reviewThanks/:id/:name',
      template: '<review-thanks></review-thanks>'
    });
}
