'use strict';
const angular = require('angular');

export class textReviewComponent {
  /*@ngInject*/

  constructor() {
    'ngInject';
  }
}

export default angular.module('directives.textReview', [])
  .component('textReview', {
    bindings: {reviewType: '@reviewType'},
    template: '<div class="input-group">' +
            '<input type="text" class="form-control search" placeholder="Explique la note donnée..." ng-model="reviewType">' +
            '</div><br>',
    controller: textReviewComponent
  })
  .name;
