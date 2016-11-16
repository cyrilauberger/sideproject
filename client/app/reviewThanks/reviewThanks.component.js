'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './reviewThanks.routes';

export class ReviewThanksComponent {
  /*@ngInject*/
  constructor($stateParams) {
    var vm = this;
    vm.course = {};
    vm.course.id = $stateParams.id;
    vm.course.name = $stateParams.name;
    console.log(vm.course);
  }
  placeholder() {};
}

export default angular.module('sagarankApp.reviewThanks', [uiRouter])
  .config(routes)
  .component('reviewThanks', {
    template: require('./reviewThanks.html'),
    controller: ReviewThanksComponent,
    controllerAs: 'reviewThanksCtrl'
  })
  .name;
