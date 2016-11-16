'use strict';
const angular = require('angular');

export class infoListComponent {
  /*@ngInject*/

  constructor() {
    'ngInject';
  }
}

export default angular.module('directives.infoList', [])
  .component('infoList', {
    bindings: {element: '=element', type: '@type', text: '@text', faicon: '@faicon'},
    template: '<li class="list-group-item col-md-6">'+
            '<i class="fa {{$ctrl.faicon}}"></i><span> {{$ctrl.text}} </span>' +
            '<span ng-if="$ctrl.element&&$ctrl.type!=\'duration\'"><span class="infos"> {{$ctrl.element}} </span></span>' +
            '<span ng-if="$ctrl.element&&$ctrl.type==\'duration\'"><span class="infos"> {{$ctrl.element}} mois </span></span>' +
            '<span ng-if="!$ctrl.element" class="infos"> N/A </span>' +
            '</li>',
    controller: infoListComponent
  })
  .name;
