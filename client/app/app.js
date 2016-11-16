'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
/*import es from '../../bower_components/elasticsearch/elasticsearch';*/
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import SearchComponent from './search/search.component';
import CourseComponent from './course/course.component';
import ReviewComponent from './review/review.component';
import ReviewThanksComponent from './reviewThanks/reviewThanks.component';
/*import esService from './esService/esService.service';*/
import navbar from '../components/navbar/navbar.component';
import staticStar from './components/staticStar/staticStar.component';
import dynamicStar from './components/dynamicStar/dynamicStar.component';
import infoList from './components/infoList/infoList.component';
import reviewDisplay from './components/reviewDisplay/reviewDisplay.component';
import textReview from './components/textReview/textReview.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.less';

angular.module('sagarankApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, _Auth, account, admin, SearchComponent, CourseComponent, ReviewComponent, ReviewThanksComponent, navbar, staticStar, dynamicStar, infoList, reviewDisplay, textReview, footer, main, constants, socket, util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['sagarankApp'], {
      strictDi: true
    });
  });
