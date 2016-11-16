'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('sagarankApp.login', [])
  .controller('LoginController', LoginController)
  .name;
