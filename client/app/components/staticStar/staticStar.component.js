'use strict';
const angular = require('angular');

export class staticStarComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('directives.staticStar', [])
  .component('staticStar', {
    bindings: {rating: '=rating', nb: '=nb'},
    template: require('./staticStar.html'),
    controller: staticStarComponent
  })
  .name;
