'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('review', {
      url: '/review/:id/:name',
      template: '<review></review>'
    });
}
