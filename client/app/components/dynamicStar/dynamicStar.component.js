'use strict';
const angular = require('angular');

export class dynamicStarComponent {
  /*@ngInject*/
}

export default angular.module('sagarankApp.dynamicStar', [])
  .component('dynamicStar', {
    bindings: {ratingType: '@ratingType'},
    template: require('./dynamicStar.html'),
    controller: dynamicStarComponent,
    controllerAs: 'dynamicStarCtrl'
  })
  .name;
