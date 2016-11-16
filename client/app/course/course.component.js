'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './course.routes';

export class CourseComponent {
  /*@ngInject*/
  constructor($stateParams, $http, Auth) {
    var vm = this;
    vm.courseCategories = {
      'Front-End Web Development': 'front-end-web-development.jpg',
      'UX/ UI / Web Design': 'web-design.jpg',
      'Full Stack Web Development': 'back-end-web-development.jpg',
      'Back-End Web Development': 'back-end-web-development.jpg',
      'Data Science': 'data-science.jpg',
      'Mobile iOS': 'mobile-ios.jpg',
      'Mobile Android': 'mobile-android.jpg',
      'Software Engineering': 'software-engineering.jpg',
      'All categories': 'other.jpg',
      'Other': 'other.jpg',
      'Machine Learning': 'machine-learning.jpg',
      'Game Development': 'game-development.jpg',
      '': 'other.jpg'
    };

    vm.isLoggedIn = Auth.isLoggedInSync;
    vm.isAdmin = Auth.isAdminSync;
    vm.getCurrentUser = Auth.getCurrentUserSync;

    $http.get('/api/courses/id/' + $stateParams.id).then(function success(response){
      vm.course = response.data[0];

      function to_pct(scope_value){
        if (!isNaN(scope_value) && scope_value != 0) {
          scope_value = (100*scope_value).toString().concat(" %");
        }
        return scope_value;
      };
      vm.course.graduationRate = to_pct(vm.course.graduationRate)
      vm.course.inJobRate6Months = to_pct(vm.course.inJobRate6Months)
      vm.courseCategory = vm.courseCategories[vm.course.category]
      // COULD BE FASTER IF NOT CALLED IN THE CALLBACK
      $http.get('/api/reviews/courseId/' + vm.course._id).then(function success(response){
        vm.reviews = response.data;
      }, function error(response){
        console.log(response);
      });
    }, function error(response){
      console.log(response);
    });
  }

  search($state) { // NOT CHECKED
    if(this.query){
      $state.go('searchWithText',{query:this.query});
    }
  };
}

export default angular.module('sagarankApp.course', [uiRouter])
  .config(routes)
  .component('course', {
    template: require('./course.html'),
    controller: CourseComponent,
    controllerAs: 'courseCtrl'
  })
  .name;
