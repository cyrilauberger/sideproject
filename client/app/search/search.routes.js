'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('search', {
      url: '/search',
      template: '<search></search>'
    }).state('searchWithText', {
      url: '/search?query&priceMin',
      template: '<search></search>'
    });
}
/*query&price_min=:priceMin&price_max=:priceMax&type=:type&tag',*/