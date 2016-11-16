'use strict';
const angular = require('angular');

export class reviewDisplayComponent {
  /*@ngInject*/

  constructor() {
    'ngInject';
  }
}

export default angular.module('sagarankApp.reviewDisplay', [])
  .component('reviewDisplay', {
    bindings: {text: '@text', stars: '@stars', review: '@review'},
    template: '<span ng-show=stars||review> <b> {{text}} </b>' +
            '<static-star rating="stars" nb=-1></static-star>' +
            '<span ng-show=review> {{review}}<br><br></span></span>',
    controller: reviewDisplayComponent
  })
  .name;
