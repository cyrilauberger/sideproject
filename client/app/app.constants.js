'use strict';

import angular from 'angular';

export default angular.module('sagarankApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
